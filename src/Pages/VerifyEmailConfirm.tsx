import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Base from "../Base";
import Breadcrumb from "../Components/Breadcrumb";
import { useSelector } from "react-redux";
import { Store } from "../Interfaces/Store";

export default function VerifyEmailConfirm(): JSX.Element {
	const userId = useSelector((state: Store) => state.userProfile.id);
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	return (
		<>
			{userId === -1 && localStorage.getItem("emailV") && (
				<>
					<Helmet>
						<title>MeeMo Kidz | Verification Email Sent</title>
					</Helmet>
					<Base>
						<>
							<Breadcrumb title="Verification Email Sent" />
							<div
								className="container"
								style={{ width: "350px" }}
							>
								<form
									className="bgcolorgreyish border-0 border5px my-4 p-4"
									onMouseEnter={handleChangeImage}
									onMouseLeave={handleChangeImage}
								>
									<div className="text-center w-100 mb-4">
										<img
											src={
												changeImage
													? "images/Verification_Email_Sent_Yellow.svg"
													: "images/Verification_Email_Sent_LightBlue.svg"
											}
											alt="Verify_Email"
											className="ps-3 loginsvg"
											height="200px"
										/>
									</div>
									<div className="text-center w-100">
										<p className="colorblue mb-0">
											Please confirm your email by
											clicking on the link in the mail
											sent to you.
										</p>
									</div>
								</form>
							</div>
						</>
					</Base>
				</>
			)}
		</>
	);
}
