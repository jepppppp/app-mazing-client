import {
  SET_CREDENTIALS,
  SET_MODULES,
  SET_VIDEOS,
  SET_QUIZZES,
  SET_DELETE_MODAL,
} from "./userTypes";

const initialState = {
  credentials: null,
  modules: [],
  videos: [],
  quizzes: [],
  deleteModal: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };
    case SET_MODULES:
      return {
        ...state,
        modules: action.payload,
      };
    case SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case SET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
      };
    case SET_DELETE_MODAL:
      return {
        ...state,
        deleteModal: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
