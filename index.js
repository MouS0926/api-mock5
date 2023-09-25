const express=require("express")
const {connection}=require("./db")

const cors=require("cors")
const { userrouter } = require("./routes/userroutes")
const { emproutes } = require("./routes/emproutes")


const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",userrouter)
app.use("/employees",emproutes)

app.get("/",(req,res)=>{
    res.status(200).send("get req")
})

app.listen(8080,async ()=>{
    
    try {
        await connection
        console.log("db is connected");
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
    
})