import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';
import { notesCreateReducer, notesDeleteReducer, notesGetReducer, notesListReducer, notesUpdateReducer } from '../reducers/notesReducer';

const reducer = combineReducers({
  // reducers go here
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  notesList: notesListReducer,
  noteCreate: notesCreateReducer,
  noteUpdate: notesUpdateReducer,
  noteGet: notesGetReducer,
  noteDelete: notesDeleteReducer
});

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  userLogin: { userInfo }
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;