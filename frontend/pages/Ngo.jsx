import { useEffect, useState } from "react";
import './ngo.css';
import Cart from "../component/Cart";

const Ngo = () => {
  const [institutes, setInstitutes] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ngo/food-avaiblity');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setInstitutes(data.availableFood);
        
      } catch (error) {
        console.error('Error fetching institutes:', error);
      }
    };

    fetchInstitutes();
  }, []);

  const handleCall = (instituteUsername, mealType) => {
    console.log(`Calling ${instituteUsername} for ${mealType}`);
  };

  const handleBook = (instituteUsername, mealType, foodItem) => {
    console.log(`Booking ${foodItem.food_name} from ${instituteUsername} for ${mealType}`);
    
    // Add the food item to the cart
    setCart((prevCart) => [...prevCart, { ...foodItem, instituteUsername, mealType }]);

    // Update institutes by removing the booked item
    const updatedInstitutes = institutes.map((institute) => {
      if (institute.instituteUsername === instituteUsername) {
        return {
          ...institute,
          meals: institute.meals.map((meal) => {
            if (meal.type === mealType) {
              return {
                ...meal,
                items: meal.items.filter((item) => item.food_name !== foodItem.food_name),
              };
            }
            return meal;
          }),
        };
      }
      return institute;
    });

    setInstitutes(updatedInstitutes);

    // Set a timer to add the food item back to the list after 10 minutes
    setTimeout(() => {
      setInstitutes((prevInstitutes) =>
        prevInstitutes.map((institute) => {
          if (institute.instituteUsername === instituteUsername) {
            return {
              ...institute,
              meals: institute.meals.map((meal) => {
                if (meal.type === mealType) {
                  return {
                    ...meal,
                    items: [...meal.items, foodItem], // Re-add the food item to the meal's items
                  };
                }
                return meal;
              }),
            };
          }
          return institute;
        })
      );

      // Also, remove the item from the cart after 10 minutes
      setCart((prevCart) =>
        prevCart.filter(
          (cartItem) =>
            !(
              cartItem.food_name === foodItem.food_name &&
              cartItem.instituteUsername === instituteUsername &&
              cartItem.mealType === mealType
            )
        )
      );
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <div className="ngo-header">
        <h1 className="ngo-title">Hello, {username}</h1>
        <button onClick={toggleCart} className="ngo-cart-button">
          🛒 Cart ({cart.length})
        </button>
      </div>
      <div><h1>Todays Avaible Food!!</h1></div>

      {showCart && (
        <Cart cart={cart}/>
      )}

      <div className="ngo-institute-cards">
        {institutes.map((institute, index) => (
          <div key={index} className="ngo-card">
            <h2 className="ngo-institute-name">{institute.instituteUsername.toUpperCase()}</h2>
            
            {institute.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className="ngo-meal-section">
                <h3 className="ngo-meal-type">{meal.type.toUpperCase()}</h3>
                
                {meal.items.length > 0 ? (
                  <ul>
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="ngo-food-item">
                        <span className="ngo-food-name">{item.food_name}</span>
                        <span className="ngo-food-quantity">Quantity: {item.quantity}</span>
                        <div className="ngo-meal-button-container">
                          <button 
                            onClick={() => handleCall(institute.instituteUsername, meal.type)} 
                            className="ngo-small-call-button"
                          >
                            Call
                          </button>
                          <button 
                            onClick={() => handleBook(institute.instituteUsername, meal.type, item)} 
                            className="ngo-small-book-button"
                          >
                            Book
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No available food items.</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ngo;
