const {verifyToken, verifyTokenAndAuthorization} = require('./verifyToken');
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


module.exports = router