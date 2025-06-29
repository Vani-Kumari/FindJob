import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        required: true
    },
    profile:{
        bio: {type:String},
        skills:[{type:String}],
        resume:{type:String} ,//url of resume
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type:String,
            default: ''
        }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{timestamps:true});

export const User=mongoose.model('User',userSchema);