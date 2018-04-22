
/**
 * ACTION TYPES
 */
const ADD_TO_GUEST_CART = 'GET_CART';
const REMOVE_GUEST_ITEM = 'REMOVE_GUEST_ITEM';
const DELETE_GUEST_CART = 'DELETE_GUEST_CART';
/**
 * INITIAL STATE
 */
const guestCartDefaul = [1,2,3];

/**
 * ACTION CREATORS
//  */
export const addToGuestCart = itemId => ({ type: ADD_TO_GUEST_CART, itemId });
export const guestCartDelete = () => ({ type: DELETE_GUEST_CART });
export const guestItemDelete = itemId => ({ type: REMOVE_GUEST_ITEM, itemId});

/**
 * REDUCER
 */
export default function (state = guestCartDefaul, action) {
    switch (action.type) {
        case ADD_TO_GUEST_CART:
            return state.guestCart.concat([action.itemId]);
        case  DELETE_GUEST_CART:
            return [];
        case  REMOVE_GUEST_ITEM:
        console.log('inside of reducer', state.guestCart)
        var newstate = state.filter(id => id !== Number(action.itemId))   
        console.log('newstate', newstate)
            return newstate
        default:
            return state;
    }
}
