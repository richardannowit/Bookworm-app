import { combineReducers } from 'redux';
import { GET_NUMBER_CART } from '../actions'


const initApp = {
    numberCart: (JSON.parse(localStorage.getItem('cart')) || []).length,
}


function todoCart(state = initApp, action) {
    console.log(action)
    switch (action.type) {
        case GET_NUMBER_CART: {
            let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
            return {
                numberCart: cartFromStorage.length
            }
        }
        default:
            return state;
    }
}

const BookApp = combineReducers({
    _todoCart: todoCart
});
export default BookApp;


