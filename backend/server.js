const bcrypt = require("bcrypt");
const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const adminReservationsRoute = require("./routes/adminReservationsRoute");
const adminTimetablesRoute = require("./routes/adminTimetablesRoute");
const adminUsersRoute = require("./routes/adminUsersRoute");
const reservationsRoute = require("./routes/reservationsRoute");

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

// DATABASE

const mongo_user = process.env.MONGODB_USERNAME;
const mongo_password = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;

mongoose.connect("mongodb+srv://" + mongo_user + ":" + mongo_password + "@" + mongo_url + "/ok22database?retryWrites=true&w=majority")
    .then(() => console.log("Connected to mongodb"), (err) => console.log("Failed to connect. Reason ", err));

mongoose.set("toJSON", {virtuals: true});

const time_to_live_diff = 3600000;

// MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req, res, next) => {
	if (!req.headers.token) {
		return res.status(403).json({message:"Forbidden!"});
	}
	sessionModel.findOne({"token": req.headers.token}, function(err, session) {
		if (err) {
			console.log("Failed to find session. Reason: ", err);
			return res.status(403).json({message:"Forbidden!"});
		}
		if (!session) {
			return res.status(403).json({message:"Forbidden!"});
		}
		let now = Date.now();
		if (now > session.time_to_live) {
			sessionModel.deleteOne({"_id": session._id}, function(err) {
				if (err) {
					console.log("Failed to remove session. Reason: ", err);
					return res.status(403).json({message:"Forbidden!"});
				}
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			session.time_to_live = now + time_to_live_diff;
			session.save(function(err) {
				if (err) {
					console.log("Failed to resave session. Reason: ", err);
				}
                // nothing on response yet
				return next();
			})
		}
	})
}

isUserAdmin = (role) => {
    return (req, res, next) => {
        userModel.findOne({"username": req.session.user}, function(err, user) {
            if (err) {
                return res.status(500).json({message: "Internal server error"});
            }
            if (!user) {
                return res.status(401).json({message: "Unauthorized"});
            }
            if (role === "users") {
                if (!user.manage_users) {
                    return res.status(401).json({message: "Unauthorized"}); 
                }
            }
            if (role === "reservations") {
                if (!user.manage_reservations) {
                    return res.status(401).json({message: "Unauthorized"}); 
                }
            }
            if (role === "timetables") {
                if (!user.manage_timetables) {
                    return res.status(401).json({message: "Unauthorized"}); 
                }
            }
            return next();
        })
    }
}

//LOGIN API

app.post("/login", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad Request"});
	}
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({message: "Bad Request"});
	}
	if (req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message: "Bad Request"}); 
	}
	userModel.findOne({"username": req.body.username}, function(err, user) {
		if (err) {
			console.log("Failed to login. Reason", err);
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(401).json({message: "Unauthorized"});
		}
		bcrypt.compare(req.body.password, user.password, function(err, success) {
			if (err) {
				console.log("Comparing passwords failed. Reason", err);
				return res.status(500).json({message: "Internal server error"});
			}
			if (!success) {
				return res.status(401).json({message: "Unauthorized"});
			}
		})
		let token = createToken();
		let now = Date.now();
		let session = new sessionModel({
			user: req.body.username,
			time_to_live: now + time_to_live_diff,
			token: token
		})
		session.save(function(err) {
			if (err) {
				console.log("Saving session failed. Reason", err);
				return res.status(500).json({message: "Internal server error"});
			}
            // clean up outdated sessions
            sessionModel.deleteMany({"time_to_live": {$lt: now}}, function(err) {
                if (err) {
                    console.log("Failed to remove outdated sessions. Reason: ", err);
                }
            })
			return res.status(200).json({token: token, manageUsers: user.manage_users, manageReservations: user.manage_reservations, manageTimetables: user.manage_timetables});
		})
	})
});

app.post("/logout", function(req, res) {
	if (!req.headers.token) {
		return res.status(404).json({message: "Not found"});
	}
	sessionModel.deleteOne({"token": req.headers.token}, function(err) {
		if (err) {
			console.log("Failed to logout user. Reason", err);
		}
		return res.status(200).json({message: "Logged out"});
	})
})

// ROUTES

app.use("/admin/reservations", isUserLogged, isUserAdmin("reservations"), adminReservationsRoute);

app.use("/admin/timetables", isUserLogged, isUserAdmin("timetables"), adminTimetablesRoute);

app.use("/admin/users", isUserLogged, isUserAdmin("users"), adminUsersRoute);

app.use("/reservations", reservationsRoute);

app.listen(port);

console.log("Running in port ", port);