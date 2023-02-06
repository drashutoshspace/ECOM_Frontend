import React, { Fragment } from "react";
import { Container, Row, Col, Media } from "reactstrap";

const CopyRight = ({ layout, fluid }) => {
	return (
		<Fragment>
			<div className={`sub-footer ${layout}`}>
				<Container fluid={fluid}>
					<Row>
						<Col xl="6" md="6" sm="12">
							<div className="footer-end">
								<p>
									<i
										className="fa fa-copyright"
										aria-hidden="true"
									></i>
									2021-22
								</p>
							</div>
						</Col>
						<Col xl="6" md="6" sm="12">
							<div className="payment-card-bottom">
								<ul>
									<li>
										<a href="#">
											<img
												height="20px"
												src={
													"/assets/logo/UPI_Logo_Small.svg"
												}
												alt=""
											/>
										</a>
									</li>
									<li>
										<a href="#">
											<img
												height="20px"
												src={
													"/assets/logo/Rupay_Logo.svg"
												}
												alt=""
											/>
										</a>
									</li>
									<li>
										<a href="#">
											<img
												height="20px"
												src={
													"/assets/logo/Visa_logo.svg"
												}
												alt=""
											/>
										</a>
									</li>
									<li>
										<a href="#">
											<img
												height="20px"
												src={
													"/assets/logo/Mastercard_Logo.svg"
												}
												alt=""
											/>
										</a>
									</li>
									<li>
										<a href="#">
											<img
												height="20px"
												src={
													"/assets/logo/Maestro_Logo.svg"
												}
												alt=""
											/>
										</a>
									</li>
									<li>
										<a href="#">
											<img
												height="20px"
												src={
													"/assets/logo/Amex_Logo.svg"
												}
												alt=""
											/>
										</a>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};

export default CopyRight;
