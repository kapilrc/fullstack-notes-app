import axios from "axios";
import * as actions from "../api"

const baseURL = Process.env.baseURL;

// SNA
const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  onStart && dispatch({ type: onStart });

  next(action);

  try {

    const response = await axios.request({
      baseURL,
      url,
      method,
      data
    });
    // General success
    dispatch(actions.apiCallSuccess(response.data));

    // specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
  } catch (error) {
    // General scenario
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error })
  }
};

export default api;