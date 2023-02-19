import { PasswordChange_API } from "../../backend";
export const passwordChange = (user: any, next: any) => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	return fetch(PasswordChange_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
