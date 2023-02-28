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
			className="d-flex justify-content-center align-items-center position-relative flex-column sweet-loading"
			style={{ height: "100vh" }}
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
