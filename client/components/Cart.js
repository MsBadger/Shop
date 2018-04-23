import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { myCart, removeCart , removeItem } from '../store'

export class Cart extends Component {

    // constructor () {
    //     super() ;
    //     // this.handleCartDelete = this.handleCartDelete.bind(this);
    //     this.handleItemDelete = this.handleItemDelete.bind(this);
    // }

    componentDidMount() {
        this.props.loadTheCart(this.props.userId)
    }

    handleCartDelete = () => { // can do this because babel is using env -- KHLG
        this.props.removeCart(this.props.userId);
        this.props.loadTheCart(this.props.userId);
        // this.props.history.push('/')
    }

    handleItemDelete = (cartId, spaceshipId, event) => {
        let userId = this.props.userId; // use const -- KHLG
        let orderId = event.target.name.split('-')[0]
        let spaceshipId = event.target.name.split('-')[1]

        this.props.removeItem(userId, orderId, spaceshipId);
        this.props.loadTheCart(this.props.userId);
    }


    render() {
        const { name, photo, cart , email} = this.props;

        //create dropdown for quantities
        let inventoryOb = {}
        if (cart.length) {  
                cart[0].spaceships.map((spaceship) => {
                var arrOfNum = []; // const -- KHLG
                for(var i=1; i <= spaceship.inventory; i++) { // let -- KHLG
                    arrOfNum.push(i)
                }
                inventoryOb[spaceship.id] = arrOfNum;
            })
        }

        return (
            <div>
                <img src={photo} className="avatar"/>
                <span> Welcome {name ? `, ${name}` : email && `, ${email}`} </span>
                {name ?  <span> Welcome, {name}  </span> : email ? <span> Welcome, {email}  </span> : <span> Welcome </span>}
                <button className="remove-cart-btn" onClick={this.handleCartDelete} >🔆 CLEAN CART</button> <br/>
                <div className="cart-page">
                <br/>
                <hr/>
            {/* cart should always be an array of productObjects so cart.map()*/}
                { cart.length && cart[0].spaceships.length 
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

                                <button className="remove-btn" name={ cart[0].id +'-'+ spaceship.id } onClick={this.handleItemDelete.bind(this, cart[0].id, spaceship.id)}>❌ REMOVE ITEM</button>
                                </span> 
                                <span></span>
                                <span className="item-devider" ><hr  /></span>
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
        removeItem (userId, orderId, spaceshipId) {
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
