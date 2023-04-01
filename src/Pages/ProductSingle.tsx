import { useEffect, useState } from "react";
import Base from "../Base";
import ReactImageMagnify from "react-image-magnify";
import { Helmet } from "react-helmet-async";
import { singleProduct } from "../APIs/ecommerce/ecommerce";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import {
	singleReview,
	deleteReview,
	updateReview,
	reviewRating,
	ratingCount,
	fetchAllReviews,
} from "../APIs/ecommerce/ecommerce";
import tempImg from "../Assets/Product_3.webp";
import tempImg1 from "../Assets/User_Image.webp";
import { toast } from "react-toastify";
import { isAuthenticated } from "../APIs/user/user";
import DataLoader from "../Components/DataLoader";
import DataLoader2 from "../Components/DataLoader2";
import { useSelector, useDispatch } from "react-redux";
import { cartItem, Store } from "../Interfaces/Store";
import {
	addProductInCart,
	increaseQuantityOfProductInCart,
	decreaseQuantityOfProductInCart,
} from "../Data/storingData";
import { insertStars, isProductInCart } from "../Utilities/Utils";
import { Product, Product_Reviews } from "../Interfaces/Products";
import {
	AddToCartButtonForProductSingle,
	ViewCartButtonForProductSingle,
} from "../Components/ActionButtons";

export default function ProductSingle(): JSX.Element {
	const dispatch = useDispatch();
	const { guid } = useParams();
	const userId = useSelector((state: Store) => state.userProfile.id);
	const cartItems = useSelector((state: Store) => state.cart[userId]);
	const [plusMinus, setPlusMinus] = useState(1);
	const [animateButton, setAnimateButton] = useState(false);
	const [changeImage, setChangeImage] = useState(false);
	const [loading, setLoading] = useState(true);
	const [wishlistToggle, setWishlistToggle] = useState(false);
	const [toggleButton, setToggleButton] = useState(false);
	const [target, setTarget] = useState(-1);
	const [productImage, setProductImage] = useState(0);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);
	const [productData, setProductData] = useState<Product>();
	const [dataLoading, setDataLoading] = useState(false);
	const [isReviewed, setIsReviewed] = useState(false);
	const [reviewID, setReviewID] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		const getSingleProduct = async () => {
			await singleProduct({ guid }).then((data: Product) => {
				setProductData(data);
			});
		};
		getSingleProduct();
	}, []);
	const addReviewRating = async (e: any) => {
		e.preventDefault();
		await reviewRating({
			guid: productData?.guid!,
			rating,
			review,
		}).then((data) => {
			if (data.id !== null) {
				let arr = productData?.Product_Reviews;
				arr?.push({
					guid: productData?.guid!,
					id: data.id,
					rating: data.rating,
					review: data.review,
					user_id: data.user_id,
				});
				setProductData({
					...productData!,
					Product_Reviews: arr!,
				});
				return toast.success("Review Posted Successfully!");
			} else {
				return toast.error("Cannot add review currently!");
			}
		});
	};
	const updateReviewRating = async (
		e: any,
		id: any,
		rating: any,
		review: any
	) => {
		e.preventDefault();
		await updateReview({ id, rating, review }).then((data) => {
			if (data.id !== null) {
				setProductData({
					...productData!,
					Product_Reviews: productData?.Product_Reviews?.map(
						(data) => {
							if (data.id === id) {
								return {
									id: data.id,
									rating: rating,
									review: review,
									guid: data.guid,
									user_id: data.user_id,
								};
							} else return data;
						}
					)!,
				});
				return toast.success("Review Updated Successfully!");
			} else {
				return toast.error("Cannot update review currently!");
			}
		});
	};
	const reviewDelete = async (e: any, id: any) => {
		e.preventDefault();
		await deleteReview({ id }).then((data) => {
			if (data.id === null) {
				setProductData({
					...productData!,
					Product_Reviews: productData?.Product_Reviews.filter(
						(item: Product_Reviews) => item.id !== id
					)!,
				});
				return toast.success("Review Deleted Successfully!");
			} else {
				return toast.error("Cannot delete review currently!");
			}
		});
	};
	const changeWishlist = () => {
		setWishlistToggle(!wishlistToggle);
	};
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	useEffect(() => {
		const timer = setTimeout(() => setAnimateButton(false), 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [animateButton]);
	return (
		<>
			<Helmet
				title={`MeeMo Kidz | ${productData?.Product_Name}`}
			></Helmet>
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
												imageClassName:
													"border5px w-50 ml-image",
												enlargedImageContainerClassName:
													"border5px",
												pressDuration: 250,
												smallImage: {
													isFluidWidth: true,
													src: `${productData?.Product_Images?.[productImage]?.dbImage}`,
												},
												largeImage: {
													src: `${productData?.Product_Images?.[productImage]?.dbImage}`,
													width: 600,
													height: 900,
												},
											}}
										/>
										<span
											className="d-flex justify-content-center align-items-center"
											id="mydiscountpersin"
										>
											{Math.abs(
												parseInt(
													productData?.Product_Discount?.toString()!
												) -
													parseFloat(
														productData?.Product_Discount?.toString()!
													)
											) > 0.5
												? parseInt(
														productData?.Product_Discount?.toString()!
												  ) + 1
												: parseInt(
														productData?.Product_Discount?.toString()!
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
										{productData?.Product_Images?.slice(
											0,
											3
										).map((product: any, index: any) => {
											return (
												<>
													{product ===
													productData?.Product_Images?.slice(
														-1
													)[0] ? (
														<div
															key={index}
															className="col-3"
														>
															<img
																className="border5px h-100 w-100 shadow cursorpointer"
																onClick={() =>
																	setProductImage(
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
																	setProductImage(
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
										{productData?.Product_Name}
									</h1>
									{insertStars(
										Math.abs(
											parseInt(
												productData?.Product_Rating?.toString()!
											) -
												parseFloat(
													productData?.Product_Rating?.toString()!
												)
										) > 0.5
											? parseInt(
													productData?.Product_Rating?.toString()!
											  ) + 1
											: parseInt(
													productData?.Product_Rating?.toString()!
											  ),
										"showStars1"
									)}
									<p className="mb-3 text-center text-lg-start">
										<span
											className="colorblue fw-bold"
											style={{ fontSize: 28 }}
										>
											₹{" "}
											{productData?.Product_SellingPrice}
										</span>
										&nbsp;&nbsp;
										<span className="fontsize16 notaccepted text-decoration-line-through">
											₹ {productData?.Product_MRP}
										</span>
									</p>
									<div className="row">
										<div className="col d-flex justify-content-center align-items-center">
											<button
												className="h-100 w-75 colorblue fontsize16 border-0 border5px bgyellow bglightblue"
												onClick={() =>
													plusMinus > 1 &&
													setPlusMinus(plusMinus - 1)
												}
											>
												<i className="fas fa-minus" />
											</button>
											<input
												className="bgcolorgreyish text-center fontsize16 colorblue h-100 w-75 border-0 border5px mx-2"
												type="number"
												value={plusMinus}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>
												) => {
													setPlusMinus(
														e.target.valueAsNumber
													);
												}}
											/>
											<button
												className="h-100 w-75 colorblue fontsize16 border-0 border5px bgyellow bglightblue"
												onClick={() =>
													setPlusMinus(plusMinus + 1)
												}
											>
												<i className="fas fa-plus" />
											</button>
										</div>
										<div className="col d-flex align-items-center">
											{!isProductInCart(
												cartItems,
												productData?.guid!
											) ? (
												<AddToCartButtonForProductSingle
													isAuthenticated={
														userId !== -1
															? true
															: false
													}
													animateButton={
														animateButton
													}
													plusMinus={plusMinus}
													setAnimateButton={
														setAnimateButton
													}
													product={productData}
													addProductInCart={
														addProductInCart
													}
												/>
											) : (
												<ViewCartButtonForProductSingle />
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
												{productData?.Product_Brand}
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
												{productData?.Product_Specs}
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
											{productData?.Product_Description
												?.length! > 0 ? (
												productData?.Product_Description
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
											onMouseEnter={handleChangeImage}
											onMouseLeave={handleChangeImage}
										>
											{productData?.Product_Reviews
												?.length! > 0 ? (
												productData?.Product_Reviews?.sort(
													(a: any, b: any) =>
														b.rating - a.rating
												).map(
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
																					{insertStars(
																						review?.rating,
																						"showStarsForRating"
																					)}
																				</p>
																			</h4>
																			<p className="colorblue mb-0 mypara">
																				{
																					review?.review
																				}
																			</p>
																		</div>
																		{review && (
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
																changeImage
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
																								{insertStars(
																									index +
																										1,
																									"showStarsForRatingForm",
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
																						? updateReview(
																								{
																									id: reviewID!,
																									rating,
																									review,
																								}
																						  )
																						: updateReview(
																								{
																									id: reviewID!,
																									rating,
																									review,
																								}
																						  );
																				}}
																				disabled={
																					dataLoading
																						? true
																						: false
																				}
																			>
																				{dataLoading ? (
																					<DataLoader2 />
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
}
