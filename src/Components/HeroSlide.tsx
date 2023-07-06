import { Link } from "react-router-dom";
import { Banner } from "../Interfaces/Misc";

export default function HeroSlide({
	heroVar,
}: {
	heroVar: Banner;
}): JSX.Element {
	return (
		<Link to="/shop/allproducts">
			<img
				src={heroVar.banner_image}
				className="hero w-100 h-auto"
				alt="Hero_Images"
			/>
		</Link>
	);
}
