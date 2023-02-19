import { Link } from "react-router-dom";
const Info1 = () => {
	return (
		<>
			<section className="section bluebgright overflow-hidden">
				<div className="container">
					<div className="row align-items-center">
						<div
							className="col-lg-6 text-center"
							data-aos="fade-right"
							data-aos-duration="1000"
							data-aos-once="true"
						>
							<img
								src="images/Info_1.svg"
								className="w-75"
								alt="Info1_SVG"
							/>
						</div>
						<div
							className="col-lg-6 mt-4 mt-lg-0 pt-4 pt-lg-0 ps-3"
							data-aos="fade-left"
							data-aos-duration="1000"
							data-aos-once="true"
						>
							<div className="ms-lg-4">
								<div className="section-title mb-4">
									<h2 className="title colorblue mb-4 text-center text-lg-start">
										Learning At Your Doorstep
									</h2>
									<p className="mypara colorblue text-center text-lg-start mb-0">
										Projects can be challenging and
										frustrating to make. It can be tough to
										learn & develop. Projects needs a fair
										amulgum of technical knowledge, creative
										skills, components and materials to make
										it possible in real life. Our speciality
										is to turn your ideas into real life
										projects. <br /> <br />
										BoostUp provides a One Stop Shop for all
										your project needs whether you want to
										buy components and materials for it or
										you want to learn through our distance
										learning kits.
									</p>
								</div>
								<div className="mt-4 d-flex justify-content-lg-start justify-content-center pt-2">
									<Link
										to="/shop"
										className="mybtnsame bglightblue colorblue bgyellow border5px border-0 text-uppercase"
									>
										Explore Shop &nbsp;
										<i className="fas fa-angle-right" />
									</Link>
									<Link
										to="/learn"
										className="mybtnsame bglightblue colorblue bgyellow border5px border-0 text-uppercase ms-3"
									>
										Learn Now &nbsp;
										<i className="fas fa-video" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Info1;
