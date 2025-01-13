// using express
const express=require("express")
const app=express()

// using cross platform for better communication between frontend and backend

const cors=require('cors')

// using routers for routing 

const authrouter=require('./router/auth-router')
const contactrouter=require('./router/contact-router')
const foodrouter=require('./router/food-router')
const ngorouter=require('./router/ngo-router');

// connting to data base and activating local host 
const connectDb=require('./utility/db')
port=5000
connectDb().then(()=>{
    app.listen(port,()=>{console.log("started")});

})

// middlewares
const errorMiddleware = require("./middleware/error-middleware")
app.use(express.json())
app.use(errorMiddleware);
app.use(cors())


// using routers for different paths
app.use('/api/auth',authrouter);
app.use('/api/form',contactrouter);
app.use('/api/food',foodrouter)
app.use('/api/ngo',ngorouter)

