import React, { createContext, useReducer } from "react";
import { WishlistReducer, setStorage } from "./WishlistReducer";
export const WishlistContext = createContext();
const storage = localStorage.getItem("wishlist")
	? JSON.parse(localStorage.getItem("wishlist"))
	: {
			products: [],
	  };
const initialState = { wishlistItems: storage, ...setStorage(storage, { products: [] }) };
const WishlistProvider = ({ children }) => {
	const [state, dispatch] = useReducer(WishlistReducer, initialState);
	const addProductToWishlist = (payload) => {
		dispatch({ type: "ADD_PRODUCT", payload });
	};
	const removeProductFromWishlist = (payload) => {
		dispatch({ type: "REMOVE_PRODUCT", payload });
	};
	const clearWishlist = (payload) => {
		dispatch({ type: "CLEAR_WISHLIST", payload });
	};
	const updateWishlistOnAuth = (payload) => {
		dispatch({ type: "UPDATE_WISHLIST_ON_AUTH", payload });
	};
	const contextValues = {
		removeProductFromWishlist,
		addProductToWishlist,
		clearWishlist,
		updateWishlistOnAuth,
		...state,
	};
	return <WishlistContext.Provider value={contextValues}>{children}</WishlistContext.Provider>;
};
export default WishlistProvider;
