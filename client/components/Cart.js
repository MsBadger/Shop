import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


export const Cart = (props) => {

    const { name, photo } = props
    console.log('props', props)
    return (
        <div>
            <span> {photo}  </span>
            <span> Welcome, {name}  </span>
            <div>
                {store.cart.map((product, ind) => (

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


/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        email: state.user.email,
        cart: state.spaceships
    }
}

export default connect(mapState)(Cart)

/**
 * PROP TYPES
//  */
// UserHome.propTypes = {
//     email: PropTypes.string
// }
