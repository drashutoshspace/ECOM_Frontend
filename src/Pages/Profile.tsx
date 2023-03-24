import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { Helmet } from "react-helmet-async";
import Base from "../Base";
import ProfileWishlistCard from "../Components/ProfileWishlistCard";
import { BaseContext } from "../Context";
import {
	profileDataUpdate,
	passwordChange,
	emailChange,
} from "../APIs/user/user";
import { toast } from "react-toastify";
import MyOrderCard from "../Components/MyOrdersCard";
import OrderDetailCard from "../Components/OrderDetailCard";
import DataLoader2 from "../Components/DataLoader2";
import PhoneInput from "react-phone-input-2";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../Interfaces/Store";

export default function Profile(): JSX.Element {
	const { option, id } = useParams();
	const wishlistItems = useSelector(
		(state: Store) => state.wishlist[cookies?.user?.[0]?.id]
	);
	const productsCount = useSelector(
		(state: Store) => state.allWishlistItemsCount
	);
	const { cookies, setCookie, myOrders }: any = useContext(BaseContext);
	const [profile, setProfile] = useState(cookies?.user?.[0]);
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [imageChanged, setImageChanged] = useState(false);
	const [toggle, setToggle] = useState(false);
	const handleProfileUpdate = async (event: any, data: any) => {
		event.preventDefault();
		const uploadData = new FormData();
		for (const key in profile) {
			if (key === "email") {
				uploadData.append(key, profile[key].toLowerCase());
			} else {
				uploadData.append(key, profile[key]);
			}
		}
		for (let [key, value] of uploadData) {
			if (key === "image") {
				!imageChanged && uploadData.set(key, "");
			}
		}
		await profileDataUpdate(uploadData).then((d: any) => {
			setToggle(!toggle);
			setCookie("user", d, { path: "/" });
			return toast.success("Your profile has been updated.");
		});
		setImageChanged(false);
	};
	const [image, setImage] = useState("");
	const [originalImage, setOriginalImage] = useState(
		cookies?.user?.[0].image
	);
	const photoUpload = async (e: any) => {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onloadend = () => {
			setImage(file);
			setImageChanged(true);
			setOriginalImage(reader.result);
		};
		reader.readAsDataURL(file);
	};
	useEffect(() => {
		image !== "" &&
			setProfile({
				...profile,
				image: image,
			});
	}, [image]);
	const navigate = useNavigate();
	const [oldPassword, setOldPassword] = useState("");
	const [password1, setpassword1] = useState("");
	const [password2, setpassword2] = useState("");
	const [showOldPassword, setShowOldPassword] = useState(false);
	const seeOldPassword = () => {
		setShowOldPassword(!showOldPassword);
	};
	const [showPassword1, setShowPassword1] = useState(false);
	const seePassword1 = () => {
		setShowPassword1(!showPassword1);
	};
	const [showPassword2, setShowPassword2] = useState(false);
	const seePassword2 = () => {
		setShowPassword2(!showPassword2);
	};
	const changePassword = async (e: any) => {
		e.preventDefault();
		await passwordChange({
			old_password: oldPassword,
			new_password1: password1,
			new_password2: password2,
		}).then((data: any) => {
			setOldPassword("");
			setpassword1("");
			setpassword2("");
			if (data?.detail) {
				setLoading(false);
				return toast.success(data.detail);
			}
			if (data?.old_password) {
				setLoading(false);
				return toast.error(data.old_password[0]);
			}
			if (data?.new_password1) {
				setLoading(false);
				return toast.error(data.new_password1[0]);
			}
			if (data?.new_password2) {
				setLoading(false);
				return toast.error(data.new_password2[0]);
			}
		});
	};
	const [newEmail1, setNewEmail1] = useState("");
	const [newEmail2, setNewEmail2] = useState("");
	const changeEmail = async (e: any) => {
		e.preventDefault();
		await emailChange({
			newemail1: newEmail1.toLowerCase(),
			newemail2: newEmail2.toLowerCase(),
		}).then((data: any) => {
			setNewEmail1("");
			setNewEmail2("");
			if (data?.detail) {
				setLoading(false);
				return toast.success(data.detail);
			}
			if (data?.newemail1) {
				setLoading(false);
				return toast.error(data.newemail1[0]);
			}
			if (data?.newemail2) {
				setLoading(false);
				return toast.error(data.newemail2[0]);
			}
		});
	};
	const [changeImage1, setChangeImage1] = useState(false);
	const handleChangeImage1 = () => {
		setChangeImage1(!changeImage1);
	};
	const [changeImage2, setChangeImage2] = useState(false);
	const handleChangeImage2 = () => {
		setChangeImage2(!changeImage2);
	};
	const [changeImage3, setChangeImage3] = useState(false);
	const handleChangeImage3 = () => {
		setChangeImage3(!changeImage3);
	};
	const [changeImage4, setChangeImage4] = useState(false);
	const handleChangeImage4 = () => {
		setChangeImage4(!changeImage4);
	};
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	useEffect(() => {
		if (cookies?.user?.[0].is_social) {
			if (
				location.pathname.includes("changeemail") ||
				location.pathname.includes("changepassword")
			) {
				navigate("/profile/account/");
			}
		}
	}, []);
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Your Account</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Your Account" />
				<section className="section">
					<div className="container">
						<div className="row mx-1">
							<div className="col-lg-6 px-lg-3 px-0">
								<div className="card border-0 border5px shadow">
									<div className="card-body">
										<div className="row align-items-center">
											<div className="col-lg-1"></div>
											<div className="col-lg-4 d-flex justify-content-center">
												<label
													htmlFor="photo-upload"
													className="custom-file-upload fas"
												>
													<div className="img-wrap img-upload">
														<img
															src={originalImage}
															alt="Profile_Pic"
														/>
													</div>
													<input
														className="d-none"
														id="photo-upload"
														type="file"
														onChange={photoUpload}
													/>
												</label>
											</div>
											<div className="col-lg-6">
												<div className="row">
													<div className="mt-3 mt-lg-0 text-center">
														<h4 className="colorblue mb-2">
															{`${
																cookies.user[0]
																	.first_name !==
																	"" ||
																cookies.user[0]
																	.last_name !==
																	""
																	? cookies
																			.user[0]
																			.first_name +
																	  " " +
																	  cookies
																			.user[0]
																			.last_name
																	: cookies
																			.user[0]
																			.username
															}`}
														</h4>
														<p className="colorlightblue mb-1">
															{cookies.user[0]
																.email ||
																"No Email Entered!"}
														</p>
														{imageChanged && (
															<button
																className="mybtnsame mt-2 fontsize14 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
																onClick={(
																	e
																) => {
																	handleProfileUpdate(
																		e,
																		profile
																	);
																}}
															>
																Save
															</button>
														)}
													</div>
												</div>
											</div>
											<div className="col-lg-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 mt-4 mt-lg-0 px-lg-3 px-0">
								<div className="card border-0 h-100 border5px shadow">
									<div className="card-body">
										<div className="row align-items-center">
											Space for badges, experience/points
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row mx-1 mt-5">
							<div className="col-lg-4 px-lg-3 px-0 col-12">
								<div className="p-4 sticky-bar position-sticky border5px shadow">
									<ul
										className="nav d-block nav-pills"
										id="pills-tab"
										role="tablist"
									>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
													option === "account" &&
													"active"
												}`}
												id="pills-account-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-account"
												type="button"
												role="tab"
												aria-controls="pills-account"
												aria-selected={`${
													option === "account"
														? "true"
														: "false"
												}`}
												onClick={() => {
													navigate(
														"/profile/account"
													);
												}}
											>
												<i className="fas fa-user" />
												&nbsp;&nbsp;Account
											</button>
										</li>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
													(option === "myorders" ||
														location.pathname.includes(
															"orderdetail"
														)) &&
													"active"
												}`}
												id="pills-myorders-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-myorders"
												type="button"
												role="tab"
												aria-controls="pills-myorders"
												aria-selected={`${
													option === "myorders"
														? "true"
														: "false"
												}`}
												onClick={() => {
													navigate(
														"/profile/myorders"
													);
												}}
											>
												<i className="fas fa-shopping-cart" />
												&nbsp;&nbsp;My Orders
											</button>
										</li>
										<li
											className="nav-item d-none"
											role="presentation"
										>
											<button
												className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
													option === "orderdetail" &&
													"active"
												}`}
												id="pills-orderdetail-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-orderdetail"
												type="button"
												role="tab"
												aria-controls="pills-orderdetail"
												aria-selected={`${
													option === "orderdetail"
														? "true"
														: "false"
												}`}
												onClick={() => {
													navigate(
														"/profile/orderdetail"
													);
												}}
											>
												<i className="fas fa-shopping-cart" />
												&nbsp;&nbsp;My Orders
											</button>
										</li>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
													option ===
														"productwishlist" &&
													"active"
												}`}
												id="pills-productwishlist-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-productwishlist"
												type="button"
												role="tab"
												aria-controls="pills-productwishlist"
												aria-selected={`${
													location.pathname.includes(
														"productwishlist"
													)
														? "true"
														: "false"
												}`}
												onClick={() => {
													navigate(
														"/profile/productwishlist"
													);
												}}
											>
												<i className="fas fa-box-heart" />
												{productsCount > 0 && (
													<span className="topnumbercart">
														{productsCount}
													</span>
												)}
												&nbsp;&nbsp;Product Wishlist
											</button>
										</li>
										<li
											className="nav-item"
											role="presentation"
										>
											<button
												className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
													(option === "buyagain" ||
														location.pathname.includes(
															"buyagain"
														)) &&
													"active"
												}`}
												id="pills-buyagain-tab"
												data-bs-toggle="pill"
												data-bs-target="#pills-buyagain"
												type="button"
												role="tab"
												aria-controls="pills-buyagain"
												aria-selected={`${
													option === "buyagain"
														? "true"
														: "false"
												}`}
												onClick={() => {
													navigate(
														"/profile/buyagain"
													);
												}}
											>
												<i className="fas fa-cart-plus" />
												&nbsp;&nbsp;Buy Again
											</button>
										</li>
										{!!!cookies?.user?.[0].is_social && (
											<>
												<li
													className="nav-item"
													role="presentation"
												>
													<button
														className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
															option ===
																"changepassword" &&
															"active"
														}`}
														id="pills-changepassword-tab"
														data-bs-toggle="pill"
														data-bs-target="#pills-changepassword"
														type="button"
														role="tab"
														aria-controls="pills-changepassword"
														aria-selected={`${
															option ===
															"changepassword"
																? "true"
																: "false"
														}`}
														onClick={() => {
															navigate(
																"/profile/changepassword"
															);
														}}
													>
														<i className="fas fa-lock" />
														&nbsp;&nbsp;Change
														Password
													</button>
												</li>
												<li
													className="nav-item"
													role="presentation"
												>
													<button
														className={`nav-link fontsize14 p-0 py-2 lightbluehover colorblue bgcolorwhite text-uppercase ${
															option ===
																"changeemail" &&
															"active"
														}`}
														id="pills-changeemail-tab"
														data-bs-toggle="pill"
														data-bs-target="#pills-changeemail"
														type="button"
														role="tab"
														aria-controls="pills-changeemail"
														aria-selected={`${
															option ===
															"changeemail"
																? "true"
																: "false"
														}`}
														onClick={() => {
															navigate(
																"/profile/changeemail"
															);
														}}
													>
														<i className="fas fa-envelope" />
														&nbsp;&nbsp;Change Email
													</button>
												</li>
											</>
										)}
									</ul>
								</div>
							</div>
							<div className="col-lg-8 px-lg-3 px-0 col-12 mt-5 mt-lg-0">
								<div
									className="tab-content"
									id="pills-tabContent"
								>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-3 ${
											option === "account" &&
											"show active"
										}`}
										id="pills-account"
										role="tabpanel"
										aria-labelledby="pills-account-tab"
									>
										<form>
											<div className="row">
												<div className="col-lg-12 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Username
													</h5>
													<input
														value={
															profile?.username ||
															""
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="Username"
														onChange={(e) => {
															setProfile({
																...profile,
																username:
																	e.target
																		.value,
															});
														}}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														First Name
													</h5>
													<input
														value={
															profile?.first_name ||
															""
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="First Name"
														onChange={(e) => {
															setProfile({
																...profile,
																first_name:
																	e.target
																		.value,
															});
														}}
													/>
												</div>
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Last Name
													</h5>
													<input
														value={
															profile?.last_name ||
															""
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="Last Name"
														onChange={(e) => {
															setProfile({
																...profile,
																last_name:
																	e.target
																		.value,
															});
														}}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Date Of Birth
													</h5>
													<input
														value={
															profile?.dob || ""
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="date"
														onChange={(e) => {
															setProfile({
																...profile,
																dob: e.target
																	.value,
															});
														}}
													/>
												</div>
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Gender
													</h5>
													<select
														value={
															profile?.gender ||
															""
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														placeholder="Gender"
														onChange={(e) => {
															setProfile({
																...profile,
																gender: e.target
																	.value,
															});
														}}
													>
														<option value="Prefer Not To Say">
															Prefer Not To Say
														</option>
														<option value="Male">
															Male
														</option>
														<option value="Female">
															Female
														</option>
														<option value="Non-Binary">
															Non-Binary
														</option>
														<option value="Other">
															Other
														</option>
													</select>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-12 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Mobile Number
													</h5>
													<PhoneInput
														inputClass="input100 w-100 shadow-none border5px pe-5 border-0 colorblue"
														buttonClass="border5px border-0 ps-2 colorblue bgcolorwhite"
														inputStyle={{
															height: "50px",
														}}
														specialLabel={""}
														country={"in"}
														value={
															profile?.mobile ||
															""
														}
														onChange={(value) => {
															setProfile({
																...profile,
																mobile: value,
															});
														}}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-12 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Address
													</h5>
													<input
														value={
															profile?.address_line_1 ===
															" "
																? ""
																: profile?.address_line_1
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="Address"
														onChange={(e) => {
															setProfile({
																...profile,
																address_line_1:
																	e.target
																		.value,
															});
														}}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Pincode
													</h5>
													<input
														value={
															profile?.pin_code ||
															""
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="number"
														placeholder="Pincode"
														onChange={(e) => {
															setProfile({
																...profile,
																pin_code:
																	e.target
																		.value,
															});
														}}
													/>
												</div>
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														City
													</h5>
													<input
														value={
															profile?.city ===
															" "
																? ""
																: profile?.city
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="Town / City"
														onChange={(e) => {
															setProfile({
																...profile,
																city: e.target
																	.value,
															});
														}}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														State
													</h5>
													<input
														value={
															profile?.state ===
															" "
																? ""
																: profile?.state
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="State"
														onChange={(e) => {
															setProfile({
																...profile,
																state: e.target
																	.value,
															});
														}}
													/>
												</div>
												<div className="col-lg-6 mb-4">
													<h5 className="colorblue text-start mb-3 fontsize16">
														Country
													</h5>
													<input
														value={
															profile?.country ===
															" "
																? ""
																: profile?.country
														}
														className="input100 w-100 border5px ps-3 border-0 colorblue"
														type="text"
														placeholder="Country"
														onChange={(e) => {
															setProfile({
																...profile,
																country:
																	e.target
																		.value,
															});
														}}
													/>
												</div>
											</div>
											<button
												className="mt-2 mybtnsame fontsize16 w-100 bglightblue colorblue bgyellow border5px border-0 text-uppercase"
												onClick={(e) => {
													handleProfileUpdate(
														e,
														profile
													);
												}}
											>
												Update
											</button>
										</form>
									</div>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-4 pt-0 ${
											option === "myorders" &&
											"show active"
										}`}
										id="pills-myorders"
										role="tabpanel"
										aria-labelledby="pills-myorders-tab"
										onMouseEnter={handleChangeImage4}
										onMouseLeave={handleChangeImage4}
									>
										{myOrders?.length === 0 ? (
											<div className="row mt-2">
												<div className="col-lg-12">
													<img
														width="250px"
														src={
															changeImage4
																? "images/My_Orders_Yellow.svg"
																: "images/My_Orders_LightBlue.svg"
														}
														className="loginsvg"
														alt="No_Products_Bought"
													/>
													<h3 className="mt-4 pt-3 text-center colorblue">
														Looks like you haven't
														ordered anything, until
														now!
													</h3>
												</div>
											</div>
										) : (
											<>
												{myOrders
													.filter(
														(item: any) =>
															item.is_paid ===
															true
													)
													.map(
														(
															my_order: any,
															index: any
														) => {
															return (
																<MyOrderCard
																	key={index}
																	my_order={
																		my_order
																	}
																/>
															);
														}
													)}
											</>
										)}
									</div>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-3 ${
											option === "orderdetail" &&
											"show active"
										}`}
										id="pills-orderdetail"
										role="tabpanel"
										aria-labelledby="pills-orderdetail-tab"
									>
										<OrderDetailCard id={id} />
									</div>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-3 ${
											option === "productwishlist" &&
											"show active"
										}`}
										id="pills-productwishlist"
										role="tabpanel"
										aria-labelledby="pills-productwishlist-tab"
										onMouseEnter={handleChangeImage1}
										onMouseLeave={handleChangeImage1}
									>
										{wishlistItems?.length <= 0 ? (
											<div className="row mt-2">
												<div className="col-lg-12">
													<img
														width="250px"
														src={
															changeImage1
																? "images/Wishlist_Empty_Yellow.svg"
																: "images/Wishlist_Empty_LightBlue.svg"
														}
														className="loginsvg"
														alt="No_Items_In_Wishlist"
													/>
													<h3 className="my-4 pt-3 text-center colorblue">
														Your wishlist is empty!
													</h3>
													<Link
														to="/shop"
														className="mybtnsame bglightblue bgyellow text-uppercase border5px d-inline-block colorblue"
													>
														Shop now
													</Link>
												</div>
											</div>
										) : (
											<>
												{wishlistItems?.map(
													(item: any, index: any) => {
														const { product } =
															item;
														return (
															<ProfileWishlistCard
																key={index}
																product={
																	product
																}
															/>
														);
													}
												)}
											</>
										)}
									</div>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-3 ${
											option === "buyagain" &&
											"show active"
										}`}
										id="pills-buyagain"
										role="tabpanel"
										aria-labelledby="pills-buyagain-tab"
										onMouseEnter={handleChangeImage2}
										onMouseLeave={handleChangeImage2}
									>
										{myOrders?.length <= 0 ? (
											<div className="row mt-2">
												<div className="col-lg-12">
													<img
														width="250px"
														src={
															changeImage2
																? "images/My_Orders_Yellow.svg"
																: "images/My_Orders_LightBlue.svg"
														}
														className="loginsvg"
														alt="No_Products_Bought"
													/>
													<h3 className="my-4 pt-3 text-center colorblue">
														Let’s start shopping!
													</h3>
													<Link
														to="/shop"
														className="mybtnsame bglightblue bgyellow text-uppercase border5px d-inline-block colorblue"
													>
														Shop Now
													</Link>
												</div>
											</div>
										) : (
											<>
												{/* {orderdetails.buyAgainProducts
													.filter(
														(item: any) =>
															item.userID ===
															cookies?.user?.[0]
																?.id
													)
													.map(
														(
															item: any,
															index: any
														) => {
															return (
																<ProfileWishlistCard
																	key={index}
																	item={
																		item.product
																	}
																/>
															);
														}
													)} */}
											</>
										)}
									</div>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-3 ${
											option === "changepassword" &&
											"show active"
										}`}
										id="pills-changepassword"
										role="tabpanel"
										aria-labelledby="pills-changepassword-tab"
									>
										<form>
											<div className="row">
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type={
																showOldPassword
																	? "text"
																	: "password"
															}
															placeholder="Old Password"
															value={oldPassword}
															onChange={(e) => {
																setOldPassword(
																	e.target
																		.value
																);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="fas fa-lock" />
															</span>
														</span>
														<span
															onClick={
																seeOldPassword
															}
															className="symbol-input1000 d-flex align-items-center position-absolute colorblue h-100"
														>
															<span>
																<i
																	className={
																		showOldPassword
																			? "far fa-eye-slash"
																			: "far fa-eye"
																	}
																/>
															</span>
														</span>
													</div>
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type={
																showPassword1
																	? "text"
																	: "password"
															}
															placeholder="New Password"
															value={password1}
															onChange={(e) => {
																setpassword1(
																	e.target
																		.value
																);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="fas fa-lock" />
															</span>
														</span>
														<span
															onClick={
																seePassword1
															}
															className="symbol-input1000 d-flex align-items-center position-absolute colorblue h-100"
														>
															<span>
																<i
																	className={
																		showPassword1
																			? "far fa-eye-slash"
																			: "far fa-eye"
																	}
																/>
															</span>
														</span>
													</div>
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type={
																showPassword2
																	? "text"
																	: "password"
															}
															placeholder="Confirm New Password"
															value={password2}
															onChange={(e) => {
																setpassword2(
																	e.target
																		.value
																);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="fas fa-lock" />
															</span>
														</span>
														<span
															onClick={
																seePassword2
															}
															className="symbol-input1000 d-flex align-items-center position-absolute colorblue h-100"
														>
															<span>
																<i
																	className={
																		showPassword2
																			? "far fa-eye-slash"
																			: "far fa-eye"
																	}
																/>
															</span>
														</span>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-12 mb-0">
													<div className="d-grid">
														<button
															onClick={(e) => {
																setLoading(
																	true
																);
																changePassword(
																	e
																);
															}}
															className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
															disabled={
																loading
																	? true
																	: false
															}
														>
															{loading ? (
																<DataLoader2 />
															) : (
																"Confirm"
															)}
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									<div
										className={`tab-pane fade text-center bgcolorgreyish border5px p-3 ${
											option === "changeemail" &&
											"show active"
										}`}
										id="pills-changeemail"
										role="tabpanel"
										aria-labelledby="pills-changeemail-tab"
									>
										<p className="colorblue text-center mb-4">
											Please verify your email before
											submission. If the wrong email is
											provided you will not be able to
											login again. In such an event, you
											can contact
											<a
												className="fw-bold lightbluehover colorblue"
												target="_blank"
												rel="noreferrer noopener"
												href="mailto:panglossiantoys@gmail.com"
											>
												&nbsp;panglossiantoys@gmail.com&nbsp;
											</a>
											for account recovery.
										</p>
										<form>
											<div className="row">
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															defaultValue={
																profile?.email
															}
															type="email"
															placeholder="Old Email"
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="fas fa-envelope" />
															</span>
														</span>
													</div>
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type="email"
															placeholder="New Email"
															value={newEmail1.toLowerCase()}
															onChange={(e) => {
																setNewEmail1(
																	e.target
																		.value
																);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="fas fa-envelope" />
															</span>
														</span>
													</div>
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type="email"
															placeholder="Confirm New Email"
															value={newEmail2.toLowerCase()}
															onChange={(e) => {
																setNewEmail2(
																	e.target
																		.value
																);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="fas fa-envelope" />
															</span>
														</span>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-12 mb-0">
													<div className="d-grid">
														<button
															onClick={(e) => {
																setLoading(
																	true
																);
																changeEmail(e);
															}}
															className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
															disabled={
																loading
																	? true
																	: false
															}
														>
															{loading ? (
																<DataLoader2 />
															) : (
																"Confirm"
															)}
														</button>
													</div>
												</div>
											</div>
										</form>
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
