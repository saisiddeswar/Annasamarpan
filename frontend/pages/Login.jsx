import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../src/store/Auth'; // Import AuthContext for managing auth state

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, storeToken, LogoutUser,storeUserType } = useContext(AuthContext); // Use AuthContext
  const [check, setCheck] = useState();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const url = "http://localhost:5000/api/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });
  
      const data = await response.json();
      console.log("Login Response:", data); // Check if token exists in data
      setCheck(response.ok);
  
      if (response.ok) {
        alert('Login successful');
        localStorage.setItem('username', user.username);
        storeUserType(data.userType)
  
        if (data.token) { // Check if token is present before storing
          storeToken(data.token);
        } else {
          console.error("Token is missing in the response");
        }
        navigate('/Dashboard')
      } else {
        alert(data.msg || 'Wrong credentials');
        console.log('Error:', data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Conditionally render the button as Login/Signup or Logout
  return (
    <div className='section-login'>
      <div className='login-container'>
        <div className='login-form'>
          <h1 className='heading'>Login</h1>
          {isLoggedIn ? (
            <button onClick={() => { LogoutUser(); navigate('/'); }}>Logout</button> // Logout button
          ) : (
            <form className='login-user-form' onSubmit={handleSubmit}>
              <div className='login-form-group'>
                <label htmlFor='username'>Organisation Name</label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={user.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='login-form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={user.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type='submit'>Login</button> {/* Only displayed when not logged in */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
