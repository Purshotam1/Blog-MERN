const express = require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const routes=require('./routes/')
const router=express.Router()
const cloudinary =require('cloudinary')
const cors =require('cors')
const helmet =require('helmet')
module.exports=router
const app=express()

routes(router)

const url=process.env.MONGODB_URI||"mongodb://localhost:27017/news"
const port=5000||process.env.PORT


cloudinary.config({
    cloud_name:'bobby',
    api_key:'763616327462414',
    api_secret:'xIByTuEmzoQe12lJ5bqDnch6u5k'
})

mongoose.connect(url,{})

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use('/',router)
app.listen(port, () => `Server running on port ${port}`);