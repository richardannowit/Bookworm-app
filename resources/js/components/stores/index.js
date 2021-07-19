import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import BookApp from '../reducers/index'


const store = createStore(BookApp, applyMiddleware(thunkMiddleware));
export default store;
