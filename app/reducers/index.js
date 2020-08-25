import { combineReducers } from "redux";
import auth from './auth';
import log from './log';
import nav from './nav';
import inventory from './inventory';
import order from './order';
import receipt from './receipt';
import filter from './filter';
// ------------------------------------------------------------------
export default combineReducers({
    auth,
    log,
    nav,
    inventory,
    order,
    receipt,
    filter
})