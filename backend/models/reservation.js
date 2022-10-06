const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    something: String
});

module.exports = mongoose.model("Reservation", Schema);