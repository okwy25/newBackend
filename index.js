const express = require('express');
const app = express() 
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes')
const userRoute = require('./routes/userRoutes')
const CommentRoutes = require('./routes/commentRoutes')
// const { createComment, getAllComments, de1Comment, edit1Comment} = require('./controller/commentController');
dotenv.config()
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

console.log(process.env.MONGODB_URL);   
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Mongodb connected"))
    .catch((err)=>console.log("Error while connecting to the database", err.message))


app.use('/user', userRoute)


//for posts 

app.use('/post', postRoutes)

// for comments 

app.use('/comment',CommentRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`)
})
