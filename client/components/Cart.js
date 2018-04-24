import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { myCart, removeCart, removeItem, postToCart } from '../store'


export class Cart extends Component {

    constructor() {
        super();
        this.handleCartDelete = this.handleCartDelete.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    componentDidMount() {
        this.props.loadTheCart(this.props.userId)
    }

    handleCartDelete() {
        this.props.removeCart(this.props.userId);
        this.props.loadTheCart(this.props.userId);
    }

    handleItemDelete(event) {
        let userId = this.props.userId;
        let orderId = event.target.name.split('-')[0]
        let spaceshipId = event.target.name.split('-')[1]

        this.props.removeItem(userId, orderId, spaceshipId);
        this.props.loadTheCart(this.props.userId);
    }


    render() {
        const { name, photo, cart , email, isLoggedIn} = this.props;

        //create dropdown for quantities
        let inventoryOb = {}

        if (cart.length && cart[0].spaceships) {  
                cart[0].spaceships.map((spaceship) => {
                var arrOfNum = []; 
                for(var i=1; i <= spaceship.inventory; i++) {

        
                    arrOfNum.push(i)
                }
                inventoryOb[spaceship.id] = arrOfNum;
            })
        }

        return (
            <div>

                <div className="cart-header" >
                    <span >
                        <img src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/57.png" className="avatar"/>
                        {name ?  <span> Welcome, {name}  </span> : <span> Welcome!  </span> } 
                    </span>
                    <span className="buttons-rows">
                        { !isLoggedIn ? <Link to="/signup" > <button className="remove-cart-btn-guest" > ✅ SINGUP & SAVE CART </button> <br/></Link> : null}
                        <button className="remove-cart-btn-guest" onClick={this.handleCartDelete} >🔆 CLEAN CART</button> <br/>
                    </span>
                </div>
                <div className="cart-page">
                <br/>
                <hr/>


                { cart.length &&  cart[0].spaceships
                    ? (cart[0].spaceships.map((spaceship) => (
                        <span key={spaceship.id} className="cart-container" >
                            <span  className="home-item cart-item">
                                <img src={spaceship.image} />
                            </span>
                            <span  className="home-item cart-item">
                                <h1>{spaceship.title}</h1>
                                <h5 className="white" className="item-details">Capacity {spaceship.capacity}</h5>
                                <h5 className="white" >Price per item {spaceship.priceInMills}</h5>

                                <select name="quantitySelection"> {
                                    inventoryOb[spaceship.id]
                                    ? inventoryOb[spaceship.id].map(quantity => {
                                    return (
                                        <option key={quantity} value={quantity}>{quantity}</option>
                                    )
                                })
                                    : <option value="0"> Out Of Stock </option>
                                }
                                </select>

                                <button className="remove-btn" name={ cart[0].id +'-'+ spaceship.id } onClick={this.handleItemDelete}>❌ REMOVE ITEM</button>
                                </span> 
                                <span></span>
                                <span className="item-devider" ><hr  /></span>

                                </span>
                                <span className="home-item cart-item">
                                    <h1>{spaceship.title}</h1>
                                    <h5 className="white" className="item-details">Capacity {spaceship.capacity}</h5>
                                    <h5 className="white" >Price per item {spaceship.priceInMills}</h5>

                                    <select name="quantitySelection"> {
                                        inventoryOb[spaceship.id]
                                            ? inventoryOb[spaceship.id].map(quantity => {
                                                return (
                                                    <option key={quantity} value={quantity}>{quantity}</option>
                                                )
                                            })
                                            : <option value="0"> Out Of Stock </option>
                                    }
                                    </select>

                                    <button className="remove-btn" name={cart[0].id + '-' + spaceship.id} onClick={this.handleItemDelete}>❌ REMOVE ITEM</button>
                                </span>
                                <span></span>
                                <span className="item-devider" ><hr /></span>
                            </span>
                        )))

                        : <h3>Your cart is empty</h3>
                    }
                </div>

            </div>
        )
    }
}


/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
    return {
        isLoggedIn: !!state.user.id,
        photo: state.user.photo,
        name: state.user.name,
        userId: ownProps.match.params.userId,
        email: state.user.email,
        cart: state.cart
    }
}


const mapDispatch = (dispatch) => {
    return {
        loadTheCart(id) {
            dispatch(myCart(id))
        },
        removeCart(id) {
            dispatch(removeCart(id))
        },
        removeItem(userId, orderId, spaceshipId) {
            dispatch(removeItem(userId, orderId, spaceshipId))
        }

    }
}



export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
// //  */
// UserHome.propTypes = {
//     email: PropTypes.string
// }
