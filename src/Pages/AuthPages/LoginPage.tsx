import Breadcrumb from "../../Components/Breadcrumb";
import { useState } from "react";
import Login from "../../Components/Login";
import Signup from "../../Components/AuthComponents/Signup";
import Base from "../../Base";
import { useMediaQuery } from "react-responsive";
const LoginPage = ({ handleRememberMe, rememberMe }: any) => {
	const [toggle, setToggle] = useState(false);
	const handleToggle = (toggleValue: any) => {
		setToggle(toggleValue);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	return (
		<Base>
			<Breadcrumb title="Login" />
			<section className="section">
				<div className="container">
					<div className="row align-items-center pb-4">
						<div
							className="col-lg-6 col-md-6"
							onMouseEnter={handleChangeImage}
							onMouseLeave={handleChangeImage}
						>
							{isDesktopOrLaptop && (
								<div className="">
									<img
										src={
											changeImage
												? "images/Login_SVG_Yellow.svg"
												: "images/Login_SVG_LightBlue.svg"
										}
										height="400px"
										className="loginsvg"
										alt="Login_SVG"
									/>
								</div>
							)}
							{isTabletOrMobile && (
								<div className="mb-5 text-center">
									<img
										src={
											changeImage
												? "images/Login_SVG_Yellow.svg"
												: "images/Login_SVG_LightBlue.svg"
										}
										width="300px"
										className="loginsvg"
										alt="Login_SVG"
									/>
								</div>
							)}
						</div>
						{!toggle ? (
							<Login
								rememberMe={rememberMe}
								handleRememberMe={handleRememberMe}
								handleToggle={handleToggle}
							/>
						) : (
							<Signup handleToggle={handleToggle} />
						)}
					</div>
				</div>
			</section>
		</Base>
	);
};
export default LoginPage;
