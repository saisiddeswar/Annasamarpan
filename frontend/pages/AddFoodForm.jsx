import { useState } from "react"; // Import the useState hook from React for managing component state
import './Addform.css'; // Import CSS file for styling the AddFoodForm component

const AddFoodForm = () => {
    // State to manage the food data input by the user
    const [foodData, setFoodData] = useState([{ food_name: "", quantity: "", meal_type: "" }]); // Initialize state with one empty food item

    // Function to handle changes in input fields
    const handleInputChange = (index, e) => {
        const newFoodData = [...foodData];
        newFoodData[index][e.target.name] = e.target.value;
        setFoodData(newFoodData);
    };

    // Function to add a new food item input field
    const handleAddFoodItem = () => {
        setFoodData([...foodData, { food_name: "", quantity: "", meal_type: "" }]);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = localStorage.getItem('username');
        if (!username) {
            alert("Please login first");
            return;
        }

        const foodItems = foodData.map(item => ({
            food_name: item.food_name,
            quantity: item.quantity,
            meal_type: item.meal_type, // Add meal type to the submission data
        }));

        console.log('Submitting food items:', foodItems); // Log the food items

        try {
            const response = await fetch(`http://localhost:5000/api/food/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, foodItems })
            });
            
            console.log('Response:', response); // Log the response object

            if (response.ok) {
                alert("Food items added successfully!");
                setFoodData([{ food_name: "", quantity: "", meal_type: "" }]); // Clear the input fields
            } else {
                const errorData = await response.json();
                alert(errorData.msg || 'Failed to add food items');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding food items.');
        }
    };

    return (
        <div className="add-food-form">
            <h2 className="form-title">Add Food Items</h2>

            <form onSubmit={handleSubmit} className="food-form">
                {foodData.map((food, index) => (
                    <div key={index} className="food-item">
                        <input
                            type="text"
                            value={food.food_name}
                            name="food_name"
                            placeholder="Food name"
                            onChange={(e) => handleInputChange(index, e)}
                            required
                            className="food-input"
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={food.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                            className="quantity-input"
                        />
                        {/* Dropdown for selecting meal type */}
                        <select
                            name="meal_type"
                            value={food.meal_type}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                            className="meal-type-select"
                        >
                            <option value="">Select Meal Type</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>
                ))}
                <button type="button" className="add-food-button" onClick={handleAddFoodItem}>Add More Food</button>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default AddFoodForm;
