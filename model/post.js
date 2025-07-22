const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    snippet:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        require: true
    }
}, {timestamps:true})

const Post = mongoose.model('post', postSchema);

module.exports = Post