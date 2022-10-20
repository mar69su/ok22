const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

const router = express.Router();

//DATABASE

router.get("/list", function(req, res) {
	let query = {};
	userModel.find(query, function(err, users) {
		if (err) {
			console.log("Failed to find users. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		return res.status(200).json(users);
	})
});

router.post("/add", function(req, res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	bcrypt.hash(req.body.password, 14, function(err, hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"}); 
		}
		let user = new userModel({
			username:req.body.username,
			password:hash,
            manage_users:req.body.manageUsers,
            manage_timetables:req.body.manageTimetables,
            manage_reservations:req.body.manageReservations
		})
		user.save(function(err, user) {
			if (err) {
				console.log("Failed to create user. Reason ", err);
				if (err.code === 11000) {
					return res.status(409).json({message: "Username already in use"});
				}
				return res.status(500).json({message: "Internal server error"});
			}
			if (!user) {
				return res.status(500).json({message: "Internal server error"});
			}
			return res.status(201).json({message: "Success"});
		})
	})
})


router.get("/list", function(req, res) {
	let query = {};
	userModel.find(query, function(err, users) {
		if (err) {
			console.log("Failed to find users. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		return res.status(200).json(users);
	})
});

function notSameUser(id, username) {
	let query = {"_id": id, "username": username};
	userModel.findOne(query, function(err, user) {
		if (err) {
			return false;
		}
		if (user) {
			return false;
		}
		return true;
	})
}


// TODO: ei saa muokata itseään
router.put("/edit/:id",function(req,res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad request"});
	}
	/*let doIt = notSameUser(req.params.id, req.session.user);
	if (doIt) {
		console.log("Ei yritä muokata omia oikeuksia");
	} else {
		console.log("Yrittää muokata omia oikeuksia" + doIt);
	}*/
	let user = {
		username:req.body.username,
		manage_users:req.body.manageUsers,
		manage_timetables:req.body.manageTimetables,
		manage_reservations:req.body.manageReservations
	}
	userModel.updateOne({"_id": req.params.id}, user, function (err) {
		if (err) {
			console.log("Failed to update item. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(200).json({message: "Success"});
	})

})

// TODO: ei saa poistaa itseään
router.delete("/remove/:id",function(req, res) {
	userModel.deleteOne({"_id": req.params.id}, function(err) {
		if (err) {
			console.log("Failed to remove user. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(200).json({message: "Success"});
	})
})

module.exports = router;