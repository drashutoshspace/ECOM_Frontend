import {
	BrowserRouter,
	Route,
	Routes as RouterRoutes,
	Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import TnC from "./Pages/TnC";
import CnR from "./Pages/CnR";
import PrivP from "./Pages/PrivP";
import Faqs from "./Pages/Faqs";
import Profile from "./Pages/Profile";
import RepBug from "./Pages/RepBug";
import Feedback from "./Pages/Feedback";
import NotFound404 from "./Pages/NotFound404";
import LoginPage from "./Pages/LoginPage";
import { useEffect } from "react";
import VerifyEmail from "./Pages/VerifyEmail";
import PasswordReset from "./Pages/PasswordReset";
import PasswordResetConfirm from "./Pages/PasswordResetConfirm";
import AllProducts from "./Pages/AllProducts";
import CartPage from "./Pages/CartPage";
import ProductSingle from "./Pages/ProductSingle";
import PreLoader from "./PreLoader";
import Checkout from "./Pages/Checkout";
import { productsCategory } from "./APIs/ecommerce/ecommerce";
import SearchPage from "./Pages/SearchPage";
import Testimonials from "./Pages/Testimonials";
import Policies from "./Pages/Policies";
import VerifyEmailConfirm from "./Pages/VerifyEmailConfirm";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "./Interfaces/Store";
import { setAllProductCategories } from "./Data/storingData";
import { Product_Category } from "./Interfaces/Products";

export default function Routes(): JSX.Element {
	const dispatch = useDispatch();
	const userId = useSelector((state: Store) => state.userProfile.id);

	const PrivateRoute = ({
		children,
	}: {
		children: JSX.Element;
	}): JSX.Element => {
		if (userId !== -1) {
			return children;
		} else {
			return <Navigate to="/signin" replace={true} />;
		}
	};

	useEffect(() => {
		const getProductCategories = async () => {
			await productsCategory().then((data: Product_Category[]) => {
				dispatch(setAllProductCategories(data));
			});
		};
		getProductCategories();
	}, []);
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route
					path="/"
					element={
						!!!sessionStorage.getItem("loader") ? (
							<PreLoader />
						) : (
							<Home />
						)
					}
				/>
				<Route
					path="/signin"
					element={
						userId !== -1 ? <Navigate to={"/"} /> : <LoginPage />
					}
				/>
				<Route path="/shop/:linkCategory" element={<AllProducts />} />
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
					path="/shop/products/:guid"
					element={<ProductSingle />}
				/>
				<Route path="/aboutus" element={<AboutUs />} />
				<Route path="/emailconfirm" element={<VerifyEmailConfirm />} />
				<Route path="/testimonials" element={<Testimonials />} />
				<Route path="/searchresults/:input" element={<SearchPage />} />
				<Route path="/contactus" element={<ContactUs />} />
				<Route path="/policiesandfaqs" element={<Policies />} />
				<Route path="/termsandconditions" element={<TnC />} />
				<Route path="/cancellationandrefunds" element={<CnR />} />
				<Route path="/privacypolicy" element={<PrivP />} />
				<Route path="/faqs" element={<Faqs />} />
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
	);
}
