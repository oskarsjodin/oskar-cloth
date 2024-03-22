import { createContext,useContext,useEffect,useState} from "react";

//import { useShopReducer } from "../reducers/shop.reducer";
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {
    products,
  };
  return (
    <ProductsContext.Provider value={value} > {children}</ProductsContext.Provider>
  );
}
