/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './UserHome';
export { default as ProductPage } from './ProductPage';
export { default as ProductsList } from './ProductsList';
export { default as Home } from './Home';
export { default as AddSpaceship } from './AddSpaceship';
export { default as UpdateSpaceship } from './UpdateSpaceship';
export { Login, Signup } from './auth-form';
export { default as Cart } from './Cart';
export { default as GuestCart } from './GuestCart';
export { default as CheckoutForms } from './CheckoutForms';
export { default as Checkout } from './Checkout';

export { BillingAddress, ShippingAddress } from './AddressForm';
