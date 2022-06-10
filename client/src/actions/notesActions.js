import Api from "../api";
import {
  NOTES_CLEAR_MESSAGE,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_REQUEST,
  NOTES_GET_REQUEST,
  NOTES_GET_SUCCESS,
  NOTES_GET_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_DELETE_FAIL
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

export const updateNote = ({ _id, title, content, category }) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await Api.put(`/notes/${_id}`, { title, content, category }, config);

    dispatch({
      type: NOTES_UPDATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NOTES_UPDATE_FAIL,
      payload: error?.response?.data?.message || error?.message
    })
  }
}

export const getANote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_GET_REQUEST });


    const { userLogin: { userInfo }, notesList: { notes } } = getState();

    let currentNote = notes.find(note => note._id === id);

    if (!currentNote) {

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await Api.get(`/notes/${id}`, config);
      currentNote = data;
    }

    dispatch({
      type: NOTES_GET_SUCCESS,
      payload: currentNote
    })

  } catch (error) {
    dispatch({
      type: NOTES_GET_FAIL,
      payload: error?.response?.data?.message || error?.message
    })
  }
}

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await Api.delete(`/notes/${id}`, config);

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload: error?.response?.data?.message || error?.message
    })
  }
}

export const clearMessage = () => (dispatch) => {
  dispatch({ type: NOTES_CLEAR_MESSAGE });
}
