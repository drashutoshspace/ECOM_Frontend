import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Scrollspy from "react-scrollspy";
import { Helmet } from "react-helmet-async";
import Base from "../Base";
import { faqData } from "../APIs/misc/misc";

export default function Faqs(): JSX.Element {
	const [faqDoc, setFaqDoc] = useState([]);
	useEffect(() => {
		const getFaq = async () => {
			await faqData().then((data: any) => {
				setFaqDoc(data);
			});
		};
		getFaq();
	}, []);
	const [headingState, setHeadingState] = useState([]);
	const location = useLocation();
	useEffect(() => {
		if (location.hash) {
			let elem = document.getElementById(location.hash.slice(1));
			if (elem) {
				elem.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	}, [location]);
	useEffect(() => {
		let newArray: any = [];
		faqDoc.forEach((info: any, index: any) => {
			if (!newArray.includes(info.heading)) {
				newArray.push(info.heading);
			}
		});
		setHeadingState(newArray);
	}, [faqDoc]);
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | FAQs</title>
			</Helmet>
			<Base>
				<Breadcrumb title="FAQs" myowntoggle={true} />
				<section className="section mx-4">
					<div className="container colorblue border5px border-0 pb-3 px-4">
						<div className="row justify-content-center faqpage">
							<div className="col-lg-3 col-md-5 col-12 d-none d-md-block">
								<div className="shadow p-4 sticky-bar position-sticky border5px">
									<Scrollspy
										className="list-unstyled sidebar-nav mb-0 py-0"
										items={[
											...headingState.map(
												(value: string) => {
													return value.replace(
														" ",
														""
													);
												}
											),
										]}
										currentClassName="activefaq"
									>
										{headingState.map(
											(heading: string, index) => {
												return (
													<li
														key={index}
														className="navbar-item my-2 px-0"
													>
														<Link
															to={`/faqs#${heading.replace(
																" ",
																""
															)}`}
															className="colorblue lightbluehover"
														>
															{heading}
														</Link>
													</li>
												);
											}
										)}
									</Scrollspy>
								</div>
							</div>
							<div className="col-lg-9 col-md-7 col-12">
								{headingState.map((heading: string, index) => {
									return (
										<div key={index} className="mb-4">
											<h4
												className="colorblue text-center text-lg-start"
												id={heading.replace(" ", "")}
											>
												{heading}
											</h4>
											{faqDoc.map(
												(info: any, index: any) => {
													if (
														info.heading === heading
													) {
														return (
															<>
																<div
																	key={index}
																	className="accordion mt-4 pt-2"
																	id={`section${index}`}
																>
																	<div className="accordion-item border-0">
																		<h2
																			className="accordion-header"
																			id={`heading${index}`}
																		>
																			<button
																				className="border5px colorlightblue bgcolorgreyish shadow-none accordion-button border-0"
																				type="button"
																				data-bs-toggle="collapse"
																				data-bs-target={`#collapse${index}`}
																				aria-expanded="true"
																				aria-controls={`collapse${index}`}
																			>
																				{
																					info.question
																				}
																			</button>
																		</h2>
																		<div
																			id={`collapse${index}`}
																			className="accordion-collapse border-0 collapse show"
																			aria-labelledby={`heading${index}`}
																			data-bs-parent={`#section${index}`}
																		>
																			<div className="accordion-body">
																				{
																					info.answer
																				}
																			</div>
																		</div>
																	</div>
																</div>
															</>
														);
													}
												}
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
}
