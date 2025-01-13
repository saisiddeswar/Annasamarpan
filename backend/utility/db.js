const mongoose=require("mongoose");
const uri="mongodb://localhost:27017/test"
const connectDb=async()=>{
    try {
        await mongoose.connect(uri)
        console.log(" data base connected")
        
    } catch (error) {
        console.log("database failure")
        
    }
}
module.exports=connectDb;