import { combineReducers} from "redux";
import reducer from './listReducer';
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    main: reducer
  })
  
  export default rootReducer;

 
  
  // export default configureStore({
  //   reducer: {
  //     main: postsReducer
  //   }
  // })
  
// import { loadFromLocalStorage, saveToLocalStorage } from './localStorage'
// const store = createStore(  rootReducer,  loadFromLocalStorage(),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// store.subscribe(() => saveToLocalStorage(store.getState()));