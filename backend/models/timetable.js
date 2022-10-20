const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    beginDate: Date,
    endDate: Date,
    status: String,
    title: String,
    rows: [
        {
            dock: String,
            start: Boolean,
            week: [
                {
                    time: String,
                    landing: Number,
                    restriction: Boolean
                }
            ]
        }
    ]
});

module.exports = mongoose.model("Timetable", Schema);