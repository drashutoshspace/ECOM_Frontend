export interface tokenObject {
	[key: string]: string;
}

export interface cartItem {
	guid: string;
	quantity: number;
	Product_Name: string;
	Product_MRP: number;
	Product_SellingPrice: number;
}

export interface cartObject {
	[key: string]: cartItem[];
}

export interface wishlistObject {
	[key: string]: string[];
}

export interface Store {
	userId: string;
	token: tokenObject;
	cart: cartObject;
	wishlist: wishlistObject;
	allCartItemsCount: number;
	allCartItemsTotalPrice: number;
	allCartItemsTotalDiscount: number;
	allWishlistItemsCount: number;
}
