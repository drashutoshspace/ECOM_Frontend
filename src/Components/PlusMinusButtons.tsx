import { toast } from "react-toastify";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export function MinusButtonForCart({
	isAuthenticated,
	guid,
	decreaseQuantityOfProductInCart,
}: {
	isAuthenticated: boolean;
	guid: string;
	decreaseQuantityOfProductInCart: ActionCreatorWithPayload<{
		guid: string;
	}>;
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className="colorblue border-0 border5px bgyellow bglightblue"
			onClick={() => {
				if (isAuthenticated) {
					dispatch(decreaseQuantityOfProductInCart({ guid: guid }));
				} else {
					return toast.warning("Please login first!");
				}
			}}
			style={{ width: 40, height: 40 }}
		>
			<i className="fas fa-minus" />
		</button>
	);
}

export function PlusButtonForCart({
	isAuthenticated,
	guid,
	increaseQuantityOfProductInCart,
}: {
	isAuthenticated: boolean;
	guid: string;
	increaseQuantityOfProductInCart: ActionCreatorWithPayload<{
		guid: string;
	}>;
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className="colorblue border-0 border5px bgyellow bglightblue"
			onClick={() => {
				if (isAuthenticated) {
					dispatch(increaseQuantityOfProductInCart({ guid: guid }));
				} else {
					return toast.warning("Please login first!");
				}
			}}
			style={{ width: 40, height: 40 }}
		>
			<i className="fas fa-plus" />
		</button>
	);
}
