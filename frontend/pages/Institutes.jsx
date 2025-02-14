import { useState } from "react";
import AddFoodForm from "./AddFoodForm";
import History from "./History";
import Requests from "./Requests";
import './institutedashboard.css';

const Institutes = () => {
  const [activeCard, setActiveCard] = useState('addFood'); // Default to 'addFood'
  const organizationName = localStorage.getItem('username') || 'Institute';

  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  return (
    <div className="institute-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Hello, {organizationName}</h1>
        <div
          className={`card ${activeCard === 'addFood' ? 'active' : ''}`}
          onClick={() => handleCardClick('addFood')}
        >
          Add Food
        </div>
        <div
          className={`card ${activeCard === 'Requests' ? 'active' : ''}`}
          onClick={() => handleCardClick('Requests')}
        >
          Requests
        </div>
        <div
          className={`card ${activeCard === 'history' ? 'active' : ''}`}
          onClick={() => handleCardClick('history')}
        >
          History
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className={activeCard ? 'fade-in' : ''}>
          {activeCard === 'addFood' && <AddFoodForm />}
          {activeCard === 'Requests' && <Requests />}
          {activeCard === 'history' && <History />}
        </div>
      </div>
    </div>
  );
};

export default Institutes;