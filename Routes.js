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

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email ||!password){
            return res.status(400).json({message:"required"});
        }
        const nUser=await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const matching = await nUser.comparePassword(password)
        if(!matching){
            return res.status(400).json({message:"Invalid Password"});
        }
        res.status(200).json({ message: "Login successful" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

    
})
module.exports = router;
