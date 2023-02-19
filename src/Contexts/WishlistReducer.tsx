const Storage = (wishlistItems) => {
	localStorage.setItem(
		"wishlist",
		JSON.stringify(
			wishlistItems.products.length > 0
				? wishlistItems
				: {
						products: [],
				  }
		)
	);
};
export const setStorage = (allWishlistItems, filteredWishlistItems) => {
	Storage(allWishlistItems);
	let productsCount = 0;
	let totalWishlistItemsCount = 0;
	if (filteredWishlistItems.products.length > 0) productsCount = filteredWishlistItems?.products.length;
	totalWishlistItemsCount = productsCount;
	return { totalWishlistItemsCount, productsCount };
};
export const WishlistReducer = (state, action) => {
	switch (action.type) {
		case "ADD_PRODUCT":
			if (!state.wishlistItems.products.find((item) => item.product.guid === action.payload.product.guid && item.userID === action.payload.userID)) {
				state.wishlistItems.products.push({
					...action.payload,
					userID: action.payload.userID,
				});
			}
			return {
				...state,
				...setStorage(state.wishlistItems, { products: state.wishlistItems.products.filter((item) => item.userID === action.payload.userID) }),
				wishlistItems: { ...state.wishlistItems },
			};
		case "REMOVE_PRODUCT":
			let newProductsArray = state.wishlistItems.products.filter((item) => item.product.guid !== action.payload.guid && item.userID === action.payload.userID);
			state.wishlistItems = {
				...state.wishlistItems,
				products: newProductsArray,
			};
			return {
				...state,
				...setStorage(state.wishlistItems, { products: state.wishlistItems.products.filter((item) => item.userID === action.payload.userID) }),
				wishlistItems: { ...state.wishlistItems },
			};
		case "CLEAR_WISHLIST":
			state.cartItems = { products: state.wishlistItems.products.filter((item) => item.userID !== action.payload) };
			return {
				...state,
				...setStorage(state.wishlistItems, { products: [] }),
				wishlistItems: { ...state.wishlistItems },
			};
		case "UPDATE_WISHLIST_ON_AUTH":
			return {
				...state,
				...setStorage(state.wishlistItems, { products: state.wishlistItems.products.filter((item) => item.userID === action.payload) }),
				wishlistItems: { ...state.wishlistItems },
			};
		default:
			return state;
	}
};
