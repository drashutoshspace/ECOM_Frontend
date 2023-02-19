import { toast } from "react-toastify";
import { FeedbackForm_API } from "../../backend";
export const feedbackForm = async (name, email, message) => {
	return await fetch(FeedbackForm_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(name, email, message),
	})
		.then((res) => {
			if (!res.ok) {
				return toast("Something Went Wrong! Try Again", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
			}
			return res.json();
		})
		.catch((err) => console.log(err));
};
