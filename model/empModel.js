const mongoose=require("mongoose")
const EmpSchema=mongoose.Schema({
 
    fname:String,
    lname:String,
    email:String,
    dept:String,
    salary:Number

    
},{
    versionKey:false
})

const EmpModel=mongoose.model("emp",EmpSchema)

module.exports={
    EmpModel
}

