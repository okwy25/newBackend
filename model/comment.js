const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: String, 
        require: true
    }
}, {timestamps:true})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment