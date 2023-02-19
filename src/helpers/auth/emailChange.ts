import { EmailChange_API } from "../../backend";
import { toast } from "react-toastify";
export const emailChange = (user, next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	return fetch(EmailChange_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			if (!response.ok) {
				return toast("Something went wrong!", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
			}
			return response.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
