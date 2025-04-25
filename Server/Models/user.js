import mongoose  from "mongoose";

const userschema = new mongoose.Schema({
    name:{type:String , required :true},
    dob : {type:String , required : true},
    email : {type:String ,  required: true},
    password : {type:String , required:true}
})


export const User =  new mongoose.model("User",userschema);
