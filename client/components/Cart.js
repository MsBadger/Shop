import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart(props) {
    return (
        <div>
            <span> HI </span>
            <ul>
                {store.cart.map(cart => (

                    <li key={cart.id}> {cart.name} </li>

                ))}
            </ul>
        </div>
    )
}