import Hero from "../Components/Hero";
import Counter from "../Components/Counter";
import TestimonialsList from "../Components/TestimonialsList";
import { useEffect, useState } from "react";
import Base from "../Base";
import ProductList from "../Components/ProductList";
import AOS from "aos";
import VisibilitySensor from "react-visibility-sensor";
import { Helmet } from "react-helmet-async";

export default function Home() {
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
					content="MeeMo Kidz is an online kids toy store!"
				/>
				<meta
					property="og:image"
					content="https://www.meemokidz.com/images/Meta_Image.png"
				/>
			</Helmet>
			<Base>
				<Hero />
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
}
