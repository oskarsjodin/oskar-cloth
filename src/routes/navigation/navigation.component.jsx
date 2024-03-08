import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { ReactComponent as Logo } from '../../assets/images/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import './navigation.styles.scss';
const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <div className="navigation">

      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">Shop</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        {currentUser ? (
          <span className="nav-link" onClick={signOutUser}>Sign Out</span>
        ) : <Link className="nav-link" to="/authentication">Sign In</Link>}
        <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}

      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
