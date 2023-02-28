import { Link } from "react-router-dom";
import { useState } from "react";
import { emailSubscription } from "../APIs/misc/misc";
import { toast } from "react-toastify";

export default function Footer(): JSX.Element {
	const [email, setEmail] = useState("");
	const subscribe = async (e: any) => {
		e.preventDefault();
		if (email.includes("@")) {
			await emailSubscription({ email: email.toLowerCase() }).then(
				(res) => {
					if (res?.status === 201) {
						setEmail("");
						return toast.success("Subscription Added");
					} else {
						return toast.error(res.email[0]);
					}
				}
			);
		} else {
			return toast.warning("You have not entered an email.");
		}
	};
	return (
		<footer
			className="bgcolordarkblue overflow-hidden"
			style={{ zIndex: 99999 }}
		>
			<div className="container">
				<div className="row py-4 pb-md-0">
					<div className="col-md text-md-start text-center px-1">
						<h4 className="my-4 colorwhite letterspacing1 text-uppercase">
							Explore
						</h4>
						<ul className="list-unstyled">
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/aboutus"
								>
									About Us
								</Link>
							</li>
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/aboutus#ourteam"
								>
									Our Team
								</Link>
							</li>
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/testimonials"
								>
									Testimonials
								</Link>
							</li>
							<li
								className="hvr-icon-float d-inline-block"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
							>
								<a
									href="https://www.facebook.com/profile.php?id=100086897816897"
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										className="hvr-icon"
										height="20px"
										alt="Facebook"
										src="images/Logo/FB_Logo.svg"
									/>
								</a>
							</li>
							<li
								className="ms-2 hvr-icon-float d-inline-block"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={100}
							>
								<a
									href="https://wa.me/+919910446228"
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										className="hvr-icon"
										height="20px"
										alt="WhatsApp"
										src="images/Logo/WA_Logo.svg"
									/>
								</a>
							</li>
							<li
								className="ms-2 hvr-icon-float d-inline-block"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={400}
							>
								<a
									href="https://instagram.com/meemokidz"
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										className="hvr-icon"
										height="20px"
										alt="Instagram"
										src="images/Logo/Instagram_Logo.svg"
									/>
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md text-md-start text-center px-1">
						<h4 className="my-4 colorwhite letterspacing1 text-uppercase">
							Need Help
						</h4>
						<ul className="list-unstyled">
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/contactus"
								>
									Contact Us
								</Link>
							</li>
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/policiesandfaqs"
								>
									Policies & FAQs
								</Link>
							</li>
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/reportabug"
								>
									Report A Bug
								</Link>
							</li>
							<li className="my-2">
								<Link
									className="lightbluehover letterspacing1 coloryellow fontsize14"
									to="/feedback"
								>
									Feedback
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-md text-md-start text-center px-1">
						<h4 className="my-4 colorwhite letterspacing1 text-uppercase">
							Subscribe
						</h4>
						<form action="#">
							<div className="d-flex justify-content-between mx-3 mx-lg-0">
								<input
									className="input100 fontsize14 px-3 w-100 border5px border-0 colorblue me-2"
									type="email"
									placeholder="Email"
									value={email.toLowerCase()}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
								<button
									onClick={(e) => {
										subscribe(e);
									}}
									className="bglightblue bgyellow fontsize14 colorblue text-uppercase border5px border-0"
									type="submit"
								>
									Subscribe
								</button>
							</div>
						</form>
						<p className="mt-3 mb-2 letterspacing1 coloryellow fontsize14">
							WE ACCEPT PAYMENTS FROM
						</p>
						<ul className="list-unstyled d-flex justify-content-md-start justify-content-center mb-0">
							<li
								className="hvr-icon-float"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
							>
								<img
									className="hvr-icon"
									src="images/Logo/Visa_Logo.svg"
									width="30px"
									alt="Visa_Logo"
								/>
							</li>
							<li
								className="hvr-icon-float"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={100}
							>
								<img
									className="ms-2 hvr-icon"
									src="images/Logo/Mastercard_Logo.svg"
									width="30px"
									alt="Mastercard_Logo"
								/>
							</li>
							<li
								className="hvr-icon-float"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={200}
							>
								<img
									className="ms-2 hvr-icon"
									src="images/Logo/Amex_Logo.svg"
									width="30px"
									alt="Amex_Logo"
								/>
							</li>
							<li
								className="hvr-icon-float"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={300}
							>
								<img
									className="ms-2 hvr-icon"
									src="images/Logo/Maestro_Logo.svg"
									width="30px"
									alt="Maestro_Logo"
								/>
							</li>
							<li
								className="hvr-icon-float"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={400}
							>
								<img
									className="ms-2 hvr-icon"
									src="images/Logo/Rupay_Logo.svg"
									width="30px"
									alt="Rupay_Logo"
								/>
							</li>
							<li
								className="hvr-icon-float"
								data-aos="fade-up"
								data-aos-anchor-placement="top-bottom"
								data-aos-delay={500}
							>
								<img
									className="ms-2 hvr-icon"
									src="images/Logo/UPI_Logo_Small.svg"
									width="30px"
									alt="UPI_Logo_Small"
								/>
							</li>
						</ul>
					</div>
				</div>
				<div className="row pb-2 fontsize14">
					<div className="col text-center">
						<p className="m-0 letterspacing1 coloryellow">
							Copyright © 2023 <b>MeeMo Kidz</b> | All Rights
							Reserved | Designed by&nbsp;
							<a
								className="lightbluehover letterspacing1 coloryellow"
								href="https://www.tristack.tech"
								rel="noopener noreferrer"
								target="_blank"
							>
								<b>triStack.tech</b>
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
