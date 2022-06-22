import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from '../reducers/userReducer';
import { notesCreateReducer, notesDeleteReducer, notesGetReducer, notesListReducer, notesUpdateReducer } from '../reducers/notesReducer';
import { themeReducer } from '../reducers/themeReducer';

const reducer = combineReducers({
  // reducers go here
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  notesList: notesListReducer,
  noteCreate: notesCreateReducer,
  noteUpdate: notesUpdateReducer,
  noteGet: notesGetReducer,
  noteDelete: notesDeleteReducer,
  theme: themeReducer
});

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const theme = JSON.parse(localStorage.getItem('theme')) || 'Sketchy';

const initialState = {
  userLogin: { userInfo },
  theme
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;