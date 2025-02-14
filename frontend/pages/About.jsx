import React, { useState, useEffect } from 'react';
import './about.css';

const About = () => {
  const [visitors, setVisitors] = useState(0);
  const [mealsSaved, setMealsSaved] = useState(0);
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValues = { visitors: 5000, mealsSaved: 12000, partners: 200 };

    const interval = setInterval(() => {
      start += 50;
      setVisitors(Math.min(start, endValues.visitors));
      setMealsSaved(Math.min(start * 2, endValues.mealsSaved));
      setPartners(Math.min(start / 10, endValues.partners));

      if (start >= endValues.visitors) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">About FoodShare Network</h1>
      <p className="about-description">
        At FoodShare Network, we believe in the power of community and sustainability. 
        Our mission is to connect educational institutions with NGOs to effectively 
        redistribute surplus food, ensuring no food goes to waste.
      </p>

      <h2 className="about-subtitle">Our Impact</h2>
      <div className="stats-container">
        <div className="stat-box">
          <h3 className="stat-number">{visitors}+</h3>
          <p>People Visited</p>
        </div>
        <div className="stat-box">
          <h3 className="stat-number">{mealsSaved}+</h3>
          <p>Meals Saved</p>
        </div>
        <div className="stat-box">
          <h3 className="stat-number">{partners}+</h3>
          <p>Partner Institutions</p>
        </div>
      </div>

      <h2 className="about-subtitle">How We Work</h2>
      <p className="about-description">
        Institutions list available food, and NGOs can reserve or collect it through 
        our platform. This ensures efficient food redistribution and minimal wastage.
      </p>
    </div>
  );
};

export default About;
