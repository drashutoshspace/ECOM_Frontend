import tempImg from "../Assets/User_Image.webp";
import { Testimonials } from "../Interfaces/Misc";
import { truncate, insertStars } from "../Utilities/Utils";

export default function TestimonialsCard({
	testimonial,
}: {
	testimonial: Testimonials;
}): JSX.Element {
	return (
		<div
			className="d-flex mt-0 m-2 p-3 client-testi hvr-icon-grow border5px border-0"
			data-aos="flip-down"
			data-aos-duration="1000"
			data-aos-once="true"
		>
			<img
				src={testimonial?.user?.image || tempImg}
				className="client-image border5px"
				alt="User_Image"
			/>
			<div className="flex-1 border5px shadow content p-3 position-relative">
				<ul className="list-unstyled mb-0">
					{insertStars(testimonial?.rating, "testimonials")}
				</ul>
				<p className="mypara mt-2">{`"${truncate(
					testimonial?.review,
					130
				)}"`}</p>
				<h6 className="colorblue">
					-{" "}
					{testimonial?.user?.first_name !== ""
						? testimonial?.user?.first_name
						: testimonial?.user?.username}
				</h6>
			</div>
		</div>
	);
}
