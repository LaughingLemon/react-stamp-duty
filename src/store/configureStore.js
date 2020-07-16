import {createStore} from "redux";
import totalTaxReducer from "../reducers/tax";

export default () => {
    return createStore(totalTaxReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};
