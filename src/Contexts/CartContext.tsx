import { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./CartReducer";
const storage = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart")!)
	: {
			products: [],
	  };

const initialState = {
	cartItems: storage,
	...sumItems(storage, { products: [] }),
};
export const CartContext = createContext(initialState);
const CartProvider = ({ children }: { children: any }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);
	const increase = (payload: any) => {
		dispatch({ type: "INCREASE", payload });
	};
	const decrease = (payload: any) => {
		dispatch({ type: "DECREASE", payload });
	};
	const addProduct = (payload: any) => {
		dispatch({ type: "ADD_PRODUCT", payload });
	};
	const removeProduct = (payload: any) => {
		dispatch({ type: "REMOVE_PRODUCT", payload });
	};
	const handleCheckout = (payload: any) => {
		dispatch({ type: "CLEAR", payload });
	};
	const updateCartOnAuth = (payload: any) => {
		dispatch({ type: "UPDATE_CART_ON_AUTH", payload });
	};
	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		handleCheckout,
		updateCartOnAuth,
		...state,
	};
	return (
		<CartContext.Provider value={contextValues}>
			{children}
		</CartContext.Provider>
	);
};
export default CartProvider;
