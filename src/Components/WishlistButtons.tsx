import { toast } from "react-toastify";
import { isProductInWishlist } from "../Utilities/Utils";
import { useDispatch } from "react-redux";
import {
	addProductInWishlist,
	removeProductFromWishlist,
} from "../Data/storingData";

export function WishlistButtonForCart({
	guid,
	wishlistItems,
}: {
	guid: string;
	wishlistItems: string[];
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className="hvr-icon-pulse border-0 mywish border5px heartredhover"
			onClick={() => {
				isProductInWishlist(wishlistItems, guid)
					? dispatch(
							removeProductFromWishlist({
								guid: guid,
							})
					  )
					: dispatch(
							addProductInWishlist({
								guid: guid,
							})
					  );
			}}
		>
			<i
				className={`${
					isProductInWishlist(wishlistItems, guid)
						? "fas fa-heart heartred hvr-icon"
						: "far fa-heart"
				}`}
			/>
		</button>
	);
}

export function WishlistButtonForProductSingle({
	guid,
	wishlistItems,
}: {
	guid: string;
	wishlistItems: string[];
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button className="d-flex hvr-icon-pulse border-0 justify-content-center align-items-center mywishlistsin heartredhover">
			<div
				className={`${
					isProductInWishlist(wishlistItems, guid)
						? "fas fa-2x fa-heart heartred hvr-icon"
						: "far fa-2x fa-heart"
				}`}
				onClick={() => {
					isProductInWishlist(wishlistItems, guid)
						? dispatch(
								removeProductFromWishlist({
									guid: guid,
								})
						  )
						: dispatch(
								addProductInWishlist({
									guid: guid,
								})
						  );
				}}
			/>
		</button>
	);
}

export function WishlistButtonForCard({
	isAuthenticated,
	guid,
	wishlistItems,
}: {
	isAuthenticated: boolean;
	guid: string;
	wishlistItems: string[];
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button className="d-flex hvr-icon-pulse border-0 justify-content-center align-items-center mywishlist heartredhover">
			<div
				className={`${
					isProductInWishlist(wishlistItems, guid)
						? "fas fa-heart heartred hvr-icon"
						: "far fa-heart"
				}`}
				onClick={() => {
					if (isAuthenticated) {
						isProductInWishlist(wishlistItems, guid)
							? dispatch(
									removeProductFromWishlist({
										guid: guid,
									})
							  )
							: dispatch(
									addProductInWishlist({
										guid: guid,
									})
							  );
					} else {
						return toast.warning("Please login first!");
					}
				}}
			/>
		</button>
	);
}

export function WishlistButtonForProfileWishlistCard({
	guid,
	wishlistItems,
}: {
	guid: string;
	wishlistItems: string[];
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className="hvr-icon-pulse ms-3 border-0 mywish fontsize16 border5px heartredhover"
			style={{ verticalAlign: "baseline" }}
			onClick={() => {
				if (isProductInWishlist(wishlistItems, guid)) {
					dispatch(
						removeProductFromWishlist({
							guid: guid,
						})
					);
				}
			}}
		>
			<i className="fas fa-heart heartred hvr-icon" />
		</button>
	);
}
