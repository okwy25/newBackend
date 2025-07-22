const post = require('../model/post'); 

const createPost = async (req,res)=>{
    try {
        let {title, snippet, content} = req.body;

        if (!title || !snippet || !content) {
            console.log("All fields are required!") 
            return; 
        }

        const newPost = await post.create({
            title,
            snippet,
            content,   
            author: req.user.id
        })

        res.status(201).json({message:"post created successful!"})

    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).send(error)
    }
}

const getAllPosts = async(req,res)=>{
    
    try {
        let posts = await post.find();

        if(!posts) return res.status(404).json({message:"No posts found"})

        res.status(200).json(posts)

    } catch (error) {
        console.log("Internal server error : ", error);
        res.status(500).json({message:"Error while fetching all posts"});
    }
}

const de1Post = async (req,res)=>{
    try {
        let {id} = req.params;

        let onepost = await post.findByIdAndDelete(id)

        if(!onepost) return res.status(404).json({message:"post not found"});

        res.status(200).json({message: "post deleted successfully"})

    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({message:"Error while deleting post"})
    }
}

const edit1Post = async (req, res) =>{
    
    try {
        let {id} = req.params;

        let newData = req.body;

        if (!newData){
            return res.status(404).json({message:"All fields are required"})
        }

        let updatedpost = await post.findByIdAndUpdate(id,newData, {new: true});
        if (!updatedpost) {
            return res.status(404).json({message: "post not found"});
        }

        res.status(200).json({message: "post updated successfully", post});
    } catch (error) {
       console.error("Internal server error:", error);
       res.status(500).json({message: "internal server error"}); 
    }
}




module.exports = {createPost, getAllPosts, de1Post, edit1Post}