import { cartItem } from "../Interfaces/Store";

export const isProductInWishlist = (wishlistItems: string[], guid: string) => {
	return wishlistItems.find((item: string) => item === guid);
};

export const isProductInCart = (cartItems: cartItem[], guid: string) => {
	return cartItems.find((item: cartItem) => item.guid === guid);
};
