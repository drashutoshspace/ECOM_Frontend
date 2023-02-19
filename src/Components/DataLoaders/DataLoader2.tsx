import ScaleLoader from "react-spinners/ScaleLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
function DataLoader2({ loaderColor, loaderType }) {
	return (
		<>
			{loaderType === "ScaleLoader" && <ScaleLoader color={loaderColor} height={15} />}
			{loaderType === "PropagateLoader" && <PropagateLoader color={loaderColor} height={15} />}
		</>
	);
}
export default DataLoader2;
