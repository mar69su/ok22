const express = require("express");

const router = express.Router();

//DATABASE

router.get("/", function(req, res) {
	return res.status(200).json({message: "Public reservations OK"})
});

// list reservations

// get one reservation

// create reservation

// edit reservation

// remove reservation

module.exports = router;