import Breadcrumb from "../Components/Breadcrumb";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import sanitizeHtml from "sanitize-html";
import { useState, useEffect } from "react";
import { cnrData } from "../APIs/misc/misc";

export default function CancRef(): JSX.Element {
	const [cnrDoc, setCnrDoc] = useState([]);
	useEffect(() => {
		const getCnr = async () => {
			await cnrData().then((data: any) => {
				setCnrDoc(data);
			});
		};
		getCnr();
	}, []);
	const defaultOptions = {
		allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
	};
	const sanitize = (dirty: any, options: any) => ({
		__html: sanitizeHtml(
			dirty,
			(options = { ...defaultOptions, ...options })
		),
	});
	const SanitizeHTML = ({ html, options }: any) => (
		<div dangerouslySetInnerHTML={sanitize(html, options)} />
	);
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Cancellation & Refunds</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Cancellation & Refunds" />
				<section className="section mx-3">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-9">
								<div className="card colorblue border5px border-0">
									<div className="card-body">
										{cnrDoc.map((info: any, index: any) => {
											return (
												<div key={index}>
													<h4 className="card-title colorlightblue">
														{info.heading}
													</h4>
													<SanitizeHTML
														html={`<p className="">${info.content}</p>`}
													/>
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
}
