import { useContext, useState } from "react";
import {
	authenticate,
	isAuthenticated,
	signin,
} from "../../helpers/auth/authentication";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import googleLogin from "../../helpers/auth/googleLogin";
import facebookLogin from "../../helpers/auth/facebookLogin";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseContext } from "../../Context";
import { Helmet } from "react-helmet-async";
import DataLoader2 from "../DataLoaders/DataLoader2";
// import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
const Login = ({ handleToggle, handleRememberMe, rememberMe }: any) => {
	const { handleNotification }: any = useContext(BaseContext);
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const handleChange = (name: any) => (event: any) => {
		setValues({ ...values, [name]: event.target.value });
	};
	// const recaptchaRef = useRef();
	const [disable, setDisable] = useState(true);
	// const handleRecaptcha = () => {
	// 	if (recaptchaRef.current.getValue()) {
	// 		setDisable(false);
	// 	}
	// };
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			if (emailOrUsername.includes("@")) {
				setValues({
					...values,
					username: "",
					email: emailOrUsername,
				});
			} else {
				if (emailOrUsername !== "") {
					setValues({
						...values,
						email: "",
						username: emailOrUsername,
					});
				}
			}
		}
		return () => {
			mounted = false;
		};
	}, [emailOrUsername]);
	const loginUser = (event: any) => {
		event.preventDefault();
		setLoading(true);
		// if (disable) {
		// 	setLoading(false);
		// 	return toast("ReCaptcha Pending!", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		// }
		setValues({
			...values,
		});
		signin({ username, email, password })
			.then((data) => {
				if (data?.key) {
					let sessionToken = data.key;
					authenticate(sessionToken, () => {
						setValues({
							...values,
						});
						setLoading(false);
					});
					handleNotification("Login Successful", "success");
				} else {
					setLoading(false);
					if (data?.non_field_errors?.[0]) {
						return toast(data.non_field_errors[0], {
							type: "error",
							autoClose: 5000,
							position: "bottom-center",
							hideProgressBar: false,
							pauseOnHover: true,
							pauseOnFocusLoss: true,
						});
					}
					if (data?.password?.[0]) {
						return toast(`password: ${data.password[0]}`, {
							type: "error",
							autoClose: 5000,
							position: "bottom-center",
							hideProgressBar: false,
							pauseOnHover: true,
							pauseOnFocusLoss: true,
						});
					}
					if (data?.email?.[0]) {
						return toast(`email: ${data.email[0]}`, {
							type: "error",
							autoClose: 5000,
							position: "bottom-center",
							hideProgressBar: false,
							pauseOnHover: true,
							pauseOnFocusLoss: true,
						});
					}
				}
			})
			.catch((e) => {
				setLoading(false);
				console.log(e);
			});
	};
	const performRedirect = () => {
		if (isAuthenticated()) {
			return <Navigate to="/" />;
		}
	};
	// const responseGoogle = (response) => {
	// 	googleLogin(response.accessToken, () => {
	// 		if (isAuthenticated()) {
	// 			handleNotification("Login Successful", "success");
	// 			return <Redirect to="/" />;
	// 		}
	// 	});
	// };
	// const fbResponse = (response) => {
	// 	facebookLogin(response.accessToken, (data) => {
	// 		console.log(data);
	// 		if (isAuthenticated()) {
	// 			handleNotification("Login Successful", "success");
	// 			return <Redirect to="/" />;
	// 		} else {
	// 			handleNotification("Something went wrong!", "error");
	// 		}
	// 	});
	// };
	const { username, email, password } = values;
	const [showPassword, setShowPassword] = useState(false);
	const seePassword = () => {
		setShowPassword(!showPassword);
	};
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Sign In</title>
			</Helmet>
			{isDesktopOrLaptop && (
				<div className="col-lg-6 col-md-6">
					<div className="card mx-2 bgcolorgreyish border-0 border5px px-4 py-3">
						<div className="card-body p-0">
							<h3 className="card-title colorblue mb-0 text-center">
								Sign In
							</h3>
							<form className="mt-3">
								<div className="row">
									<div className="col-lg-12">
										<div className="position-relative mb-3">
											<input
												className="input100 w-100 border5px border-0 colorblue"
												type="text"
												placeholder="Username or Email"
												value={emailOrUsername}
												onChange={(e) => {
													setEmailOrUsername(
														e.target.value
													);
												}}
												style={{ height: "40px" }}
											/>
											<span className="focus-input100" />
											<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
												<span>
													<i className="far fa-envelope" />
												</span>
											</span>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="position-relative mb-3">
											<input
												className="input100 w-100 border5px border-0 colorblue"
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder="Password"
												value={password}
												onChange={handleChange(
													"password"
												)}
												required
												style={{ height: "40px" }}
											/>
											<span className="focus-input100" />
											<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
												<span>
													<i className="far fa-lock" />
												</span>
											</span>
											<span
												onClick={seePassword}
												className="symbol-input1000 d-flex align-items-center position-absolute colorblue h-100"
											>
												<span>
													<i
														className={
															showPassword
																? "far fa-eye-slash"
																: "far fa-eye"
														}
													/>
												</span>
											</span>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="d-flex mb-2 mx-1 justify-content-between align-items-center">
											<div className="form-check">
												<input
													className="form-check-input border-0 shadow-none"
													type="checkbox"
													checked={rememberMe}
													onChange={handleRememberMe}
													id="flexCheckDefault"
												/>

												<label
													className="form-check-label colorblue"
													htmlFor="flexCheckDefault"
												>
													Remember Me
												</label>
											</div>
											<div className="forgot-pass">
												<Link
													to="/auth/forgot-password"
													className="lightbluehover colorblue"
												>
													Need Help ?
												</Link>
											</div>
										</div>
									</div>
									<div className="col-lg-12 mb-3 d-flex">
										<div className="col-lg-2 col-0" />
										{/* <div className="col-lg-8 col-12 d-flex justify-content-center">
											<ReCAPTCHA sitekey="6LfKX6AbAAAAACynAuG5H66l2w9Vru87ElhZQiYz" ref={recaptchaRef} onChange={handleRecaptcha} />
										</div> */}
										<div className="col-lg-2 col-0" />
									</div>
									<div className="col-lg-12 mb-0">
										<div className="d-grid">
											<button
												disabled={
													loading ? true : false
												}
												onClick={loginUser}
												className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
											>
												{loading ? (
													<DataLoader2
														loaderSize={15}
														loaderType="ScaleLoader"
														loaderColor="#00214d"
													/>
												) : (
													"Login"
												)}
											</button>
										</div>
									</div>
									<div className="col-lg-12 mt-2 text-center">
										<h3 className="colorblue mb-1 mt-1">
											Or Login With
										</h3>
										<div className="row">
											<div className="col-6 mt-1">
												<div className="d-grid">
													{/* <FacebookLogin
														appId="876288792967969"
														render={(
															renderProps
														) => (
															<button
																onClick={
																	renderProps.onClick
																}
																className="socialbutton bglightblue border-0 colorblue bgyellow cursorpointer border5px d-flex justify-content-center align-items-center px-2 my-2"
															>
																<img
																	src="images/FB_Button.svg"
																	height="20px"
																	alt="Facebook"
																/>
																&nbsp;&nbsp;
																<b>Facebook</b>
															</button>
														)}
														fields="name,email,picture"
														callback={fbResponse}
													/> */}
												</div>
											</div>
											<div className="col-6 mt-1">
												<div className="d-grid">
													{/* <GoogleLogin
														clientId="643639185226-rqi76uj45a2pbvmqrsvku1mqg4kgspvf.apps.googleusercontent.com"
														render={(
															renderProps
														) => (
															<button
																onClick={
																	renderProps.onClick
																}
																className="socialbutton bglightblue border-0 colorblue bgyellow cursorpointer border5px d-flex justify-content-center align-items-center px-2 my-2"
															>
																<img
																	src="images/Google_Button.svg"
																	height="20px"
																	alt="Google"
																	style={{
																		backgroundColor:
																			"#fff",
																		padding:
																			"2px",
																		borderRadius:
																			"2px",
																	}}
																/>
																&nbsp;&nbsp;
																<b>Google</b>
															</button>
														)}
														onSuccess={
															responseGoogle
														}
														onFailure={
															responseGoogle
														}
													/> */}
												</div>
											</div>
										</div>
									</div>
									<div className="col-12 text-center">
										<p className="mb-0 fontsize16 mt-2">
											<span className="colorblue me-2">
												New Here ?
											</span>
											<button
												onClick={() => {
													handleToggle(true);
												}}
												className="colorblue bgnone p-0 border-0 lightbluehover cursorpointer"
											>
												Sign Up
											</button>
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
			{isTabletOrMobile && (
				<div className="col-lg-6 col-md-6">
					<div className="card mx-2 bgcolorgreyish border-0 border5px p-4">
						<div className="card-body p-0">
							<h2 className="card-title colorblue pb-2 text-center">
								Sign In
							</h2>
							<form className="mt-4">
								<div className="row">
									<div className="col-lg-12">
										<div className="position-relative mb-4">
											<input
												className="input100 w-100 border5px border-0 colorblue"
												type="text"
												placeholder="Username or Email"
												value={emailOrUsername}
												onChange={(e) => {
													setEmailOrUsername(
														e.target.value
													);
												}}
											/>
											<span className="focus-input100" />
											<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
												<span>
													<i className="far fa-envelope" />
												</span>
											</span>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="position-relative mb-3">
											<input
												className="input100 w-100 border5px border-0 colorblue"
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder="Password"
												value={password}
												onChange={handleChange(
													"password"
												)}
												required
											/>
											<span className="focus-input100" />
											<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
												<span>
													<i className="far fa-lock" />
												</span>
											</span>
											<span
												onClick={seePassword}
												className="symbol-input1000 d-flex align-items-center position-absolute colorblue h-100"
											>
												<span>
													<i
														className={
															showPassword
																? "far fa-eye-slash"
																: "far fa-eye"
														}
													/>
												</span>
											</span>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="d-flex mb-3 mx-1 justify-content-between align-items-center">
											<div className="form-check">
												<input
													className="form-check-input border-0 shadow-none"
													type="checkbox"
													checked={rememberMe}
													onChange={handleRememberMe}
													id="flexCheckDefault"
												/>
												<label
													className="form-check-label colorblue"
													htmlFor="flexCheckDefault"
												>
													Remember Me
												</label>
											</div>
											<div className="forgot-pass">
												<Link
													to="/auth/forgot-password"
													className="lightbluehover colorblue"
												>
													Need Help ?
												</Link>
											</div>
										</div>
									</div>
									<div className="col-lg-12 mb-4 d-flex">
										<div className="col-lg-2 col-0" />
										{/* <div className="col-lg-8 col-12 d-flex justify-content-center">
											<ReCAPTCHA sitekey="6LfKX6AbAAAAACynAuG5H66l2w9Vru87ElhZQiYz" ref={recaptchaRef} onChange={handleRecaptcha} />
										</div> */}
										<div className="col-lg-2 col-0" />
									</div>
									<div className="col-lg-12 mb-0">
										<div className="d-grid">
											<button
												disabled={
													loading ? true : false
												}
												onClick={loginUser}
												className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
											>
												{loading ? (
													<DataLoader2
														loaderSize={15}
														loaderType="ScaleLoader"
														loaderColor="#00214d"
													/>
												) : (
													"Login"
												)}
											</button>
										</div>
									</div>
									<div className="col-lg-12 mt-4 text-center">
										<h3 className="colorblue mb-1 mt-1">
											Or Login With
										</h3>
										<div className="row">
											<div className="col-6 mt-3">
												<div className="d-grid">
													{/* <FacebookLogin
														appId="876288792967969"
														render={(
															renderProps
														) => (
															<button
																onClick={
																	renderProps.onClick
																}
																className="socialbutton bglightblue border-0 colorblue bgyellow cursorpointer border5px d-flex justify-content-center align-items-center px-2 my-2"
															>
																<img
																	src="images/FB_Button.svg"
																	height="20px"
																	alt="Facebook"
																/>
																&nbsp;&nbsp;
																<b>Facebook</b>
															</button>
														)}
														fields="name,email,picture"
														callback={fbResponse}
													/> */}
												</div>
											</div>
											<div className="col-6 mt-3">
												<div className="d-grid">
													{/* <GoogleLogin
														clientId="643639185226-rqi76uj45a2pbvmqrsvku1mqg4kgspvf.apps.googleusercontent.com"
														render={(
															renderProps
														) => (
															<button
																onClick={
																	renderProps.onClick
																}
																className="socialbutton bglightblue border-0 colorblue bgyellow cursorpointer border5px d-flex justify-content-center align-items-center px-2 my-2"
															>
																<img
																	src="images/Google_Button.svg"
																	height="20px"
																	alt="Google"
																	style={{
																		backgroundColor:
																			"#fff",
																		padding:
																			"2px",
																		borderRadius:
																			"2px",
																	}}
																/>
																&nbsp;&nbsp;
																<b>Google</b>
															</button>
														)}
														onSuccess={
															responseGoogle
														}
														onFailure={
															responseGoogle
														}
													/> */}
												</div>
											</div>
										</div>
									</div>
									<div className="col-12 text-center">
										<p className="mb-0 fontsize16 mt-4">
											<span className="colorblue me-2">
												New Here ?
											</span>
											<button
												onClick={() => {
													handleToggle(true);
												}}
												className="colorblue bgnone p-0 border-0 lightbluehover cursorpointer"
											>
												Sign Up
											</button>
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
			{performRedirect()}
		</>
	);
};
export default Login;
