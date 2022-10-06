const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    user: {
        type: String,
        index: true
    },
    token: String,
    time_to_live: Number
})

module.exports = mongoose.model("Session", Schema);