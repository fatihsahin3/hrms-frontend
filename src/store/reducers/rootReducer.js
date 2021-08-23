import { combineReducers } from "redux";
import applicationsReducer from "./applicationsReducer";

const rootReducer = combineReducers({
  applications: applicationsReducer,
});

export default rootReducer;
