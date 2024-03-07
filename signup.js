let mongoose = require('mongoose');

let signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    address: String,
});

/*let studentmodel = mongoose.model("users", studentSchema);
module.exports = studentmodel;*/ //use this or below formate

module.exports = mongoose.model("signup", signupSchema);