const express = require("express");
const User = require("../../models/Users/userModel");

const router = express.Router();

router.get("/admin/studentDetails", async (req, res) => {
    try{

        const details = await User.find({}).sort({"createdAt": -1});
        if(!details){
            res.status(401).json({
                "message": "No user found!"
            })
        }
        
        details.forEach(element => {
            console.log(element.name);
            console.log(element.email);
            console.log(element.mobile);
        });
        res.status(200).json(details);
        
        
    }catch (err) {
        if(err){
            console.log(err);
        }
    }
})

module.exports = router;