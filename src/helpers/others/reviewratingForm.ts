import { ReviewRatingForm_API } from "../../backend";
import { toast } from "react-toastify";
export const reviewratingForm = async (product_id, review, rating, next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	return await fetch(ReviewRatingForm_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
		body: JSON.stringify(product_id, review, rating),
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.log(err));
};
export const deleteReview = async (id) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	return await fetch(`${ReviewRatingForm_API}${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
	})
		.then((res) => {
			if (!res.ok) {
				return toast("Something went wrong!", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
			}
			return res.json();
		})
		.catch((err) => console.log(err));
};
export const updateReview = async (id, rev, next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	return await fetch(`${ReviewRatingForm_API}${id}/`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
		body: JSON.stringify({ ...rev }),
	})
		.then((res) => {
			if (!res.ok) {
				return toast("Something went wrong!", { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
			}
			return res.json();
		})
		.catch((err) => console.log(err));
};
