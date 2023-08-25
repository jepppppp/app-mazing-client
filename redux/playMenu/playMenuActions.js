import {
  SET_ASSESTMENT_SCORE,
  SET_GRADE_CATEGORY,
  SET_ISDONE,
  SET_PREASSESTMENT_SCORE,
} from "./playMenuTypes";

export const setGradeCategory = (data) => (dispatch) => {
  dispatch({
    type: SET_GRADE_CATEGORY,
    payload: data,
  });
};
export const setPreAssestmentScore = (data) => (dispatch) => {
  dispatch({
    type: SET_PREASSESTMENT_SCORE,
    payload: data,
  });
};
export const setAssestmentScore = (data) => (dispatch) => {
  dispatch({
    type: SET_ASSESTMENT_SCORE,
    payload: data,
  });
};
export const setIsDone = (data) => (dispatch) => {
  dispatch({
    type: SET_ISDONE,
    payload: data,
  });
};
