const express = require("express");

const router = express.Router();

//DATABASE

router.get("/timetable/:date", function(req, res) {
	let query = {"visible": true, "beginDate": { $lte: req.params.date }, "endDate": { $gte: req.params.date }};
	timetableModel.findOne(query, function(err, timetable) {
		if (err) {
			console.log("Failed to find timetable. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		let fixedTimetable = {
			_id: timetable._id,
			beginDate: timetable.begin_date,
			endDate: timetable.end_date,
			visible: timetable.visible,
			title: timetable.title,
			rows: timetable.rows,
		}
		return res.status(200).json(fixedTimetable);
	})
});

// list reservations

// get one reservation

// create reservation

// edit reservation

// remove reservation

module.exports = router;