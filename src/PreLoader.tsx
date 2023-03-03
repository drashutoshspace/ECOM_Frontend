import { useEffect, useState } from "react";
import Loader from "./Components/Loader";

export default function PreLoader() {
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
	return <>{redirect ? window.location.reload() : <Loader />}</>;
}
