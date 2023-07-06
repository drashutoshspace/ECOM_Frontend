import { toast } from "react-toastify";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Product, Product_Images } from "../Interfaces/Products";

export function AddToCartButtonForCard({
	isAuthenticated,
	animateButton,
	plusMinus,
	setAnimateButton,
	product,
	addProductInCart,
}: {
	isAuthenticated: boolean;
	animateButton: boolean;
	setAnimateButton: (value: boolean) => void;
	plusMinus: number;
	product: Product;
	addProductInCart: ActionCreatorWithPayload<{
		guid: string;
		quantity: number;
		Product_Name: string;
		Product_MRP: number;
		Product_SellingPrice: number;
		Product_Images: Product_Images[];
	}>;
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className={`${
				animateButton
					? "add-to-cart w-100 h-75 fontsize12 d-flex justify-content-center align-items-center mybtnsame position-relative overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
					: "add-to-cart w-100 h-75 fontsize12 d-flex justify-content-center align-items-center mybtnsame position-relative overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
			}`}
			onClick={() => {
				if (isAuthenticated) {
					setAnimateButton(true);
					dispatch(
						addProductInCart({
							guid: product?.guid,
							quantity: plusMinus,
							Product_MRP: product?.Product_MRP,
							Product_Name: product?.Product_Name,
							Product_SellingPrice: product?.Product_SellingPrice,
							Product_Images: product?.Product_Images,
						})
					);
				} else {
					return toast.warning("Please login first!");
				}
			}}
		>
			<span>Add to Cart</span>
			<svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
				<path
					className={`${animateButton ? "pathatc" : ""}`}
					strokeDasharray="19.79 19.79"
					strokeDashoffset="19.79"
					fill="none"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="square"
					strokeMiterlimit={10}
					d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
				/>
			</svg>
		</button>
	);
}

export function ViewCartButtonForCard(): JSX.Element {
	return (
		<Link
			className="add-to-cart w-100 h-75 fontsize12 d-flex justify-content-center align-items-center mybtnsame position-relative overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
			to={"/cart"}
		>
			<span>View Cart</span>
			<svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
				<path
					strokeDasharray="19.79 19.79"
					strokeDashoffset="19.79"
					fill="none"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="square"
					strokeMiterlimit={10}
					d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
				/>
			</svg>
		</Link>
	);
}

export function AddToCartButtonForProfileWishlistCard({
	isAuthenticated,
	animateButton,
	plusMinus,
	setAnimateButton,
	product,
	addProductInCart,
}: {
	isAuthenticated: boolean;
	animateButton: boolean;
	setAnimateButton: (value: boolean) => void;
	plusMinus: number;
	product: Product;
	addProductInCart: ActionCreatorWithPayload<{
		guid: string;
		quantity: number;
		Product_Name: string;
		Product_MRP: number;
		Product_SellingPrice: number;
		Product_Images: Product_Images[];
	}>;
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className={`${
				animateButton
					? "add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
					: "add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
			}`}
			onClick={() => {
				if (isAuthenticated) {
					setAnimateButton(true);
					dispatch(
						addProductInCart({
							guid: product?.guid,
							quantity: plusMinus,
							Product_MRP: product?.Product_MRP,
							Product_Name: product?.Product_Name,
							Product_SellingPrice: product?.Product_SellingPrice,
							Product_Images: product?.Product_Images,
						})
					);
				} else {
					return toast.warning("Please login first!");
				}
			}}
		>
			<span>Add to Cart</span>
			<svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
				<path
					className={`${animateButton ? "pathatc" : ""}`}
					strokeDasharray="19.79 19.79"
					strokeDashoffset="19.79"
					fill="none"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="square"
					strokeMiterlimit={10}
					d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
				/>
			</svg>
		</button>
	);
}

export function ViewCartButtonForProfileWishlistCard(): JSX.Element {
	return (
		<Link
			to={"/cart"}
			className="add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
		>
			<span>View Cart</span>
			<svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
				<path
					strokeDasharray="19.79 19.79"
					strokeDashoffset="19.79"
					fill="none"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="square"
					strokeMiterlimit={10}
					d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
				/>
			</svg>
		</Link>
	);
}

export function AddToCartButtonForProductSingle({
	isAuthenticated,
	animateButton,
	plusMinus,
	setAnimateButton,
	product,
	addProductInCart,
}: {
	isAuthenticated: boolean;
	animateButton: boolean;
	setAnimateButton: (value: boolean) => void;
	plusMinus: number;
	product?: Product;
	addProductInCart: ActionCreatorWithPayload<{
		guid: string;
		quantity: number;
		Product_Name: string;
		Product_MRP: number;
		Product_SellingPrice: number;
		Product_Images: Product_Images[];
	}>;
}): JSX.Element {
	const dispatch = useDispatch();
	return (
		<button
			className={`${
				animateButton
					? "add-to-cart d-flex fontsize16 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
					: "add-to-cart d-flex fontsize16 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
			}`}
			onClick={() => {
				if (isAuthenticated) {
					setAnimateButton(true);
					dispatch(
						addProductInCart({
							guid: product?.guid!,
							quantity: plusMinus,
							Product_MRP: product?.Product_MRP!,
							Product_Name: product?.Product_Name!,
							Product_SellingPrice: product?.Product_SellingPrice!,
							Product_Images: product?.Product_Images!,
						})
					);
				} else {
					return toast.warning("Please login first!");
				}
			}}
		>
			<span>Add to Cart</span>
			<svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
				<path
					className={`${animateButton ? "pathatc" : ""}`}
					strokeDasharray="19.79 19.79"
					strokeDashoffset="19.79"
					fill="none"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="square"
					strokeMiterlimit={10}
					d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
				/>
			</svg>
		</button>
	);
}

export function ViewCartButtonForProductSingle(): JSX.Element {
	return (
		<Link
			to={"/cart"}
			className="add-to-cart d-flex fontsize16 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
		>
			<span>View Cart</span>
			<svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
				<path
					strokeDasharray="19.79 19.79"
					strokeDashoffset="19.79"
					fill="none"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="square"
					strokeMiterlimit={10}
					d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
				/>
			</svg>
		</Link>
	);
}
