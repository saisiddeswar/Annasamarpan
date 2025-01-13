import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About FoodShare Network</h1>
      <p className="about-description">
        At FoodShare Network, we believe in the power of community and sustainability. Our mission is to connect educational institutions with NGOs to effectively redistribute surplus food, ensuring that no food goes to waste while simultaneously addressing food scarcity.
      </p>
      <h2 className="about-subtitle">Why We Exist</h2>
      <p className="about-description">
        Every year, millions of tons of food are wasted in educational institutions, while countless families and individuals face hunger. FoodShare Network seeks to bridge this gap by facilitating a seamless process for institutions to donate surplus food and for NGOs to collect it. By utilizing our platform, we create a sustainable ecosystem where resources are shared, and community members support one another.
      </p>
      <h2 className="about-subtitle">Our Impact</h2>
      <p className="about-description">
        Our initiative not only reduces food waste but also fosters a sense of community. By participating in FoodShare Network, institutions can contribute positively to society and NGOs can ensure that those in need receive nutritious meals. Together, we can create a significant impact, one meal at a time.
      </p>
    </div>
  );
};

export default About;
