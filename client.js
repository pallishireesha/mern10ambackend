let mongoose = require('mongoose');

let clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    Gstin: String,
    username:String,
    password: String,
});

/*let studentmodel = mongoose.model("users", studentSchema);
module.exports = studentmodel;*/ //use this or below formate

module.exports = mongoose.model("client", clientSchema);