const timetableModel = require("../models/timetable");
const reservationModel = require("../models/reservation");

const express = require("express");

const router = express.Router();

//DATABASE

router.get("/reservations/:date", function(req, res) {
	let dateDate = new Date(req.params.date);
	cursor = dateDate.getDay();
	if (cursor > 0) {
		cursor--;
	} else {
		cursor = 6
	}
	let query = {visible: true, begin_date: { $lte: dateDate }, end_date: { $gte: dateDate }};
	timetableModel.findOne(query, function(err, timetable) {
		if (err) {
			console.log("Failed to find timetable. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		let fixedTimetable = [];
		if (timetable) {
			fixedTimetable = timetable.rows.reduce(function(result, row) {
				if (row.week[cursor].landing) {
					result.push({
						dock: row.dock,
						start: row.start,
						time: row.week[cursor].time,
						landing: row.week[cursor].landing,
						restriction: row.week[cursor].restriction
					});
				}
				return result;
			}, []);
		}
		query = {date: dateDate};
		reservationModel.find(query, function(err, reservations) {
			if (err) {
				console.log("Failed to find reservations. Reason ", err);
				return res.status(500).json({message: "Internal server error"})
			}
			let reservationsOfDay = {
				timetable: fixedTimetable,
				reservations: reservations
			}
			return res.status(200).json(reservationsOfDay);
		})
	})
});

router.put("/edit/:id", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message: "Bad request"});
	}
	let reservation = {
		tour_of_day: req.body.tourOfDay,
		indock_of_tour: req.body.inDockOfTour,
		outdock_of_tour: req.body.outDockOfTour,
		vehicle: req.body.vehicle,
		licence_plate: req.body.licencePlate,
		telephone: req.body.telephone
	}
	reservationModel.updateOne({"_id": req.params.id}, reservation, function(err) {
		if (err) {
			console.log("Failed to update reservation. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(200).json({message: "Success"});
	})
})

router.delete("/remove/:id", function(req, res) {
	reservationModel.deleteOne({"_id": req.params.id}, function(err) {
		if (err) {
			console.log("Failed to remove reservation. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(200).json({message: "Success"});
	})
})

module.exports = router;