const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user')

app.use('api/user', userRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('DB connected successfully'))
.catch((err) => console.log(err));



app.get('/', (req,res) => {
    console.log(req.headers);
    res.send("Insha Allah!!")
})

app.listen(process.env.PORT || 5000, ()=> console.log(`Server is running`));