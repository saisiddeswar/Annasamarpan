import React from 'react';
import { motion } from 'framer-motion';

const CTASection = ({ navigate }) => {
  return (
    <section className="py-5 text-center" style={{ backgroundColor: '#E8F5E9' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-5 fw-bold text-dark mb-4">Ready to Make a Difference?</h2>
          <p className="lead text-dark mb-5">
            Join the FoodShare Network today and impact your community.
          </p>
          <motion.button
            className="btn btn-warning btn-lg"
            onClick={() => navigate('/signup')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;