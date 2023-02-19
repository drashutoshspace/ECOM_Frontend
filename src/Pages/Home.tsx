import Hero from "../Components/Hero";
import Info1 from "../Components/Info1";
import Counter from "../Components/Counter";
import TestimonialsList from "../Components/TestimonialsList";
import { useEffect, useState } from "react";
import Base from "../Base";
import ProductList from "../Components/EcommerceComp/ProductList";
import AOS from "aos";
import "aos/dist/aos.css";
import VisibilitySensor from "react-visibility-sensor";
import { Helmet } from "react-helmet-async";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { isAuthenticated } from "../helpers/auth/authentication";
const Home = () => {
	const [toggleAOS, setToggleAOS] = useState(false);
	const [home_products, setHome_Products] = useState([]);
	const handleHomeProducts = (array: any) => {
		setHome_Products(array);
	};
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
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Home</title>
				<meta
					name="description"
					content="Spaceonova is an online learning portal by Spaceonova!"
				/>
				<meta
					property="og:image"
					content="https://www.spaceonova.space/images/Meta_Image.png"
				/>
			</Helmet>
			<Base>
				<Hero />
				{!isAuthenticated() && (
					<>
						<Info1 />
						<VisibilitySensor
							onChange={() => {
								setToggleAOS(!toggleAOS);
							}}
						>
							<Counter />
						</VisibilitySensor>
					</>
				)}
				<VisibilitySensor
					onChange={() => {
						setToggleAOS(!toggleAOS);
					}}
				>
					<ProductList
						home_products={home_products}
						handleHomeProducts={handleHomeProducts}
					/>
				</VisibilitySensor>
				<VisibilitySensor
					onChange={() => {
						setToggleAOS(!toggleAOS);
					}}
				>
					<Counter />
				</VisibilitySensor>
				<VisibilitySensor
					onChange={() => {
						setToggleAOS(!toggleAOS);
					}}
				>
					<TestimonialsList />
				</VisibilitySensor>
			</Base>
		</>
	);
};
export default Home;
