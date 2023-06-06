import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product_Category, Product_Images } from "../Interfaces/Products";
import { cartItem, Store } from "../Interfaces/Store";
import { User } from "../Interfaces/User";
import { calculateCartValues } from "../Utilities/Utils";

const initialProfileData: User = {
	id: -1,
	username: "",
	first_name: "",
	last_name: "",
	email: "",
	is_active: true,
	is_social: false,
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
				Product_Images: Product_Images[];
			}>
		) {
			state.cart[state.userProfile.id].push(action.payload);
			const {
				allCartItemsCount,
				allCartItemsTotalPrice,
				allCartItemsTotalDiscount,
			} = calculateCartValues(state.cart[state.userProfile.id]);
			state.allCartItemsCount = allCartItemsCount;
			state.allCartItemsTotalPrice = allCartItemsTotalPrice;
			state.allCartItemsTotalDiscount = allCartItemsTotalDiscount;
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
			const {
				allCartItemsCount,
				allCartItemsTotalPrice,
				allCartItemsTotalDiscount,
			} = calculateCartValues(state.cart[state.userProfile.id]);
			state.allCartItemsCount = allCartItemsCount;
			state.allCartItemsTotalPrice = allCartItemsTotalPrice;
			state.allCartItemsTotalDiscount = allCartItemsTotalDiscount;
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
			const {
				allCartItemsCount,
				allCartItemsTotalPrice,
				allCartItemsTotalDiscount,
			} = calculateCartValues(state.cart[state.userProfile.id]);
			state.allCartItemsCount = allCartItemsCount;
			state.allCartItemsTotalPrice = allCartItemsTotalPrice;
			state.allCartItemsTotalDiscount = allCartItemsTotalDiscount;
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
			const {
				allCartItemsCount,
				allCartItemsTotalPrice,
				allCartItemsTotalDiscount,
			} = calculateCartValues(state.cart[state.userProfile.id]);
			state.allCartItemsCount = allCartItemsCount;
			state.allCartItemsTotalPrice = allCartItemsTotalPrice;
			state.allCartItemsTotalDiscount = allCartItemsTotalDiscount;
		},
		clearCart(state) {
			state.cart[state.userProfile.id] = [];
			const {
				allCartItemsCount,
				allCartItemsTotalPrice,
				allCartItemsTotalDiscount,
			} = calculateCartValues(state.cart[state.userProfile.id]);
			state.allCartItemsCount = allCartItemsCount;
			state.allCartItemsTotalPrice = allCartItemsTotalPrice;
			state.allCartItemsTotalDiscount = allCartItemsTotalDiscount;
		},
		addProductInWishlist(
			state,
			action: PayloadAction<{
				guid: string;
			}>
		) {
			state.wishlist[state.userProfile.id].push(action.payload.guid);
			state.allWishlistItemsCount =
				state.wishlist[state.userProfile.id].length;
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
			state.allWishlistItemsCount =
				state.wishlist[state.userProfile.id].length;
		},
		clearWishlist(state) {
			state.wishlist[state.userProfile.id] = [];
			state.allWishlistItemsCount =
				state.wishlist[state.userProfile.id].length;
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
			if (
				!(
					Array.isArray(state.cart[action.payload.profileData.id]) &&
					Array.isArray(state.wishlist[action.payload.profileData.id])
				)
			) {
				state.cart[action.payload.profileData.id] = [];
				state.wishlist[action.payload.profileData.id] = [];
			}
			state.token[action.payload.profileData.id] = action.payload.token;
			state.userProfile = action.payload.profileData;
		},
		logoutFromRedux(state) {
			state.userProfile = initialProfileData;
		},
		updateProfile(
			state,
			action: PayloadAction<{
				profileData: User;
			}>
		) {
			state.userProfile = action.payload.profileData;
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
	setAllProductCategories,
	loginFromRedux,
	logoutFromRedux,
	updateProfile,
} = dataSlice.actions;

export default dataSlice.reducer;
