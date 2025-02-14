import { useNavigate } from 'react-router-dom';
import './home.css';
import foodShareImage from '../public/'; // Example image

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-header">
        <div className="hero-text">
          <h1 className="home-title">Join the FoodShare Network</h1>
          <p className="home-description">
            Connecting educational institutions with NGOs to combat food wastage.
          </p>
          <div className="home-buttons">
            <button className="home-login" onClick={() => navigate('/login')}>Login</button>
            <button className="home-signup" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
        <img src={foodShareImage} alt="Food Sharing" className="hero-image" />
      </header>

      {/* Features Section */}
      <section className="home-content">
        <div className="home-card">
          <i className="fas fa-hand-holding-heart icon"></i>
          <h2>Our Mission</h2>
          <p>
            Bridging the gap between surplus and scarcity by enabling institutions to list extra food and NGOs to access it effortlessly.
          </p>
        </div>
        <div className="home-card">
          <i className="fas fa-exchange-alt icon"></i>
          <h2>How It Works</h2>
          <p>
            Institutions list available food, and NGOs can reserve or collect it through our easy-to-use platform.
          </p>
        </div>
        <div className="home-card">
          <i className="fas fa-seedling icon"></i>
          <h2>Make a Difference</h2>
          <p>
            Join us in reducing food waste and making meals accessible to those in need.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
