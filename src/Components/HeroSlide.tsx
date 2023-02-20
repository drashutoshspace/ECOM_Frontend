import { Link } from "react-router-dom";
const HeroSlide = ({ heroVar }: any) => {
	return (
		<>
			<Link to="/shop/allproducts">
				<img
					src={heroVar.banner_image}
					className="hero w-100 h-auto"
					alt="Hero_Images"
				/>
			</Link>
		</>
	);
};
export default HeroSlide;
