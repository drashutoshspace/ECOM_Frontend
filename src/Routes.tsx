import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { toast } from "react-toastify";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import TermsCond from "./Pages/TnC";
import CancRef from "./Pages/CnR";
import PrivPol from "./Pages/PrivP";
import Faqs from "./Pages/Faqs";
import Profile from "./Pages/ProfilePages/Profile";
import RepBug from "./Pages/RepBug";
import Feedback from "./Pages/Feedback";
import NotFound404 from "./Pages/NotFound404/NotFound404";
import LoginPage from "./Pages/AuthPages/LoginPage";
import { useEffect, useState, useContext } from "react";
import { isAuthenticated, signout } from "./helpers/auth/authentication";
import VerifyEmail from "./Pages/AuthPages/VerifyEmail";
import PasswordReset from "./Pages/AuthPages/PasswordReset";
import PasswordResetConfirm from "./Pages/AuthPages/PasswordResetConfirm";
import PrivateRoutes from "./helpers/auth/PrivateRoutes";
import { profileData } from "./data/users/profileData";
import { BaseContext, TestimonialsContext, ProductsContext } from "./Context";
import AllProducts from "./Pages/EcommercePages/AllProducts";
import CartPage from "./Pages/EcommercePages/CartPage";
import ProductSingle from "./Pages/EcommercePages/ProductSingle";
import PreLoader from "./PreLoader";
import Checkout from "./Pages/EcommercePages/Checkout";
import { categoryWiseProducts, productsCategory } from "../src/data/products/products";
import { MyOrder } from "../src/data/users/myOrders";
import { ourteamdata } from "../src/data/others/ourteam";
import { cnrdata } from "../src/data/others/cnr";
import { faqdata } from "../src/data/others/faq";
import { privpdata } from "../src/data/others/privp";
import { tncdata } from "../src/data/others/tnc";
import { useCookies } from "react-cookie";
import { WishlistContext } from "./Contexts/WishlistContext";
import SearchPage from "./Pages/SearchPage";
import { CartContext } from "./Contexts/CartContext";
import Testimonials from "./Pages/Testimonials";
import Policies from "./Pages/Policies";
import VerifyEmailConfirm from "./Pages/AuthPages/VerifyEmailConfirm";
const Routes = () => {
	// ANCHOR Contexts
	const { wishlistItems, updateWishlistOnAuth } = useContext(WishlistContext);
	const { updateCartOnAuth } = useContext(CartContext);

	// ANCHOR Local Storage For Cart
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			if (localStorage.getItem("cart")) {
				JSON.parse(localStorage.getItem("cart")).products.map((item) => {
					if (item.userID === undefined || item.product === undefined || item.quantity === undefined) {
						localStorage.removeItem("cart");
					}
				});
			}
		}
		return () => {
			mounted = false;
		};
	}, [localStorage.getItem("cart")]);

	// ANCHOR Local Storage For Wishlist
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			localStorage.getItem("wishlist") &&
				JSON.parse(localStorage.getItem("wishlist")).products.map((item) => {
					if (item.userID === undefined || item.product === undefined) {
						localStorage.removeItem("wishlist");
					}
				});
		}
		return () => {
			mounted = false;
		};
	}, [localStorage.getItem("wishlist")]);

	// ANCHOR Local Storage For Order Details
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			localStorage.getItem("orderdetail") &&
				JSON.parse(localStorage.getItem("orderdetail"))?.orderdetailItems.map((item) => {
					if (item.userID === undefined || item.products === undefined || item.order_id === undefined) {
						localStorage.removeItem("orderdetail");
					}
				});
		}
		return () => {
			mounted = false;
		};
	}, [localStorage.getItem("orderdetail")]);

	// ANCHOR User & Auth
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const logoutUser = (event) => {
		event.preventDefault();
		signout((data) => {
			removeCookie("user", { path: "/" });
			return toast(data?.detail, { type: "success", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		});
	};
	useEffect(() => {
		if (isAuthenticated()) {
			profileData((statusText, status) => {
				if (status === 403 || status === 401) {
					localStorage.removeItem("token");
					removeCookie("user", { path: "/" });
					handleNotification(`Something went wrong! Status: ${statusText}`, "error");
				}
			}).then((data) => {
				setCookie("user", data, { path: "/" });
				updateCartOnAuth(data?.[0]?.id);
				updateWishlistOnAuth(data?.[0]?.id);
			});
		} else {
			updateCartOnAuth(null);
			updateWishlistOnAuth(null);
			removeCookie("user", { path: "/" });
		}
	}, [isAuthenticated()]);
	function requireAuth(nextState, replace, next) {
		if (!(isAuthenticated() && cookies.user)) {
			replace({
				pathname: "/signin",
				state: { nextPathname: nextState.location.pathname },
			});
		}
		next();
	}

	// ANCHOR Notifications
	const [notification, setNotification] = useState("");
	const [notificationType, setNotificationType] = useState("");
	const [toggleNotification, setToggleNotification] = useState(false);
	const handleNotification = (message, type) => {
		setNotification(message);
		setNotificationType(type);
		setToggleNotification(!toggleNotification);
	};
	useEffect(() => {
		if (notificationType === "success") {
			return toast(notification, { type: "success", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
		if (notificationType === "error") {
			return toast(notification, { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
		if (notificationType === "warning") {
			return toast(notification, { type: "warning", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
	}, [toggleNotification]);

	// ANCHOR Testimonials
	const [testimonials, setTestimonials] = useState([]);
	const handleTestimonials = (list) => {
		setTestimonials(list);
	};

	// ANCHOR Remember Me
	const [rememberMe, setRememberMe] = useState(true);
	const handleRememberMe = (e) => {
		// e.preventDefault();
		const input = e.target;
		const value = input.type === "checkbox" ? input.checked : input.value;
		setRememberMe(value);
	};
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			if (!rememberMe) {
				// window.addEventListener("beforeunload", alertUser);
				window.addEventListener("unload", signout);
				return () => {
					// window.removeEventListener("beforeunload", alertUser);
					window.removeEventListener("unload", signout);
				};
			}
		}
		return () => {
			mounted = false;
		};
	});

	// ANCHOR Products
	const [allProducts, setAllProducts] = useState([]);
	const [product, setProduct] = useState({});
	const handleAllProducts = (list) => {
		setAllProducts(list);
	};
	const findProduct = (data) => {
		setProduct(data);
	};

	// ANCHOR Categorywise Products
	const selectProducts = async (category, PER_PAGE, offset, next) => {
		await categoryWiseProducts(category, PER_PAGE, offset, (data) => {
			handleAllProducts(data?.results);
			next(data);
		});
	};
	const [allProductCategories, setAllProductCategories] = useState([]);
	const handleAllProductCategories = (list) => {
		setAllProductCategories(list);
	};
	useEffect(async () => {
		await productsCategory((data) => {
			handleAllProductCategories(data);
		});
	}, []);

	const [myOrders, setMyOrders] = useState([]);
	useEffect(async () => {
		if (isAuthenticated()) {
			await MyOrder((data) => {
				setMyOrders(data);
			});
		}
	}, [isAuthenticated()]);

	// ANCHOR Search Results
	const [searchResults, setSearchResults] = useState([]);

	// ANCHOR Our Team
	const [ourTeam, setOurTeam] = useState([]);
	useEffect(async () => {
		await ourteamdata((data) => {
			setOurTeam(data);
		});
	}, []);

	// ANCHOR CNR
	const [cnrDoc, setCnrDoc] = useState([]);
	useEffect(async () => {
		await cnrdata((data) => {
			setCnrDoc(data);
		});
	}, []);

	// ANCHOR FAQ
	const [faqDoc, setFaqDoc] = useState([]);
	useEffect(async () => {
		await faqdata((data) => {
			setFaqDoc(data);
		});
	}, []);

	// ANCHOR PrivP
	const [privpDoc, setPrivpDoc] = useState([]);
	useEffect(async () => {
		await privpdata((data) => {
			setPrivpDoc(data);
		});
	}, []);

	// ANCHOR TNC
	const [tncDoc, setTncDoc] = useState([]);
	useEffect(async () => {
		await tncdata((data) => {
			setTncDoc(data);
		});
	}, []);
	return (
		<>
			<BaseContext.Provider
				value={{
					logoutUser,
					notification,
					notificationType,
					handleNotification,
					allProductCategories,
					myOrders,
					setMyOrders,
					cookies,
					setCookie,
					setSearchResults,
				}}
			>
				<BrowserRouter>
					<Switch>
						<Route
							path="/"
							exact={true}
							render={() => (
								<ProductsContext.Provider
									value={{
										product,
										handleAllProducts,
										allProducts,
										findProduct,
									}}
								>
									<TestimonialsContext.Provider
										value={{
											testimonials,
											handleTestimonials,
										}}
									>
										{!!!sessionStorage.getItem("loader") ? <PreLoader /> : <Home />}
									</TestimonialsContext.Provider>
								</ProductsContext.Provider>
							)}
						/>
						<Route path="/signin" exact={true} render={() => <LoginPage rememberMe={rememberMe} handleRememberMe={handleRememberMe} />} />
						<Route
							path="/shop/:category"
							exact={true}
							render={(props) => (
								<ProductsContext.Provider
									value={{
										product,
										handleAllProducts,
										allProducts,
										findProduct,
										selectProducts,
									}}
								>
									<AllProducts {...props} />
								</ProductsContext.Provider>
							)}
						/>
						<PrivateRoutes path="/checkout" exact={true} component={Checkout} />
						<PrivateRoutes path="/cart" exact={true} component={CartPage} />
						<Route
							path="/shop/products/:id"
							exact={true}
							render={(props) => (
								<ProductsContext.Provider
									value={{
										product,
										handleAllProducts,
										allProducts,
										findProduct,
									}}
								>
									<ProductSingle {...props} />
								</ProductsContext.Provider>
							)}
						/>
						<Route
							path="/aboutus"
							exact={true}
							render={() => (
								<TestimonialsContext.Provider
									value={{
										testimonials,
										handleTestimonials,
									}}
								>
									<AboutUs ourTeam={ourTeam} />
								</TestimonialsContext.Provider>
							)}
						/>
						<Route path="/emailconfirm" exact={true} component={VerifyEmailConfirm} />
						<Route path="/testimonials" exact={true} render={() => <Testimonials handleTestimonials={handleTestimonials} testimonials={testimonials} />} />
						<Route path="/searchresults/:input" exact={true} render={(props) => <SearchPage {...props} searchResults={searchResults} setSearchResults={setSearchResults} />} />
						<Route path="/contactus" exact={true} component={ContactUs} />
						<Route path="/policiesandfaqs" exact={true} component={Policies} />
						<Route path="/termsandconditions" exact={true} render={() => <TermsCond tncDoc={tncDoc} />} />
						<Route path="/cancellationandrefunds" exact={true} render={() => <CancRef cnrDoc={cnrDoc} />} />
						<Route path="/privacypolicy" exact={true} render={() => <PrivPol privpDoc={privpDoc} />} />
						<Route path="/faqs" exact={true} render={() => <Faqs faqDoc={faqDoc} />} />
						<Route path="/reportabug" exact={true} component={RepBug} />
						<Route path="/feedback" exact={true} component={Feedback} />
						<Route path="/auth/forgot-password" exact={true} component={PasswordReset} />
						<Route path="/auth/password/reset/confirm/:params" exact={true} render={() => <PasswordResetConfirm />} />
						<Route path="/auth/verify-email/:key" exact={true} render={() => <VerifyEmail />} />
						<PrivateRoutes path="/profile/:option" component={Profile} exact={true} onEnter={requireAuth} />
						<PrivateRoutes path="/profile/orderdetail/:id" component={Profile} exact={true} onEnter={requireAuth} />
						<Route component={NotFound404} exact={true} />
					</Switch>
				</BrowserRouter>
			</BaseContext.Provider>
		</>
	);
};
export default Routes;
