
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { User } from "./Models/user.js";
dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hello");
})

app.post("/user/register",async (req,res)=>{
   console.log(req.body);
    const {name,dob,email,password} = req.body;
    if(name==undefined || dob==undefined || email==undefined || password==undefined){
        res.status(400).json({message:"Enter Value in All required fields"});
        return;
    }

   const register_details = {name,dob,email,password} 
   
    const curruser = await User.findOne({email});
    
    
    if(!curruser){
        
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt);
      await User.create({name:name,dob:dob,email:email,password:hashedpassword});
      res.status(200).json({message:"registered successfully",registration_details:register_details})
    }catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json("Failed to create user.");
    }
  }
else{
    res.status(404).json({message:"User already exist"});
}
})

app.post("/user/login",async (req,res)=>{
    const { email, password } = req.body;
    const founduser = await User.findOne({ email });
    if (!founduser) {
        return res.status(404).json({ message: "Invalid Email" });
    }
    try {
        const ismatch = await bcrypt.compare(password, founduser.password);
        if (!ismatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        if (!process.env.SECRET_KEY) {
            return res.status(500).json({ message: "Server configuration error: SECRET_KEY is not defined." });
        }

        const payload = { name:founduser.name, email: founduser.email };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10h" });
       
        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 3600000 * 5,
            secure: false,           
            sameSite: "Lax",         
          });
          

      res.status(200).json({
  User_details:{name:founduser.name,
  dob:founduser.dob,
  email:founduser.email
  },
  token:token,
  message: "Logged in successfully",
  redirectTo: "/home"
});
        
}

    catch (e) {
        console.log("Error:", e);
        res.status(500).json({ message: "An error occurred on the server." });
    }

})

app.get("/user/data",async(req,res)=>{
    try{
        const users = await User.find({},"-password");
        res.status(200).json(users);
    }
    catch(e){
        console.log(e);
        res.status(500).json("Error ",e);
    }
})

mongoose.connect(process.env.MONGO_URL, {
    dbName: "QUANTOM",
}).then(() => console.log("Database connected on port",process.env.port))
  .catch((e) => console.log("Database connection error:", e));


app.listen(process.env.port,()=>{

    console.log("Listening  on port",process.env.port);

})
