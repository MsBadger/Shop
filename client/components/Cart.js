import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { myCart, removeCart , removeItem } from '../store'

export class Cart extends Component {

    constructor () {
        super() ;
        this.handleCartDelete = this.handleCartDelete.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    componentDidMount() {
        this.props.loadTheCart(this.props.userId)
    }

    handleCartDelete () {
        this.props.removeCart(this.props.userId);
        this.props.loadTheCart(this.props.userId);
    }

    handleItemDelete (e) {
        console.log('TARGET' , e.target)
        let args = e.target.name.split('-'); // [spshpId, orId]
        this.props.removeItem(args[0], args[1]);
        this.props.loadTheCart(this.props.userId);
    }


    render() {
        const { name, photo, cart } = this.props;


        let inventoryOb = {}
        if (cart.length) {  
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
                <img src={photo} />
                <span> Welcome, {name}  </span>
                <div className='cart-page'>
                <button className='remove-btn' onClick={this.handleCartDelete} >❌ REMOVE CART</button> <br/>

                <br/>
                
                { cart.length ?

                    (cart[0].spaceships.map((spaceship) => (
                        <span key={spaceship.id} className='home-item'>
                            <img src={spaceship.image} />
                            <h1>{spaceship.title}</h1>
                            <h5>Capacity {spaceship.capacity}</h5>
                            <h3>Price per item {spaceship.priceInMills}</h3>

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

                            <button className='remove-btn' name={spaceship.id +'-'+ cart[0].id} onClick={this.handleItemDelete}>❌ REMOVE ITEM</button>
                            <hr/>
                        </span>)))

                    : null
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
        removeCart (id)  {
            dispatch(removeCart(id))
        },
        removeItem (spaceshipId, orderId) {
            dispatch(removeItem(spaceshipId, orderId))
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
