import { useState } from "react";
import { toast } from "react-toastify";
import { PasswordReset_API } from "../../backend";
import Base from "../../Base";
import { Helmet } from "react-helmet-async";
import DataLoader2 from "../../Components/DataLoaders/DataLoader2";
import Breadcrumb from "../../Components/Breadcrumb";
import { Link } from "react-router-dom";
const PasswordReset = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const forgotPassword = (e: any) => {
		e.preventDefault();
		setLoading(true);
		return fetch(PasswordReset_API, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email.toLowerCase(),
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data?.detail) {
					setEmail("");
					setLoading(false);
					return toast.info(data.detail);
				} else {
					setLoading(false);
					if (data?.email?.[0]) {
						setEmail("");
						return toast.error(`email: ${data.email[0]}`);
					}
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Password Reset</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Password Reset" />
				<section className="section">
					<div className="container">
						<div className="row align-items-center">
							<div
								className="col-lg-6 col-md-6"
								onMouseEnter={handleChangeImage}
								onMouseLeave={handleChangeImage}
							>
								<div className="me-lg-5 mb-5 mb-lg-0">
									<img
										src={
											changeImage
												? "images/Forgot_Password_Yellow.svg"
												: "images/Forgot_Password_LightBlue.svg"
										}
										className="loginsvg"
										alt="Reset_Password"
									/>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="card mx-2 bgcolorgreyish border-0 border5px p-4">
									<div className="card-body">
										<h2 className="card-title colorblue pb-2 text-center">
											Reset Password
										</h2>
										<form className="mt-2">
											<div className="row">
												<div className="col-lg-12">
													<p className="colorblue text-center">
														Please enter your email
														address. You will
														receive a link to create
														a new password via
														email.
													</p>
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type="email"
															placeholder="Registered Email"
															value={email.toLowerCase()}
															onChange={(e) => {
																setEmail(
																	e.target
																		.value
																);
															}}
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
												<div className="col-lg-12 mb-0">
													<div className="d-grid">
														<button
															disabled={
																loading
																	? true
																	: false
															}
															onClick={
																forgotPassword
															}
															className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
														>
															{loading ? (
																<DataLoader2 />
															) : (
																"Send"
															)}
														</button>
													</div>
												</div>
												<div className="col-12 text-center">
													<p className="mb-0 mt-4">
														<span className="colorblue me-2">
															Remember your
															password ?
														</span>
														<Link
															to="/signin"
															className="colorblue lightbluehover cursorpointer"
														>
															Sign In
														</Link>
													</p>
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
};
export default PasswordReset;
