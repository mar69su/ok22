const express = require("express");
const timetableModel = require("../models/timetable");

const router = express.Router();

//DATABASE

router.get("/list", function(req, res) {
	let now = new Date();
    let query = {visible: true, end_date: { $gte: now }};
	timetableModel.find(query, function(err, timetables) {
		if (err) {
			console.log("Failed to find timetables. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		const fixedTimetables = timetables.map((timetable) => {
			let beginDate = new Date(timetable.begin_date);
			let endDate = new Date(timetable.end_date);
			return {
				_id: timetable._id,
				beginDate: beginDate.toLocaleDateString('fi-FI'),
				endDate: endDate.toLocaleDateString('fi-FI'),
				visible: timetable.visible,
				title: timetable.title,
			}
		})
		return res.status(200).json(fixedTimetables);
	})
});


router.get("/one/:id", function(req, res) {
	let query = {_id: req.params.id, visible: true};
	timetableModel.findOne(query, function(err, timetable) {
		if (err) {
			console.log("Failed to find timetable. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		const beginDate = new Date(timetable.begin_date);
		const endDate = new Date(timetable.end_date);
		let fixedTimetable = {
			_id: timetable._id,
			beginDate: beginDate.toISOString().substring(0, 10),
			endDate: endDate.toISOString().substring(0, 10),
			visible: timetable.visible,
			title: timetable.title,
			rows: timetable.rows,
		}
		return res.status(200).json(fixedTimetable);
	})
});

module.exports = router;