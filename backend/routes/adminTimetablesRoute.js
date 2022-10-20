const express = require("express");
const timetableModel = require("../models/timetable");

const router = express.Router();

//DATABASE

router.get("/", function(req, res) {
	return res.status(200).json({message: "Timetables OK"})
});

// list timetables

// get one timetable

// create timetable
router.post("/add", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad request"});
	}
	let item = new timetableModel({
		begin_date: req.body.beginDate,
		end_date: req.body.endDate,
		status: req.body.status,
		title: req.body.title,
		rows: req.session.rows
	})
	item.save(function(err) {
		if (err) {
			console.log("Failed to create item. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(201).json({message: "Created"});
	})
})

// edit timetable

// remove timetable


module.exports = router;