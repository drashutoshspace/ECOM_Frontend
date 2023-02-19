import { ReportABug_API } from "../../backend";
import { toast } from "react-toastify";
export const reportabugForm = async (uploadData, next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	return await fetch(ReportABug_API, {
		method: "POST",
		headers: {
			Authorization: "Token " + tokenValue,
		},
		body: uploadData,
	})
		.then((response) => {
			if (!response.ok) {
				return toast("Something went wrong!", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
			}
			return response.json();
		})
		.then((data) => {
			next();
		})
		.catch((err) => console.log(err));
};
