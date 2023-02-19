import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const override: CSSProperties = {
	display: "block",
	margin: "10 15",
	borderColor: "red",
};
function DataLoader() {
	let [loading] = useState(true);
	let [color] = useState("#00214d");
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
export default DataLoader;
