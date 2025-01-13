import { useContext, useState } from "react"; // Import useContext and useState hooks from React
import { Info } from '../component/context'; // Import the Info context (not used in this component currently)
import AddFoodForm from "./AddFoodForm"; // Import the AddFoodForm component to be used in the dashboard
  import History from "./History"; //Import the History component to be used in the dashboard
import './institutedashboard.css';
import Requests from "./Requests"; // Import the CSS file for styling the institute dashboard

const Institutes = () => {
  // State to track which card is currently active
  const [activeCard, setActiveCard] = useState(null);

  // Retrieve the organization name from localStorage
  // If not found, default to 'Institute'
  const organizationName = localStorage.getItem('username') || 'Institute';

  // Function to handle card click events
  const handleCardClick = (card) => {
    setActiveCard(card); // Set the active card based on the clicked card
  };

  return (
    <div className="institute-dashboard"> {/* Main container for the institute dashboard */}
      <h1>Hello, {organizationName}</h1> {/* Greeting the organization with its name */}

      <div className="card-container"> {/* Container for the card elements */}
        {/* Card for adding food items, sets activeCard to 'addFood' when clicked */}
        <div className="card" onClick={() => handleCardClick('addFood')}>Add Food</div>
        {/* Card for updating food items, sets activeCard to 'updateFood' when clicked */}
        <div className="card" onClick={() => handleCardClick('Requests')}>Requests</div>
        {/* Card for viewing history, sets activeCard to 'history' when clicked */}
        <div className="card" onClick={() => handleCardClick('history')}>History</div>
      </div>

      {/* Conditionally render the AddFoodForm component if 'addFood' card is active */}
      {activeCard === 'addFood' && <AddFoodForm />}
      {activeCard === 'history' && <History />}
      {activeCard === 'Requests' && <Requests />}
      {/* Other components for update and history can be added similarly based on the activeCard */}
    </div>
  );
};

export default Institutes; // Export the Institutes component for use in other parts of the application
