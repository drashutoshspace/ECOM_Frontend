import { ProfileData_API } from "../../backend";
export const profileData = async () => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	return await fetch(ProfileData_API, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const profileDataUpdate = async (uploadData: any) => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	return await fetch(ProfileData_API, {
		method: "POST",
		headers: {
			Authorization: "Token " + tokenValue,
		},
		body: uploadData,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
