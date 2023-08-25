import { combineReducers } from "redux";
import playMenuReducer from "./playMenu/playMenuReducers";
import userReducer from "./user/userReducers";

const rootReducer = combineReducers({
  playMenu: playMenuReducer,
  user: userReducer,
});

export default rootReducer;
