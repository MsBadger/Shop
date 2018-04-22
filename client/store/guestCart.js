
/**
 * ACTION TYPES
 */
const ADD_TO_GUEST_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const guestCart = [];

/**
 * ACTION CREATORS
//  */
const addToGuestCart = itemId => ({ type: ADD_TO_GUEST_CART, itemId })

/**
 * REDUCER
 */
export default function (state = guestCart, action) {
    switch (action.type) {
        case ADD_TO_GUEST_CART:
            return state.guestCart.concat([action.itemId]);
        default:
            return state;
    }
}
