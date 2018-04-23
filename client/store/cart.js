import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const currentCart = []; // should be an array of product objects -- KHLG

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
/**
 * THUNK CREATORS
 */
export const myCart = (userId) => dispatch => {
    // can I reuse this route and just have a ternary in the backend that says !req.user then use req.session.cart. Now just need cart store -- KHLG
    return axios.get(`/api/users/${userId}/cart`)
        .then(res => res.data)
        .then( items => dispatch(getCart(items)) )
        .catch(err => console.log(err)) // eventually you want to actually show this to the user. Redirect to a error page, or show a message that is on a setTimeout, or show a message that is in redux store and on unmount we reset error to nothing -- KHLG
}

export const removeCart = (userId) => dispatch => {
    return axios.delete(`/api/users/${userId}/cart`)
        .then( () => {console.log('cart was deleted')} )
        .catch(err => console.log(err))
}

// '/:userId/cart/:orderId/:spaceshipId'
export const removeItem = (userId, orderId, spaceshipId) => dispatch => {
    return axios.delete(`/api/users/${userId}/cart/${orderId}/${spaceshipId}`)
        .then( () => {console.log('item was deleted')} )
        .catch(err => console.log(err))
}

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
