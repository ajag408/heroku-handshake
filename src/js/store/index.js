import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { addStudentMiddleware } from "../middleware/index";

// const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      rootReducer,
      storeEnhancers(applyMiddleware(addStudentMiddleware))
    );
    
    

    export default store;