import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart(props) {
    const { name, photo } = props
    console.log('props', props)
    return (
        <div>
            <span> Welcome, {photo}  </span>
            <span> Welcome, {name}  </span>
            <ul>
                {store.cart.map(product => (

                    <li key={product.id}> {product.image} </li>
                    <li key={product.id}> {product.image} </li>
                    <li key={product.id}> Quantity {product.quantity} </li>

                ))}
            </ul>
        </div>
    )
}