import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getBanner } from "../APIs/misc/misc";
import HeroSlide from "./HeroSlide";
import { toast } from "react-toastify";
import { Banner } from "../Interfaces/Misc";

function useDragDetection(): {
	handleMouseDown: () => void;
	dragging: boolean;
} {
	const MoveDragThreshold = 10;
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

export default function Hero(): JSX.Element {
	function NextArrow({ className }: { className: string }) {
		return (
			<button className={className}>
				<i className="fas fa-2x fa-angle-right" />
			</button>
		);
	}
	function PrevArrow({ className }: { className: string }) {
		return (
			<button className={className}>
				<i className="fas fa-2x fa-angle-left" />
			</button>
		);
	}
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
		async function bannerCall() {
			await getBanner().then((res) => {
				if (res?.banner) {
					setHeroSlides(res.banner);
				} else {
					return toast.error(res.email[0]);
				}
			});
		}
		bannerCall();
	}, []);
	return (
		<section className="heroslider overflow-hidden">
			<Slider {...settings}>
				{heroSlides?.map((heroVar: Banner, index: number) => {
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
	);
}
