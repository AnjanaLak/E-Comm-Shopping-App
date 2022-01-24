const router = require('express').Router();
const User = require('../models/User');
const cryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();

// Register

router.post('/register', async (req,res) => {
   const newUser = new User({
       userName : req.body.username,
       email : req.body.email,
       password : cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
   });

   try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
   }
   catch(err) {
    console.log(err);
    res.status(500).json(err);
   }
})

// Login

router.post('/login', async (req,res) => {
    // res.status(200).json({"Msg"  : "Test passed!"})
    try {
        const user = await User.findOne({userName : req.body.username});
        !user && res.status(401).json('User does not exist!');
        
       
        const hashedPassword = cryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
            );

            // console.log(typeof hashedPassword);
            // res.status(401).json(hashedPassword);
       
           
        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&  
            res.status(401).json('Wrong credentials!');

        const {password, ...others} = user._doc;

        res.status(200).json(others);    

    }
    catch(err) {
        res.status(500).json({"Error" : "Error"});
    }
})

module.exports = router