import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <span>Your cart is empty</span>

      </div>
      <Button>Go to checkout</Button>
      </div>
  );
}

export default CartDropdown;
