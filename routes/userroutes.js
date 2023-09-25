const express=require("express")
const { UserModel } = require("../model/UserModel")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const userrouter=express.Router()


userrouter.post("/signup",async (req,res)=>{
    
 try {
        const {email,password,confirmpass}=req.body
        const isExist=await UserModel.findOne({email})
        if(isExist){
            return res.status(200).send({"msg":"Email already regsitered"})
        }

        if(password!=confirmpass)
        {
            return res.status(200).send({"msg":"Pssword do not match"})
        }

        bcrypt.hash(password, 5,async (err, hash) =>{
            if(err){
                res.status(400).send({"err":err})
                console.log(err);
            }
            else{
                const user=new UserModel({email,password:hash})
                await user.save()
                res.status(200).send({"msg":"new user registered successfully"})
            }
        });



    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

 
})


userrouter.post("/login",async (req,res)=>{

    try {
        const{email,password}=req.body
        const user=await UserModel.findOne({email})
        if(user){
            
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                   const token = jwt.sign({ mypayload: 'hello' }, 'moumita');
                   res.status(200).send({"msg":"Login Successful",token})
                }else{
                    res.status(200).send({"msg":"Wrong password"})
                }
            });
        }
        else{
            return res.status(200).send({"msg":"Invalid credentials"})
        }


    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }
})

module.exports={
    userrouter
}