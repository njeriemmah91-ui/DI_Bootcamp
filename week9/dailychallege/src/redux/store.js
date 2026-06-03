import { createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  // Redux devtools-friendly compose not required for this task
  window.__REDUX_DEVTOOLS_EXTENSION__ && undefined
);

export default store;


