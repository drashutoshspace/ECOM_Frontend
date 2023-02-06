import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const TopBarDark = ({ topClass, fluid }) => {
	const router = useRouter();
	const firebaseLogout = () => {
		localStorage.setItem("user", false);
		router.push("/page/account/login-auth");
	};
	return (
		<div className={topClass}>
			<Container fluid={fluid}>
				<Row>
					<Col lg="6">
						<div className="header-contact">
							<ul>
								<li>Welcome to Our Store</li>
								<li>
									<i
										className="fa fa-phone text-white"
										aria-hidden="true"
									></i>
									Call Us: +91-011-44-45-9085
								</li>
							</ul>
						</div>
					</Col>
					<Col lg="6" className="text-end">
						<ul className="header-dropdown">
							<li className="d-inline-block">
								<a
									href="https://www.facebook.com/profile.php?id=100086897816897"
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										className="hvr-icon"
										height="20px"
										alt="Facebook"
										src="/assets/Logo/FB_Logo.svg"
									/>
								</a>
							</li>
							<li className="d-inline-block">
								<a
									href="https://instagram.com/meemokidz?igshid=YmMyMTA2M2Y="
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										className="hvr-icon"
										height="20px"
										alt="Instagram"
										src="/assets/Logo/Instagram_Logo.svg"
									/>
								</a>
							</li>
              <li className="d-inline-block">
												<a
													href="https://api.whatsapp.com/send?phone=919910446228"
													rel="noopener noreferrer"
													target="_blank"
												>
													<img
														className="hvr-icon"
														height="20px"
														alt="WhatsApp"
														src="/assets/Logo/WA_Logo.svg"
													/>
												</a>
											</li>
							{/* <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> My Account
                <ul className="onhover-show-div">
                  <li>
                    <Link href={`/page/account/login`}>
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/page/account/register`}>
                      <a>Register</a>
                    </Link>
                  </li>
                  <li onClick={() => firebaseLogout()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </li> */}
						</ul>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default TopBarDark;
