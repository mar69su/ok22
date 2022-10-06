const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    begin_date: Date,
    end_date: Date,
    status: String,
    title: String,
    rows: [
        {
            dock: String,
            starting_point: Boolean,
            monday: {
                time: String,
                landing: String,
                restriction: String
            },
            tuesday: {
                time: String,
                landing: String,
                restriction: String
            },
            wednesday: {
                time: String,
                landing: String,
                restriction: String
            },
            thursday: {
                time: String,
                landing: String,
                restriction: String
            },
            friday: {
                time: String,
                landing: String,
                restriction: String
            },
            saturday: {
                time: String,
                landing: String,
                restriction: String
            },
            sunday: {
                time: String,
                landing: String,
                restriction: String
            }
        }
    ]
});

module.exports = mongoose.model("Timetable", Schema);