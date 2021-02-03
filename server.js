const express = require("express");
const env = require("dotenv/config");
const mongoose = require("mongoose");
const employeeRep = require("./route/employeeRep");

const app = express();

app.use(express.json());
app.use("/api", employeeRep);




app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.DBConnectionString,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err)=>{
        if(err) return console.log(err.message);
    })
});