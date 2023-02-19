import { ProfileData_API } from "../../backend";
export const profileData = async (next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	return await fetch(ProfileData_API, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
	})
		.then((response) => {
			if (response?.status === 403 || response?.status === 401) {
				next(response.statusText, response.status);
			}
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const profileDataUpdate = async (uploadData, next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
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
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
