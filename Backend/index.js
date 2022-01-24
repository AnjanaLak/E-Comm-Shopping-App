const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

dotenv.config();

app.use(express.json()); // without this there will be an error as below
                            // UnhandledPromiseRejectionWarning
                                // : TypeError: Cannot read property 'email' of undefine

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

// app.post('/', (req,res) => {
//     res.status(200).json({"Msg" : "HI"})
// })

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('DB connected successfully'))
.catch((err) => console.log(err));


app.listen(process.env.PORT || 5000, ()=> console.log(`Server is running`));