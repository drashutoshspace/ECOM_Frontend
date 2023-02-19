import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { getBanner } from "../helpers/others/bannerAPI";
import HeroSlide from "./HeroSlide";
const MoveDragThreshold = 10;
function useDragDetection() {
	const [mouseDown, setMouseDown] = useState(false);
	const [dragging, setDragging] = useState(false);
	useEffect(() => {
		let mouseMove = 0;
		function handleMouseUp() {
			setMouseDown(false);
		}
		function handleMouseMove(e: any) {
			mouseMove += Math.abs(e.movementX) + Math.abs(e.movementY);
			setDragging(mouseMove > MoveDragThreshold);
		}
		if (mouseDown) {
			document.addEventListener("mouseup", handleMouseUp);
			document.addEventListener("mousemove", handleMouseMove);
		}
		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [mouseDown]);
	function handleMouseDown() {
		setMouseDown(true);
		setDragging(false);
	}
	return {
		handleMouseDown,
		dragging,
	};
}
const Hero = () => {
	const NextArrow = ({ className, onClick }: any) => {
		return (
			<button className={className} onClick={onClick}>
				<i className="fas fa-2x fa-angle-right"></i>
			</button>
		);
	};
	const PrevArrow = ({ className, onClick }: any) => {
		return (
			<button className={className} onClick={onClick}>
				<i className="fas fa-2x fa-angle-left"></i>
			</button>
		);
	};
	var settings = {
		arrows: true,
		infinite: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: true,
		nextArrow: <NextArrow className={"slick-arrow slick-next"} />,
		prevArrow: <PrevArrow className={"slick-arrow slick-prev"} />,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					arrows: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
				},
			},
		],
	};
	const { handleMouseDown, dragging } = useDragDetection();
	function handleChildClick(e: any) {
		if (dragging) {
			e.preventDefault();
		}
	}
	const [heroSlides, setHeroSlides] = useState<[]>();
	useEffect(() => {
		getBanner().then((res) => {
			setHeroSlides(res.banner);
		});
	}, []);
	return (
		<>
			<section className="heroslider overflow-hidden">
				<Slider {...settings}>
					{heroSlides?.map((heroVar, index) => {
						return (
							<div
								onMouseDownCapture={handleMouseDown}
								onClickCapture={handleChildClick}
								key={index}
							>
								<HeroSlide key={index} heroVar={heroVar} />
							</div>
						);
					})}
				</Slider>
			</section>
		</>
	);
};
export default Hero;
