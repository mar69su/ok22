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
		const fixedUsers = users.map((user) => {
			return {
				_id: user._id,
				id: user.id,
				username: user.username,
				manageUsers: user.manage_users,
				manageTimetables: user.manage_timetables,
				manageReservations: user.manage_reservations
			}
		})
		return res.status(200).json(fixedUsers);
	})
});

router.post("/add", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if (req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	bcrypt.hash(req.body.password, 14, function(err, hash) {
		if (err) {
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

router.put("/edit/:id", function(req, res) {
	let query = {"_id": req.params.id, "username": req.session.user};
	userModel.findOne(query, function(err, admin) {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (admin) {
			return res.status(401).json({message:"Unauthorized!"});
		}
		if (!req.body) {
			return res.status(400).json({message: "Bad request"});
		}
		let user = {
			username:req.body.username,
			manage_users:req.body.manageUsers,
			manage_timetables:req.body.manageTimetables,
			manage_reservations:req.body.manageReservations
		}
		userModel.updateOne({"_id": req.params.id}, user, function (err) {
			if (err) {
				console.log("Failed to update user. Reason ", err);
				return res.status(500).json({message: "Internal server error"});
			}
			return res.status(200).json({message: "Success"});
		})
	})
})

router.put("/password/:id", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad request"});
	}
	if (!req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if (req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	bcrypt.hash(req.body.password, 14, function(err, hash) {
		if (err) {
			return res.status(400).json({message:"Bad Request"}); 
		}
		let user = {
			password: hash
		}
		userModel.updateOne({"_id": req.params.id}, user, function (err) {
			if (err) {
				console.log("Failed to update password. Reason ", err);
				return res.status(500).json({message: "Internal server error"});
			}
			return res.status(200).json({message: "Success"});
		})
	})
})

router.delete("/remove/:id", function(req, res) {
	let query = {"_id": req.params.id, "username": req.session.user};
	userModel.findOne(query, function(err, admin) {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (admin) {
			return res.status(401).json({message:"Unauthorized!"});
		}
		userModel.deleteOne({"_id": req.params.id}, function(err) {
			if (err) {
				console.log("Failed to remove user. Reason ", err);
				return res.status(500).json({message: "Internal server error"});
			}
			return res.status(200).json({message: "Success"});
		})
	})
})

module.exports = router;