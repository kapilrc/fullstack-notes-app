import { NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS } from "../constants/notes";

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