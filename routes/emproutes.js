const express=require("express")
const { EmpModel } = require("../model/empModel")
const emproutes=express.Router()


emproutes.post("/add",async(req,res)=>{
    
    try {
        const emp=new EmpModel({...req.body,salary:Number(req.salary)})
        await emp.save()
        res.status(200).send({"msg":"Employee added"})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})

emproutes.patch("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updatedEmp=await EmpModel.findByIdAndUpdate({_id:id},req.body)
        
        res.status(200).send({"msg":"Employee has been updated"})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})

emproutes.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updatedEmp=await EmpModel.findByIdAndDelete({_id:id})
        
        res.status(200).send({"msg":"Employee has been deleted"})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})

emproutes.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updatedEmp=await EmpModel.findByIdAndDelete({_id:id})
        
        res.status(200).send({"msg":"Employee has been deleted"})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})

emproutes.get("/",async(req,res)=>{
   
   
    try {
        // const {dept,search,page=1,limit=5,sortby}=req.query
        const {dept,search,page=1,limit=5}=req.query
        const filter=dept?{dept}:{}

        const searchbyname=search?{fname:{$regex:search,$options:"i"}}:{}
        // const sort=sortby?{salary:sortby=="asc"?1:-1}:{}



        const query={...filter,...searchbyname}
    
        const skip=(page-1)*limit
        const tolimit=parseInt(limit)
        const employees=await EmpModel.find(query).skip(skip).limit(tolimit)
        
        res.status(200).send(employees)
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})




module.exports={
    emproutes
}

// {
//     "fname":"ghu",
//         "lname":"sarbfgfkar",
//         "email":"asfdghis@mail.com",
//         "dept":"HR",
//         "salary":"45890"
        
    
//     }

//http://localhost:8080/employees?search=amit&dept=Tech