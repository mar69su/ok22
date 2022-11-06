const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    token: String,
    date: Date,
    tour_of_day: Number,
    indock_of_tour: Number,
    outdock_of_tour: Number,
    vehicle: String,
    licence_plate: String,
    telephone: String
});

module.exports = mongoose.model("Reservation", Schema);