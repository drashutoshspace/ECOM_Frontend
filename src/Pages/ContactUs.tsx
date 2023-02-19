import Breadcrumb from "../Components/Breadcrumb";
import React, { useContext, useState } from "react";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import CSRFToken from "../CSRFToken";
import { contactusForm } from "../../src/helpers/others/contactusForm";
import { toast } from "react-toastify";
import DataLoader2 from "../Components/DataLoaders/DataLoader2";
import { isAuthenticated } from "../helpers/auth/authentication";
import { BaseContext } from "../Context";
const ContactUs = () => {
	const { cookies } = useContext(BaseContext);
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(isAuthenticated() ? (cookies?.user?.[0]?.first_name.length > 0 ? cookies?.user?.[0]?.first_name : cookies?.user?.[0]?.username) : "");
	const [email, setEmail] = useState(isAuthenticated() ? cookies?.user?.[0]?.email : "");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const contact = async (e) => {
		setLoading(true);
		e.preventDefault();
		if (email.includes("@")) {
			await contactusForm({ name, email, subject, message }, (data) => {
				if (data?.error) {
					setLoading(false);
					return toast(data.error, { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
				} else {
					setName("");
					setEmail("");
					setSubject("");
					setMessage("");
					setLoading(false);
					return toast("Form submitted!", { type: "success", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
				}
			});
		} else {
			setLoading(false);
			return toast("You have not entered an email.", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
	};
	return (
		<>
			<Helmet>
				<title>Kirana For Home | Contact Us</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Contact Us" />
				<section className="section feedback">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6 col-md-6" onMouseEnter={handleChangeImage} onMouseLeave={handleChangeImage}>
								<div className="me-lg-5 mb-3 mb-lg-0">
									<img src={changeImage ? "images/Contact_Us_Yellow.svg" : "images/Contact_Us_LightBlue.svg"} className="loginsvg" alt="Contact_Us" />
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="card bgcolorgreyish border-0 border5px p-4">
									<div className="card-body p-0">
										<h2 className="card-title colorblue text-center">Get In Touch!</h2>
										<form className="mt-4">
											<CSRFToken />
											<div className="row">
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<input
															className="input100 w-100 border5px border-0 colorblue"
															type="text"
															placeholder="Name"
															value={
																isAuthenticated() ? (cookies?.user?.[0]?.first_name.length > 0 ? cookies?.user?.[0]?.first_name : cookies?.user?.[0]?.username) : name
															}
															onChange={(e) => {
																setName(e.target.value);
															}}
															required
															disabled={isAuthenticated() ? true : false}
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
															value={isAuthenticated() ? cookies?.user?.[0]?.email : email}
															onChange={(e) => {
																setEmail(e.target.value);
															}}
															required
															disabled={isAuthenticated() ? true : false}
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
															type="text"
															placeholder="Subject"
															value={subject}
															onChange={(e) => {
																setSubject(e.target.value);
															}}
															required
														/>
														<span className="focus-input100" />
														<span className="symbol-input100 d-flex align-items-center position-absolute colorblue h-100">
															<span>
																<i className="far fa-envelope-open-text" />
															</span>
														</span>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<textarea
															className="colorblue bgcolorwhite p-3 border5px border-0 w-100"
															style={{ height: "150px", resize: "none" }}
															placeholder="Comments"
															value={message}
															onChange={(e) => {
																setMessage(e.target.value);
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
																contact(e);
															}}
														>
															{loading ? <DataLoader2 loaderSize={15} loaderType="ScaleLoader" loaderColor="#00214d" /> : "Send Message"}
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
					<div className="container mt-5">
						<div className="row">
							<div className="col-md-4">
								<div className="card bgcolorgreyish border5px border-0 p-4 text-center features feature-clean h-100">
									<a target="_blank" rel="noreferrer noopener" href="tel:+91 8130626971">
										<div className="icons text-center hvr-icon-grow">
											<i className="fas colorblue border5px icon fa-2x fa-phone-alt hvr-icon" />
										</div>
									</a>
									<div className="mt-3">
										<p className="colorblue mb-2">You can contact on this number.</p>
										<div className="mt-4">
											<a href="tel:+91 8130626971" className="lightbluehover text-uppercase contactus" target="_blank" rel="noreferrer noopener">
												+91 8130626971
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
								<div className="card bgcolorgreyish border5px border-0 p-4 text-center features feature-clean h-100">
									<a target="_blank" rel="noreferrer noopener" href="mailto:support@kiranaforhome.com">
										<div className="icons text-center hvr-icon-grow">
											<i className="fas colorblue border5px icon fa-2x fa-envelope hvr-icon" />
										</div>
									</a>
									<div className="mt-3">
										<p className="colorblue mb-2">You can send us an email on this email.</p>
										<div className="mt-4">
											<a href="mailto:support@kiranaforhome.com" className="lightbluehover text-uppercase contactus" target="_blank" rel="noreferrer noopener">
												support@kiranaforhome.com
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
								<div className="card bgcolorgreyish border5px border-0 p-4 text-center features feature-clean">
									<a target="_blank" rel="noreferrer noopener" href="https://g.page/manglam-traders-delhi?share">
										<div className="icons text-center hvr-icon-grow">
											<i className="fas colorblue border5px icon fa-2x fa-map-marker-alt hvr-icon" />
										</div>
									</a>
									<div className="mt-3">
										<p className="colorblue mb-2">You can come and vist us at this address.</p>
										<a href="https://g.page/manglam-traders-delhi?share" className="lightbluehover text-uppercase contactus" target="_blank" rel="noreferrer noopener">
											Shop No - 28, Sukhlal Market, Naharpur,
											<br />
											Sector 7, Rohini, Delhi - 110085
										</a>
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
export default ContactUs;
