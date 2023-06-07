import Breadcrumb from "../Components/Breadcrumb";
import { useState, useEffect } from "react";
import Base from "../Base";
import { razorpayKey, coupon, createOrder } from "../APIs/ecommerce/ecommerce";
import { Link, useNavigate } from "react-router-dom";
import { Payment_API, PaymentSuccess_API } from "../backend";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import DataLoader2 from "../Components/DataLoader2";
import { countries } from "countries-list";
import { profileDataUpdate } from "../APIs/user/user";
import { useSelector, useDispatch } from "react-redux";
import { Store, cartItem } from "../Interfaces/Store";
import { truncate } from "../Utilities/Utils";
import { clearCart } from "../Data/storingData";

declare global {
	interface Window {
		Razorpay: any;
	}
}

export default function Checkout(): JSX.Element {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state: Store) => state.userProfile.id);
	const userProfile = useSelector((state: Store) => state.userProfile);
	const cartItems = useSelector((state: Store) => state.cart[userId]);
	const allCartItemsTotalPrice = useSelector(
		(state: Store) => state.allCartItemsTotalPrice
	);
	const allCartItemsTotalDiscount = useSelector(
		(state: Store) => state.allCartItemsTotalDiscount
	);
	const [newProductsArray, setNewProductsArray] = useState(
		cartItems.map((item: cartItem) => {
			return {
				product: item.guid,
				quantity: item.quantity,
			};
		})
	);
	const [countryCode, setCountryCode] = useState("+91");
	const [paymentKey, setPaymentKey] = useState("");
	const [checkBoxState, setCheckBoxState] = useState(true);
	const [loading, setLoading] = useState(false);
	const [couponApplied, setCouponApplied] = useState(false);
	const [mycoupon, setMyCoupon] = useState("");
	const [shippingAddress, setShippingAddress] = useState({
		first_name: userProfile.first_name,
		last_name: userProfile.last_name,
		address_line_1: userProfile.address_line_1,
		address_line_2: userProfile.address_line_2,
		city: userProfile.city,
		state: userProfile.state,
		pin_code: userProfile.pin_code,
		country: userProfile.country,
		mobile: userProfile.mobile,
		email: userProfile.email,
	});
	const [couponDiscount, setCouponDiscount] = useState(0);
	useEffect(() => {
		const getRazorpayKey = async () => {
			await razorpayKey().then((data: any) => {
				setPaymentKey(data.razorpay_id);
			});
		};
		getRazorpayKey();
	}, []);
	// const handlePaymentSuccess = async (response: any) => {
	// 	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	// 	try {
	// 		await fetch(PaymentSuccess_API, {
	// 			method: "POST",
	// 			body: JSON.stringify(response),
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 				Authorization: "Token " + tokenValue,
	// 			},
	// 		})
	// 			.then((res) => {
	// 				if (res.ok) {
	// 					navigate("/profile/myorders");
	// 					handleCheckout(userId);
	// 					setDataObj({
	// 						products: [],
	// 						coupon_code: "",
	// 						shipping_address: "",
	// 					});
	// 				}
	// 				return res.json();
	// 			})
	// 			.then((data) => {
	// 				return toast.success(data?.message);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
	// function loadScript(src: any) {
	// 	return new Promise((resolve) => {
	// 		const script = document.createElement("script");
	// 		script.src = src;
	// 		script.onload = () => {
	// 			resolve(true);
	// 		};
	// 		script.onerror = () => {
	// 			resolve(false);
	// 		};
	// 		document.body.appendChild(script);
	// 	});
	// }
	// const showRazorpay = async () => {
	// 	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	// 	const res = await loadScript(
	// 		"https://checkout.razorpay.com/v1/checkout.js"
	// 	);
	// 	if (!res) {
	// 		alert("Razorpay SDK failed to load. Are you online?");
	// 		return;
	// 	}
	// 	const data = await fetch(Payment_API, {
	// 		method: "POST",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 			Authorization: "Token " + tokenValue,
	// 		},
	// 		body: JSON.stringify(dataObj),
	// 	})
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			return data;
	// 		});
	// 	if (!data) {
	// 		alert("Server error. Are you online?");
	// 		return;
	// 	}
	// 	var options = {
	// 		key: paymentKey,
	// 		amount: data?.payment?.amount,
	// 		currency: "INR",
	// 		name: "MeeMo Kidz",
	// 		image: "https://www.meemokidz.com/images/Meta_Image.png",
	// 		order_id: data?.payment?.id,
	// 		handler: function (response: any) {
	// 			handlePaymentSuccess(response);
	// 		},
	// 		prefill: {
	// 			name:
	// 				userProfile.first_name && userProfile.last_name
	// 					? userProfile.first_name + " " + userProfile.last_name
	// 					: userProfile.first_name
	// 					? userProfile.first_name
	// 					: userProfile.username,
	// 			email: userProfile.email,
	// 			contact: `+${userProfile.mobile}`,
	// 		},
	// 		notes: {
	// 			address:
	// 				userProfile.address_line_1 +
	// 				", " +
	// 				userProfile.city +
	// 				", " +
	// 				userProfile.state +
	// 				" - " +
	// 				userProfile.pin_code +
	// 				", " +
	// 				userProfile.country,
	// 		},
	// 		theme: {
	// 			color: "#00214d",
	// 		},
	// 	};
	// 	var rzp1 = new window.Razorpay(options);
	// 	rzp1.open();
	// };
	const CouponValidity = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		await coupon({ coupon_code: mycoupon }).then((data) => {
			if (data?.cashback) {
				setLoading(false);
				if (
					(data?.discount / 100) *
						(parseFloat(allCartItemsTotalPrice.toFixed(2)) -
							parseFloat(allCartItemsTotalDiscount.toFixed(2))) >
					data?.cashback
				) {
					setCouponDiscount(data?.cashback);
				} else {
					setCouponDiscount(
						(data?.discount / 100) *
							(parseFloat(allCartItemsTotalPrice.toFixed(2)) -
								parseFloat(
									allCartItemsTotalDiscount.toFixed(2)
								))
					);
				}
				setCouponApplied(true);
				return toast.success(data?.message);
			} else {
				setLoading(false);
				setMyCoupon("");
				setCouponApplied(false);
				return toast.error(data?.message);
			}
		});
	};
	const sendOrder = async (e: any) => {
		setLoading(true);
		e.preventDefault();
		await createOrder({
			products: newProductsArray,
			coupon_code: mycoupon,
			shipping_address:
				shippingAddress.first_name +
				" " +
				shippingAddress.last_name +
				", " +
				shippingAddress.address_line_1 +
				", " +
				shippingAddress.city +
				", " +
				shippingAddress.state +
				", " +
				shippingAddress.pin_code +
				", " +
				shippingAddress.country +
				", " +
				countryCode.charAt(1) +
				countryCode.charAt(2) +
				shippingAddress.mobile +
				", " +
				shippingAddress.email,
			is_cod: true,
		}).then((data) => {
			if (data?.payment?.status === "created") {
				setLoading(false);
				setCouponApplied(false);
				setMyCoupon("");
				setCouponDiscount(0);
				setNewProductsArray([]);
				dispatch(clearCart());
				navigate("/profile/myorders");
				return toast.success("Order Created Successfully!");
			} else {
				setLoading(false);
				return toast.error("Not Able To Create Order!");
			}
		});
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Checkout</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Checkout" />
				<section className="section">
					<div className="container">
						<div className="row mx-3">
							<div className="col-lg-6 bgcolorgreyish border5px p-4 h-100">
								<div className="row mb-4 pb-3">
									<div className="col-lg-12">
										<h2 className="colorblue mb-3 text-center">
											Shipping Details
										</h2>
										<div className="text-center">
											<p className="colorblue pb-3">
												If you want to update your
												billing address click the button
												below.
											</p>
											<Link
												to="/profile/account"
												className="mybtnsame fontsize16 h-100 w-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
											>
												Update Billing Address
											</Link>
											<p className="colorblue pt-4 mt-1 mb-4">
												<input
													className="form-check-input shadow-none border-0"
													type="checkbox"
													checked={checkBoxState}
													onChange={() => {
														setCheckBoxState(
															!checkBoxState
														);
													}}
												/>
												&nbsp;&nbsp;Is your shipping
												address same as billing address?
											</p>
										</div>
									</div>
								</div>
								<form>
									<div className="row">
										<div className="col-lg-6">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													First Name
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="text"
													placeholder="First Name"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															first_name:
																e.target.value,
														});
													}}
													value={
														shippingAddress?.first_name
													}
													required
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													Last Name
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="text"
													placeholder="Last Name"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															last_name:
																e.target.value,
														});
													}}
													value={
														shippingAddress?.last_name
													}
													required
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-12">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													Address
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="text"
													placeholder="Address"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															address_line_1:
																e.target.value,
														});
													}}
													value={
														shippingAddress?.address_line_1 ===
														" "
															? ""
															: shippingAddress?.address_line_1
													}
													required
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-12">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													Pincode
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="number"
													placeholder="Pincode"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															pin_code:
																e.target.value,
														});
													}}
													value={
														shippingAddress?.pin_code
													}
													required
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-12">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													City
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="text"
													placeholder="Town / City"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															city: e.target
																.value,
														});
													}}
													value={
														shippingAddress?.city ===
														" "
															? ""
															: shippingAddress?.city
													}
													required
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-6">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													State
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="text"
													placeholder="State"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															state: e.target
																.value,
														});
													}}
													value={
														shippingAddress?.state ===
														" "
															? ""
															: shippingAddress?.state
													}
													required
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="mb-4 pb-1">
												<h5 className="colorblue text-start mb-3 fontsize16">
													Country
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="text"
													placeholder="Country"
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															country:
																e.target.value,
														});
													}}
													value={
														shippingAddress?.country ===
														" "
															? ""
															: shippingAddress?.country
													}
													required
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-6">
											<div className="mb-4 mb-lg-0">
												<h5 className="colorblue text-start mb-3 fontsize16">
													Mobile Number
												</h5>
												<div className="d-flex">
													<select
														id="countryCodes"
														name="countryCodes"
														value={countryCode}
														onChange={(e) =>
															setCountryCode(
																e.target.value
															)
														}
														className="countryCode"
													>
														{[
															...new Set(
																Object.values(
																	countries
																)
																	.sort(
																		(
																			a: any,
																			b: any
																		) =>
																			a.phone.split(
																				","
																			)[0] -
																			b.phone.split(
																				","
																			)[0]
																	)
																	.map(
																		(
																			item
																		) =>
																			item.phone.split(
																				","
																			)[0]
																	)
															),
														].map((data) => {
															return (
																<option
																	key={data}
																	value={`+${data}`}
																>
																	+{data}
																</option>
															);
														})}
													</select>
													<input
														type="text"
														name="mobile"
														id="mobile"
														value={
															shippingAddress?.mobile ||
															""
														}
														placeholder="Mobile Number"
														onChange={(e) => {
															setShippingAddress({
																...shippingAddress,
																mobile: e.target
																	.value,
															});
														}}
														className="input100 minusML w-100 -ml-3 shadow-none border5px pe-5 border-0 colorblue"
													/>
												</div>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="">
												<h5 className="colorblue text-start mb-3 fontsize16">
													Email
												</h5>
												<input
													className="input100 w-100 border5px ps-3 border-0 colorblue"
													type="email"
													placeholder="Email"
													required
													onChange={(e) => {
														setShippingAddress({
															...shippingAddress,
															email: e.target.value.toLowerCase(),
														});
													}}
													value={shippingAddress?.email.toLowerCase()}
												/>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div className="col-lg-1"></div>
							<div className="col-lg-5">
								<div className="row position-sticky sticky-bar">
									<div className="col-lg-12 bgcolorgreyish border5px p-4 h-100 mt-4 mt-lg-0">
										<h2 className="colorblue mb-3 text-center">
											Your Order Summary
										</h2>
										{cartItems.length > 0 && (
											<>
												<h5 className="colorblue mb-2 text-start">
													Products
												</h5>
												<ul className="list-unstyled colorblue fontsize14">
													{cartItems.map(
														(
															item: cartItem,
															index: any
														) => {
															return (
																<li
																	key={index}
																	className="d-flex justify-content-between"
																	data-bs-toggle="tooltip"
																	data-bs-placement="top"
																	title={
																		item?.Product_Name
																	}
																>
																	<Link
																		to={`/shop/products/${item?.guid}`}
																		className="colorblue lightbluehover"
																	>
																		{truncate(
																			item?.Product_Name,
																			25
																		)}
																	</Link>
																	x&nbsp;
																	{
																		item?.quantity
																	}
																	<span>
																		₹&nbsp;
																		{item?.Product_SellingPrice.toLocaleString(
																			undefined,
																			{
																				maximumFractionDigits: 2,
																			}
																		)}
																	</span>
																</li>
															);
														}
													)}
												</ul>
											</>
										)}
										<div className="d-flex py-3 justify-content-between align-items-center bordertopcheckout">
											<h3 className="mb-0 colorblue">
												Subtotal
											</h3>
											<p className="mb-0 colorblue">
												₹{" "}
												{(
													parseFloat(
														allCartItemsTotalPrice.toFixed(
															2
														)
													) -
													allCartItemsTotalDiscount
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</p>
										</div>
										{couponApplied ? (
											<div className="py-3 bordertopcheckout">
												<h3 className="mb-0 colorblue">
													Discount
												</h3>
												<div className="d-flex justify-content-between align-items-center">
													<p className="mt-1 mb-0 colorblue">
														Coupon Code "{mycoupon}"
														applied!
													</p>
													{couponDiscount > 0 && (
														<button
															className="ms-2 colorblue border-0 border5px bgyellow bglightblue"
															onClick={() => {
																setCouponDiscount(
																	0
																);
																setCouponApplied(
																	false
																);
															}}
															style={{
																width: 25,
																height: 25,
															}}
														>
															<i className="fas fa-times" />
														</button>
													)}
													<p className="mb-0 accepted">
														-&nbsp;&nbsp;&nbsp;₹{" "}
														{couponDiscount.toLocaleString(
															undefined,
															{
																maximumFractionDigits: 2,
															}
														)}
													</p>
												</div>
											</div>
										) : (
											<div className="d-flex py-3 justify-content-between align-items-center bordertopcheckout">
												<h3 className="mb-0 colorblue">
													Discount
												</h3>
												<p className="mb-0 accepted">
													-&nbsp;&nbsp;&nbsp;₹{" "}
													{couponDiscount.toLocaleString(
														undefined,
														{
															maximumFractionDigits: 2,
														}
													)}
												</p>
											</div>
										)}
										<div className="d-flex py-3 justify-content-between align-items-center bordertopcheckout">
											<h3 className="mb-0 colorblue">
												Total
											</h3>
											<p className="mb-0 colorblue">
												₹&nbsp;
												{Math.abs(
													parseFloat(
														allCartItemsTotalPrice.toFixed(
															2
														)
													) -
														allCartItemsTotalDiscount -
														couponDiscount
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</p>
										</div>
										<div className="py-3 bordertopcheckout">
											<div className="row d-flex justify-content-center align-items-center">
												<h4 className="mb-3 text-center colorblue">
													Discount Code
												</h4>
												<form action="#">
													<div className="row">
														<div className="col-lg-9 col-7">
															<input
																className="input100 w-100 border5px ps-3 border-0 colorblue"
																type="text"
																placeholder="Coupon Code"
																value={mycoupon}
																onChange={(
																	e
																) => {
																	setMyCoupon(
																		e.target
																			.value
																	);
																}}
																required
															/>
														</div>
														<div className="col-lg-3 col-5">
															<button
																className="mybtnsame fontsize16 w-100 h-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
																onClick={(
																	e
																) => {
																	CouponValidity(
																		e
																	);
																}}
																disabled={
																	loading
																		? true
																		: false
																}
															>
																{loading ? (
																	<DataLoader2 />
																) : (
																	"Apply"
																)}
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
										<button
											onClick={sendOrder}
											className="mt-2 mybtnsame fontsize16 w-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
										>
											PAY CASH ON DELIVERY
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
}
