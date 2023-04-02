import { cartItem } from "../Interfaces/Store";

export const isProductInWishlist = (wishlistItems: string[], guid: string) => {
	return wishlistItems?.find((item: string) => item === guid);
};

export const isProductInCart = (cartItems: cartItem[], guid: string) => {
	return cartItems?.find((item: cartItem) => item.guid === guid);
};

export const truncate = (str: string, n: number) => {
	return str?.length > n ? str.substring(0, n - 1) + "..." : str;
};

export const insertStars = (
	number: number,
	component: string,
	indexValue?: number,
	target?: number
) => {
	let stars: JSX.Element[] = [];
	for (
		let i = component === "showStarsForRatingForm" ? 0 : 1;
		component === "showStarsForRatingForm" ? i < number : i <= 5;
		i++
	) {
		if (component === "testimonials") {
			stars.push(
				<i
					key={i}
					className={`fa${
						i <= number ? "s" : "r"
					} hvr-icon me-1 coloryellow fa-star`}
				/>
			);
		} else if (component === "showStars1") {
			stars.push(
				<li
					key={i}
					className="list-inline-item fontsize16 hvr-icon-grow me-1"
				>
					<i className={`fa${i <= number ? "s" : "r"} fa-star`} />
				</li>
			);
		} else if (component === "showStarsForRating") {
			stars.push(
				<i
					key={i}
					className={`fa${
						i <= number ? "s" : "r"
					} fontsize16 fa-star coloryellow`}
				/>
			);
		} else if (component === "showStarsForRatingForm") {
			stars.push(
				<i
					className={`${
						indexValue === target
							? "fas fa-star coloryellow hvr-icon"
							: "far fa-star"
					}`}
				/>
			);
		}
	}
	if (component === "testimonials") {
		return <li className="list-inline-item">{stars}</li>;
	} else {
		return stars;
	}
};

export const calculateCartValues = (cart: cartItem[]) => {
	let allCartItemsCount: number = 0;
	let allCartItemsTotalPrice: number = 0;
	let allCartItemsTotalDiscount: number = 0;
	if (cart.length > 0) {
		allCartItemsCount = cart.reduce(
			(total: number, item: cartItem) => total + item.quantity,
			0
		);
		allCartItemsTotalPrice = cart.reduce(
			(total: number, item: cartItem) =>
				total + item.Product_MRP * item.quantity,
			0
		);
		allCartItemsTotalDiscount = cart.reduce(
			(total: number, item: cartItem) =>
				total +
				(item.Product_MRP - item.Product_SellingPrice) * item.quantity,
			0
		);
	}
	return {
		allCartItemsCount,
		allCartItemsTotalPrice,
		allCartItemsTotalDiscount,
	};
};
