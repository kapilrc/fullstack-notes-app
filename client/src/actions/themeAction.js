
import { CHANGE_THEME } from '../constants/theme';

export const changeTheme = (theme) => (dispatch, getState) => {

  dispatch({ type: CHANGE_THEME, payload: theme });

  localStorage.setItem("theme", JSON.stringify(theme));
  location.reload();
}