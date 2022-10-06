const express = require("express");

const router = express.Router();

//DATABASE

router.get("/", function(req, res) {
	return res.status(200).json({message: "Reservations OK"})
});

module.exports = router;