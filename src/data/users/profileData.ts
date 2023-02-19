import { ProfileData_API } from "../../backend";
export const profileData = async (next: any) => {
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
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const profileDataUpdate = async (uploadData: any, next: any) => {
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
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
