require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const authRoter = require('./routes/Auth')
const postRoter = require('./routes/Post')

// await mongoose.connect('mongodb://localhost:27017/mern_project'

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@mern-project.oov3b.mongodb.net/mern-project?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect susscessfully!')
    }
    catch(error){
        console.log('connect failure!')
    }
}

connectDB();

const app = express()
app.use(express.urlencoded({extended: true,}))

app.use(express.json())
app.use(cors())


app.use('/api/auth',authRoter)
app.use('/api/posts',postRoter)




app.listen(process.env.PORT, () => {
  console.log(`Server start at http://localhost:${process.env.PORT}`)
})
