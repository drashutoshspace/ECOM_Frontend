import { useMediaQuery } from "react-responsive";
const Breadcrumb = ({
	title,
	myowntoggle,
}: {
	title: string;
	myowntoggle?: boolean;
}) => {
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	return (
		<>
			{isDesktopOrLaptop && (
				<div
					className="breadcrumbimg p-4"
					style={{ backgroundImage: "url(/images/Masala_02.webp)" }}
				>
					<div className="row breadcrumb__text text-center">
						<h2
							className={
								myowntoggle
									? "mb-0 faqs"
									: "mb-0 text-uppercase"
							}
							style={{
								fontSize: "35px",
								color: "#00214d",
								fontWeight: "900",
								letterSpacing: "2px",
							}}
						>
							{title}
						</h2>
					</div>
				</div>
			)}
			{isTabletOrMobile && (
				<div
					className="breadcrumbimg p-4"
					style={{ backgroundImage: "url(/images/Masala_02.webp)" }}
				>
					<div className="row breadcrumb__text text-center">
						<h2
							className={
								myowntoggle
									? "mb-0 faqs"
									: "mb-0 text-uppercase"
							}
							style={{
								fontSize: "25px",
								color: "#00214d",
								fontWeight: "900",
								letterSpacing: "2px",
							}}
						>
							{title}
						</h2>
					</div>
				</div>
			)}
		</>
	);
};
export default Breadcrumb;
