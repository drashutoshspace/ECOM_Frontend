import React, { Fragment, useContext } from "react";
import { Media, Container, Row, Col, Input, Form, Button } from "reactstrap";
import CartContext from "../../../helpers/cart";
import logo from "../../../public/assets/images/icon/logo.png";
import like from "../../../public/assets/images/icon/like.png";
import user from "../../../public/assets/images/icon/users.png";
import Link from "next/link";
import search from "../../../public/assets/images/icon/search.png";
import settings from "../../../public/assets/images/icon/setting.png";
import cart from "../../../public/assets/images/icon/shopping-cart.png";
import CartContainer from "../../containers/CartContainer";
import SearchOverlay from "./search-overlay";
const IconTopbar = () => {
	const context = useContext(CartContext);
	const openNav = () => {
		var openmylside = document.getElementById("mySidenav");
		if (openmylside) {
			openmylside.classList.add("open-side");
		}
	};

	const openSearch = () => {
		document.getElementById("search-overlay").style.display = "block";
	};

	const closeSearch = () => {
		document.getElementById("search-overlay").style.display = "none";
	};

	const cartList = context.state;
	const total = context.cartTotal;
	const symbol = "$";
	return (
		<Fragment>
			<div className="top-header">
				<Container>
					<Row className="main-menu">
						<Col sm="6">
							<div className="header-contact">
								<ul>
									<li>Welcome to Our Store</li>
									<li>
										<i
											className="fa fa-phone"
											aria-hidden="true"
										></i>
										Call Us: +91-011-44-45-9085
									</li>
								</ul>
							</div>
							<div className="menu-left">
								<div className="navbar">
									<a href={null} onClick={openNav}>
										<div className="bar-style">
											<i
												className="fa fa-bars sidebar-bar"
												aria-hidden="true"
											></i>
										</div>
									</a>
								</div>
								<div className="brand-logo mobile-logo">
									<a href={null}>
										<Media
											src={logo.src}
											className="img-fluid blur-up lazyload"
											alt=""
										/>
									</a>
								</div>
							</div>
						</Col>
						<Col sm="6">
							<div className="menu-right pull-right">
								<ul className="header-dropdown">
									<li className="d-inline-block">
										<a
											href="https://www.facebook.com/profile.php?id=100086897816897"
											rel="noopener noreferrer"
											target="_blank"
										>
											<img
												className="hvr-icon"
												height="20px"
												alt="Facebook"
												src="/assets/Logo/FB_Logo.svg"
											/>
										</a>
									</li>
									<li className="d-inline-block">
										<a
											href="https://instagram.com/meemokidz?igshid=YmMyMTA2M2Y="
											rel="noopener noreferrer"
											target="_blank"
										>
											<img
												className="hvr-icon"
												height="20px"
												alt="Instagram"
												src="/assets/Logo/Instagram_Logo.svg"
											/>
										</a>
									</li>
									<li className="d-inline-block">
												<a
													href="https://api.whatsapp.com/send?phone=919910446228"
													rel="noopener noreferrer"
													target="_blank"
												>
													<img
														className="hvr-icon"
														height="20px"
														alt="WhatsApp"
														src="/assets/Logo/WA_Logo.svg"
													/>
												</a>
											</li>
									{/* <li className="mobile-wishlist">
										<Link href="/page/account/wishlist">
											<a>
												<i
													className="fa fa-heart"
													aria-hidden="true"
												></i>
												<Media src={like.src} alt="" />
											</a>
										</Link>
									</li>
									<li className="onhover-dropdown mobile-account">
										<Media src={user.src} alt="" />
										<i
											className="fa fa-user"
											aria-hidden="true"
										></i>
										<ul className="onhover-show-div">
											<li>
												<Link href="/page/account/login">
													<a data-lng="en">Login</a>
												</Link>
											</li>
											<li>
												<Link href="/">
													<a data-lng="es">Logout</a>
												</Link>
											</li>
										</ul>
									</li> */}
								</ul>
								<div>
									<div className="icon-nav">
										<ul>
											<li className="onhover-div mobile-search">
												<div>
													<Media
														src={search.src}
														onClick={openSearch}
														className="img-fluid"
														alt=""
													/>
													<i
														className="fa fa-search"
														onClick={openSearch}
													></i>
												</div>
											</li>
											{/*Header Cart Component */}
											<CartContainer icon={cart.src} />
										</ul>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<SearchOverlay />
		</Fragment>
	);
};

export default IconTopbar;
