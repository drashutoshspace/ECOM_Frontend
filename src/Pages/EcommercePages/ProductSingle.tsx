import { useEffect, useState, useContext } from "react";
import Base from "../../Base";
import ReactImageMagnify from "react-image-magnify";
import "hover.css";
import { Helmet } from "react-helmet-async";
import { singleProduct } from "../../data/products/products";
import { BaseContext, ProductsContext } from "../../Context";
import { CartContext } from "../../Contexts/CartContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import {
	updateReview,
	deleteReview,
	reviewratingForm,
} from "../../helpers/others/reviewratingForm";
import { singleReview, reviews } from "../../data/others/reviews";
import tempImg from "../../Assets/images/Product_3.webp";
import tempImg1 from "../../Assets/images/User_Image.webp";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../helpers/auth/authentication";
import DataLoader from "../../Components/DataLoaders/DataLoader";
import DataLoader2 from "../../Components/DataLoaders/DataLoader2";
const ProductSingle = () => {
	const { id } = useParams();
	const { findProduct, product }: any = useContext(ProductsContext);
	const { cookies }: any = useContext(BaseContext);
	const [plusMinus, setPlusMinus] = useState(1);
	const [loading, setLoading] = useState(true);
	const [wishlistToggle, setWishlistToggle] = useState(false);
	const [animateButton, setAnimateButton] = useState(false);
	const [toggleButton, setToggleButton] = useState(false);
	const changeWishlist = () => {
		setWishlistToggle(!wishlistToggle);
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
	const { addProduct, cartItems, increase }: any = useContext(CartContext);
	const isInCart = (id: any, userID: any) => {
		return !!!cartItems.products.find(
			(item: any) => item.product.guid === id && item.userID === userID
		);
	};
	var stars: any = [];
	var showStars1 = (number: any) => {
		for (var i = 0; i < number; i++) {
			stars.push(
				<li
					key={i}
					className="list-inline-item fontsize18 hvr-icon-grow me-1"
				>
					<i className="fas fa-star hvr-icon" />
				</li>
			);
		}
		return (
			<ul className="list-unstyled text-center text-lg-start coloryellow mb-3">
				{stars}
			</ul>
		);
	};
	/* -------------------------------------------------------------------------- */
	/*                           ANCHOR stars for rating                          */
	/* -------------------------------------------------------------------------- */
	var showStarsForRating = (number: any) => {
		var starsForRating = [];
		for (var i = 0; i < number; i++) {
			starsForRating.push(
				<i key={i} className="fas fontsize18 fa-star coloryellow" />
			);
		}
		return starsForRating;
	};
	const [target, setTarget] = useState(-1);
	var showStarsForRatingForm = (number: any, indexValue: any) => {
		var starsForRatingForm = [];
		for (var i = 0; i < number; i++) {
			starsForRatingForm.push(
				<i
					className={`${
						indexValue === target
							? "fas fa-star coloryellow hvr-icon"
							: "far fa-star"
					}`}
				/>
			);
		}
		return starsForRatingForm;
	};
	const [ProductImage1, setProductImage1] = useState(0);
	const location = useLocation();
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);
	const [product_id, setProduct_id] = useState("");
	const [allReviews, setAllReviews] = useState([]);
	const [dataLoading, setDataLoading] = useState(false);
	const navigate = useNavigate();
	/* --------------------------- ANCHOR review code --------------------------- */
	const reviewrating = async (e: any) => {
		e.preventDefault();
		setDataLoading(true);
		if (localStorage.getItem("token")) {
			if (target === -1) {
				setDataLoading(false);
				return toast(
					"Please recheck whether you have filled the form correctly or not!",
					{
						type: "error",
					}
				);
			}
			await reviewratingForm(product.guid, review, rating).then(
				(data) => {
					if (data.user) {
						setToggleButton(!toggleButton);
						setDataLoading(false);
						return toast("Review Posted!", {
							type: "success",
						});
					} else {
						setDataLoading(false);
						return toast("Something went wrong!", {
							type: "error",
						});
					}
				}
			);
			setReview("");
			setRating(0);
			setTarget(-1);
		} else {
			navigate("/auth");
		}
	};
	const [isReviewed, setIsReviewed] = useState(false);
	const [reviewID, setReviewID] = useState(null);
	const revs = async (item: any) => {
		await reviews((data: any) => {
			if (data.find((review: any) => review.product_id === item?.guid)) {
				setAllReviews(
					data.filter(
						(review: any) => review.product_id === item?.guid
					)
				);
				if (
					data
						.filter(
							(review: any) => review.product_id === item?.guid
						)
						.find(
							(item: any) =>
								item?.user?.id === cookies?.user?.[0]?.id
						)
				) {
					setIsReviewed(true);
					singleReview(
						data
							.filter(
								(review: any) =>
									review.product_id === item?.guid
							)
							.find(
								(item: any) =>
									item?.user?.id === cookies?.user?.[0]?.id
							).id,
						(data: any) => {
							setReview(data?.review);
							setRating(data?.rating);
							setTarget(data?.rating - 1);
							showStarsForRatingForm(
								data?.rating,
								data?.rating - 1
							);
							setReviewID(data?.id);
							setProduct_id(data?.product_id);
						}
					);
				} else setIsReviewed(false);
			}
		});
	};
	const reviewDelete = async (e: any, id: any) => {
		e.preventDefault();
		await deleteReview(id);
		setAllReviews(allReviews.filter((item: any) => item.id !== id));
		setIsReviewed(false);
		setRating(0);
		setTarget(-1);
		setReview("");
		setProduct_id("");
		return toast("Review Deleted Successfully!", { type: "success" });
	};
	const reviewUpdate = async (e: any, rev: any) => {
		e.preventDefault();
		await updateReview(rev, {
			product_id,
			review,
			rating,
		});
		revs(product);
		return toast("Review Updated Successfully!", { type: "success" });
	};
	useEffect(() => {
		singleProduct(id, (data: any) => {
			findProduct(data);
			revs(data);
			setLoading(false);
		});
	}, []);
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			!loading && revs(product);
		}
		return () => {
			mounted = false;
		};
	}, [toggleButton]);
	const [changeImage1, setChangeImage1] = useState(false);
	const handleChangeImage1 = () => {
		setChangeImage1(!changeImage1);
	};
	return (
		<>
			<Helmet title={`MeeMo Kidz | ${product?.Product_Name}`}></Helmet>
			<Base>
				{loading ? (
					<DataLoader />
				) : (
					<section className="section">
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="mb-3 card border-0 shadow">
										<ReactImageMagnify
											{...{
												enlargedImagePosition: "over",
												imageClassName: "border5px",
												enlargedImageContainerClassName:
													"border5px",
												pressDuration: 250,
												smallImage: {
													isFluidWidth: true,
													src: `${product.Product_Images?.[ProductImage1]?.dbImage}`,
												},
												largeImage: {
													src: `${product.Product_Images?.[ProductImage1]?.dbImage}`,
													width: 1200,
													height: 1800,
												},
											}}
										/>
										<span
											className="d-flex justify-content-center align-items-center"
											id="mydiscountpersin"
										>
											{Math.abs(
												parseInt(
													product?.Product_Discount
												) -
													parseFloat(
														product?.Product_Discount
													)
											) > 0.5
												? parseInt(
														product?.Product_Discount
												  ) + 1
												: parseInt(
														product?.Product_Discount
												  )}
											%
										</span>
										<button className="d-flex hvr-icon-pulse border-0 justify-content-center align-items-center mywishlistsin heartredhover">
											<div
												className={`${
													wishlistToggle
														? "fas fa-2x fa-heart heartred hvr-icon"
														: "far fa-2x fa-heart"
												}`}
												onClick={changeWishlist}
											/>
										</button>
									</div>
									<div className="row">
										{product.Product_Images?.slice(
											0,
											3
										).map((product: any, index: any) => {
											return (
												<>
													{product ===
													product.Product_Images?.slice(
														-1
													)[0] ? (
														<div
															key={index}
															className="col-3"
														>
															<img
																className="border5px h-100 w-100 shadow cursorpointer"
																onClick={() =>
																	setProductImage1(
																		index
																	)
																}
																src={`${
																	product?.dbImage ||
																	tempImg
																}`}
																alt=""
															/>
														</div>
													) : (
														<div
															key={index}
															className="col-3 pe-0"
														>
															<img
																className="border5px h-100 w-100 shadow cursorpointer"
																onClick={() =>
																	setProductImage1(
																		index
																	)
																}
																src={`${
																	product?.dbImage ||
																	tempImg
																}`}
																alt=""
															/>
														</div>
													)}
												</>
											);
										})}
									</div>
								</div>
								<div className="col-lg-6 ps-lg-4">
									<h1 className="colorblue mb-2 mt-3 mt-lg-0 text-center fw-bold text-lg-start">
										{product?.Product_Name}
									</h1>
									{showStars1(
										Math.abs(
											parseInt(product?.Product_Rating) -
												parseFloat(
													product?.Product_Rating
												)
										) > 0.5
											? parseInt(
													product?.Product_Rating
											  ) + 1
											: parseInt(product?.Product_Rating)
									)}
									<p className="mb-3 text-center text-lg-start">
										<span
											className="colorblue fw-bold"
											style={{ fontSize: 28 }}
										>
											₹ {product?.Product_SellingPrice}
										</span>
										&nbsp;&nbsp;
										<span className="fontsize20 notaccepted text-decoration-line-through">
											₹ {product?.Product_MRP}
										</span>
									</p>
									<div className="row">
										<div className="col d-flex justify-content-center align-items-center">
											<button
												className="h-100 w-75 colorblue fontsize20 border-0 border5px bgyellow bglightblue"
												onClick={handleMinus}
											>
												<i className="fas fa-minus" />
											</button>
											<input
												className="bgcolorgreyish text-center fontsize20 colorblue h-100 w-75 border-0 border5px mx-2"
												type="number"
												value={plusMinus}
												onChange={(e: any) => {
													setPlusMinus(
														e.target.value
													);
												}}
											/>
											<button
												className="h-100 w-75 colorblue fontsize20 border-0 border5px bgyellow bglightblue"
												onClick={handlePlus}
											>
												<i className="fas fa-plus" />
											</button>
										</div>
										<div className="col d-flex align-items-center">
											{isInCart(
												product.guid,
												cookies?.user?.[0]?.id
											) ? (
												<button
													className={`${
														animateButton
															? "add-to-cart d-flex fontsize20 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
															: "add-to-cart d-flex fontsize20 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
													}`}
													onClick={() => {
														if (isAuthenticated()) {
															setAnimateButton(
																true
															);
															addProduct({
																product,
																quantity:
																	plusMinus,
																userID: cookies
																	.user[0].id,
															});
														} else {
															return toast(
																"Please login to access Cart!",
																{
																	type: "warning",
																}
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
															strokeMiterlimit={
																10
															}
															d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
														/>
													</svg>
												</button>
											) : (
												<button
													className={`${
														animateButton
															? "add-to-cart d-flex fontsize20 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase is-added"
															: "add-to-cart d-flex fontsize20 justify-content-center align-items-center mybtnsame position-relative h-100 w-100 overflow-hidden bglightblue colorblue bgyellow border5px border-0 text-uppercase"
													}`}
													onClick={() => {
														if (isAuthenticated()) {
															setAnimateButton(
																true
															);
															// TODO: check for useeffect fo this
															increase({
																product,
																quantity:
																	plusMinus,
																userID: cookies
																	.user[0].id,
															});
														} else {
															return toast(
																"Please login first",
																{
																	type: "warning",
																}
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
															strokeMiterlimit={
																10
															}
															d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
														/>
													</svg>
												</button>
											)}
										</div>
									</div>
									<ul className="fontsize18 mb-2 mt-4 list-unstyled text-start">
										<li
											className="my-1"
											style={{
												borderBottom:
													"2.5px dotted #ebebeb",
											}}
										>
											<span className="fw-bold colorblue">
												Brand :
											</span>
											<span className="colorlightblue">
												&nbsp;&nbsp;&nbsp;
												{product?.Product_Brand}
											</span>
										</li>
										<li
											className="my-1"
											style={{
												borderBottom:
													"2.5px dotted #ebebeb",
											}}
										>
											<span className="fw-bold colorblue">
												Specifications :
											</span>
											<span className="colorlightblue">
												&nbsp;&nbsp;&nbsp;
												{product?.Product_Specs}
											</span>
										</li>
										<li
											className="my-1"
											style={{
												borderBottom:
													"2.5px dotted #ebebeb",
											}}
										>
											<span className="fw-bold colorblue">
												Category :
											</span>
											<span className="colorlightblue">
												&nbsp;&nbsp;&nbsp;Electronic
												Components, Small Components
											</span>
										</li>
										<li
											className="my-1"
											style={{
												borderBottom:
													"2.5px dotted #ebebeb",
											}}
										>
											<span className="fw-bold colorblue">
												SKU :
											</span>
											<span className="colorlightblue">
												&nbsp;&nbsp;&nbsp;SHC0449-1
											</span>
										</li>
										<li
											className="my-1"
											style={{
												borderBottom:
													"2.5px dotted #ebebeb",
											}}
										>
											<span className="fw-bold colorblue">
												Contents :
											</span>
											<span className="colorlightblue">
												&nbsp;&nbsp;&nbsp;hjdhe, uidhnw,
												dwjjd
											</span>
										</li>
										<li
											className="my-1"
											style={{
												borderBottom:
													"2.5px dotted #ebebeb",
											}}
										>
											<span className="fw-bold colorblue">
												Quantity :
											</span>
											<span className="colorlightblue">
												&nbsp;&nbsp;&nbsp;100
											</span>
										</li>
										<li className="mt-3 mt-lg-2 text-center">
											<WhatsappShareButton
												className="me-3 hvr-icon-float"
												url={`https://www.meemokidz.com${location.pathname}`}
											>
												<img
													className="hvr-icon"
													height="25px"
													alt="WhatsApp"
													src="images/Logo/WA_Logo.svg"
												/>
											</WhatsappShareButton>
											<FacebookShareButton
												className="me-3 hvr-icon-float"
												url={`https://www.meemokidz.com${location.pathname}`}
											>
												<img
													className="hvr-icon"
													height="25px"
													alt="Facebook"
													src="images/Logo/FB_Logo.svg"
												/>
											</FacebookShareButton>
											<TelegramShareButton
												className="me-3 hvr-icon-float"
												url={`https://www.meemokidz.com${location.pathname}`}
											>
												<img
													className="hvr-icon"
													height="25px"
													alt="Telegram"
													src="images/Logo/Telegram.svg"
												/>
											</TelegramShareButton>
											<TwitterShareButton
												className="me-3 hvr-icon-float"
												url={`https://www.meemokidz.com${location.pathname}`}
											>
												<img
													className="hvr-icon"
													height="25px"
													alt="Twitter"
													src="images/Logo/Twitter.svg"
												/>
											</TwitterShareButton>
											<LinkedinShareButton
												className="hvr-icon-float"
												url={`https://www.meemokidz.com${location.pathname}`}
											>
												<img
													className="hvr-icon"
													height="25px"
													alt="LinkedIn"
													src="images/Logo/LinkedIn.svg"
												/>
											</LinkedinShareButton>
										</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12 mt-3">
									<ul
										className="nav d-flex justify-content-center nav-pills mb-3"
										id="pills-tab"
										style={{
											borderBottom:
												"2.5px dotted #ebebeb",
										}}
										role="tablist"
									>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className="nav-link fontsize16 mybtnsame lightbluehover colorblue bgcolorwhite text-uppercase active"
												id="pills-description-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-description"
												type="button"
												role="tab"
												aria-controls="pills-description"
												aria-selected="true"
												style={{
													border: "2.5px",
													borderRadius: "0px",
													borderRight:
														"2.5px dotted #ebebeb",
												}}
											>
												Description
											</button>
										</li>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className="nav-link fontsize16 mybtnsame lightbluehover colorblue bgcolorwhite text-uppercase"
												id="pills-Reviews-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-Reviews"
												type="button"
												role="tab"
												aria-controls="pills-Reviews"
												aria-selected="false"
												style={{
													border: "2.5px",
													borderRadius: "0px",
													borderRight:
														"2.5px dotted #ebebeb",
												}}
											>
												Reviews
											</button>
										</li>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className="nav-link fontsize16 mybtnsame lightbluehover colorblue bgcolorwhite text-uppercase"
												id={
													isReviewed
														? "pills-editreview-tab"
														: "pills-addareview-tab"
												}
												data-bs-toggle="pill"
												data-bs-target={
													isReviewed
														? "#pills-editreview"
														: "#pills-addareview"
												}
												type="button"
												role="tab"
												aria-controls={
													isReviewed
														? "pills-editreview"
														: "pills-addareview"
												}
												aria-selected="false"
											>
												{isReviewed
													? "Edit Review"
													: "Add Review"}
											</button>
										</li>
									</ul>
									<div
										className="tab-content"
										id="pills-tabContent"
									>
										<div
											className="tab-pane fade show mypara text-center active"
											id="pills-description"
											role="tabpanel"
											aria-labelledby="pills-description-tab"
										>
											{product?.Product_Description
												?.length > 0 ? (
												product?.Product_Description
													?.length
											) : (
												<h2 className="colorblue pt-3 text-center">
													No description added by the
													administrator!
												</h2>
											)}
										</div>
										<div
											className="tab-pane fade"
											id="pills-Reviews"
											role="tabpanel"
											aria-labelledby="pills-Reviews-tab"
											onMouseEnter={handleChangeImage1}
											onMouseLeave={handleChangeImage1}
										>
											{allReviews.filter(
												(rev: any) =>
													rev.product_id ===
													product?.guid
											).length > 0 ? (
												allReviews
													.sort((a: any, b: any) => {
														return (
															a.rating - b.rating
														);
													})
													.reverse()
													.filter(
														(rev: any) =>
															rev.product_id ===
															product?.guid
													)
													.map(
														(
															review: any,
															index: any
														) => {
															return (
																<div
																	key={index}
																	className="row my-4"
																>
																	<div className="col-12">
																		<div className="teacher d-flex justify-content-end align-items-center">
																			<img
																				src={
																					review
																						?.user
																						?.image ||
																					tempImg1
																				}
																				className="avatar-md-lg rounded-circle shadow"
																				alt=""
																			/>
																			<div className="ms-3 flex-grow-1">
																				<h4 className="mb-1">
																					<p className="mb-0 colorblue">
																						{review
																							?.user
																							.first_name !==
																						""
																							? review
																									?.user
																									.first_name
																							: review
																									?.user
																									.username}
																						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																						{showStarsForRating(
																							review?.rating
																						)}
																					</p>
																				</h4>
																				<p className="colorblue mb-0 mypara">
																					{
																						review?.review
																					}
																				</p>
																			</div>
																			{review
																				?.user
																				?.id ===
																				cookies
																					?.user?.[0]
																					?.id && (
																				<button
																					onClick={(
																						e
																					) => {
																						reviewDelete(
																							e,
																							review.id
																						);
																					}}
																					className="ms-2 colorblue border-0 border5px bgyellow bglightblue"
																					style={{
																						width: 35,
																						height: 35,
																					}}
																				>
																					<i className="fas fa-times" />
																				</button>
																			)}
																		</div>
																	</div>
																</div>
															);
														}
													)
											) : (
												<div className="row mt-5">
													<div className="col-lg-12 text-center">
														<img
															width="250px"
															src={
																changeImage1
																	? "images/No_Reviews_Yellow.svg"
																	: "images/No_Reviews_LightBlue.svg"
															}
															className="loginsvg"
															alt=""
														/>
														<h3 className="mt-4 pt-3 text-center colorblue letterspacing1">
															There are no reviews
															to show as of now!
														</h3>
													</div>
												</div>
											)}
										</div>
										<div
											className="tab-pane fade"
											id={
												isReviewed
													? "pills-editreview"
													: "pills-addareview"
											}
											role="tabpanel"
											aria-labelledby={
												isReviewed
													? "pills-editreview-tab"
													: "pills-addareview-tab"
											}
										>
											<section className="feedback">
												<div className="row align-items-center">
													<div className="col-lg-12">
														<div className="card bgcolorgreyish border-0 border5px p-4">
															<form className="">
																<div className="row">
																	<div className="col-lg-12">
																		<div className="position-relative mb-4">
																			<h5 className="colorblue">
																				Your
																				Rating
																			</h5>
																			{[
																				1,
																				2,
																				3,
																				4,
																				5,
																			].map(
																				(
																					val: any,
																					index: any
																				) => {
																					return (
																						<div className="d-flex align-items-center">
																							<input
																								className="d-none"
																								type="radio"
																								name="star_review"
																								id={`star${
																									index +
																									1
																								}`}
																								value={`${
																									index +
																									1
																								}`}
																								onChange={(
																									e: any
																								) => {
																									setRating(
																										e
																											.target
																											.value
																									);
																								}}
																								style={{
																									margin: "3px 3px 0px 5px",
																								}}
																								required
																							/>
																							<label
																								className="yellowhover hvr-icon-grow"
																								onClick={() => {
																									setTarget(
																										index
																									);
																								}}
																								htmlFor={`star${
																									index +
																									1
																								}`}
																							>
																								{showStarsForRatingForm(
																									index +
																										1,
																									index
																								)}
																							</label>
																						</div>
																					);
																				}
																			)}
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="position-relative mb-4">
																			<textarea
																				className="colorblue bgcolorwhite p-3 border5px border-0 w-100"
																				style={{
																					height: "150px",
																					resize: "none",
																				}}
																				placeholder="Your review"
																				value={
																					review
																				}
																				onChange={(
																					e
																				) => {
																					setReview(
																						e
																							.target
																							.value
																					);
																				}}
																				required
																			/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="d-grid">
																			<button
																				className="mybtnsame bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
																				style={{
																					fontSize:
																						"25px",
																				}}
																				type="submit"
																				onClick={(
																					e
																				) => {
																					isReviewed
																						? reviewUpdate(
																								e,
																								reviewID
																						  )
																						: reviewrating(
																								e
																						  );
																				}}
																				disabled={
																					dataLoading
																						? true
																						: false
																				}
																			>
																				{dataLoading ? (
																					<DataLoader2
																						loaderSize={
																							15
																						}
																						loaderType="ScaleLoader"
																						loaderColor="#00214d"
																					/>
																				) : (
																					"Submit"
																				)}
																			</button>
																		</div>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
											</section>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
			</Base>
		</>
	);
};
export default ProductSingle;
