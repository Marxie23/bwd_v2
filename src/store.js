import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import {thunk} from 'redux-thunk'
import rootReducer from './reducers'

// const middleware = [thunk]

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// )
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)  // Without DevTools for testing
  );
  

export default store