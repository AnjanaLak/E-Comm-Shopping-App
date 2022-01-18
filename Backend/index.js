const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

dotenv.config();

app.use('api/auth', authRoute)
app.use('api/user', userRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('DB connected successfully'))
.catch((err) => console.log(err));


app.listen(process.env.PORT || 5000, ()=> console.log(`Server is running`));