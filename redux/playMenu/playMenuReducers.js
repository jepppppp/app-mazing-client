import {
  SET_GRADE_CATEGORY,
  SET_PREASSESTMENT_SCORE,
  SET_ASSESTMENT_SCORE,
  SET_ISDONE,
} from "./playMenuTypes";

const initialState = {
  grade_category: null,
  preassestment_score: 0,
  isDone: false,
  assestment_score: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRADE_CATEGORY:
      return {
        ...state,
        grade_category: action.payload,
      };
    case SET_PREASSESTMENT_SCORE:
      return {
        ...state,
        preassestment_score: action.payload,
      };
    case SET_ISDONE:
      return {
        ...state,
        isDone: action.payload,
      };
    case SET_ASSESTMENT_SCORE:
      return {
        ...state,
        assestment_score: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
