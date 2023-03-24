import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product_Category } from "../Interfaces/Products";
import { cartItem, Store } from "../Interfaces/Store";
import { User } from "../Interfaces/User";

const initialProfileData: User = {
	id: -1,
	username: "",
	first_name: "",
	last_name: "",
	email: "",
	is_active: true,
	image: "",
	account_type: "",
	mobile: "",
	dob: "",
	gender: "",
	address_line_1: "",
	address_line_2: "",
	city: "",
	pin_code: "",
	state: "",
	country: "",
};

const initial: Store = {
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
	allProductCategories: [],
	userProfile: initialProfileData,
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
			state.cart[state.userProfile.id].push(action.payload);
		},
		removeProductFromCart(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.cart[state.userProfile.id].splice(
				state.cart[state.userProfile.id].findIndex(
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
			let indexOfProduct = state.cart[state.userProfile.id].findIndex(
				(item: cartItem) => item.guid === action.payload.guid
			);
			state.cart[state.userProfile.id][indexOfProduct].quantity += 1;
		},
		decreaseQuantityOfProductInCart(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			let indexOfProduct = state.cart[state.userProfile.id].findIndex(
				(item: cartItem) => item.guid === action.payload.guid
			);
			if (
				state.cart[state.userProfile.id][indexOfProduct].quantity === 1
			) {
				state.cart[state.userProfile.id].splice(
					state.cart[state.userProfile.id].findIndex(
						(item: cartItem) => item.guid === action.payload.guid
					),
					1
				);
			} else {
				state.cart[state.userProfile.id][indexOfProduct].quantity -= 1;
			}
		},
		clearCart(state) {
			state.cart[state.userProfile.id] = [];
		},
		addProductInWishlist(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.wishlist[state.userProfile.id].push(action.payload.guid);
		},
		removeProductFromWishlist(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.wishlist[state.userProfile.id].splice(
				state.wishlist[state.userProfile.id].findIndex(
					(item: string) => item === action.payload.guid
				),
				1
			);
		},
		clearWishlist(state) {
			state.wishlist[state.userProfile.id] = [];
		},
		calculateAllCartItemsCount(state) {
			if (state.cart[state.userProfile.id].length > 0) {
				state.allCartItemsCount = state.cart[
					state.userProfile.id
				].reduce(
					(total: number, item: cartItem) => total + item.quantity,
					0
				);
			}
		},
		calculateAllWishlistItemsCount(state) {
			state.allWishlistItemsCount =
				state.wishlist[state.userProfile.id].length;
		},
		calculateTotalAmountAndDiscount(state) {
			if (state.cart[state.userProfile.id].length > 0) {
				state.allCartItemsTotalPrice = state.cart[
					state.userProfile.id
				].reduce(
					(total: number, item: cartItem) =>
						total + item.Product_MRP * item.quantity,
					0
				);
				state.allCartItemsTotalDiscount = state.cart[
					state.userProfile.id
				].reduce(
					(total: number, item: cartItem) =>
						total +
						(item.Product_MRP - item.Product_SellingPrice) *
							item.quantity,
					0
				);
			}
		},
		setAllProductCategories(
			state,
			action: PayloadAction<Product_Category[]>
		) {
			state.allProductCategories = action.payload;
		},
		loginFromRedux(
			state,
			action: PayloadAction<{
				token: string;
				profileData: User;
			}>
		) {
			state.token[action.payload.profileData.id] = action.payload.token;
			state.userProfile = action.payload.profileData;
		},
		logoutFromRedux(state) {
			state.userProfile = initialProfileData;
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
	setAllProductCategories,
	loginFromRedux,
	logoutFromRedux,
} = dataSlice.actions;

export default dataSlice.reducer;
