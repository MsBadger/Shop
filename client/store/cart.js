import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const currentCart = [];

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })

/**
 * THUNK CREATORS
 */
export const myCart = () =>
    dispatch =>
        axios.get('/api/users/:userId/cart')
            .then(res => dispatch(getCart(res.data)))
            .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = currentCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        default:
            return state;
    }
}
