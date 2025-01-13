import React from 'react'

const Cart = ({cart}) => {
  
  return (
    <div className="ngo-cart-items">
          <h2>Cart Items</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="ngo-cart-item">
                <span>{item.food_name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>From: {item.instituteUsername} - {item.mealType}</span>
              </li>
            ))}
          </ul>
        </div>
  )
}

export default Cart
