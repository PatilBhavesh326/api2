const mongoose = require("mongoose");

const employeerep = mongoose.Schema({
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    companyName : {type:String, required:true},
    workEmail : {type:String, required:true},
    workPhoneNumber : {type:Number, required:true},
    employeeRepId : {type:Number, required:true},
    enrollDate : {type:Date, default:Date.now}
});


module.exports = EmployeeRep = mongoose.model("EmployeeRep", employeerep);