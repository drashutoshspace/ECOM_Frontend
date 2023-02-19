import React, { useState } from "react";
import Base from "../../Base";
import Breadcrumb from "../../Components/Breadcrumb";
import { Helmet } from "react-helmet-async";
const NotFound404 = () => {
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	return (
		<>
			<Helmet>
				<title>Kirana For Home | Error 404</title>
			</Helmet>
			<Base>
				<Breadcrumb title="404 Error" />
				<div className="container mb-2">
					<div className="row">
						<div className="col-lg-12 py-2 d-flex justify-content-center" onMouseEnter={handleChangeImage} onMouseLeave={handleChangeImage}>
							<img width="300px" src={changeImage ? "images/404_Error/404_Yellow.svg" : "images/404_Error/404_LightBlue.svg"} className="loginsvg" alt="404_1" />
						</div>
						<div className="col-lg-12 pt-3 pb-4 d-flex justify-content-center">
							<img width="300px" src="images/404_Error/404_Text.svg" alt="404_2" />
						</div>
					</div>
				</div>
			</Base>
		</>
	);
};
export default NotFound404;
