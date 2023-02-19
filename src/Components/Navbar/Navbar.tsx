import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "hover.css";
import { isAuthenticated } from "../../helpers/auth/authentication";
import { BaseContext } from "../../Context";
import "../../../node_modules/hamburgers/dist/hamburgers.min.css";
import { CartContext } from "../../Contexts/CartContext";
import { WishlistContext } from "../../Contexts/WishlistContext";
import { useMediaQuery } from "react-responsive";
const Navbar = () => {
	const { logoutUser, cookies }: any = useContext(BaseContext);
	const { allItemsCount, cartItems } = useContext(CartContext);
	const { productsCount } = useContext(WishlistContext);
	const { allProductCategories }: any = useContext(BaseContext);
	const [isToggled, setIsToggled] = useState(false);
	const navigate = useNavigate();
	const navbarToggler = () => {
		setIsToggled(!isToggled);
	};
	const logoutUser2 = (event: any) => {
		logoutUser(event);
		navigate("/signin");
	};
	const location = useLocation();
	useEffect(() => {
		if (location.hash) {
			let elem = document.getElementById(location.hash.slice(1));
			if (elem) {
				elem.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	}, [location]);
	function truncate(str: any, n: any) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	// ANCHOR Search Results Code
	const [mySearchInput, setMySearchInput] = useState("");
	useEffect(() => {
		if (location.pathname.includes("searchresults")) {
			setMySearchInput(location.pathname.split("/").reverse()[0] || "");
		}
	}, []);
	const mySearch = (event: any, searchInput: any) => {
		event.preventDefault();
		navigate(`/searchresults/${searchInput}`);
	};
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	const [onHoverDropdown1, setOnHoverDropdown1] = useState(false);
	var dropdownToggle1 = useRef<HTMLDivElement>(null);
	const [onHoverDropdown2, setOnHoverDropdown2] = useState(false);
	var dropdownToggle2 = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (
			isDesktopOrLaptop &&
			dropdownToggle1.current &&
			dropdownToggle2.current
		) {
			const mouseOver1 = () => {
				setOnHoverDropdown1(true);
			};
			const mouseLeave1 = () => {
				setOnHoverDropdown1(false);
			};
			dropdownToggle1.current.addEventListener("mouseover", mouseOver1);
			dropdownToggle1.current.addEventListener("mouseleave", mouseLeave1);
			const mouseOver2 = () => {
				setOnHoverDropdown2(true);
			};
			const mouseLeave2 = () => {
				setOnHoverDropdown2(false);
			};
			dropdownToggle2.current.addEventListener("mouseover", mouseOver2);
			dropdownToggle2.current.addEventListener("mouseleave", mouseLeave2);
			if (dropdownToggle1 === null && dropdownToggle2 === null) {
				return () => {
					removeEventListener("mouseover", mouseOver1);
					removeEventListener("mouseleave", mouseLeave1);
					removeEventListener("mouseover", mouseOver2);
					removeEventListener("mouseleave", mouseLeave2);
				};
			}
		}
	});
	const [onHoverDropdown3, setOnHoverDropdown3] = useState(false);
	var dropdownToggle3 = useRef<HTMLDivElement>(null);
	var dropdownToggle4 = useRef<HTMLUListElement>(null);
	useEffect(() => {
		if (isDesktopOrLaptop && isAuthenticated() && dropdownToggle3.current) {
			const mouseOver3 = () => {
				setOnHoverDropdown3(true);
			};
			const mouseLeave3 = () => {
				setOnHoverDropdown3(false);
			};
			dropdownToggle3.current.addEventListener("mouseover", mouseOver3);
			dropdownToggle3.current.addEventListener("mouseleave", mouseLeave3);
			if (dropdownToggle3 === null) {
				return () => {
					removeEventListener("mouseover", mouseOver3);
					removeEventListener("mouseleave", mouseLeave3);
				};
			}
		}
		if (isDesktopOrLaptop && isAuthenticated() && dropdownToggle4.current) {
			const mouseOver3 = () => {
				setOnHoverDropdown3(true);
			};
			const mouseLeave3 = () => {
				setOnHoverDropdown3(false);
			};
			dropdownToggle4.current.addEventListener("mouseover", mouseOver3);
			dropdownToggle4.current.addEventListener("mouseleave", mouseLeave3);
			if (dropdownToggle4 === null) {
				return () => {
					removeEventListener("mouseover", mouseOver3);
					removeEventListener("mouseleave", mouseLeave3);
				};
			}
		}
	});
	return (
		<>
			{isDesktopOrLaptop && (
				<nav className="navbar navbar-expand-lg justify-content-between px-5">
					<Link to="/">
						<img
							className="brandlogo"
							alt="MeeMo Kidz Logo"
							src="images/Brand_Logo.png"
						/>
					</Link>
					<div className="nav-item ms-1 w-25 pe-0 my-3">
						<form className="d-flex justify-content-between">
							<input
								className="py-2 px-3 colorblue rounded-pill d-inline-block fontsize12"
								id="mysearch"
								type="search"
								placeholder="Search..."
								aria-label="Search"
								style={{ width: "86%" }}
								value={mySearchInput}
								onChange={(e) => {
									setMySearchInput(e.target.value);
								}}
							/>
							<button
								className="colorblue ms-2 lightbluehover fontsize14 bgcolorwhite rounded-circle hvr-icon-grow"
								id="mysearchbutton"
								type="submit"
								style={{ width: "36px", height: "36px" }}
								onClick={(e) => {
									mySearch(e, mySearchInput);
								}}
							>
								<i className="fas fa-search hvr-icon" />
							</button>
						</form>
					</div>
					<div className="nav-item align-items-center my-3">
						<Link
							className="nav-link underlineanimation fontsize14 colorblue text-uppercase lightbluehover hvr-icon-grow"
							to="/"
						>
							<i className="fas fa-home hvr-icon" />
							&nbsp;&nbsp;Home
						</Link>
					</div>
					<div
						className="nav-item dropdown align-items-center my-3"
						onClick={() => {
							setOnHoverDropdown1(!onHoverDropdown1);
						}}
						ref={dropdownToggle1}
					>
						<Link
							to=""
							onClick={() => {
								navigate("/shop/allproducts");
							}}
							className={
								onHoverDropdown1
									? "nav-link underlineanimation fontsize14 colorblue text-uppercase lightbluehover hvr-icon-grow dropdown-toggle show"
									: "nav-link underlineanimation fontsize14 colorblue text-uppercase lightbluehover hvr-icon-grow dropdown-toggle"
							}
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded={onHoverDropdown1}
						>
							<i className="fas fa-store hvr-icon" />
							&nbsp;&nbsp;Shop &nbsp;
							<i className="fas fa-caret-down hvr-icon" />
						</Link>
						<ul
							className={
								onHoverDropdown1
									? "dropdown-menu mt-0 pt-4 ms-2 border5px animate slideIn border-0 show"
									: "dropdown-menu mt-0 pt-4 ms-2 border5px animate slideIn border-0"
							}
							id="mydropdownitem"
							aria-labelledby="navbarDropdown"
							data-bs-popper={onHoverDropdown1 ? "none" : ""}
						>
							<li>
								<Link
									to="/shop/allproducts"
									className={
										location.pathname.includes(
											"/shop/allproducts"
										)
											? "colorblue fontsize14 bgyellow dropdown-item"
											: "colorblue fontsize14 lightbluehover dropdown-item"
									}
								>
									&nbsp;&nbsp;All Products
								</Link>
							</li>
							{allProductCategories.map(
								(item: any, index: any) => {
									return (
										<li key={index}>
											<Link
												to={`/shop/${item.category}`}
												className={
													location.pathname.includes(
														`/shop/${item.category}`
													)
														? "colorblue fontsize14 bgyellow dropdown-item"
														: "colorblue fontsize14 lightbluehover dropdown-item"
												}
											>
												&nbsp;&nbsp;{item.category}
											</Link>
										</li>
									);
								}
							)}
						</ul>
					</div>
					<div
						className="nav-item dropdown align-items-center my-3"
						onClick={() => {
							setOnHoverDropdown2(!onHoverDropdown2);
						}}
						ref={dropdownToggle2}
					>
						<Link
							to=""
							onClick={() => navigate("/cart")}
							className={
								onHoverDropdown2
									? "nav-link underlineanimation fontsize14 colorblue text-uppercase lightbluehover hvr-icon-grow dropdown-toggle show"
									: "nav-link underlineanimation fontsize14 colorblue text-uppercase lightbluehover hvr-icon-grow dropdown-toggle"
							}
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded={onHoverDropdown2}
						>
							<i className="fas fa-shopping-cart hvr-icon" />
							{isAuthenticated() && allItemsCount > 0 && (
								<span className="topnumbercart">
									{allItemsCount}
								</span>
							)}
							&nbsp;&nbsp;Cart &nbsp;
							<i className="fas fa-caret-down hvr-icon" />
						</Link>
						<ul
							className={
								onHoverDropdown2
									? `dropdown-menu dropdown-menu-end mt-0 pt-4 ms-2 border5px animate slideIn border-0 show ${
											cartItems.products.length > 0 &&
											isAuthenticated()
												? "cartdropdown"
												: ""
									  }`
									: "dropdown-menu dropdown-menu-end mt-0 pt-4 ms-2 border5px animate slideIn border-0"
							}
							id="mydropdownitem"
							aria-labelledby="navbarDropdown"
							data-bs-popper={onHoverDropdown2 ? "none" : ""}
						>
							{!isAuthenticated() && (
								<li>
									<div
										style={{ width: "200px" }}
										className="mb-0 px-3 py-1 colorblue fontsize14"
									>
										Your cart is empty. Sign in to start
										learning!
									</div>
								</li>
							)}
							{cartItems.products.filter(
								(item: any) =>
									item.userID === cookies?.user?.[0]?.id
							).length > 0 && (
								<li>
									<div className="row px-4">
										{cartItems.products.filter(
											(item: any) =>
												item.userID ===
												cookies?.user?.[0].id
										).length > 0 && (
											<div
												className={`${
													cartItems.products.filter(
														(item: any) =>
															item.userID ===
															cookies?.user?.[0]
																?.id
													).length > 0 && "col-lg-12"
												}`}
											>
												<div className="row">
													<div className="col">
														<h5 className="colorblue">
															Products
														</h5>
													</div>
												</div>
												{cartItems?.products
													.filter(
														(item: any) =>
															item.userID ===
															cookies?.user?.[0]
																?.id
													)
													.slice(0, 3)
													.map(
														(
															item: any,
															index: any
														) => {
															const { product } =
																item;
															return (
																<div
																	key={index}
																	className="row"
																>
																	<div className="col">
																		<h6 className="colorblue fontsize12">{`${truncate(
																			product.Product_Name,
																			20
																		)} = ₹ ${(Math.abs(
																			parseInt(
																				product?.Product_SellingPrice
																			) -
																				parseFloat(
																					product?.Product_SellingPrice
																				)
																		) > 0.5
																			? parseInt(
																					product?.Product_SellingPrice
																			  ) +
																			  1
																			: parseInt(
																					product?.Product_SellingPrice
																			  )
																		).toLocaleString(
																			undefined,
																			{
																				maximumFractionDigits: 2,
																			}
																		)}`}</h6>
																	</div>
																</div>
															);
														}
													)}
											</div>
										)}
										{cartItems?.products.filter(
											(item: any) =>
												item.userID ===
												cookies?.user?.[0]?.id
										).length >= 4 && (
											<>
												<li>
													<hr className="mt-0 dropdown-divider dropdowndividernav" />
												</li>
												<h6
													className="mb-0 colorblue lightbluehover cursorpointer fontsize12"
													onClick={() =>
														navigate("/cart")
													}
												>
													Click Here To See Rest Of
													The Items
												</h6>
											</>
										)}
									</div>
								</li>
							)}
						</ul>
					</div>
					{isAuthenticated() ? (
						<div
							className="nav-item dropdown align-items-center my-3"
							onClick={() => {
								setOnHoverDropdown3(!onHoverDropdown3);
							}}
							ref={dropdownToggle3}
						>
							<Link
								to=""
								className={
									onHoverDropdown3
										? "nav-link underlineanimation text-capitalize fontsize14 colorblue lightbluehover hvr-icon-grow dropdown-toggle show"
										: "nav-link underlineanimation text-capitalize fontsize14 colorblue lightbluehover hvr-icon-grow dropdown-toggle"
								}
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded={onHoverDropdown3}
							>
								<i className="fas fa-user hvr-icon" />
								&nbsp;&nbsp;Hi,{" "}
								{truncate(
									cookies?.user?.[0]?.first_name !== ""
										? cookies?.user?.[0]?.first_name
										: cookies?.user?.[0]?.username ||
												"User",
									10
								)}
								&nbsp;
								<i className="fas fa-caret-down hvr-icon" />
							</Link>
							<ul
								ref={dropdownToggle4}
								className={
									onHoverDropdown3
										? "dropdown-menu mt-0 pt-4 ms-2 border5px animate slideIn border-0 show"
										: "dropdown-menu mt-0 pt-4 ms-2 border5px animate slideIn border-0"
								}
								id="mydropdownitem"
								aria-labelledby="navbarDropdown"
								data-bs-popper={onHoverDropdown3 ? "none" : ""}
							>
								<li>
									<Link
										to="/profile/account"
										className="colorblue fontsize12 lightbluehover dropdown-item"
									>
										<i className="fas fa-user" />
										&nbsp;&nbsp;Account
									</Link>
								</li>
								<li>
									<hr className="dropdown-divider dropdowndividernav" />
								</li>
								<li>
									<Link
										to="/profile/myorders"
										className="colorblue fontsize12 lightbluehover dropdown-item"
									>
										<i className="fas fa-shopping-cart" />
										&nbsp;&nbsp;My Orders
									</Link>
								</li>
								<li>
									<Link
										to="/profile/productwishlist"
										className="colorblue fontsize12 lightbluehover dropdown-item"
									>
										<i className="fas fa-box-heart" />
										<span className="topnumbercart">
											{productsCount}
										</span>
										&nbsp;&nbsp;Product Wishlist
									</Link>
								</li>
								<li>
									<Link
										to="/profile/buyagain"
										className="colorblue fontsize12 lightbluehover dropdown-item"
									>
										<i className="fas fa-cart-plus" />
										&nbsp;&nbsp;Buy Again
									</Link>
								</li>
								<li>
									<hr className="dropdown-divider dropdowndividernav" />
								</li>
								{!!!cookies?.user?.[0]?.is_social && (
									<>
										<li>
											<Link
												to="/profile/changepassword"
												className="colorblue fontsize14 lightbluehover dropdown-item"
											>
												<i className="fas fa-lock" />
												&nbsp;&nbsp;Change Password
											</Link>
										</li>
										<li>
											<Link
												to="/profile/changeemail"
												className="colorblue fontsize14 lightbluehover dropdown-item"
											>
												<i className="fas fa-envelope" />
												&nbsp;&nbsp;Change Email
											</Link>
										</li>
									</>
								)}
								<li>
									<small
										className="cursorpointer colorblue fontsize14 lightbluehover dropdown-item"
										onClick={logoutUser2}
									>
										<i className="fas fa-portal-exit" />
										&nbsp;&nbsp;Sign Out
									</small>
								</li>
							</ul>
						</div>
					) : (
						<div className="nav-item align-items-center my-3">
							<Link
								className="nav-link transitionease fontsize14 bglightblue bgyellow text-uppercase border5px colorblue"
								to="/signin"
							>
								Login / Signup
							</Link>
						</div>
					)}
				</nav>
			)}
			{isTabletOrMobile && (
				<nav className="navbar navbar-expand-lg py-3 justify-content-center">
					<button
						className={
							isToggled
								? "hamburger hamburger--slider is-active navbar-toggler position-absolute m-0 p-0"
								: "hamburger hamburger--slider navbar-toggler position-absolute m-0 p-0"
						}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#myown-nav"
						aria-controls="myown-nav"
						aria-expanded={isToggled ? "false" : "true"}
						aria-label="Toggle navigation"
						onClick={navbarToggler}
					>
						<span className="hamburger-box">
							<span className="hamburger-inner" />
						</span>
					</button>
					<Link className="ms-4 ps-5" to="/">
						<img
							className="brandlogo"
							alt="MeeMo Kidz Logo"
							src="images/Brand_Logo.png"
						/>
					</Link>
					<div className="collapse navbar-collapse" id="myown-nav">
						<ul className="navbar-nav px-3">
							<li className="nav-item px-4 mt-4 mb-2">
								<form className="w-100 d-flex justify-content-between">
									<input
										className="py-2 px-3 colorblue rounded-pill d-inline-block fontsize12"
										id="mysearch"
										type="search"
										placeholder="Search..."
										aria-label="Search"
										style={{ width: "86%" }}
										value={mySearchInput}
										onChange={(e) => {
											setMySearchInput(e.target.value);
										}}
									/>
									<button
										className="colorblue lightbluehover fontsize12 bgcolorwhite rounded-circle hvr-icon-grow"
										id="mysearchbutton"
										type="submit"
										style={{
											width: "36px",
											height: "36px",
										}}
										onClick={(e) => {
											mySearch(e, mySearchInput);
										}}
									>
										<i className="fas fa-search hvr-icon" />
									</button>
								</form>
							</li>
							<li className="nav-item px-4 my-1">
								<Link
									className="nav-link fontsize12 p-1 text-uppercase colorblue lightbluehover hvr-icon-grow"
									to="/"
								>
									<i className="fas fa-home hvr-icon" />
									&nbsp;&nbsp;Home
								</Link>
							</li>
							<li className="nav-item dropdown px-4 my-1">
								<Link
									to=""
									className="nav-link fontsize12 p-1 text-uppercase colorblue lightbluehover hvr-icon-grow dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i className="fas fa-store hvr-icon" />
									&nbsp;&nbsp;Shop
								</Link>
								<ul
									className="dropdown-menu border5px border-0"
									id="mydropdownitem"
									aria-labelledby="navbarDropdown"
								>
									<li>
										<Link
											to="/shop/allproducts"
											className={
												location.pathname.includes(
													"/shop/allproducts"
												)
													? "colorblue fontsize14 bgyellow dropdown-item"
													: "colorblue fontsize14 lightbluehover dropdown-item"
											}
										>
											&nbsp;&nbsp;All Products
										</Link>
									</li>
									{allProductCategories.map(
										(item: any, index: any) => {
											return (
												<li key={index}>
													<Link
														to={`/shop/${item.category}`}
														className={
															location.pathname.includes(
																`/shop/${item.category}`
															)
																? "colorblue fontsize14 bgyellow dropdown-item"
																: "colorblue fontsize14 lightbluehover dropdown-item"
														}
													>
														&nbsp;&nbsp;
														{item.category}
													</Link>
												</li>
											);
										}
									)}
								</ul>
							</li>
							<li className="nav-item dropdown px-4 my-1">
								<Link
									to=""
									className="nav-link fontsize12 p-1 text-uppercase colorblue lightbluehover hvr-icon-grow dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i className="fas fa-shopping-cart hvr-icon" />
									{isAuthenticated() && allItemsCount > 0 && (
										<span className="topnumbercart">
											{allItemsCount}
										</span>
									)}
									&nbsp;&nbsp;Cart
								</Link>
								<ul
									className="dropdown-menu border5px border-0 cartdropdown"
									id="mydropdownitem"
									aria-labelledby="navbarDropdown"
								>
									{cartItems.products.length > 0 && (
										<li>
											<div className="row px-4">
												<div className="col-lg-12">
													<div className="row">
														<div className="col">
															<h5 className="colorblue">
																Products
															</h5>
														</div>
													</div>
													{cartItems?.products
														.filter(
															(item: any) =>
																item.userID ===
																cookies
																	?.user?.[0]
																	?.id
														)
														.slice(0, 3)
														.map(
															(
																item: any,
																index: any
															) => {
																const {
																	product,
																} = item;
																return (
																	<div
																		key={
																			index
																		}
																		className="row"
																	>
																		<div className="col">
																			<h6 className="colorblue fontsize12">{`${truncate(
																				product.Product_Name,
																				20
																			)} = ₹ ${(Math.abs(
																				parseInt(
																					product?.Product_SellingPrice
																				) -
																					parseFloat(
																						product?.Product_SellingPrice
																					)
																			) >
																			0.5
																				? parseInt(
																						product?.Product_SellingPrice
																				  ) +
																				  1
																				: parseInt(
																						product?.Product_SellingPrice
																				  )
																			).toLocaleString(
																				undefined,
																				{
																					maximumFractionDigits: 2,
																				}
																			)}`}</h6>
																		</div>
																	</div>
																);
															}
														)}
												</div>
											</div>
										</li>
									)}
									{cartItems.products.filter(
										(item: any) =>
											item.userID ===
											cookies?.user?.[0]?.id
									).length > 0 && (
										<>
											<li>
												<hr className="dropdown-divider dropdowndividernav" />
											</li>
											<li>
												<Link
													to="/cart"
													className="colorblue fontsize12 lightbluehover dropdown-item"
												>
													<i className="fas fa-shopping-cart" />
													&nbsp;&nbsp;
													{cartItems?.products.filter(
														(item: any) =>
															item.userID ===
															cookies?.user?.[0]
																?.id
													).length >= 4
														? "Click Here To See Rest Of The Items"
														: "Cart"}
												</Link>
											</li>
										</>
									)}
								</ul>
							</li>
							{isAuthenticated() ? (
								<li className="nav-item dropdown px-4 my-1">
									<Link
										to=""
										className="nav-link text-capitalize fontsize12 p-1 colorblue lightbluehover hvr-icon-grow dropdown-toggle"
										id="navbarDropdown"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<i className="fas fa-user hvr-icon" />
										&nbsp;&nbsp;Hi,{" "}
										{cookies?.user?.[0]?.first_name !== ""
											? cookies?.user?.[0]?.first_name
											: cookies?.user?.[0]?.username ||
											  "User"}
									</Link>
									<ul
										className="dropdown-menu border5px border-0"
										id="mydropdownitem"
										aria-labelledby="navbarDropdown"
									>
										<li>
											<Link
												to="/profile/account"
												className="colorblue fontsize12 lightbluehover dropdown-item"
											>
												<i className="fas fa-user" />
												&nbsp;&nbsp;Account
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider dropdowndividernav" />
										</li>
										<li>
											<Link
												to="/profile/myorders"
												className="colorblue fontsize12 lightbluehover dropdown-item"
											>
												<i className="fas fa-shopping-cart" />
												&nbsp;&nbsp;My Orders
											</Link>
										</li>
										<li>
											<Link
												to="/profile/productwishlist"
												className="colorblue fontsize12 lightbluehover dropdown-item"
											>
												<i className="fas fa-box-heart" />
												<span className="topnumbercart">
													{productsCount}
												</span>
												&nbsp;&nbsp;Product Wishlist
											</Link>
										</li>
										<li>
											<Link
												to="/profile/buyagain"
												className="colorblue fontsize12 lightbluehover dropdown-item"
											>
												<i className="fas fa-cart-plus" />
												&nbsp;&nbsp;Buy Again
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider dropdowndividernav" />
										</li>
										{!!!cookies?.user?.[0]?.is_social && (
											<>
												<li>
													<Link
														to="/profile/changepassword"
														className="colorblue fontsize12 lightbluehover dropdown-item"
													>
														<i className="fas fa-lock" />
														&nbsp;&nbsp;Change
														Password
													</Link>
												</li>
												<li>
													<Link
														to="/profile/changeemail"
														className="colorblue fontsize12 lightbluehover dropdown-item"
													>
														<i className="fas fa-envelope" />
														&nbsp;&nbsp;Change Email
													</Link>
												</li>
											</>
										)}
										<li>
											<small
												className="cursorpointer colorblue fontsize12 lightbluehover dropdown-item"
												onClick={logoutUser2}
											>
												<i className="fas fa-sign-out-alt" />
												&nbsp;&nbsp;Sign Out
											</small>
										</li>
									</ul>
								</li>
							) : (
								<li className="nav-item px-4 my-1">
									<Link
										className="nav-link w-50 px-2 text-center transitionease fontsize14 bglightblue bgyellow text-uppercase border5px colorblue"
										to="/signin"
									>
										Login / Signup
									</Link>
								</li>
							)}
						</ul>
					</div>
				</nav>
			)}
		</>
	);
};
export default Navbar;
