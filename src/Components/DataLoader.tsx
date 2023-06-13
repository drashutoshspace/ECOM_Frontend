import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function DataLoader(): JSX.Element {
	const [loading] = useState(true);
	const [color] = useState("#00214d");
	const override: CSSProperties = {
		display: "block",
		margin: "10 15",
		borderColor: "red",
	};
	return (
		<div
			className="d-flex justify-content-center align-items-center flex-column sweet-loading"
			style={{
				width: "100vw",
				height: "100vh",
				position: "fixed",
				top: "0px",
				left: "0px",
				backgroundColor: "white",
				zIndex: 100000,
			}}
		>
			<SyncLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={25}
			/>
		</div>
	);
}
