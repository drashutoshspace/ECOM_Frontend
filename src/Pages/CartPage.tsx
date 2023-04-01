import Breadcrumb from "../Components/Breadcrumb";
import { useState, useRef, useEffect } from "react";
import Base from "../Base";
import CartCard from "../Components/CartCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import DataLoader from "../Components/DataLoader";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../Interfaces/Store";
import { clearCart } from "../Data/storingData";

export default function CartPage(): JSX.Element {
	const dispatch = useDispatch();
	const userId = useSelector((state: Store) => state.userProfile.id);
	const cartItems = useSelector((state: Store) => state.cart[userId]);
	const allCartItemsTotalPrice = useSelector(
		(state: Store) => state.allCartItemsTotalPrice
	);
	const allCartItemsTotalDiscount = useSelector(
		(state: Store) => state.allCartItemsTotalDiscount
	);
	const [changeImage, setChangeImage] = useState(false);
	const [loading, setLoading] = useState(true);
	const autoClose1 = useRef<HTMLButtonElement>(null);
	const navigate = useNavigate();
	const [finishStatus1, setfinishStatus1] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	useEffect(() => {
		setLoading(false);
	}, []);
	const confirmModal = () => {
		return confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="react-confirm-alert-body">
						<h1>Clear Cart</h1>
						<p className="colorblue mb-0">
							Do you really want to delete everything from your
							cart?
						</p>
						<div className="react-confirm-alert-button-group">
							<button
								onClick={() => {
									dispatch(clearCart());
									onClose();
								}}
							>
								Yes
							</button>
							<button ref={autoClose1} onClick={onClose}>
								No
							</button>
						</div>
					</div>
				);
			},
			onClickOutside: () => setfinishStatus1(false),
		});
	};
	useEffect(() => {
		const onBackButtonEvent = (e: any) => {
			e.preventDefault();
			if (finishStatus1 && autoClose1.current) {
				autoClose1.current.click();
			}
			navigate(window.location.pathname);
		};
		window.addEventListener("popstate", onBackButtonEvent);
		return () => {
			window.removeEventListener("popstate", onBackButtonEvent);
		};
	}, [finishStatus1]);
	console.log(cartItems);

	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Cart</title>
			</Helmet>
			<Base>
				{loading ? (
					<DataLoader />
				) : (
					<>
						<Breadcrumb title="Cart" />
						<section className="section">
							<div className="container">
								<div className="row">
									<div
										className="col-lg-12 px-3"
										onMouseEnter={handleChangeImage}
										onMouseLeave={handleChangeImage}
									>
										{cartItems?.length === 0 ? (
											<div className="row justify-content-center mx-3">
												<div className="col-lg-6 text-center">
													<img
														src={
															changeImage
																? "images/Add_To_Cart_Yellow.svg"
																: "images/Add_To_Cart_LightBlue.svg"
														}
														className="loginsvg"
														alt="Nothing_In_Cart"
													/>
													<h2 className="mt-5 mb-4 pt-2 text-center colorblue">
														Your cart is empty!
													</h2>
													<Link
														to="/"
														className="mybtnsame bglightblue bgyellow text-uppercase border5px d-inline-block colorblue"
													>
														Browse Products Now
													</Link>
												</div>
											</div>
										) : (
											<div className="row">
												<div className="col-lg-8 order-lg-1 mt-4 mt-lg-0 order-2 px-3">
													<div className="row">
														<div className="col-lg-12">
															{cartItems?.length >
																0 && (
																<div className="row mt-4">
																	<div className="col-md-12 text-center">
																		<h1 className="mb-2 colorblue pb-2 borderbottomcart">
																			Products
																			In
																			Your
																			Cart
																		</h1>
																		{cartItems?.map(
																			(
																				item: any,
																				index: any
																			) => {
																				return (
																					<CartCard
																						key={
																							index
																						}
																						item={
																							item
																						}
																					/>
																				);
																			}
																		)}
																	</div>
																</div>
															)}
															<div className="row mt-4">
																<div className="col-lg-6 mb-4 mb-md-0 text-center">
																	<Link
																		to="/"
																		className="mybtnsame fontsize16 h-100 w-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
																	>
																		Continue
																		Exploring
																	</Link>
																</div>
																<div className="col-lg-6 text-center">
																	<span
																		onClick={() => {
																			setfinishStatus1(
																				true
																			);
																			confirmModal();
																		}}
																		className="mybtnsame transitionease cursorpointer fontsize16 h-100 w-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
																	>
																		Clear
																		Cart
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-4 order-lg-2 order-1 mb-4">
													<div className="card position-sticky shadow sticky-bar border5px border-0">
														<div className="card-body p-3">
															<div className="row mx-2">
																<div className="col-12 p-0">
																	<div className="row my-2 mx-2">
																		<div className="col-12 text-center">
																			<h2 className="colorblue mb-3">
																				Cart
																				Total
																			</h2>
																		</div>
																	</div>
																	<div className="row my-2 py-2 mx-2 borderbottomcart">
																		<div className="col-6 text-start">
																			<p className="fontsize16 mb-0 colorblue">
																				Subtotal
																			</p>
																		</div>
																		<div className="col-6 text-end pr-0">
																			<p className="fontsize16 mb-0">
																				₹{" "}
																				{allCartItemsTotalPrice.toLocaleString(
																					undefined,
																					{
																						maximumFractionDigits: 2,
																					}
																				)}
																			</p>
																		</div>
																	</div>
																	<div className="row my-2 py-2 mx-2 borderbottomcart">
																		<div className="col-6 text-start">
																			<p className="fontsize16 mb-0 colorblue">
																				Discount
																			</p>
																		</div>
																		<div className="col-6 text-end pr-0">
																			<p className="fontsize16 mb-0 notaccepted">
																				₹{" "}
																				{allCartItemsTotalDiscount.toLocaleString(
																					undefined,
																					{
																						maximumFractionDigits: 2,
																					}
																				)}
																			</p>
																		</div>
																	</div>
																	<div className="row my-2 py-2 mx-2 borderbottomcart">
																		<div className="col-6 text-start">
																			<p className="fontsize16 mb-0 colorblue">
																				Total
																			</p>
																		</div>
																		<div className="col-6 text-end pr-0">
																			<p className="fontsize16 mb-0 accepted">
																				₹&nbsp;
																				{Math.abs(
																					parseFloat(
																						allCartItemsTotalPrice.toFixed(
																							2
																						)
																					) -
																						parseFloat(
																							allCartItemsTotalDiscount.toFixed(
																								2
																							)
																						)
																				).toLocaleString(
																					undefined,
																					{
																						maximumFractionDigits: 2,
																					}
																				)}
																			</p>
																		</div>
																	</div>
																	<div className="row pt-4 pb-3 mx-2">
																		<div className="col-12 text-center">
																			<Link
																				to="/checkout"
																				className="mybtnsame fontsize16 h-100 w-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
																			>
																				CHECKOUT
																			</Link>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
