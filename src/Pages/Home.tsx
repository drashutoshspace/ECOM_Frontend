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
	const [toggleAOS, setToggleAOS] = useState<boolean>(false);
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
					<ProductList fromHome={true} />
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
