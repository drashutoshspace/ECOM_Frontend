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
	for (let i = 0; i < number; i++) {
		if (component === "testimonials") {
			stars.push(
				<i key={i} className="fas hvr-icon me-1 coloryellow fa-star" />
			);
		} else if (component === "showStars1") {
			stars.push(
				<li
					key={i}
					className="list-inline-item fontsize18 hvr-icon-grow me-1"
				>
					<i className="fas fa-star hvr-icon" />
				</li>
			);
		} else if (component === "showStarsForRating") {
			stars.push(
				<i key={i} className="fas fontsize18 fa-star coloryellow" />
			);
		} else if (component === "showStarsForRatingForm" && indexValue) {
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
	} else if (component === "showStars1") {
		return (
			<ul className="list-unstyled text-center text-lg-start coloryellow mb-3">
				{stars}
			</ul>
		);
	} else if (
		component === "showStarsForRating" ||
		component === "showStarsForRatingForm"
	) {
		return stars;
	}
};
