import { useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./authentication";

const PrivateRoutes = ({
	path,
	element: Element,
	profile,
	handleProfileData,
	...rest
}: {
	path: any;
	element: any;
	profile: any;
	handleProfileData: any;
}) => {
	const [status] = useState(null);
	if (status === 403 || status === 401) {
		localStorage.removeItem("token");
		return <Navigate to="/signin" replace={true} />;
	}
	return (
		<Route
			{...rest}
			element={
				isAuthenticated() ? (
					<Element
						// {...props}
						path=
						profile={profile}
						handleProfileData={handleProfileData}
					/>
				) : (
					<Navigate to="/signin" replace={true} />
				)
			}
		/>
	);
};
export default PrivateRoutes;
