import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
const PreLoader = () => {
	const [redirect, setRedirect] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setRedirect(true);
			sessionStorage.setItem("loader", "true");
		}, 2500);
		return () => {
			clearTimeout(timer);
		};
	}, []);
	return (
		<>
			{redirect ? (
				window.location.reload()
			) : (
				<>
					<Loader />
				</>
			)}
		</>
	);
};
export default PreLoader;
