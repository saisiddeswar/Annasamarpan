
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => navigate('/login');
  const goToSignup = () => navigate('/signup');

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to FoodShare Network</h1>
        <p className="home-description">
          Connecting educational institutions with NGOs to reduce food wastage by redistributing surplus food.
        </p>
      </header>

      <section className="home-content">
        <div className="home-card">
          <h2>Our Mission</h2>
          <p>
            We aim to bridge the gap between surplus and scarcity by creating a platform for institutions to list extra food and NGOs to easily access it.
          </p>
        </div>
        <div className="home-card">
          <h2>How It Works</h2>
          <p>
            Institutions can list available food, and NGOs can reserve or collect the food they need with a streamlined booking system.
          </p>
        </div>
      </section>

      <div className="home-buttons">
        <button className="home-login" onClick={goToLogin}>
          Login
        </button>
        <button className="home-signup" onClick={goToSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
