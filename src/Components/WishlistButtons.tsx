import { toast } from "react-toastify";
import { isProductInWishlist } from "../Utilities/Utils";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export function WishlistButtonForCart({
	isAuthenticated,
	guid,
	wishlistItems,
	addProductInWishlist,
	removeProductFromWishlist,
}: {
	isAuthenticated: boolean;
	guid: string;
	wishlistItems: string[];
	addProductInWishlist: ActionCreatorWithPayload<{
		guid: string;
	}>;
	removeProductFromWishlist: ActionCreatorWithPayload<{
		guid: string;
	}>;
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className="hvr-icon-pulse border-0 mywish border5px heartredhover"
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

export function WishlistButtonForCard({
	isAuthenticated,
	guid,
	wishlistItems,
	addProductInWishlist,
	removeProductFromWishlist,
}: {
	isAuthenticated: boolean;
	guid: string;
	wishlistItems: string[];
	addProductInWishlist: ActionCreatorWithPayload<{
		guid: string;
	}>;
	removeProductFromWishlist: ActionCreatorWithPayload<{
		guid: string;
	}>;
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
