const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String, 
        require: true
    },
    email:{
        type: String, 
        require: true
    },
    gender:{
        type: String,
        require: true,
        enum:["male","female"]
    },
    password:{
        type: String, 
        require: true
    },
    role:{
        type: String,
        enum:["Admin","User"],
        default:"User"
    }
}); 

const user = mongoose.model('user', userSchema);
module.exports = user;