import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItem, Store } from "../Interfaces/Store";

const initial: Store = {
	userId: "",
	token: {
		"": "",
	},
	cart: {
		"": [],
	},
	wishlist: {
		"": [],
	},
	allCartItemsCount: 0,
	allCartItemsTotalPrice: 0,
	allCartItemsTotalDiscount: 0,
	allWishlistItemsCount: 0,
};

const dataSlice = createSlice({
	name: "data",
	initialState: initial,
	reducers: {
		addProductInCart(
			state,
			action: PayloadAction<{
				guid: string;
				quantity: number;
				Product_Name: string;
				Product_MRP: number;
				Product_SellingPrice: number;
			}>
		) {
			state.cart[state.userId].push(action.payload);
		},
		removeProductFromCart(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.cart[state.userId].splice(
				state.cart[state.userId].findIndex(
					(item: cartItem) => item.guid === action.payload.guid
				),
				1
			);
		},
		increaseQuantityOfProductInCart(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			let indexOfProduct = state.cart[state.userId].findIndex(
				(item: cartItem) => item.guid === action.payload.guid
			);
			state.cart[state.userId][indexOfProduct].quantity += 1;
		},
		decreaseQuantityOfProductInCart(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			let indexOfProduct = state.cart[state.userId].findIndex(
				(item: cartItem) => item.guid === action.payload.guid
			);
			if (state.cart[state.userId][indexOfProduct].quantity === 1) {
				state.cart[state.userId].splice(
					state.cart[state.userId].findIndex(
						(item: cartItem) => item.guid === action.payload.guid
					),
					1
				);
			} else {
				state.cart[state.userId][indexOfProduct].quantity -= 1;
			}
		},
		clearCart(state) {
			state.cart[state.userId] = [];
		},
		addProductInWishlist(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.wishlist[state.userId].push(action.payload.guid);
		},
		removeProductFromWishlist(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.wishlist[state.userId].splice(
				state.wishlist[state.userId].findIndex(
					(item: string) => item === action.payload.guid
				),
				1
			);
		},
		clearWishlist(state) {
			state.wishlist[state.userId] = [];
		},
		calculateAllCartItemsCount(state, action) {
			if (state.cart[state.userId].length > 0) {
				state.allCartItemsCount = state.cart[state.userId].reduce(
					(total: number, item: cartItem) => total + item.quantity,
					0
				);
			}
		},
		calculateAllWishlistItemsCount(state, action) {
			state.allWishlistItemsCount = state.wishlist[state.userId].length;
		},
		calculateTotalAmountAndDiscount(state, action) {
			if (state.cart[state.userId].length > 0) {
				state.allCartItemsTotalPrice = state.cart[state.userId].reduce(
					(total: number, item: cartItem) =>
						total + item.Product_MRP * item.quantity,
					0
				);
				state.allCartItemsTotalDiscount = state.cart[
					state.userId
				].reduce(
					(total: number, item: cartItem) =>
						total +
						(item.Product_MRP - item.Product_SellingPrice) *
							item.quantity,
					0
				);
			}
		},
	},
});

export const {
	addProductInCart,
	removeProductFromCart,
	increaseQuantityOfProductInCart,
	decreaseQuantityOfProductInCart,
	clearCart,
	addProductInWishlist,
	removeProductFromWishlist,
	clearWishlist,
	calculateAllCartItemsCount,
	calculateTotalAmountAndDiscount,
} = dataSlice.actions;

export default dataSlice.reducer;
