import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userType,setuserType]=useState(localStorage.getItem('userType'));
    let isLoggedIn = !!token;
    const storeToken = (serverToken) => {
        localStorage.setItem('token', serverToken);  // Store token in localStorage
        setToken(serverToken);                       // Update state with new token
    };

    const LogoutUser = () => {
        setToken("");  // Clear the token state
        localStorage.removeItem('token');
        localStorage.removeItem('userType'); 
        localStorage.removeItem('username');
        setuserType("");
       // Remove token from localStorage
    };
    const storeUserType=(userType)=>{
        localStorage.setItem('userType', userType);
        setToken(userType);
    }

   
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, storeToken, LogoutUser,storeUserType }}>
            {children}
        </AuthContext.Provider>
    );
};
