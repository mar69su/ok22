const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    manage_users: Boolean,
    manage_timetables: Boolean,
    manage_reservations: Boolean
});

module.exports = mongoose.model("User", Schema);