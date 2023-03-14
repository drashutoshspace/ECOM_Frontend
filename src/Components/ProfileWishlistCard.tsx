import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import tempImg from "../Assets/Product_3.webp";
import { BaseContext } from "../Context";
import { toast } from "react-toastify";
import { isAuthenticated } from "../APIs/user/user";
import { Product } from "../Interfaces/Products";
import {
	addProductInCart,
	increaseQuantityOfProductInCart,
	decreaseQuantityOfProductInCart,
	addProductInWishlist,
	removeProductFromWishlist,
} from "../Data/storingData";
import { useSelector, useDispatch } from "react-redux";
import { cartItem, Store } from "../Interfaces/Store";

export default function ProfileWishlistCard({
	item,
}: {
	item: Product;
}): JSX.Element {
	const dispatch = useDispatch();
	const [addStatus, setAddStatus] = useState("");
	const [plusMinus, setPlusMinus] = useState(1);
	const [animateButton, setAnimateButton] = useState(false);
	const wishlistItems = useSelector(
		(state: Store) => state.wishlist[cookies?.user?.[0]?.id]
	);
	const cartItems = useSelector(
		(state: Store) => state.cart[cookies?.user?.[0]?.id]
	);
	const { cookies }: any = useContext(BaseContext);
	const isProductInWishlist = (guid: string) => {
		return wishlistItems.find((item: string) => item === guid);
	};
	const isProductInCart = (id: string, userID: string) => {
		return !!!cartItems.find((item: cartItem) => item.guid === id);
	};
	const handlePlus = () => {
		setPlusMinus(plusMinus + 1);
	};
	const handleMinus = () => {
		if (plusMinus > 1) setPlusMinus(plusMinus - 1);
	};
	useEffect(() => {
		const timer = setTimeout(() => setAnimateButton(false), 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [animateButton]);
	useEffect(() => {
		if (addStatus === "add" && (async () => await isAuthenticated())) {
			dispatch(
				increaseQuantityOfProductInCart({
					guid: item?.guid,
				})
			);
			setAddStatus("");
		}
	}, [addStatus]);
	return (
		<div className="row px-2 py-3">
			<div className="col-4">
				<Link to={`/shop/products/${item?.guid}`}>
					<img
						className="border5px shadow w-100 h-auto"
						src={item?.Product_Images?.[0]?.dbImage || tempImg}
						alt="Product_Image"
					/>
				</Link>
			</div>
			<div className="col-8 text-start">
				<div className="row">
					<div className="col-lg-12">
						<Link
							className="colorblue fw-bold fontsize20 lightbluehover"
							to={`/shop/products/${item?.guid}`}
						>
							{item?.Product_Name}
						</Link>
					</div>
				</div>
				{item?.Product_Name && (
					<>
						<div className="row mt-3">
							<div className="col-lg-12">
								<button
									className="colorblue border-0 border5px bgyellow bglightblue"
									onClick={handleMinus}
									style={{ width: 40, height: 40 }}
								>
									<i className="fas fa-minus" />
								</button>
								<input
									className="bgcolorgreyish text-center colorblue border-0 border5px mx-2"
									type="number"
									value={plusMinus}
									onChange={(e: any) => {
										setPlusMinus(e.target.value);
									}}
									style={{ width: 50, height: 40 }}
								/>
								<button
									className="colorblue border-0 border5px bgyellow bglightblue"
									onClick={handlePlus}
									style={{ width: 40, height: 40 }}
								>
									<i className="fas fa-plus" />
								</button>
								<div className="col mt-3 me-3 d-flex align-items-center">
									{isProductInCart(
										item?.guid,
										cookies?.user?.[0]?.id
									) ? (
										<button
											className={`${
												animateButton
													? "add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
													: "add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
											}`}
											onClick={() => {
												if (
													async () =>
														await isAuthenticated()
												) {
													setAnimateButton(true);
													dispatch(
														addProductInCart({
															guid: item?.guid,
															quantity: plusMinus,
															Product_MRP:
																item?.Product_MRP,
															Product_Name:
																item?.Product_Name,
															Product_SellingPrice:
																item?.Product_SellingPrice,
														})
													);
												} else {
													return toast.warning(
														"Please login to access Cart!"
													);
												}
											}}
										>
											<span>Add to Cart</span>
											<svg
												x="0px"
												y="0px"
												width="32px"
												height="32px"
												viewBox="0 0 32 32"
											>
												<path
													className={`${
														animateButton
															? "pathatc"
															: ""
													}`}
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
									) : (
										<button
											className={`${
												animateButton
													? "add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
													: "add-to-cart d-flex justify-content-center align-items-center mybtnsame position-relative h-75 w-50 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
											}`}
											onClick={() => {
												if (
													async () =>
														await isAuthenticated()
												) {
													setAnimateButton(true);
													setAddStatus("add");
												} else {
													return toast.warning(
														"Please login first!"
													);
												}
											}}
										>
											<span>Add More</span>
											<svg
												x="0px"
												y="0px"
												width="32px"
												height="32px"
												viewBox="0 0 32 32"
											>
												<path
													className={`${
														animateButton
															? "pathatc"
															: ""
													}`}
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
									)}
								</div>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-lg-12">
								<p className="colorblue mypara mb-0 fontsize20">
									₹ {item?.Product_SellingPrice}
								</p>
							</div>
						</div>
					</>
				)}
				<div className="row mt-3">
					<div className="col-lg-12">
						<button
							className="hvr-icon-pulse ms-3 border-0 mywish fontsize16 border5px heartredhover"
							style={{ verticalAlign: "baseline" }}
							onClick={() => {
								isProductInWishlist(item?.guid)
									? dispatch(
											removeProductFromWishlist({
												guid: item?.guid,
											})
									  )
									: dispatch(
											addProductInWishlist({
												guid: item?.guid,
											})
									  );
							}}
						>
							<i
								className={`${
									isProductInWishlist(item?.guid)
										? "fas fa-heart heartred hvr-icon"
										: "far fa-heart"
								}`}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
