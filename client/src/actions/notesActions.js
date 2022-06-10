import Api from "../api";
import {
  NOTES_CLEAR_ERROR,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS
} from "../constants/notes";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await Api.get("/notes", config);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: error?.response?.data?.message || error?.message
    })
  }

}

export const createNote = ({ title, content, category }) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await Api.post("/notes/create", { title, content, category }, config);

    dispatch({
      type: NOTES_CREATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NOTES_CREATE_FAIL,
      payload: error?.response?.data?.message || error?.message
    })
  }

}

export const clearError = () => (dispatch) => {
  dispatch({ type: NOTES_CLEAR_ERROR });
}
