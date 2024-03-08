import { createContext,useContext,useEffect,useState} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [], addItem: () => {}, removeItem: () => {} });

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
/*
  const [cartItems, setCartItems] = useState([]);
  const addItem = (item) => {
    setCartItems([...cartItems, item]);
  };
  const removeItem = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };
  const value = { cartItems, addItem, removeItem };
  */
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
