import Breadcrumb from "../Components/Breadcrumb";
import { testimonialData } from "../APIs/misc/misc";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Base from "../Base";

export default function Testimonials({
	handleTestimonials,
	testimonials,
}: any): JSX.Element {
	useEffect(() => {
		const getTestimonial = async () => {
			await testimonialData().then((data: any) => {
				handleTestimonials(data);
			});
		};
		getTestimonial();
	}, []);
	const [changeImage1, setChangeImage1] = useState(false);
	const handleChangeImage1 = () => {
		setChangeImage1(!changeImage1);
	};
	return (
		<>
			<Helmet>
				<title>Spaceonova | Testimonials</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Testimonials" />
				<section className="section overflow-hidden">
					<div className="container">
						<div
							className="row"
							onMouseEnter={handleChangeImage1}
							onMouseLeave={handleChangeImage1}
						>
							{testimonials?.length >= 0 ? (
								<div className="row mt-2">
									<div className="col-lg-12 text-center">
										<img
											width="300px"
											src={
												changeImage1
													? "images/Feedback_Yellow.svg"
													: "images/Feedback_LightBlue.svg"
											}
											className="loginsvg"
											alt=""
										/>
										<h3 className="mt-4 mb-0 pt-3 text-center colorblue">
											No testimonials have been added by the administrator yet!
										</h3>
									</div>
								</div>
							) : (
								<>
									{/* {testimonials?.map((testimonial, index) => {
										return <TestimonialsVideoCard key={index} testimonial={testimonial} />;
									})} */}
								</>
							)}
						</div>
					</div>
				</section>
			</Base>
		</>
	);
}
