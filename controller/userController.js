const user = require('../model/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const sendEmail = require('../sendEmail');

const register = async(req,res)=>{
    try {
        let {fullname,email,gender,password, role} = req.body;
        console.log(req.body)

        if (!fullname || !email || !gender || !password) {
            console.log("All fields are required!") 
            return; 
        }

        const hashedPassowrd = await bcrypt.hash(password, 10)
        const welcomeMail =`
   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #bfdbe4ff; padding: 20px; border-radius: 5px;">
      <h1><center>Welcome to Our Platform </center> <img scr="https://res.cloudinary.com/dh8dtvvy6/image/upload/v1752755027/Blog_pictures/vdktuipzojruyrasa9hw.jpg" width="70px"/></h1>
      <p>Hi ${fullname},</p>\n\n
      <p>Welcome to our platform! We're excited to have you on board.\n\n</p>
      <ol>
        <li>Explore our features and services.</li>
        <li>Stay updated with our latest news.</li>
        <li>Feel free</li>
        </ol>
        <p>Best regards,\n\n</p>
        <p>The Team</p>
        </p> contact us at:< href="mailto:${process.env.EMAIL_USER}
        
    <div>
    `;

    await sendEmail(email, "Welcome to Our Platform", welcomeMail);

        const newUser = await user.create({
            fullname,
            email,
            gender,
            password:hashedPassowrd
        })

        res.status(201).json({message:"Signup successful!"})
        
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async(req,res)=>{
    try {
        let {email,password} = req.body;

        if (!email || !password) {
            return res.status(404).json({message:"All fields are required"})
        }

        let checkEmail = await user.findOne({email});

        if(!checkEmail) return res.status(404).json({message:"user does not exists"});

        let checkPassword = await bcrypt.compare(password, checkEmail.password)

        if(!checkPassword) return res.status(400).json({message: "Incorrect password"})

        let token = jwt.sign(
            {id:checkEmail._id, role: checkEmail.role},
            process.env.SECRETKEY,
            {expiresIn:'1h'} 
        )

        res.status(200).json({message:"Login Sucessful", token});

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getAllUsers = async(req,res)=>{
    try {
        let users = await user.find();

        if(!users) return res.status(404).json({message:"No users found"})

        res.status(200).json(users)

    } catch (error) {
        console.log("Internal server error : ", error);
        res.status(500).json({message:"Error while fetching all users"});
    }
}

const delUser = async (req,res)=>{
    try {
        let {id} = req.params;

        let oneUser = await user.findByIdAndDelete(id)

        if(!oneUser) return res.status(404).json({message:"User not found"});

        res.status(200).json({message: "user deleted successfully"})

    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({message:"Error while deleting user"})
    }
}
const edit1User = async (req, res) =>{
    
    try {
        let {id} = req.params;

        let newData = req.body;

        if (!newData){
            return res.status(404).json({message:"All fields are required"})
        }

        let user = await user.findByIdAndUpdate(id,newData, {new: true});
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }

        res.status(200).json({message: "user updated successfully", user});
    } catch (error) {
       console.error("Internal server error:", error);
       res.status(500).json({message: "internal server error"}); 
    }
}



module.exports = {register, getAllUsers, delUser, edit1User, login}