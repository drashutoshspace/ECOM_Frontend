import { useState, useEffect } from "react";

export default function ScrollButton(): JSX.Element {
	const [visible, setVisible] = useState(false);
	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			window.addEventListener("scroll", toggleVisible);
		}
		return () => {
			mounted = false;
		};
	});
	return (
		<>
			{visible && (
				<button
					className="go-top position-fixed bgyellow border-0 bglightblue rounded-circle p-0 colorblue"
					onClick={scrollToTop}
				>
					<i className="fas fa-1x fa-chevron-up" />
				</button>
			)}
		</>
	);
}
