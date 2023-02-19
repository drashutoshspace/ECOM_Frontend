const Storage = (cartItems: any) => {
	localStorage.setItem(
		"cart",
		JSON.stringify(
			cartItems.products.length > 0
				? cartItems
				: {
						products: [],
				  }
		)
	);
};
export const sumItems = (allCartItems: any, filteredCartItems: any) => {
	Storage(allCartItems);
	let allItemsCount = 0;
	let allItemsTotalPrice = 0;
	let allItemsTotalDiscount = 0;
	let productsCount = 0;
	let totalProductsPrice = 0;
	let totalProductsDiscount = 0;
	if (filteredCartItems.products.length > 0) {
		productsCount = filteredCartItems?.products.reduce(
			(total: any, item: any) => total + item.quantity,
			0
		);
		totalProductsPrice = filteredCartItems?.products.reduce(
			(total: any, item: any) =>
				total + item.product.Product_MRP * item.quantity,
			0
		);
		totalProductsDiscount = filteredCartItems?.products.reduce(
			(total: any, item: any) =>
				total +
				(item.product.Product_MRP - item.product.Product_SellingPrice) *
					item.quantity,
			0
		);
	}
	allItemsCount = productsCount;
	allItemsTotalPrice = totalProductsPrice;
	allItemsTotalDiscount = totalProductsDiscount;
	return { allItemsCount, allItemsTotalPrice, allItemsTotalDiscount };
};
export const CartReducer = (state: any, action: any) => {
	switch (action.type) {
		case "ADD_PRODUCT":
			if (
				!state.cartItems.products.find(
					(item: any) =>
						item.product.guid === action.payload.product.guid &&
						item.userID === action.payload.userID
				)
			) {
				state.cartItems.products.push({
					...action.payload,
					quantity: action.payload.quantity,
					userID: action.payload.userID,
				});
			}
			return {
				...state,
				...sumItems(state.cartItems, {
					products: state.cartItems.products.filter(
						(item: any) => item.userID === action.payload.userID
					),
				}),
				cartItems: { ...state.cartItems },
			};
		case "REMOVE_PRODUCT":
			let newProductsArray = state.cartItems.products.filter(
				(item: any) => item.product.guid !== action.payload
			);
			state.cartItems = {
				...state.cartItems,
				products: newProductsArray,
			};
			return {
				...state,
				...sumItems(state.cartItems, state.cartItems),
				cartItems: { ...state.cartItems },
			};
		case "INCREASE":
			state.cartItems.products[
				state.cartItems.products.findIndex(
					(item: any) =>
						item.product.guid === action.payload.product.guid &&
						item.userID === action.payload.userID
				)
			].quantity += action.payload.quantity;
			return {
				...state,
				...sumItems(state.cartItems, {
					products: state.cartItems.products.filter(
						(item: any) => item.userID === action.payload.userID
					),
				}),
				cartItems: { ...state.cartItems },
			};
		case "DECREASE":
			if (
				state.cartItems.products[
					state.cartItems.products.findIndex(
						(item: any) =>
							item.product.guid === action.payload.product.guid &&
							item.userID === action.payload.userID
					)
				].quantity >= action.payload.quantity
			) {
				state.cartItems.products[
					state.cartItems.products.findIndex(
						(item: any) =>
							item.product.guid === action.payload.product.guid &&
							item.userID === action.payload.userID
					)
				].quantity -= action.payload.quantity;
			}
			return {
				...state,
				...sumItems(state.cartItems, {
					products: state.cartItems.products.filter(
						(item: any) => item.userID === action.payload.userID
					),
				}),
				cartItems: { ...state.cartItems },
			};
		case "CLEAR":
			state.cartItems = {
				products: state.cartItems.products.filter(
					(item: any) => item.userID !== action.payload
				),
			};
			return {
				...state,
				...sumItems(state.cartItems, { products: [] }),
				cartItems: { ...state.cartItems },
			};
		case "UPDATE_CART_ON_AUTH":
			return {
				...state,
				...sumItems(state.cartItems, {
					products: state.cartItems.products.filter(
						(item: any) => item.userID === action.payload
					),
				}),
				cartItems: { ...state.cartItems },
			};
		default:
			return state;
	}
};
