import { Link } from "react-router-dom";
const HeroSlide = ({ heroVar }) => {
	return (
		<>
			<Link to="/shop/allproducts">
				<img src={`images/Hero_Slides/Home_Image_2.png`} className="hero w-100" alt="Hero_Images"></img>
			</Link>
		</>
	);
};
export default HeroSlide;
