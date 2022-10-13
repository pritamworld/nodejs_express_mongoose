const mongoose = require("mongoose")

//Define Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        lowercase: true
    },
    author: String,
    price: {
        type: Number,
        require: true,
        min: 10,
        max: 100
    },
    published_date: Date
})

//Creating Model from Schema
module.exports = mongoose.model("book", bookSchema)