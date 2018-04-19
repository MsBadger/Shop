import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart(props) {
    const { name, photo } = props
    console.log('props', props)
    return (
        <div>
            <span> {photo}  </span>
            <span> Welcome, {name}  </span>
            <div>
                {store.cart.map(product => (

                    <span key={product.id}>
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