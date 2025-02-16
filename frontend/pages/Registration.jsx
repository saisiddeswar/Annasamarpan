import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../src/store/Auth';
import './signup.css';

const initialState = {
  userType: 'NGO',
  username: '',
  email: '',
  phone: '',
  address: { street: '', city: '', state: '', zip: '' },
  password: '',
};

const reducer = (state, action) => {
  if (action.name === 'address') {
    return { ...state, address: { ...state.address, [action.field]: action.value } };
  }
  return { ...state, [action.name]: action.value };
};

const Registration = () => {
  const navigate = useNavigate();
  const { storeToken } = useContext(AuthContext);
  const [user, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        alert(`Error: ${errorMsg.msg || 'Registration failed'}`);
        return;
      }

      const responseData = await response.json();
      alert('Registration Successful');
      storeToken(responseData.token);
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="section-registration">
      <div className="register-container grid grid-two-cols">
        <div className="registration-form">
          <h1 className="heading">Registration</h1>

          <form className="user-form" onSubmit={handleSubmit}>
            {/* User Type, Username, Email, Phone */}
            {['userType', 'username', 'email', 'phone'].map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field === 'userType' ? 'User Type' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field === 'userType' ? (
                  <select id={field} name={field} value={user[field]} onChange={(e) => dispatch(e.target)}>
                    <option value="NGO">NGO</option>
                    <option value="Institute">Institute</option>
                  </select>
                ) : (
                  <input type="text" id={field} name={field} value={user[field]} onChange={(e) => dispatch(e.target)} required />
                )}
              </div>
            ))}

            {/* Address Fields */}
            {['street', 'city', 'state', 'zip'].map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={user.address[field]}
                  onChange={(e) => dispatch({ name: 'address', field, value: e.target.value })}
                  required
                />
              </div>
            ))}

            {/* Password Field (Moved Below Address) */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => dispatch(e.target)}
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
