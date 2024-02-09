import { Outlet,Link } from "react-router-dom";
import { Fragment } from "react";
//import CrownLogo from "../../assets/images/crown.svg";
import './navigation.styles.scss';
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">

      <Link className="logo" to="/">--</Link>
      <div className="links-container">
        <Link className="nav-link" to="/shop">Shop</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/signin">Sign In</Link>
      </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
