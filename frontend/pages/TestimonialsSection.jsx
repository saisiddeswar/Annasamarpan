import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-5 fw-bold text-dark mb-4">What People Are Saying</h2>
        </motion.div>

        <motion.div
          className="row row-cols-1 row-cols-md-3 g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="col" variants={itemVariants}>
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <p className="text-muted">
                "FoodShare has revolutionized the way we handle surplus food. It's a win-win for everyone!"
              </p>
              <span className="fw-bold text-dark">- John Doe, School Administrator</span>
            </div>
          </motion.div>

          <motion.div className="col" variants={itemVariants}>
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <p className="text-muted">
                "Thanks to FoodShare, we've provided meals to hundreds of families in need."
              </p>
              <span className="fw-bold text-dark">- Jane Smith, NGO Coordinator</span>
            </div>
          </motion.div>

          <motion.div className="col" variants={itemVariants}>
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <p className="text-muted">
                "A simple yet powerful platform that makes a real difference."
              </p>
              <span className="fw-bold text-dark">- Mike Johnson, Volunteer</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;