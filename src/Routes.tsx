import {
	BrowserRouter,
	Route,
	Routes as RouterRoutes,
	Navigate,
} from "react-router-dom";
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
import {
	isAuthenticated,
	signOut,
	profileData,
	userOrders,
} from "./APIs/user/user";
import VerifyEmail from "./Pages/AuthPages/VerifyEmail";
import PasswordReset from "./Pages/AuthPages/PasswordReset";
import PasswordResetConfirm from "./Pages/AuthPages/PasswordResetConfirm";
import { BaseContext, TestimonialsContext, ProductsContext } from "./Context";
import AllProducts from "./Pages/EcommercePages/AllProducts";
import CartPage from "./Pages/EcommercePages/CartPage";
import ProductSingle from "./Pages/EcommercePages/ProductSingle";
import PreLoader from "./PreLoader";
import Checkout from "./Pages/EcommercePages/Checkout";
import {
	categoryWiseProducts,
	productsCategory,
} from "./APIs/ecommerce/ecommerce";
import {
	tncData,
	privacyPolicyData,
	faqData,
	cnrData,
	ourTeamData,
} from "./APIs/misc/misc";
import { useCookies } from "react-cookie";
import { WishlistContext } from "./Contexts/WishlistContext";
import SearchPage from "./Pages/SearchPage";
import { CartContext } from "./Contexts/CartContext";
import Testimonials from "./Pages/Testimonials";
import Policies from "./Pages/Policies";
import VerifyEmailConfirm from "./Pages/AuthPages/VerifyEmailConfirm";
const Routes = () => {
	function PrivateRoute({
		children,
	}: {
		children: JSX.Element;
	}): JSX.Element {
		if (async () => await isAuthenticated()) {
			return children;
		} else {
			return <Navigate to="/signin" replace={true} />;
		}
	}
	// ANCHOR Contexts
	const { wishlistItems, updateWishlistOnAuth }: any =
		useContext(WishlistContext);
	const { updateCartOnAuth }: any = useContext(CartContext);

	// ANCHOR Local Storage For Cart
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			if (localStorage.getItem("cart")) {
				JSON.parse(localStorage.getItem("cart")!).products.map(
					(item: any) => {
						if (
							item.userID === undefined ||
							item.product === undefined ||
							item.quantity === undefined
						) {
							localStorage.removeItem("cart");
						}
					}
				);
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
				JSON.parse(localStorage.getItem("wishlist")!).products.map(
					(item: any) => {
						if (
							item.userID === undefined ||
							item.product === undefined
						) {
							localStorage.removeItem("wishlist");
						}
					}
				);
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
				JSON.parse(
					localStorage.getItem("orderdetail")!
				)?.orderdetailItems.map((item: any) => {
					if (
						item.userID === undefined ||
						item.products === undefined ||
						item.order_id === undefined
					) {
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
	const logoutUser = (event: any) => {
		event.preventDefault();
		signOut((data: any) => {
			removeCookie("user", { path: "/" });
			return toast.success(data?.detail);
		});
	};
	useEffect(() => {
		if (async () => await isAuthenticated()) {
			const getProfileData = async () => {
				await profileData().then((data: any) => {
					// if (status === 403 || status === 401) {
					// 	localStorage.removeItem("token");
					// 	removeCookie("user", { path: "/" });
					// 	handleNotification(
					// 		`Something went wrong! Status: ${statusText}`,
					// 		"error"
					// 	);
					// }
					setCookie("user", data, { path: "/" });
					updateCartOnAuth(data?.[0]?.id);
					updateWishlistOnAuth(data?.[0]?.id);
				});
			};
			getProfileData();
		} else {
			updateCartOnAuth(null);
			updateWishlistOnAuth(null);
			removeCookie("user", { path: "/" });
		}
	}, [async () => await isAuthenticated()]);
	function requireAuth(nextState: any, replace: any, next: any) {
		if (!((async () => await isAuthenticated()) && cookies.user)) {
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
	const handleNotification = (message: any, type: any) => {
		setNotification(message);
		setNotificationType(type);
		setToggleNotification(!toggleNotification);
	};
	useEffect((): any => {
		if (notificationType === "success") {
			return toast.success(notification);
		}
		if (notificationType === "error") {
			return toast.error(notification);
		}
		if (notificationType === "warning") {
			return toast.warning(notification);
		}
	}, [toggleNotification]);

	// ANCHOR Testimonials
	const [testimonials, setTestimonials] = useState([]);
	const handleTestimonials = (list: any) => {
		setTestimonials(list);
	};

	// ANCHOR Remember Me
	const [rememberMe, setRememberMe] = useState(true);
	const handleRememberMe = (e: any) => {
		// e.preventDefault();
		const input = e.target;
		const value = input.type === "checkbox" ? input.checked : input.value;
		setRememberMe(value);
	};
	// useEffect(() => {
	// 	var mounted = true;
	// 	if (mounted) {
	// 		if (!rememberMe) {
	// 			// window.addEventListener("beforeunload", alertUser);
	// 			window.addEventListener("unload", signOut);
	// 			return () => {
	// 				// window.removeEventListener("beforeunload", alertUser);
	// 				window.removeEventListener("unload", signOut);
	// 			};
	// 		}
	// 	}
	// 	return () => {
	// 		mounted = false;
	// 	};
	// });

	// ANCHOR Products
	const [allProducts, setAllProducts] = useState([]);
	const [product, setProduct] = useState({});
	const handleAllProducts = (list: any) => {
		setAllProducts(list);
	};
	const findProduct = (data: any) => {
		setProduct(data);
	};

	// ANCHOR Categorywise Products
	const selectProducts = async (
		category: string,
		limit: number,
		offset: number,
		next: (data: any) => void
	) => {
		await categoryWiseProducts({ limit, offset, category }).then(
			(data: any) => {
				handleAllProducts(data?.results);
				next(data);
			}
		);
	};
	const [allProductCategories, setAllProductCategories] = useState([]);
	const handleAllProductCategories = (list: any) => {
		setAllProductCategories(list);
	};
	useEffect(() => {
		const getProductCategories = async () => {
			await productsCategory().then((data: any) => {
				handleAllProductCategories(data);
			});
		};
		getProductCategories();
	}, []);

	const [myOrders, setMyOrders] = useState([]);
	useEffect(() => {
		if (async () => await isAuthenticated()) {
			const getMyOrders = async () => {
				await userOrders().then((data: any) => {
					setMyOrders(data);
				});
			};
			getMyOrders();
		}
	}, [async () => await isAuthenticated()]);

	// ANCHOR Search Results
	const [searchResults, setSearchResults] = useState([]);

	// ANCHOR Our Team
	const [ourTeam, setOurTeam] = useState([]);
	useEffect(() => {
		const getOurTeamData = async () => {
			await ourTeamData().then((data: any) => {
				setOurTeam(data);
			});
		};
		getOurTeamData();
	}, []);

	// ANCHOR CNR
	const [cnrDoc, setCnrDoc] = useState([]);
	useEffect(() => {
		const getCnr = async () => {
			await cnrData().then((data: any) => {
				setCnrDoc(data);
			});
		};
		getCnr();
	}, []);

	// ANCHOR FAQ
	const [faqDoc, setFaqDoc] = useState([]);
	useEffect(() => {
		const getFaq = async () => {
			await faqData().then((data: any) => {
				setFaqDoc(data);
			});
		};
		getFaq();
	}, []);

	// ANCHOR PrivP
	const [privpDoc, setPrivpDoc] = useState([]);
	useEffect(() => {
		const getPP = async () => {
			await privacyPolicyData().then((data: any) => {
				setPrivpDoc(data);
			});
		};
		getPP();
	}, []);

	// ANCHOR TNC
	const [tncDoc, setTncDoc] = useState([]);
	useEffect(() => {
		const getTnc = async () => {
			await tncData().then((data: any) => {
				setTncDoc(data);
			});
		};
		getTnc();
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
					<RouterRoutes>
						<Route
							path="/"
							element={
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
										{!!!sessionStorage.getItem("loader") ? (
											<PreLoader />
										) : (
											<Home />
										)}
									</TestimonialsContext.Provider>
								</ProductsContext.Provider>
							}
						/>
						<Route
							path="/signin"
							element={
								<LoginPage
									rememberMe={rememberMe}
									handleRememberMe={handleRememberMe}
								/>
							}
						/>
						<Route
							path="/shop/:category"
							element={
								<ProductsContext.Provider
									value={{
										product,
										handleAllProducts,
										allProducts,
										findProduct,
										selectProducts,
									}}
								>
									<AllProducts />
								</ProductsContext.Provider>
							}
						/>
						<Route
							path="/checkout"
							element={
								<PrivateRoute>
									<Checkout />
								</PrivateRoute>
							}
						/>
						<Route
							path="/cart"
							element={
								<PrivateRoute>
									<CartPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/shop/products/:id"
							element={
								<ProductsContext.Provider
									value={{
										product,
										handleAllProducts,
										allProducts,
										findProduct,
									}}
								>
									<ProductSingle />
								</ProductsContext.Provider>
							}
						/>
						<Route
							path="/aboutus"
							element={
								<TestimonialsContext.Provider
									value={{
										testimonials,
										handleTestimonials,
									}}
								>
									<AboutUs ourTeam={ourTeam} />
								</TestimonialsContext.Provider>
							}
						/>
						<Route
							path="/emailconfirm"
							element={<VerifyEmailConfirm />}
						/>
						<Route
							path="/testimonials"
							element={
								<Testimonials
									handleTestimonials={handleTestimonials}
									testimonials={testimonials}
								/>
							}
						/>
						<Route
							path="/searchresults/:input"
							element={
								<SearchPage
									searchResults={searchResults}
									setSearchResults={setSearchResults}
								/>
							}
						/>
						<Route path="/contactus" element={<ContactUs />} />
						<Route path="/policiesandfaqs" element={<Policies />} />
						<Route
							path="/termsandconditions"
							element={<TermsCond tncDoc={tncDoc} />}
						/>
						<Route
							path="/cancellationandrefunds"
							element={<CancRef cnrDoc={cnrDoc} />}
						/>
						<Route
							path="/privacypolicy"
							element={<PrivPol privpDoc={privpDoc} />}
						/>
						<Route
							path="/faqs"
							element={<Faqs faqDoc={faqDoc} />}
						/>
						<Route path="/reportabug" element={<RepBug />} />
						<Route path="/feedback" element={<Feedback />} />
						<Route
							path="/auth/forgot-password"
							element={<PasswordReset />}
						/>
						<Route
							path="/auth/password/reset/confirm/:params"
							element={<PasswordResetConfirm />}
						/>
						<Route
							path="/auth/verify-email/:key"
							element={<VerifyEmail />}
						/>
						<Route
							path="/profile/:option"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route
							path="/profile/orderdetail/:id"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route element={<NotFound404 />} />
					</RouterRoutes>
				</BrowserRouter>
			</BaseContext.Provider>
		</>
	);
};
export default Routes;
