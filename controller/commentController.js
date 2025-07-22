const Comment = require('../model/comment');

const createComment = async(req,res)=>{
    try {
        let { content } = req.body;
        
        if(!content) return res.status(404).json({message:"All fields are required!"});

        const newComment = await Comment.create({
            content,   
        })

        res.status(201).json({message:"comment successful!"})

    } catch (error) {
        console.log("Internal server error : ", error);
        res.status(500).json({message:"Error while making comment"});
    }
}

const getAllComments = async(req,res)=>{
    
    try {
        let comments = await Comment.find();

        if(!comments) return res.status(404).json({message:"No comments found"})

        res.status(200).json(comments)

    } catch (error) {
        console.log("Internal server error : ", error);
        res.status(500).json({message:"Error while fetching all comments"});
    }
}


const de1Comment = async (req,res)=>{
    try {
        let {id} = req.params;

        let onecomment = await Comment.findByIdAndDelete(id)

        if(!onecomment) return res.status(404).json({message:"comment not found"});

        res.status(200).json({message: "comment deleted successfully"})

    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({message:"Error while deleting comment"})
    }
}

const edit1Comment = async (req,res)=>{

    try {
            let {id} = req.params;
    
            let newData = req.body;
    
            if (!newData){
                return res.status(404).json({message:"All fields are required"})
            }
    
            let updatedcomment = await Comment.findByIdAndUpdate(id,newData, {new: true});
            if (!updatedcomment) {
                return res.status(404).json({message: "comment not found"});
            }
    
            res.status(200).json({message: "comment updated successfully", Comment});
        } catch (error) {
           console.error("Internal server error:", error);
           res.status(500).json({message: "internal server error"}); 
        }
    }



module.exports = { createComment, getAllComments, de1Comment, edit1Comment }