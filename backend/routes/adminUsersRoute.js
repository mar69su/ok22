const express = require("express");

const router = express.Router();

//DATABASE

router.get("/", function(req, res) {
	return res.status(200).json({message: "Users OK"})
});

// list users

// get one user

// create user

// edit user

// remove user

module.exports = router;