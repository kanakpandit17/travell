import {legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

// const store = configureStore({reducer: rootReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
console.log(store.getState(),"Hey babe")

export default store

