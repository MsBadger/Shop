import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { myCart } from '../store'

export class Cart extends Component {

    componentDidMount() {
        console.log("HOLLO CART 22")
        this.props.loadTheCart(this.props.userId)
    }

    render() {
        console.log("HOLLO CART")
        const { name, photo, cart } = this.props;
        console.log('props', this.props)
        //console.log("STATE", this.state.spaceships)
        return (
            <div>
                <h1>TEST</h1>

                <span> {photo}  </span>
                <span> Welcome, {name}  </span>
                <div>
                    {cart.map((product, ind) => (

                        <span key={ind}>
                            <img src={product.image} />
                            <h1>{product.title}</h1>
                            <h3>Price for item {product.price}</h3>
                            <h3>Quantity {product.quantity}</h3>
                        </span>

                    ))}
                </div>

            </div>
        )
    }
}


/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
    console.log("state what ? ", state)
    return {
        userId: ownProps.match.params.userId,
        email: state.user.email,
        cart: state.spaceships
    }
}


const mapDispatch = (dispatch) => {
    return {
        loadTheCart(id) {
            console.log('fetching the cart')
            console.log('AN ID : ', id);
            dispatch(myCart(id))
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
