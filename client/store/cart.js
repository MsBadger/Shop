import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_CART = 'REMOVE_CART'
// const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const currentCart = [];

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
// const removeCart = () => ({ type: REMOVE_CART })
// const removeItem = itemId => ({ type: REMOVE_ITEM, itemId })

//add spaceship to the cart 
const addToCart = spaceship => {
    return {
        type: ADD_TO_CART,
        spaceship
    }
}
/**
 * THUNK CREATORS
 */
export const myCart = (userId) => dispatch => {
    return axios.get(`/api/users/${userId}/cart`)
        .then(res => res.data)
        .then(items => dispatch(getCart(items)))
        .catch(err => console.log(err))
}

export const removeCart = (userId) => dispatch => {
    return axios.delete(`/api/users/${userId}/cart`)
        .then(() => { console.log('cart was deleted') })
        .catch(err => console.log(err))
}

// '/:userId/cart/:orderId/:spaceshipId'
export const removeItem = (userId, orderId, spaceshipId) => dispatch => {
    return axios.delete(`/api/users/${userId}/cart/${orderId}/${spaceshipId}`)
        .then(() => { console.log('item was deleted') })
        .catch(err => console.log(err))
}

// add item to cart 

// "quantity": 13,
// "spaceshipId": 3,
// "orderId": 1
export const postToCart = (spaceshipId, orderId, ) => {
    return dispatch => {
        return axios.post('/:userId/cart/:orderId/:spaceshipId')
    }
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
