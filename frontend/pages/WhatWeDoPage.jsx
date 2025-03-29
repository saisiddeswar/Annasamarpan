import React from 'react';
import { motion } from 'framer-motion';
import { FaSchool, FaHandsHelping, FaTruck } from 'react-icons/fa';

const WhatWeDoPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ backgroundColor: '#E8F5E9' }}>
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="display-5 fw-bold text-dark mb-4">What We Do</h2>
            <p className="lead text-muted">
              Connecting surplus food with those who need it most.
            </p>
          </motion.div>

          <motion.div
            className="row row-cols-1 row-cols-md-3 g-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaSchool className="text-info mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Institutions</h3>
                <p className="text-muted">
                  Schools and colleges list surplus food daily.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaHandsHelping className="text-success mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">NGOs</h3>
                <p className="text-muted">
                  NGOs reserve and collect food for distribution.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaTruck className="text-warning mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Logistics</h3>
                <p className="text-muted">
                  Seamless coordination for pickup and delivery.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoPage;