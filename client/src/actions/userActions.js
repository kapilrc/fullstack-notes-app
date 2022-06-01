
import {
  CLEAR_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from '../constants/user';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  // console.log(email, password);

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    const { data } = await axios.post(
      'http://localhost:3001/api/user/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err?.response?.data?.message || err?.message
    });

  }
}

export const register = ({ name, email, password, confirmPassword, pic }) => async (dispatch) => {

  if (password !== confirmPassword) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: 'Passwords do not match'
    });
    return;
  }


  try {

    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    const { data } = await axios.post(
      'http://localhost:3001/api/user',
      { name, email, password, pic },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error?.response?.data?.message || error?.message
    });
  }
};


export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
}

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
}