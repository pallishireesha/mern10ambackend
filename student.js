let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
});

/*let studentmodel = mongoose.model("users", studentSchema);
module.exports = studentmodel;*/ //use this or below formate

module.exports = mongoose.model("users", studentSchema);