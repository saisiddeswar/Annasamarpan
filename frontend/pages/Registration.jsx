import { useState } from 'react';
import { useNavigate,} from 'react-router-dom'; 
import { useContext } from 'react';
import './signup.css';
import { AuthContext } from '../src/store/Auth';

const Registration = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    userType: 'NGO', // Default user type
    username: '',
    email: '',
    phone: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });
  const { storeToken } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert('Registration Successful');
        setUser({
          userType: 'NGO',
          username: '',
          email: '',
          phone: '',
          password: '',
          address: { street: '', city: '', state: '', zip: '' }
          
        });
        const responseData = await response.json();
           storeToken(responseData.token); 
        navigate('/login')
        
      } else {
        console.log('Registration failed:', response);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="section-registration">
      <div className="register-container grid grid-two-cols">
        <div className="registration-form">
          <h1 className="heading">Registration</h1>

          <form className="user-form" onSubmit={handleSubmit}>
            
            {/* User Type Selection */}
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <select
                id="userType"
                name="userType"
                value={user.userType}
                onChange={(e) => setUser({ ...user, userType: e.target.value })}
                required
              >
                <option value="NGO">NGO</option>
                <option value="Institute">Institute</option>
              </select>
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Organisation Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Organisation Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
              />
            </div>

            {/* Address Fields */}
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={user.address.street}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, street: e.target.value }
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={user.address.city}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, city: e.target.value }
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={user.address.state}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, state: e.target.value }
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={user.address.zip}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, zip: e.target.value }
                  })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                required
              />
            </div>

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
