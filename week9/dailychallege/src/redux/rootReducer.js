import dailyReducer from "./reducers";

export default function rootReducer(state, action) {
  return {
    daily: dailyReducer(state?.daily, action),
  };
}

