import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./actions";
import axios from 'axios'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 3000);
    });
  };
  const addUserToLocalStorage = ({user, token,location}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location',location)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      console.log(response);
      const {user, token, location} = response.data
      dispatch({type: REGISTER_USER_SUCCESS, payload: { user, token, location}})
      // local storage
      addUserToLocalStorage({user, token,location})
    } catch (error) {
      console.log("error", error.response)
      dispatch({
        type: REGISTER_USER_ERROR, 
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert();
  }
  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
