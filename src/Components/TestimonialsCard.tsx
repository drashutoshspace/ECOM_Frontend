import tempImg from "../Assets/images/User_Image.webp";
const TestimonialsCard = ({ testimonial }) => {
	var stars = [];
	var showStars = (number) => {
		for (var i = 0; i < number; i++) {
			stars.push(<i key={i} className="fas hvr-icon me-1 coloryellow fa-star" />);
		}
		return <li className="list-inline-item">{stars}</li>;
	};
	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}
	return (
		<>
			<div className="d-flex mt-0 m-2 p-3 client-testi hvr-icon-grow border5px border-0" data-aos="flip-down" data-aos-duration="1000" data-aos-once="true">
				<img src={testimonial?.user?.image || tempImg} className="client-image border5px" alt="User_Image" />
				<div className="flex-1 border5px shadow content p-3 position-relative">
					<ul className="list-unstyled mb-0">{testimonial?.rating > 5 ? showStars(5) : showStars(testimonial?.rating)}</ul>
					<p className="mypara mt-2">{`"${truncate(testimonial?.review, 130)}"`}</p>
					<h6 className="colorblue">- {testimonial?.user?.first_name !== "" ? testimonial?.user?.first_name : testimonial?.user?.username}</h6>
				</div>
			</div>
		</>
	);
};
export default TestimonialsCard;
