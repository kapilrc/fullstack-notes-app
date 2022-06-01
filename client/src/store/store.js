import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';

const reducer = combineReducers({
  // reducers go here
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  userLogin: { userInfo },
  userRegister: {}
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;