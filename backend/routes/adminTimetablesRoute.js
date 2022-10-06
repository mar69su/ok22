const express = require("express");

const router = express.Router();

//DATABASE

router.get("/", function(req, res) {
	return res.status(200).json({message: "Timetables OK"})
});

// list timetables

// get one timetable

// create timetable

// edit timetable

// remove timetable


module.exports = router;