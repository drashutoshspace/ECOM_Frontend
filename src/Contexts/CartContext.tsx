import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./CartReducer";
export const CartContext = createContext();
const storage = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: {
			products: [],
	  };
const initialState = { cartItems: storage, ...sumItems(storage, { products: [] }) };
const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, initialState);
	const increase = (payload) => {
		dispatch({ type: "INCREASE", payload });
	};
	const decrease = (payload) => {
		dispatch({ type: "DECREASE", payload });
	};
	const addProduct = (payload) => {
		dispatch({ type: "ADD_PRODUCT", payload });
	};
	const removeProduct = (payload) => {
		dispatch({ type: "REMOVE_PRODUCT", payload });
	};
	const handleCheckout = (payload) => {
		dispatch({ type: "CLEAR", payload });
	};
	const updateCartOnAuth = (payload) => {
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
	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};
export default CartProvider;
