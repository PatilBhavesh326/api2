const express = require("express");
const router = express.Router();
const EmployeeRep = require("../model/EmployeeRep");
const {check, validationResult} = require("express-validator");


// API to find particular employee representative by ID :
router.get("/employeerep/:employeeRepId",  async (req, res)=>{
    
    const getEmployee = await EmployeeRep.findOne({employeeRepId : req.params.employeeRepId});

    try {
        res.send(getEmployee);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});


// API to register/add employee representative.
router.post("/employeerep", [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('companyName', 'Company name is required').not().isEmpty(),
    check('workEmail', 'Email is required').not().isEmpty().isEmail(),
    check('workPhoneNumber', 'Phone is required').not().isEmpty(),
    check('employeeRepId').not().isEmpty(),
], async (req, res)=>{
        
    const employeeRep = new EmployeeRep({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        companyName : req.body.companyName,
        workEmail : req.body.workEmail,
        workPhoneNumber : req.body.workPhoneNumber,
        employeeRepId : req.body.employeeRepId
    });

    const addEmployee = await employeeRep.save();

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }
        res.send(addEmployee);
    } catch (error) {
        res.status(500).send(error);
    }

});

//Get list of all employee Representative registered :
router.get("/employeerep", async (req, res)=>{

    const employeeList = await EmployeeRep.find();

    try {
        res.send(employeeList);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});

// Api used for updating Employee representative by using its employee representative ID.

router.patch("/employeerep/:employeeRepId", async  (req, res)=>{

    const updateEmployee = await EmployeeRep.updateOne(
        {employeeRepId : req.params.employeeRepId},
            {
                $set: req.body
            }
    );

    try {
        res.send(updateEmployee);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});

//Delete employeeRep by employeerepID
router.delete("/employeerep/:employeeRepId", async (req, res)=>{

    const deleteEmployee = await EmployeeRep.deleteOne({employeeRepId : req.params.employeeRepId});

    try {
        res.send(deleteEmployee);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});



module.exports = router;