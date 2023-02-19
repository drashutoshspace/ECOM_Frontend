import "../Loader/style.css";
import LoaderSVG from "../../Assets/images/Loader.svg";
const Loader = () => {
	return (
		<>
			<section
				className="section d-flex justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 pe-5 d-flex justify-content-center">
							<object
								type="image/svg+xml"
								width="300px"
								data={LoaderSVG}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="loader mt-5 d-flex justify-content-center">
								<div className="content">
									<p>Welcome To Kirana For Home!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Loader;
