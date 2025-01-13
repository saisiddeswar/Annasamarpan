// Import the User and Food models for database interaction
const User = require('../models/usermodel'); // User model (not used in this function but likely included for future references)
const Food = require('../models/Foodmodel'); // Food model to interact with food items in the database

const Foodlistings=async(req,res)=>{
    
    try {
        const start=new Date();
        const end=new Date();
        start.setHours(0,0,0,0);
        end.setHours(23,59,59,999);
        const foodAvailable = await Food.find({
            'mealTypes.items.Availbility': 'YES',
            dateAdded:{$gte:start,$lt:end},

        });
        console.log(foodAvailable);
        const availableFood = foodAvailable.map(institute => ({
            instituteUsername: institute.institute_username,
            meals: institute.mealTypes.map(meal => ({
                type: meal.type,
                items: meal.items.filter(item => item.Availbility === 'YES') // Filter items by availability
            }))
        }));
        console.log(availableFood);

        res.status(200).json({
            success: true,
            availableFood
        }); 
    } catch (error) {
        console.log("mooda gudda gone wrong",error)
        
    }

};

const Bookings = async(req,res)=>{

};

module.exports={Foodlistings,Bookings}