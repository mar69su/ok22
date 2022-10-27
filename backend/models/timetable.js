const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    begin_date: Date,
    end_date: Date,
    visible: Boolean,
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