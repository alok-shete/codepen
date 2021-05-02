import { combineReducers } from "redux";

const htmlReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATEHTML":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const cssReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATECSS":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const jsReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATEJS":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  html: htmlReducer,
  css: cssReducer,
  js: jsReducer,
});

export default allReducers;
