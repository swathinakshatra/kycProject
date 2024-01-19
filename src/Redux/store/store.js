import allReducers from "../reducer/index";

import thunk from "redux-thunk";

import { createStore, applyMiddleware, compose } from "redux";

const myreducers = allReducers();
let enhancers = compose(applyMiddleware(thunk));
let store = createStore(myreducers, enhancers);
export default store;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
