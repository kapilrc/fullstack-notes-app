import { CHANGE_THEME } from "../constants/theme";
import { useSelector } from 'react-redux';

const theme = localStorage.getItem('theme');

export const themeReducer = (state = theme, action) => {

  switch (action.type) {
    case CHANGE_THEME:
      return action.payload

    default:
      return state;
  }
}