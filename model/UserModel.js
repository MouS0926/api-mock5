const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
 
    email:String,
    password:String,
    confirmpass:String

    
},{
    versionKey:false
})

const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}