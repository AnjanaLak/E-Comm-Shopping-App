const {verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin} = require('./verifyToken');
const router = require('express').Router();
const User = require('../models/User')

// router.post('/hi', (req,res) => {
//     res.status(200).json({"Msg" : "HI"})
// })

// update
router.put('/:id', verifyTokenAndAuthorization, async (req,res) => {
    if(req.body.password) {
        req.body.password =  cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body,
            },
            {new : true}
            );
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// DELETE

router.delete('/:id', verifyTokenAndAuthorization, async (req,res) => {
    try{
        await User.findOneAndDelete(req.params.id);
        res.status(200).json("user has been deleted!");

    }
    catch(err){
        res.status(500).json(err);
    }
})

// GET USER

router.get('/find/:id', verifyTokenAdmin, async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router