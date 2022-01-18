const router = require('express').Router();

router.get('/usertest', (req,res) => {
    res.send('Successful');
})


module.exports = router