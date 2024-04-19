import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';
import './checkout.styles.scss'

const Checkout = () => {
  const {cartItems} = useContext(CartContext);
  return (
    <div className='checkout-container'>
      <h1>Checkout</h1>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return(
          <CheckoutItem cartItem={cartItem} />
        )
      })}
      <span className='total'>Total: {cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)}</span>
    </div>
  );
}

export default Checkout;
