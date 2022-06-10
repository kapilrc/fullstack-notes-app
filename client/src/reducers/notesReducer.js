import {
  NOTES_CLEAR_MESSAGE,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_GET_FAIL,
  NOTES_GET_REQUEST,
  NOTES_GET_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS
} from "../constants/notes";

export const notesListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return {
        loading: true,
      };
    case NOTES_LIST_SUCCESS:
      return {
        loading: false,
        notes: action.payload
      };
    case NOTES_LIST_FAIL:
      return {
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
        loading: true,
      };
    case NOTES_CREATE_SUCCESS:
      return {
        loading: false,
        newNote: action.payload
      };
    case NOTES_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case NOTES_CLEAR_MESSAGE:
      return {
        error: null
      }
    default:
      return state;
  }
}

export const notesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case NOTES_UPDATE_SUCCESS:
      return {
        loading: false,
        updatedNote: action.payload
      };
    case NOTES_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case NOTES_CLEAR_MESSAGE:
      return {
        error: null
      }
    default:
      return state;
  }
}


export const notesGetReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_GET_REQUEST:
      return {
        loading: true,
      };
    case NOTES_GET_SUCCESS:
      return {
        loading: false,
        note: action.payload
      };
    case NOTES_GET_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case NOTES_CLEAR_MESSAGE:
      return {
        note: {},
        error: null
      }
    default:
      return state;
  }
}

export const notesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return {
        loading: true,
      };
    case NOTES_DELETE_SUCCESS:
      return {
        loading: false,
        data: action.payload
      };
    case NOTES_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case NOTES_CLEAR_MESSAGE:
      return {
        error: null
      }
    default:
      return state;
  }
}