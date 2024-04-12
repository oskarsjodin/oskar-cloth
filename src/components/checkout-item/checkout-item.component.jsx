import './checkout-item.styles.scss';
import React from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';


 const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
    const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
    return (
      <div className='checkout-item-container'>
        <div className='image-container'>
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
          <span onClick={() => removeItemFromCart(cartItem)}>&#10094;</span>
          <span>{quantity}</span>
          <span onClick={() => addItemToCart(cartItem)}>&#10095;</span>
        </span>
        <span className='price'>{price}</span>
        <span className='remove-button' onClick={() => clearItemFromCart(cartItem)}>
          &#10005;
        </span>
      </div>
    );
  }

export default CheckoutItem;
