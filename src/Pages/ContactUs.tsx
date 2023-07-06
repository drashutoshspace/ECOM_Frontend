import Breadcrumb from "../Components/Breadcrumb";
import { useState } from "react";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import { contactUs } from "../APIs/misc/misc";
import { toast } from "react-toastify";
import DataLoader2 from "../Components/DataLoader2";
import { useSelector } from "react-redux";
import { Store } from "../Interfaces/Store";

export default function ContactUs(): JSX.Element {
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(
		useSelector((state: Store) => state.userProfile.first_name)
			? useSelector((state: Store) => state.userProfile.first_name)
			: ""
	);
	const [email, setEmail] = useState(
		useSelector((state: Store) => state.userProfile.email)
			? useSelector((state: Store) => state.userProfile.email)
			: ""
	);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const contact = async (e: any) => {
		setLoading(true);
		e.preventDefault();
		if (email.includes("@")) {
			await contactUs({ name, email, subject, message }).then((data: any) => {
				if (data?.error) {
					setLoading(false);
					return toast.error(data.error);
				} else {
					setName("");
					setEmail("");
					setSubject("");
					setMessage("");
					setLoading(false);
					return toast.success("Form submitted!");
				}
			});
		} else {
			setLoading(false);
			return toast.error("You have not entered an email.");
		}
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Contact Us</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Contact Us" />
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
												? "images/Contact_Us_Yellow.svg"
												: "images/Contact_Us_LightBlue.svg"
										}
										className="loginsvg"
										alt="Contact_Us"
									/>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="card bgcolorgreyish border-0 border5px p-4">
									<div className="card-body p-0">
										<h2 className="card-title colorblue text-center">
											Get In Touch!
										</h2>
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
																setName(e.target.value);
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
																setEmail(e.target.value);
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
															style={{
																height: "150px",
																resize: "none",
															}}
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
															{loading ? <DataLoader2 /> : "Send Message"}
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
									<a
										target="_blank"
										rel="noreferrer noopener"
										href="tel:+91 9910446228"
									>
										<div className="icons text-center hvr-icon-grow">
											<i className="fas colorblue border5px icon fa-2x fa-phone-alt hvr-icon" />
										</div>
									</a>
									<div className="mt-3">
										<p className="colorblue mb-2">
											You can contact on this number.
										</p>
										<div className="mt-4">
											<a
												href="tel:+91 9910446228"
												className="lightbluehover text-uppercase contactus"
												target="_blank"
												rel="noreferrer noopener"
											>
												+91 9910446228
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
								<div className="card bgcolorgreyish border5px border-0 p-4 text-center features feature-clean h-100">
									<a
										target="_blank"
										rel="noreferrer noopener"
										href="mailto:panglossiantoys@gmail.com"
									>
										<div className="icons text-center hvr-icon-grow">
											<i className="fas colorblue border5px icon fa-2x fa-envelope hvr-icon" />
										</div>
									</a>
									<div className="mt-3">
										<p className="colorblue mb-2">
											You can send us an email on this email.
										</p>
										<div className="mt-4">
											<a
												href="mailto:panglossiantoys@gmail.com"
												className="lightbluehover text-uppercase contactus"
												target="_blank"
												rel="noreferrer noopener"
											>
												panglossiantoys@gmail.com
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
								<div className="card bgcolorgreyish border5px border-0 p-4 text-center features feature-clean">
									<a
										target="_blank"
										rel="noreferrer noopener"
										href="https://www.facebook.com/profile.php?id=100086897816897"
									>
										<div className="icons text-center hvr-icon-grow">
											<i className="fas colorblue border5px icon fa-2x fa-map-marker-alt hvr-icon" />
										</div>
									</a>
									<div className="mt-3">
										<p className="colorblue mb-2">
											You can come and vist us at this address.
										</p>
										<a
											href="https://www.facebook.com/profile.php?id=100086897816897"
											className="lightbluehover text-uppercase contactus"
											target="_blank"
											rel="noreferrer noopener"
										>
											E-339/A, Ground Floor
											<br />
											New Ashok Nagar, Delhi - 110096
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
}
