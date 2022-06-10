import {
  NOTES_CLEAR_ERROR,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS
} from "../constants/notes";

export const notesListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload
      };
    case NOTES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const notesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTES_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case NOTES_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case NOTES_CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}