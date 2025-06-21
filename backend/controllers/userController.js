import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";


//Login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {

        //Check if user exist
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        //Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Internal server error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Register user
const registerUser = async (req, res) => {
    const{name,password,email} = req.body;
    try {

        //Check if user exist
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false, message:"User already exist"})
        }

        //validate email and password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid email"})
        }

        if(password.length < 6){
            return res.json({success:false, message:"Password must be atleast 6 characters"})
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create user
        const newUser = await userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Internal server error"})
    }
}

export { loginUser, registerUser };