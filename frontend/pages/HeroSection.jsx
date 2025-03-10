import React from 'react';
import { motion } from 'framer-motion';
import foodShareImage from '/foodimage.jpg'; // Ensure this path is correct
import { FaHandHoldingHeart } from 'react-icons/fa';

const HeroSection = ({ navigate }) => {
  return (
    <div className="py-5" style={{ backgroundColor: '#E8F5E9' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-primary fw-bold text-uppercase mb-3">
              Combat Food Wastage
            </p>
            <h1 className="display-4 fw-bold text-dark mb-4">
              Join the FoodShare Network
            </h1>
            <p className="lead text-dark mb-5">
              Connecting educational institutions with NGOs to combat food wastage.
            </p>
            <motion.button
              className="btn btn-warning btn-lg d-inline-flex align-items-center"
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="col-lg-6 d-flex justify-content-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <img
              src={foodShareImage}
              alt="Food Sharing"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;