import Breadcrumb from "../Components/Breadcrumb";
import { useState } from "react";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const Policies = () => {
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	return (
		<>
			<Helmet>
				<title>Kirana For Home | Policies & FAQs</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Policies & FAQs" myowntoggle={true} />
				<section className="section">
					<div className="container">
						<div className="row align-items-center">
							<div
								className="col-lg-6 col-md-6"
								onMouseEnter={handleChangeImage}
								onMouseLeave={handleChangeImage}
							>
								{isDesktopOrLaptop && (
									<div className="me-lg-0 mb-3 mb-lg-0 d-flex justify-content-center">
										<img
											src={
												changeImage
													? "images/Boring_Stuff_Yellow.svg"
													: "images/Boring_Stuff_LightBlue.svg"
											}
											height="400px"
											className="loginsvg"
											alt="Boring_Policies"
										/>
									</div>
								)}
								{isTabletOrMobile && (
									<div className="me-lg-0 mb-3 mb-lg-0 d-flex justify-content-center">
										<img
											src={
												changeImage
													? "images/Boring_Stuff_Yellow.svg"
													: "images/Boring_Stuff_LightBlue.svg"
											}
											height="250px"
											className="loginsvg"
											alt="Boring_Policies"
										/>
									</div>
								)}
							</div>
							<div
								className="col-lg-6 col-md-6"
								onMouseEnter={handleChangeImage}
								onMouseLeave={handleChangeImage}
							>
								<div className="row">
									{isDesktopOrLaptop && (
										<>
											<div className="col-md-12 mt-4 mt-md-0 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 w-50 text-center">
													<Link
														to="/cancellationandrefunds"
														className="lightbluehover fontsize14 text-uppercase colorblue"
													>
														Cancellation &amp;
														Refunds
													</Link>
												</div>
											</div>
											<div className="col-md-12 mt-4 mt-md-4 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 w-50 text-center">
													<Link
														to="/privacypolicy"
														className="lightbluehover fontsize14 text-uppercase colorblue"
													>
														Privacy Policy
													</Link>
												</div>
											</div>
											<div className="col-md-12 mt-4 mt-md-4 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 w-50 text-center">
													<Link
														to="/termsandconditions"
														className="lightbluehover fontsize14 text-uppercase colorblue"
													>
														Terms &amp; Conditions
													</Link>
												</div>
											</div>
											<div className="col-md-12 mt-4 mt-md-4 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 w-50 text-center">
													<Link
														to="/faqs"
														className="lightbluehover fontsize14 colorblue"
													>
														FAQs
													</Link>
												</div>
											</div>
										</>
									)}
									{isTabletOrMobile && (
										<>
											<div className="col-md-12 mt-4 mt-md-0 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 mx-4 w-100 text-center">
													<Link
														to="/cancellationandrefunds"
														className="lightbluehover fontsize14 text-uppercase colorblue"
													>
														Cancellation &amp;
														Refunds
													</Link>
												</div>
											</div>
											<div className="col-md-12 mt-4 mt-md-5 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 mx-4 w-100 text-center">
													<Link
														to="/privacypolicy"
														className="lightbluehover fontsize14 text-uppercase colorblue"
													>
														Privacy Policy
													</Link>
												</div>
											</div>
											<div className="col-md-12 mt-4 mt-md-5 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 mx-4 w-100 text-center">
													<Link
														to="/termsandconditions"
														className="lightbluehover fontsize14 text-uppercase colorblue"
													>
														Terms &amp; Conditions
													</Link>
												</div>
											</div>
											<div className="col-md-12 mt-4 mt-md-5 d-flex justify-content-center">
												<div className="card bgcolorgreyish border5px border-0 p-3 mx-4 w-100 text-center">
													<Link
														to="/faqs"
														className="lightbluehover fontsize14 colorblue"
													>
														FAQs
													</Link>
												</div>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
};
export default Policies;
