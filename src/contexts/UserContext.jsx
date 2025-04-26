// UserContext.jsx
import {createContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Add effect to check token and restore user session on page load
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Get user info from token (you might need to implement this function)
          const userData = await getUserByToken(token);
          if (userData) {
            setUser(userData.user);
          }
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
        // Clear invalid token
        localStorage.removeItem('token');
      }
    };
    
    checkToken();
  }, []); // Empty dependency array means this runs once on component mount

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    // TODO: post login credentials to API
    const loginResult = await postLogin(credentials);
    // TODO: set token to local storage
    localStorage.setItem('token', loginResult.token);
    // TODO: set user to state
    setUser(loginResult.user);
    // TODO: navigate to home
    navigate('/');
  };

  const handleLogout = () => {
    try {
      // TODO: remove token from local storage
      localStorage.removeItem('token');
      // TODO: set user to null
      setUser(null);
      // TODO: navigate to home
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // TODO: get token from local storage
      const token = localStorage.getItem('token');
      // TODO: if token exists, get user data from API
      if (token) {
        const userResponse = await getUserByToken(token);
        // TODO: set user to state
        setUser(userResponse.user);
        // TODO: navigate to home
        console.log('location', location);
        navigate(location.pathname);
      }
    } catch (e) {
      // if token not valid
      handleLogout();
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {UserProvider, UserContext};