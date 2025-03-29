import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaUtensils, FaCheck } from "react-icons/fa";
import socket from "./socket"; // Shared socket
import Cart from "../component/Cart";
import "./ngo.css";

const Ngo = () => {
  const [institutes, setInstitutes] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch(
          "https://annasamarpan-backend.onrender.com/api/ngo/food-availability"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging
        setInstitutes(data.availableFood);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };

    fetchInstitutes();

    if (username) {
      socket.connect();
      socket.emit("register", { userId: username, userType: "ngo" });

      socket.on("newBookingRequest", (data) => {
        console.log("Socket Event Received:", data);
        if (data.accepted) {
          setInstitutes((prevInstitutes) =>
            prevInstitutes.map((institute) =>
              institute.instituteUsername === data.instituteUsername
                ? {
                    ...institute,
                    meals: institute.meals.map((meal) =>
                      meal.type === data.mealType
                        ? {
                            ...meal,
                            items: meal.items.filter(
                              (item) => item.food_name !== data.foodItem.food_name
                            ),
                          }
                        : meal
                    ),
                  }
                : institute
            )
          );
        }
        alert(`Institute ${data.instituteUsername} responded: ${data.message}`);
      });

      return () => {
        socket.off("newBookingRequest");
        socket.disconnect();
      };
    }
  }, [username]);

  const handleBook = async (instituteUsername, mealType, foodItem) => {
    try {
      console.log("Booking Food:", { instituteUsername, mealType, foodItem });

      const response = await fetch(
        "https://annasamarpan-backend.onrender.com/api/ngo/book-food",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instituteUsername,
            mealType,
            foodItems: foodItem.food_name,
            ngoUsername: username,
          }),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        console.error("Booking failed:", result.message);
        return;
      }

      setCart((prevCart) => [
        ...prevCart,
        { ...foodItem, instituteUsername, mealType, bookedAt: Date.now() },
      ]);

      setInstitutes((prevInstitutes) =>
        prevInstitutes.map((institute) =>
          institute.instituteUsername === instituteUsername
            ? {
                ...institute,
                meals: institute.meals.map((meal) =>
                  meal.type === mealType
                    ? {
                        ...meal,
                        items: meal.items.filter(
                          (item) => item.food_name !== foodItem.food_name
                        ),
                      }
                    : meal
                ),
              }
            : institute
        )
      );

      setTimeout(() => {
        setInstitutes((prevInstitutes) =>
          prevInstitutes.map((institute) =>
            institute.instituteUsername === instituteUsername
              ? {
                  ...institute,
                  meals: institute.meals.map((meal) =>
                    meal.type === mealType
                      ? { ...meal, items: [...meal.items, foodItem] }
                      : meal
                  ),
                }
              : institute
          )
        );

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
      }, 30 * 60 * 1000);
    } catch (error) {
      console.error("Error booking food:", error);
    }
  };

  const toggleCart = () => setShowCart(!showCart);

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="d-flex justify-content-between align-items-center mb-5"
      >
        <h1 className="display-5 fw-bold text-dark">Hello, {username}</h1>
        <motion.button
          className="btn btn-outline-primary btn-md d-flex align-items-center"
          onClick={toggleCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShoppingCart className="me-2" /> Cart ({cart.length})
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-5"
      >
        <h2 className="fw-bold text-dark">Today's Available Food</h2>
        <p className="text-muted">Reserve meals to help reduce food waste</p>
      </motion.div>

      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="cart-overlay"
          >
            <Cart cart={cart} />
            <button className="btn btn-secondary mt-3" onClick={toggleCart}>
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="row g-4">
        {institutes.map((institute, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-md-4"
          >
            <div className="card shadow-sm p-4 border-0 h-100">
              <h3 className="fw-bold text-dark mb-3">
                {institute.instituteUsername.toUpperCase()}
              </h3>
              {institute.meals.map((meal, mealIndex) => (
                <div key={mealIndex} className="mb-3">
                  <h4 className="text-primary mb-2">
                    <FaUtensils className="me-2" /> {meal.type.toUpperCase()}
                  </h4>
                  {meal.items.length > 0 ? (
                    <ul className="list-group">
                      {meal.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <span className="fw-bold">{item.food_name}</span>
                            <br />
                            <small className="text-muted">Qty: {item.quantity}</small>
                          </div>
                          <motion.button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              handleBook(institute.instituteUsername, meal.type, item)
                            }
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaCheck className="me-1" /> Book
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No available food items.</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ngo;
