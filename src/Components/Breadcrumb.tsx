import { useMediaQuery } from "react-responsive";

export default function Breadcrumb({
	title,
	myowntoggle,
}: {
	title: string;
	myowntoggle?: boolean;
}): JSX.Element {
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	return (
		<div
			className="breadcrumbimg p-4"
			style={{
				backgroundImage:
					"url(https://meemokidz.s3.ap-south-1.amazonaws.com/banner/Banner1.jpg)",
			}}
		>
			<div className="row breadcrumb__text text-center">
				<h2
					className={
						myowntoggle ? "mb-0 faqs" : "mb-0 text-uppercase"
					}
					style={{
						fontSize: isDesktopOrLaptop
							? "35px"
							: isTabletOrMobile
							? "25px"
							: "",
						color: "#00214d",
						fontWeight: "900",
						letterSpacing: "2px",
					}}
				>
					{title}
				</h2>
			</div>
		</div>
	);
}
