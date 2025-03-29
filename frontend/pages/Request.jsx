import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./socket"; // Shared socket instance
import "./Request.css";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const instituteUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `https://annasamarpan-backend.onrender.com/api/ngo/requests?instituteUsername=${instituteUsername}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setRequests(data.requests || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests");
        setLoading(false);
      }
    };

    fetchRequests();

    socket.on("newBookingRequest", (data) => {
      toast.info(`New request from ${data.ngoUsername} for ${data.foodItems}`, {
        position: "top-right",
      });
      setRequests((prevRequests) => [
        ...prevRequests,
        { ...data, foodItems: data.foodItems, status: "pending" },
      ]);
    });

    socket.on("requestResponse", (data) => {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === data.requestId ? { ...req, status: data.message.includes("accepted") ? "accepted" : "rejected" } : req
        )
      );
    });

    return () => {
      socket.off("newBookingRequest");
      socket.off("requestResponse");
    };
  }, [instituteUsername]);

  const handleAction = async (requestId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ngo/update-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status: action }),
      });

      if (!response.ok) throw new Error("Failed to update request");

      const data = await response.json();
      toast.success(`Request ${action}ed successfully!`, { position: "top-right" });

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: action } : req
        )
      );

      socket.emit("requestResponse", {
        ngoUsername: data.ngoUsername,
        instituteUsername,
        message: `Request ${action}ed`,
        requestId,
      });
    } catch (err) {
      console.error(`Error ${action}ing request:`, err);
      toast.error(`Failed to ${action} request`, { position: "top-right" });
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Separate booked (accepted) and pending/rejected requests
  const bookedRequests = requests.filter((req) => req.status === "accepted");
  const otherRequests = requests.filter((req) => req.status !== "accepted");

  return (
    <div className="container-fluid request-bg py-5 request-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-5"
      >
        <h2 className="fw-bold text-dark request-title">Food Requests</h2>
        <p className="text-muted request-subtitle">Manage and review food bookings</p>
      </motion.div>

      {loading && (
        <div className="text-center">
          <FaSpinner className="spinner" size={40} />
          <p className="mt-2 text-muted">Loading requests...</p>
        </div>
      )}
      {error && <p className="text-danger text-center fw-semibold">{error}</p>}

      {/* Booked Requests Section */}
      {!loading && bookedRequests.length > 0 && (
        <div className="mb-5">
          <h3 className="fw-semibold text-dark mb-3">Booked Food</h3>
          <AnimatePresence>
            {bookedRequests.map((request) => (
              <motion.div
                key={request._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card shadow-sm p-3 mb-3 border-0 request-card booked-card"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold text-dark mb-2">
                      {request.foodItems}{" "}
                      <small className="text-muted">({request.mealType})</small>
                    </h5>
                    <p className="mb-1 text-muted">
                      <strong className="text-dark">NGO:</strong> {request.ngoUsername}
                    </p>
                    <p className="mb-0 text-muted">
                      <strong className="text-dark">Status:</strong>{" "}
                      <span className="badge bg-success">
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pending/Rejected Requests Section */}
      {!loading && otherRequests.length > 0 && (
        <div>
          <h3 className="fw-semibold text-dark mb-3">Pending Requests</h3>
          <AnimatePresence>
            {otherRequests.map((request) => (
              <motion.div
                key={request._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card shadow-sm p-3 mb-3 border-0 request-card"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold text-dark mb-2">
                      {request.foodItems}{" "}
                      <small className="text-muted">({request.mealType})</small>
                    </h5>
                    <p className="mb-1 text-muted">
                      <strong className="text-dark">NGO:</strong> {request.ngoUsername}
                    </p>
                    <p className="mb-0 text-muted">
                      <strong className="text-dark">Status:</strong>{" "}
                      <span
                        className={`badge ${
                          request.status === "pending" ? "bg-warning text-dark" : "bg-danger"
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  {request.status === "pending" && (
                    <div className="d-flex gap-2">
                      <motion.button
                        className="btn btn-success btn-sm d-flex align-items-center"
                        onClick={() => handleAction(request._id, "accepted")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCheck className="me-1" /> Accept
                      </motion.button>
                      <motion.button
                        className="btn btn-danger btn-sm d-flex align-items-center"
                        onClick={() => handleAction(request._id, "rejected")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTimes className="me-1" /> Reject
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-muted text-center fw-semibold">No requests found at the moment.</p>
      )}
    </div>
  );
};

export default Request;