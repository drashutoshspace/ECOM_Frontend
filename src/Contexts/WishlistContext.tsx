import { createContext, useReducer } from "react";
import { WishlistReducer, setStorage } from "./WishlistReducer";
const storage = localStorage.getItem("wishlist")
	? JSON.parse(localStorage.getItem("wishlist")!)
	: {
			products: [],
	  };
const initialState = {
	wishlistItems: storage,
	...setStorage(storage, { products: [] }),
};
export const WishlistContext = createContext(initialState);

const WishlistProvider = ({ children }: { children: any }) => {
	const [state, dispatch] = useReducer(WishlistReducer, initialState);
	const addProductToWishlist = (payload: any) => {
		dispatch({ type: "ADD_PRODUCT", payload });
	};
	const removeProductFromWishlist = (payload: any) => {
		dispatch({ type: "REMOVE_PRODUCT", payload });
	};
	const clearWishlist = (payload: any) => {
		dispatch({ type: "CLEAR_WISHLIST", payload });
	};
	const updateWishlistOnAuth = (payload: any) => {
		dispatch({ type: "UPDATE_WISHLIST_ON_AUTH", payload });
	};
	const contextValues = {
		removeProductFromWishlist,
		addProductToWishlist,
		clearWishlist,
		updateWishlistOnAuth,
		...state,
	};
	return (
		<WishlistContext.Provider value={contextValues}>
			{children}
		</WishlistContext.Provider>
	);
};
export default WishlistProvider;
