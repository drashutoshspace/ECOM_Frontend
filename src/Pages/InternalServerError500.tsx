import { useState } from "react";
import Base from "../Base";
import Breadcrumb from "../Components/Breadcrumb";
import { Helmet } from "react-helmet-async";

export default function InternalServerError500(): JSX.Element {
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Error 500</title>
			</Helmet>
			<Base>
				<Breadcrumb title="500 Error" />
				<div className="container mb-2">
					<div className="row">
						<div
							className="col-lg-12 pt-4 py-2 d-flex justify-content-center"
							onMouseEnter={handleChangeImage}
							onMouseLeave={handleChangeImage}
						>
							<img
								width="300px"
								src={
									changeImage
										? "images/500_Error/500_Yellow.svg"
										: "images/500_Error/500_LightBlue.svg"
								}
								className="loginsvg"
								alt="500_1"
							/>
						</div>
						<div className="col-lg-12 pt-3 pb-4 d-flex justify-content-center">
							<img
								width="500px"
								src="images/500_Error/500_Text.svg"
								alt="500_2"
							/>
						</div>
					</div>
				</div>
			</Base>
		</>
	);
}
