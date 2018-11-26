const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bbq', { useNewUrlParser: true });

const particleSchema = new mongoose.Schema({
    Hname: String,
    Hcontent: String,
    time: Number,
    Id: String,
})

module.exports = mongoose.model('particle', particleSchema);