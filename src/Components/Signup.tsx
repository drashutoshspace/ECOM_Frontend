import { useState } from "react";
import { signUp } from "../APIs/user/user";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import DataLoader2 from "./DataLoader2";
import { googleLogin } from "../APIs/user/user";

export default function Signup({
	handleToggle,
	isAuthenticated,
	handleNotification,
}: any): JSX.Element {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
		error: false,
		success: false,
	});
	const { username, email, password1, password2 } = values;
	const handleChange = (name: any) => (event: any) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const [loading, setLoading] = useState(false);
	function isUserNameValid(username: any) {
		const res = /^[a-zA-Z0-9_\.]+$/.exec(username);
		const valid = !!res;
		return valid;
	}
	const navigate = useNavigate();
	const signupUser = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		if (password1 === password2 && password1 !== "") {
			if (!isUserNameValid(values.username)) {
				setValues({
					...values,
					username: "",
				});
				setLoading(false);
				return toast.error(
					"Username can only contain letter and numbers!"
				);
			}
			await signUp({
				username: username,
				email: email.toLowerCase(),
				password1,
				password2,
			})
				.then((data) => {
					if (data?.detail) {
						setValues({
							username: "",
							email: "",
							password1: "",
							password2: "",
							error: false,
							success: false,
						});
						handleToggle(false);
						setLoading(false);
						localStorage.setItem("emailV", "true");
						navigate("/emailconfirm");
					} else {
						if (data?.non_field_errors?.[0]) {
							setLoading(false);
							return toast.error(data.non_field_errors[0]);
						}
						if (data?.password1?.[0]) {
							setLoading(false);
							return toast.error(
								`password: ${data.password1[0]}`
							);
						}
						if (data?.password2?.[0]) {
							setLoading(false);
							return toast.error(
								`password: ${data.password2[0]}`
							);
						}
						if (data?.email?.[0]) {
							setLoading(false);
							return toast.error(`email: ${data.email[0]}`);
						}
						if (data?.username?.[0]) {
							setLoading(false);
							return toast.error(`username: ${data.username[0]}`);
						}
					}
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		} else {
			setLoading(false);
			return toast.error(`Please check password field!`);
		}
	};
	const responseGoogle = async (response: any) => {
		// await googleLogin({
		// 	access_token: response.accessToken,
		// 	code: response.code,
		// 	id_token: response.tokenId,
		// }).then((res: any) => {
		// 	if (res?.status === 200) {
		// 		if (async () => await isAuthenticated()) {
		// 			handleNotification("Login Successful", "success");
		// 			return navigate("/");
		// 		}
		// 	} else {
		// 		return toast.error(res?.error);
		// 	}
		// });
	};
	const [showPassword1, setShowPassword1] = useState(false);
	const seePassword1 = () => {
		setShowPassword1(!showPassword1);
	};
	const [showPassword2, setShowPassword2] = useState(false);
	const seePassword2 = () => {
		setShowPassword2(!showPassword2);
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Sign Up</title>
			</Helmet>
			<div className="col-lg-6 col-md-6">
				<div className="card mx-2 bgcolorgreyish border-0 border5px p-4">
					<div className="card-body p-0">
						<h2 className="card-title colorblue pb-2 text-center">
							Sign Up
						</h2>
						<form className="mt-4">
							<div className="row">
								<div className="col-lg-12">
									<div className="position-relative mb-4">
										<input
											className="input100 w-100 border5px border-0 colorblue"
											type="text"
											placeholder="Username"
											value={username}
											onChange={handleChange("username")}
											required
										/>
										<span className="focus-input100" />
										<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
											<span>
												<i className="far fa-user-robot" />
											</span>
										</span>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="position-relative mb-4">
										<input
											className="input100 w-100 border5px border-0 colorblue"
											type="email"
											placeholder="Email"
											value={email.toLowerCase()}
											onChange={handleChange("email")}
											required
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
									<div className="position-relative mb-4">
										<input
											className="input100 w-100 border5px border-0 colorblue"
											type={
												showPassword1
													? "text"
													: "password"
											}
											placeholder="Password"
											value={password1}
											onChange={handleChange("password1")}
											required
										/>
										<span className="focus-input100" />
										<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
											<span>
												<i className="far fa-lock" />
											</span>
										</span>
										<span
											onClick={seePassword1}
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
								</div>
								<div className="col-lg-12">
									<div className="position-relative mb-4">
										<input
											className="input100 w-100 border5px border-0 colorblue"
											type={
												showPassword2
													? "text"
													: "password"
											}
											placeholder="Confirm Password"
											value={password2}
											onChange={handleChange("password2")}
											required
										/>
										<span className="focus-input100" />
										<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
											<span>
												<i className="far fa-lock" />
											</span>
										</span>
										<span
											onClick={seePassword2}
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
								<div className="col-lg-12">
									<div className="mb-3 pb-1 mx-1 text-center">
										<div className="colorblue">
											By signing up, you accept MeeMo
											Kidz's&nbsp;
											<Link
												to="/privacypolicy"
												className="lightbluehover fw-bold colorblue"
												target="_blank"
											>
												Privacy Policy
											</Link>
											&nbsp;and&nbsp;
											<Link
												to="/termsandconditions"
												className="lightbluehover fw-bold colorblue"
												target="_blank"
											>
												Terms &amp; Conditions
											</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="d-grid">
										<button
											onClick={(e) => {
												signupUser(e);
											}}
											className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
											disabled={loading ? true : false}
										>
											{loading ? (
												<DataLoader2 />
											) : (
												"Register"
											)}
										</button>
									</div>
								</div>
								<div className="col-lg-12 mt-4 text-center">
									<h3 className="colorblue my-1">
										Or Sign Up With
									</h3>
									<div className="row">
										<div className="col-6 mt-3">
											<div className="d-grid">
												<GoogleLogin
													clientId="643639185226-rqi76uj45a2pbvmqrsvku1mqg4kgspvf.apps.googleusercontent.com"
													render={(renderProps) => (
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
													onSuccess={responseGoogle}
													onFailure={responseGoogle}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 text-center">
									<p className="mb-0 fontsize16 mt-4">
										<span className="colorblue me-2">
											Regular Here ?
										</span>
										<button
											onClick={() => {
												handleToggle(false);
											}}
											className="colorblue bgnone p-0 border-0 cursorpointer lightbluehover"
										>
											Sign In
										</button>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
