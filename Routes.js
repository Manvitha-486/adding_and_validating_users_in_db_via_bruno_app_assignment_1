const express= require("express");
const bcrypt = require("bcryptjs");
const User = require("./Schema");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
try{
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User({username,email,password})
await newUser.save()
res.status(200).send(newUser);
}
catch(e){
  res.status(400).send({error})
}
})