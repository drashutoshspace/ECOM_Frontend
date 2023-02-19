import Breadcrumb from "../Components/Breadcrumb";
import Base from "../Base";
import React from "react";
import { Helmet } from "react-helmet-async";
import sanitizeHtml from "sanitize-html";
const PrivPol = ({ privpDoc }) => {
	const defaultOptions = {
		allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
	};
	const sanitize = (dirty, options) => ({
		__html: sanitizeHtml(dirty, (options = { ...defaultOptions, ...options })),
	});
	const SanitizeHTML = ({ html, options }) => <div dangerouslySetInnerHTML={sanitize(html, options)} />;
	return (
		<>
			<Helmet>
				<title>Kirana For Home | Privacy Policy</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Privacy Policy" />
				<section className="section mx-3">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-9">
								<div className="card colorblue border5px border-0">
									<div className="card-body">
										{privpDoc.map((info, index) => {
											return (
												<div key={index}>
													<h4 className="card-title colorlightblue">{info.heading}</h4>
													<SanitizeHTML html={`<p className="">${info.content}</p>`} />
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
};
export default PrivPol;
