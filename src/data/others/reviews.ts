import { ReviewRatingForm_API, RatingCountAPI } from "../../backend";
export const reviews = async (next: any) => {
	let tokenValue = "";
	if (localStorage.getItem("token"))
		tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	return await fetch(ReviewRatingForm_API, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const singleReview = async (id: any, next: any) => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	return await fetch(`${ReviewRatingForm_API}${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const ratingCount = async (id: any) => {
	return await fetch(`${RatingCountAPI}?guid=${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.log(err));
};
