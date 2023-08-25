import {
  SET_CREDENTIALS,
  SET_MODULES,
  SET_VIDEOS,
  SET_QUIZZES,
  SET_DELETE_MODAL,
} from "./userTypes";

export const setUserCredentials = (data) => (dispatch) => {
  dispatch({
    type: SET_CREDENTIALS,
    payload: data,
  });
};

export const setModules = (data) => (dispatch) => {
  dispatch({
    type: SET_MODULES,
    payload: data,
  });
};

export const setVideos = (data) => (dispatch) => {
  dispatch({
    type: SET_VIDEOS,
    payload: data,
  });
};

export const setQuizzes = (data) => (dispatch) => {
  dispatch({
    type: SET_QUIZZES,
    payload: data,
  });
};

export const setDeleteModal = (data) => (dispatch) => {
  dispatch({
    type: SET_DELETE_MODAL,
    payload: data,
  });
};
