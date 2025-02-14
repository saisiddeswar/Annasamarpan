import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../src/store/Auth";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { storeToken, storeUserType } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        toast.success("Login successful! Redirecting...");
        storeToken(data.token);
        storeUserType(data.userType);
        localStorage.setItem("username", data.username);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(data.msg || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Error occurred during login");
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  return (
    <div className="section-login">
      <div className="login-container">
        <div className="login-form">
          <h1 className="heading">Login</h1>
          <form className="login-user-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? <div className="spinner"></div> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
