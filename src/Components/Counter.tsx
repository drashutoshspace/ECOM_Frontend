import { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
const Counter = () => {
	const [countUpNum1, setCountUpNum1] = useState(0);
	const [countUpNum2, setCountUpNum2] = useState(0);
	const [countUpNum3, setCountUpNum3] = useState(0);
	return (
		<>
			<section className="section mt-5 mb-0 overflow-hidden">
				<div className="container">
					<div className="row mx-3 mx-lg-0">
						<div className="col-12">
							<div className="row">
								<div className="col-lg-4" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="">
									<div className="card border-0 text-center feature-clean product-feature p-4 shadow overflow-hidden">
										<div className="icons text-center mx-auto hvr-icon-grow">
											<i className="fas border5px shadow colorblue hvr-icon fa-shipping-fast d-block fa-2x mb-0" />
										</div>
										<div className="card-body p-0 mt-4">
											<p className="fontsize16 hoverlightblue text-uppercase title">FREE DELIVERY</p>
											<p className="colorblue fontsize16 colorblue mt-2 mb-0">ON ORDER ABOVE ₹ 1000</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 mt-4 pt-2 mt-sm-0 pt-sm-0" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="200">
									<div className="card border-0 text-center feature-clean product-feature p-4 shadow overflow-hidden">
										<div className="icons text-center mx-auto hvr-icon-grow">
											<i className="fas border5px shadow colorblue hvr-icon fa-badge-check d-block fa-2x mb-0" />
										</div>
										<div className="card-body p-0 mt-4">
											<p className="fontsize16 hoverlightblue text-uppercase title">SUPERIOR QUALITY</p>
											<p className="colorblue fontsize16 colorblue mt-2 mb-0">PRODUCT WELL PACKAGED</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 mt-4 pt-2 mt-sm-0 pt-sm-0" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="300">
									<div className="card border-0 text-center feature-clean product-feature p-4 shadow overflow-hidden">
										<div className="icons text-center mx-auto hvr-icon-grow">
											<i className="fas border5px shadow colorblue hvr-icon fa-user-headset d-block fa-2x mb-0" />
										</div>
										<div className="card-body p-0 mt-4">
											<p className="fontsize16 hoverlightblue text-uppercase title">SUPPORT</p>
											<p className="colorblue fontsize16 colorblue mt-2 mb-0">24/7 SUPPORT</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row mx-3 mt-5 mx-lg-0">
						<div className="col-lg-4 col-12" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="400">
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
													{({ countUpRef, start }) => (
														<VisibilitySensor onChange={start} delayedCall>
															<span ref={countUpRef} />
														</VisibilitySensor>
													)}
												</CountUp>
											</span>
											&nbsp;+
										</h2>
										<h5 className="mb-0 mt-2 coloryellow">YEARS OF EXPERIENCE</h5>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-12 mt-3 mt-lg-0" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="500">
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
														setCountUpNum2(3000);
													}}
												>
													{({ countUpRef, start }) => (
														<VisibilitySensor onChange={start} delayedCall>
															<span ref={countUpRef} />
														</VisibilitySensor>
													)}
												</CountUp>
											</span>
											&nbsp;+
										</h2>
										<h5 className="mb-0 mt-2 coloryellow">HAPPY CUSTOMERS</h5>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-12 mt-3 mt-lg-0" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="600">
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
													{({ countUpRef, start }) => (
														<VisibilitySensor onChange={start} delayedCall>
															<span ref={countUpRef} />
														</VisibilitySensor>
													)}
												</CountUp>
											</span>
											&nbsp;%
										</h2>
										<h5 className="mb-0 mt-2 coloryellow">CUSTOMER SATISFACTION</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Counter;
