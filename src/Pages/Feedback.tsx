import Breadcrumb from "../Components/Breadcrumb";
import { useState } from "react";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import { feedbackForm } from "../APIs/misc/misc";
import { toast } from "react-toastify";
import DataLoader2 from "../Components/DataLoader2";

export default function Feedback(): JSX.Element {
	const [changeImage, setChangeImage] = useState(false);
	const [dataLoading, setdDataLoading] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const feedback = async (e: any) => {
		e.preventDefault();
		setdDataLoading(true);
		if (email.includes("@")) {
			await feedbackForm({ name, email, message }).then((data) => {
				if (data.id) {
					setName("");
					setEmail("");
					setMessage("");
					setdDataLoading(false);
					return toast.success("Feedback Posted");
				} else {
					setdDataLoading(false);
				}
			});
		} else {
			setdDataLoading(false);
			return toast.error("You have not entered an email.");
		}
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Feedback</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Feedback" />
				<section className="section feedback">
					<div className="container">
						<div className="row align-items-center">
							<div
								className="col-lg-6 col-md-6"
								onMouseEnter={handleChangeImage}
								onMouseLeave={handleChangeImage}
							>
								<div className="me-lg-5 mb-3 mb-lg-0">
									<img
										src={
											changeImage
												? "images/Feedback_Yellow.svg"
												: "images/Feedback_LightBlue.svg"
										}
										className="loginsvg"
										alt="Feedback"
									/>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="card mx-2 bgcolorgreyish border-0 border5px p-4">
									<div className="card-body p-0">
										<p className="text-center mb-0 colorblue fontsize16 pt-0 p-3">
											Thank you for visiting MeeMo Kidz!
											Please share your experience with
											us, it will help us grow.{" "}
											<b className="colorlightblue">
												Keep Exploring!
											</b>
										</p>
										<p className="text-center mb-0 colorblue fontsize16 mb-3">
											- Team MeeMo Kidz
										</p>
										<form className="mt-4">
											<div className="row">
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type="text"
															placeholder="Name"
															value={name}
															onChange={(e) => {
																setName(
																	e.target
																		.value
																);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="far fa-user" />
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
															value={email}
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
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<textarea
															className="colorblue bgcolorwhite p-3 border5px border-0 w-100"
															style={{
																height: "150px",
																resize: "none",
															}}
															placeholder="Your message"
															value={message}
															onChange={(e) => {
																setMessage(
																	e.target
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
															className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
															type="submit"
															onClick={(e) => {
																feedback(e);
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
						</div>
					</div>
				</section>
			</Base>
		</>
	);
}
