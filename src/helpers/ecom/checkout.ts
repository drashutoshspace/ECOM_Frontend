import { CouponValidity_API, RazorpayKey_API } from "../../backend";
export const coupon = async (coupon) => {
	return await fetch(CouponValidity_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(coupon),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const razorpaykey = async (next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	await fetch(RazorpayKey_API, {
		method: "GET",
		headers: {
			Authorization: "Token " + tokenValue,
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
