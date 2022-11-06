const express = require("express");
const timetableModel = require("../models/timetable");

const router = express.Router();

//DATABASE

router.get("/list", function(req, res) {
	let query = {};
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
	let query = {"_id": req.params.id};
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


router.post("/add", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad request"});
	}
	let timetable = new timetableModel({
		begin_date: req.body.beginDate,
		end_date: req.body.endDate,
		visible: req.body.visible,
		title: req.body.title,
		rows: req.body.rows
	})
	timetable.save(function(err) {
		if (err) {
			console.log("Failed to create timetable. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(201).json({message: "Created"});
	})
})

router.put("/edit/:id", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad request"});
	}
	let timetable = {
		begin_date: req.body.beginDate,
		end_date: req.body.endDate,
		visible: req.body.visible,
		title: req.body.title,
		rows: req.body.rows
	}
	timetableModel.updateOne({"_id": req.params.id}, timetable, function(err) {
		if (err) {
			console.log("Failed to update timetable. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(200).json({message: "Success"});
	})
})

router.delete("/remove/:id", function(req, res) {
	timetableModel.deleteOne({"_id": req.params.id}, function(err) {
		if (err) {
			console.log("Failed to remove timetable. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(200).json({message: "Success"});
	})
})


module.exports = router;