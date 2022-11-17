const express = require("express");
const timetableModel = require("../models/timetable");
const reservationModel = require("../models/reservation");

const router = express.Router();

generateToken = (n) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let token = '';
    for (let i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}


//DATABASE

router.get("/timetable/:date", function(req, res) {
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
		//console.log(fixedTimetable);
		return res.status(200).json(fixedTimetable);
	})
});

router.get("/one/:id/:lp", function(req, res) {
	let query = {token: req.params.id, licence_plate: req.params.lp};
	reservationModel.findOne(query, function(err, reservation) {
		if (err) {
			console.log("Failed to find reservation. Reason ", err);
			return res.status(500).json({message: "Internal server error"})
		}
		if (reservation) {
			let dateDate = new Date(reservation.date);
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
				let tour = [];
				if (timetable) {
					let tourCounter = -1;
					tour = timetable.rows.reduce(function(result, row) {
						if (row.week[cursor].landing) {
							if (row.start) {
								tourCounter++;
							}
							if (tourCounter === reservation.tour_of_day) {
								result.push({
									dock: row.dock,
									time: row.week[cursor].time
								});
							}
						}
						return result;
					}, []);
					if (tour) {
						let fixedReservation = {
							_id: reservation._id,
							token: reservation.token,
							date: reservation.date,
							tourOfDay: tour[0].dock + " " + tour[0].time,
							inDock: tour[reservation.indock_of_tour].dock + " " + tour[reservation.indock_of_tour].time,
							outDock: tour[reservation.outdock_of_tour].dock + " " + tour[reservation.outdock_of_tour].time,
							vehicle: reservation.vehicle,
							licencePlate: reservation.licence_plate,
							telephone: reservation.telephone
						};
						//console.log(fixedReservation);
						return res.status(200).json(fixedReservation);
					
					}
				} else {
					return res.status(404).json({message:"Not found!"});
				}
			})
		} else {
			return res.status(404).json({message:"Not found!"});
		}
	})
});


router.post("/add", function(req, res) {
	if (!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	let token = generateToken(6);
	let reservation = new reservationModel({
		token:token,
		date:req.body.date,
		tour_of_day:req.body.tourOfDay,
		indock_of_tour:req.body.inDockOfTour,
		outdock_of_tour:req.body.outDockOfTour,
		vehicle:req.body.vehicle,
		licence_plate:req.body.licencePlate,
		telephone:req.body.telephone
	})
	reservation.save(function(err, reservation) {
		if (err) {
			console.log("Failed to create reservation. Reason ", err);
			return res.status(500).json({message: "Internal server error"});
		}
		if (!reservation) {
			return res.status(500).json({message: "Internal server error"});
		}
		return res.status(201).json({token: token});
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