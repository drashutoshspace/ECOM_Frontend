import Breadcrumb from "../Components/Breadcrumb";
import Base from "../Base";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import VisibilitySensor from "react-visibility-sensor";
import CountUp from "react-countup";
import AOS from "aos";
import TestimonialsList from "../Components/TestimonialsList";
import Slider from "react-slick";
import tempImg from "../Assets/images/User_Image.webp";
const AboutUs = ({ ourTeam }: any) => {
	const location = useLocation();
	useEffect(() => {
		if (location.hash) {
			let elem = document.getElementById(location.hash.slice(1));
			if (elem) {
				elem.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	}, [location]);
	const [toggleAOS, setToggleAOS] = useState(false);
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			AOS.init();
		}
		return () => {
			mounted = false;
		};
	}, []);
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			AOS.refresh();
		}
		return () => {
			mounted = false;
		};
	}, [toggleAOS]);
	const [countUpNum1, setCountUpNum1] = useState(0);
	const [countUpNum2, setCountUpNum2] = useState(0);
	const [countUpNum3, setCountUpNum3] = useState(0);
	var settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 500,
		autoplay: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover: true,
		pauseOnDotsHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | About Us</title>
			</Helmet>
			<Base>
				<Breadcrumb title="About Us" />
				<section className="section overflow-hidden">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="row">
									<div
										className="col-lg-5 px-3 border5px d-flex justify-content-center"
										data-aos="fade-right"
										data-aos-duration="1000"
										data-aos-once="true"
									>
										<img
											className="shadow border5px"
											src="images/Space_02.webp"
											alt="Our_Team"
											width="100%"
										/>
									</div>
									<div
										className="aboutus col-lg-7 colorblue mt-4 pt-2 pt-lg-0 mt-lg-0 text-center"
										data-aos="fade-left"
										data-aos-duration="1000"
										data-aos-once="true"
									>
										<h1 className="mb-4">
											Welcome to MeeMo Kidz!
										</h1>
										<p className="mb-2"></p>
										<p className="mb-2">
											We have strict{" "}
											<b>quality control</b> measures in
											place. For us, your{" "}
											<b>satisfaction and happiness</b> is
											utmost important.
										</p>
										<div className="mt-4 d-flex justify-content-center">
											<Link
												to="/shop"
												className="mybtnsame fontsize16 colorblue bgyellow bglightblue border5px border-0 text-uppercase"
											>
												Shop now &nbsp;
												<i className="fas fa-shopping-cart" />
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="pb-5 pt-4 overflow-hidden">
					<div className="container">
						<div className="row mx-3 mx-lg-0">
							<div className="col-12">
								<div className="row">
									<div
										className="col-md-4"
										data-aos="flip-up"
										data-aos-duration="1000"
										data-aos-once="true"
										data-aos-delay=""
									>
										<div className="card border-0 text-center feature-clean product-feature p-4 shadow overflow-hidden">
											<div className="icons text-center mx-auto hvr-icon-grow">
												<i className="fas border5px shadow colorblue hvr-icon fa-shipping-fast d-block fa-2x mb-0" />
											</div>
											<div className="card-body p-0 mt-4">
												<p className="fontsize16 hoverlightblue text-uppercase title">
													FREE DELIVERY
												</p>
												<p className="colorblue fontsize16 colorblue mt-2 mb-0">
													ON ORDER ABOVE ₹ 1000
												</p>
											</div>
										</div>
									</div>
									<div
										className="col-md-4 mt-4 pt-2 mt-sm-0 pt-sm-0"
										data-aos="flip-up"
										data-aos-duration="1000"
										data-aos-once="true"
										data-aos-delay="200"
									>
										<div className="card border-0 text-center feature-clean product-feature p-4 shadow overflow-hidden">
											<div className="icons text-center mx-auto hvr-icon-grow">
												<i className="fas border5px shadow colorblue hvr-icon fa-badge-check d-block fa-2x mb-0" />
											</div>
											<div className="card-body p-0 mt-4">
												<p className="fontsize16 hoverlightblue text-uppercase title">
													SUPERIOR QUALITY
												</p>
												<p className="colorblue fontsize16 colorblue mt-2 mb-0">
													PRODUCT WELL PACKAGED
												</p>
											</div>
										</div>
									</div>
									<div
										className="col-md-4 mt-4 pt-2 mt-sm-0 pt-sm-0"
										data-aos="flip-up"
										data-aos-duration="1000"
										data-aos-once="true"
										data-aos-delay="300"
									>
										<div className="card border-0 text-center feature-clean product-feature p-4 shadow overflow-hidden">
											<div className="icons text-center mx-auto hvr-icon-grow">
												<i className="fas border5px shadow colorblue hvr-icon fa-user-headset d-block fa-2x mb-0" />
											</div>
											<div className="card-body p-0 mt-4">
												<p className="fontsize16 hoverlightblue text-uppercase title">
													SUPPORT
												</p>
												<p className="colorblue fontsize16 colorblue mt-2 mb-0">
													24/7 SUPPORT
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="section ourbrands bluebgright">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12">
								<div
									className="section-title mb-2"
									data-aos="zoom-in"
									data-aos-duration="1000"
									data-aos-once="true"
								>
									<h4 className="title colorblue">
										Brands You Trust
									</h4>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-lg-12">
								<div className="row">
									<Slider {...settings}>
										<div className="col-lg-3 d-flex justify-content-center">
											<img
												className=""
												style={{
													height: "250px",
													width: "250px",
												}}
												data-aos="flip-up"
												data-aos-duration="1000"
												data-aos-once="true"
												data-aos-delay="000"
												alt="Raspberry_Pi"
												src="images/Logo/Raspberry_Pi.svg"
											/>
										</div>
										<div className="col-lg-3 d-flex justify-content-center">
											<img
												className=""
												style={{
													height: "250px",
													width: "250px",
												}}
												data-aos="flip-up"
												data-aos-duration="1000"
												data-aos-once="true"
												data-aos-delay="200"
												alt="Espressif"
												src="images/Logo/Espressif.svg"
											/>
										</div>
										<div className="col-lg-3 d-flex justify-content-center">
											<img
												className=""
												style={{
													height: "250px",
													width: "250px",
												}}
												data-aos="flip-up"
												data-aos-duration="1000"
												data-aos-once="true"
												data-aos-delay="100"
												alt="Arduino"
												src="images/Logo/Arduino.svg"
											/>
										</div>
										<div className="col-lg-3 d-flex justify-content-center">
											<img
												className=""
												style={{
													height: "250px",
													width: "250px",
												}}
												data-aos="flip-up"
												data-aos-duration="1000"
												data-aos-once="true"
												data-aos-delay="300"
												alt="SparkFun"
												src="images/Logo/Sparkfun.svg"
											/>
										</div>
										<div className="col-lg-3 d-flex justify-content-center">
											<img
												className=""
												style={{
													height: "250px",
													width: "250px",
												}}
												data-aos="flip-up"
												data-aos-duration="1000"
												data-aos-once="true"
												data-aos-delay="400"
												alt="Texas_Instruments"
												src="images/Logo/Texas_Instr.svg"
											/>
										</div>
									</Slider>
									<div id="testimonials"></div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<VisibilitySensor
					onChange={() => {
						setToggleAOS(!toggleAOS);
					}}
				>
					<TestimonialsList />
				</VisibilitySensor>
				<section className="overflow-hidden">
					<div className="container">
						<div className="row mx-3 mb-4 mx-lg-0">
							<div
								className="col-lg-4 col-md-6 col-12"
								data-aos="flip-up"
								data-aos-duration="1000"
								data-aos-once="true"
								data-aos-delay="000"
							>
								<div className="card explore-feature border5px border-0 shadow text-center">
									<div className="card-body">
										<div className="icon rounded-circle hvr-icon-grow shadow-lg d-inline-block">
											<i className="fas hvr-icon fa-briefcase" />
										</div>
										<div className="content mt-3">
											<h2 className="mb-0 colorblue pt-2">
												<span>
													<CountUp
														duration={5}
														end={30}
														start={countUpNum1}
														onEnd={() => {
															setCountUpNum1(30);
														}}
													>
														{({
															countUpRef,
															start,
														}) => (
															<VisibilitySensor
																onChange={start}
																delayedCall
															>
																<span
																	ref={
																		countUpRef
																	}
																/>
															</VisibilitySensor>
														)}
													</CountUp>
												</span>
												&nbsp;+
											</h2>
											<h5 className="mb-0 mt-2 coloryellow">
												YEARS OF EXPERIENCE
											</h5>
										</div>
									</div>
								</div>
							</div>
							<div
								className="col-lg-4 col-md-6 col-12 mt-3 mt-lg-0"
								data-aos="flip-up"
								data-aos-duration="1000"
								data-aos-once="true"
								data-aos-delay="100"
							>
								<div className="card explore-feature border5px border-0 shadow text-center">
									<div className="card-body">
										<div className="icon rounded-circle hvr-icon-grow shadow-lg d-inline-block">
											<i className="fas hvr-icon fa-users" />
										</div>
										<div className="content mt-3">
											<h2 className="mb-0 colorblue pt-2">
												<span>
													<CountUp
														duration={5}
														end={3000}
														start={countUpNum2}
														onEnd={() => {
															setCountUpNum2(
																3000
															);
														}}
													>
														{({
															countUpRef,
															start,
														}) => (
															<VisibilitySensor
																onChange={start}
																delayedCall
															>
																<span
																	ref={
																		countUpRef
																	}
																/>
															</VisibilitySensor>
														)}
													</CountUp>
												</span>
												&nbsp;+
											</h2>
											<h5 className="mb-0 mt-2 coloryellow">
												HAPPY CUSTOMERS
											</h5>
										</div>
									</div>
								</div>
							</div>
							<div
								className="col-lg-4 col-md-6 col-12 mt-3 mt-lg-0"
								data-aos="flip-up"
								data-aos-duration="1000"
								data-aos-once="true"
								data-aos-delay="200"
							>
								<div className="card explore-feature border5px border-0 shadow text-center">
									<div className="card-body">
										<div className="icon rounded-circle hvr-icon-grow shadow-lg d-inline-block">
											<i className="fas hvr-icon fa-thumbs-up" />
										</div>
										<div className="content mt-3">
											<h2 className="mb-0 colorblue pt-2">
												<span>
													<CountUp
														duration={5}
														end={100}
														start={countUpNum3}
														onEnd={() => {
															setCountUpNum3(100);
														}}
													>
														{({
															countUpRef,
															start,
														}) => (
															<VisibilitySensor
																onChange={start}
																delayedCall
															>
																<span
																	ref={
																		countUpRef
																	}
																/>
															</VisibilitySensor>
														)}
													</CountUp>
												</span>
												&nbsp;%
											</h2>
											<h5 className="mb-0 mt-2 coloryellow">
												CUSTOMER SATISFACTION
											</h5>
										</div>
										<div id="ourteam"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="pb-5 pt-4 ourteam">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12">
								<div
									className="text-center mb-4 pb-1"
									data-aos="zoom-in"
									data-aos-duration="1000"
									data-aos-once="true"
								>
									<h2 className="title colorblue">
										Our Team
									</h2>
								</div>
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-lg-12">
								<div className="row">
									{ourTeam.map((member: any, index: any) => {
										return (
											<div
												key={index}
												className="col-lg-3 mb-5 px-4"
												data-aos="flip-left"
												data-aos-duration="1000"
												data-aos-once="true"
											>
												<img
													src={member.dp || tempImg}
													className="w-100 border5px shadow"
													width="250px"
													height="250px"
													alt="Team_Member_Image"
													data-aos="flip-up"
													data-aos-duration="1000"
													data-aos-once="true"
													data-aos-delay={`${index}00`}
												/>
												<div className="text-center shadow bgcolorwhite border5px py-2 mt-3">
													<div className="row my-1">
														<div className="col">
															<h5 className="mb-0 colorblue">
																{member.name}
															</h5>
														</div>
													</div>
													<div className="row my-1">
														<div className="col">
															<p className="mb-0 fontsize14 colorlightblue">
																{member.role}
															</p>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
};
export default AboutUs;
