import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';
const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  return (
    <Fragment>
      <div className="navigation">

      <Link className="logo" to="/">--</Link>
      <div className="links-container">
        <Link className="nav-link" to="/shop">Shop</Link>
        <Link className="nav-link" to="/contact">Contact</Link>

        {currentUser ? (
          <span className="nav-link" onClick={signOutUser}>Sign Out</span>
        ) : <Link className="nav-link" to="/authentication">Sign In</Link>}

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
