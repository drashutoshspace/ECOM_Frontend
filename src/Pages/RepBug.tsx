import Breadcrumb from "../Components/Breadcrumb";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { reportabugForm } from "../helpers/others/reportabugForm";
import DataLoader2 from "../Components/DataLoaders/DataLoader2";
import tempImg from "../Assets/images/Video_Icon.png";
const thumbsContainer = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	marginTop: 16,
};
const thumb = {
	display: "inline-flex",
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: "border-box",
};
const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
	borderRadius: 5,
};
const img = {
	display: "block",
	width: "auto",
	height: "100%",
};
const baseStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 5,
	borderColor: "transparent",
	borderStyle: "dashed",
	backgroundColor: "#ffffff",
	outline: "none",
	transition: "all .24s ease-in-out",
};
const activeStyle = {
	borderColor: "#2196f3",
};
const acceptStyle = {
	borderColor: "#00e676",
	backgroundColor: "rgba(0, 230, 118, 0.4)",
};
const rejectStyle = {
	borderColor: "#ff1744",
	backgroundColor: "rgba(255, 23, 68, 0.4)",
};
function StyledDropzone(props: any) {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((acceptedFiles: any) => {
		props.handleDropImage(acceptedFiles);
		setFiles(
			acceptedFiles.map((file: any) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		maxFiles: 1,
		accept: "image/*,video/*",
		onDrop,
	});
	const thumbs = files.map((file: any) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					src={
						file.name.includes("mp4") ||
						file.name.includes("mov") ||
						file.name.includes("mkv") ||
						file.name.includes("avi") ||
						file.name.includes("3gpp")
							? tempImg
							: file.preview
					}
					style={img}
				/>
			</div>
		</div>
	));
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			files.forEach((file: any) => URL.revokeObjectURL(file.preview));
		}
		return () => {
			mounted = false;
		};
	}, [files]);
	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);
	return (
		<div {...getRootProps({ style })}>
			<input {...getInputProps()} />
			<p className="m-0 p-2 colorblue">
				<i
					className={
						isDragAccept
							? "far fa-3x fa-photo-video accepted"
							: isDragReject
							? "far fa-3x fa-times-circle notaccepted"
							: "far fa-3x fa-photo-video"
					}
				></i>
			</p>
			<p className="m-0 p-2 text-center colorblue">
				Drop your image or video here, or{" "}
				<span className="colorlightblue">browse!</span> Please add only
				1 item.
			</p>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</div>
	);
}
const RepBug = () => {
	const [changeImage, setChangeImage] = useState(false);
	const handleChangeImage = () => {
		setChangeImage(!changeImage);
	};
	const [text, setText] = useState("");
	const [image, setImage] = useState("");
	const [loading, setloading] = useState(false);
	const handleReportBug = (e: any) => {
		e.preventDefault();
		setloading(true);
		const uploadData = new FormData();
		uploadData.append("comments", text);
		uploadData.append("file", image);
		if (text === "") {
			setloading(false);
			return toast("Empty field!", {
				type: "error",
				autoClose: 5000,
				position: "bottom-center",
				hideProgressBar: false,
				pauseOnHover: true,
				pauseOnFocusLoss: true,
			});
		}
		reportabugForm(uploadData, () => {
			setText("");
			setloading(false);
			return toast("Bug Submitted", {
				type: "success",
				autoClose: 5000,
				position: "bottom-center",
				hideProgressBar: false,
				pauseOnHover: true,
				pauseOnFocusLoss: true,
			});
		});
	};
	const handleDropImage = async (drop: any) => {
		setImage(drop[0]);
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Report A Bug</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Report A Bug" />
				<section className="section feedback">
					<div className="container">
						<div className="row align-items-center">
							<div
								className="col-lg-6 col-md-6"
								onMouseEnter={handleChangeImage}
								onMouseLeave={handleChangeImage}
							>
								<div className="me-lg-5 mb-3 mb-lg-0">
									<img
										src={
											changeImage
												? "images/Report_A_Bug_Yellow.svg"
												: "images/Report_A_Bug_LightBlue.svg"
										}
										className="loginsvg"
										alt="Report_A_Bug"
									/>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="card bgcolorgreyish border-0 border5px p-4">
									<div className="card-body p-0">
										<p className="text-center mb-0 colorblue fontsize16 pt-0 p-3">
											To give you the best possible
											experience, we are constantly
											evolving and making changes to our
											site/app. If you find any bug, we
											will be happy to correct it.
											<b className="colorlightblue">
												{" "}
												Thanks! Keep Shopping!
											</b>
										</p>
										<p className="text-center mb-0 colorblue fontsize16 mb-3">
											- Team MeeMo Kidz
										</p>
										<form className="mt-3">
											<div className="row">
												<div className="col-lg-12">
													<div className="position-relative mb-3">
														<p className="text-center fontsize16 colorblue mb-4">
															Describe the bug you
															saw while you were
															using our site/app?
															(Please mention the
															action you were
															doing and the
															location at which
															you were doing the
															action.)
														</p>
														<textarea
															className="colorblue bgcolorwhite p-3 border5px border-0 w-100"
															style={{
																height: "150px",
																resize: "none",
															}}
															placeholder="Comments"
															value={text}
															onChange={(e) => {
																setText(
																	e.target
																		.value
																);
															}}
															required
														/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="position-relative mb-4">
														<p className="text-center fontsize16 colorblue mb-4">
															If you can add a
															screenshot or a
															screen recording of
															the bug, we will be
															able to find it and
															correct it, swiftly!
														</p>
														<StyledDropzone
															handleDropImage={
																handleDropImage
															}
														/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="d-grid">
														<button
															disabled={
																loading
																	? true
																	: false
															}
															onClick={
																handleReportBug
															}
															className="mybtnsame fontsize16 bglightblue colorblue bgyellow border5px border-0 text-uppercase d-inline-block"
														>
															{loading ? (
																<DataLoader2
																	loaderSize={
																		15
																	}
																	loaderType="ScaleLoader"
																	loaderColor="#00214d"
																/>
															) : (
																"Submit"
															)}
														</button>
													</div>
												</div>
											</div>
										</form>
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
export default RepBug;
