const mongoose = require('mongoose');

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    username:{type: String, required: true },
    word_key: { type: String, required: true},
    definition: {type: String, required: true },
    date: { type: Date, required: true},
},{
    timestamps: true,
});



const Excercise = mongoose.model('Excercise', exerciseSchema)

module.exports = Excercise;