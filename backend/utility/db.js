const mongoose=require("mongoose");
// const uri="mongodb+srv://bsaisiddu05:ANNAM@database.vewc8.mongodb.net/?retryWrites=true&w=majority&appName=DATABASE";
const uri="mongodb://localhost:27017"
const connectDb=async()=>{
    try {
        await mongoose.connect(uri)
        console.log(" data base connected")
        
    } catch (error) {
        console.log("database failure")
        
    }
}
module.exports=connectDb;