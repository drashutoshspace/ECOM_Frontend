import {
	Products_API,
	ProductCategory_API,
	RatingCountAPI,
	ReviewRatingForm_API,
	CouponValidity_API,
	RazorpayKey_API,
	InvoiceRequest_API,
	Payment_API,
} from "../../backend";
import {
	getWithAuthorization,
	getWithoutAuthorization,
	postWithoutAuthorization,
	postWithAuthorization,
} from "../generics";
import { toast } from "react-toastify";

export async function products(data: {
	limit?: number;
	offset?: number;
}): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}?limit=${data.limit}&offset=${data.offset}`,
		"get products"
	);
}

export async function productsCategory(): Promise<any> {
	return await getWithoutAuthorization(
		ProductCategory_API,
		"get product categories"
	);
}

export async function categoryWiseProducts(data: {
	limit?: number;
	offset?: number;
	category?: string;
}): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}?cat_name=${data.category}&limit=${data.limit}&offset=${data.offset}`,
		"get products"
	);
}

export async function singleProduct(data: { guid?: string }): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}/${data.guid}`,
		"get product"
	);
}

export async function search(data: {
	limit?: number;
	offset?: number;
	searchInput?: string;
}): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}?limit=${data.limit}&offset=${data.offset}&search=${data.searchInput}`,
		"search"
	);
}

export async function fetchAllReviews(): Promise<any> {
	return await getWithAuthorization(ReviewRatingForm_API, "get all reviews");
}

export async function singleReview(data: { guid: string }): Promise<any> {
	return await getWithAuthorization(
		`${ReviewRatingForm_API}?guid=${data.guid}`,
		"get review"
	);
}

export async function ratingCount(data: { guid: string }): Promise<any> {
	return await getWithoutAuthorization(
		`${RatingCountAPI}?guid=${data.guid}`,
		"get rating"
	);
}

export async function reviewRating(data: {
	guid: string;
	rating: number;
	review: string;
}): Promise<any> {
	return await postWithAuthorization(ReviewRatingForm_API, data, "add review");
}

export async function deleteReview(data: { id: string }): Promise<any> {
	const tokenValue = localStorage
		.getItem("currentToken")!
		.replace(/['"]+/g, "");
	try {
		const response = await fetch(`${ReviewRatingForm_API}${data.id}/`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Token " + tokenValue,
			},
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot update review currently!`);
		return console.log(err);
	}
}

export async function updateReview(data: {
	id: string;
	rating?: number;
	review?: string;
}): Promise<any> {
	const tokenValue = localStorage
		.getItem("currentToken")!
		.replace(/['"]+/g, "");
	try {
		const response = await fetch(`${ReviewRatingForm_API}${data.id}/`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Token " + tokenValue,
			},
			body: JSON.stringify({ rating: data.rating, review: data.review }),
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot update review currently!`);
		return console.log(err);
	}
}

export async function coupon(data: { coupon_code: string }): Promise<any> {
	return postWithoutAuthorization(
		CouponValidity_API,
		data,
		"check coupon validity"
	);
}

export async function razorpayKey(): Promise<any> {
	return await getWithAuthorization(RazorpayKey_API, "get Razorpay key");
}

export async function invoiceRequest(data: { order_id: string }): Promise<any> {
	return await postWithAuthorization(
		InvoiceRequest_API,
		data,
		"request invoice"
	);
}

export async function createOrder(data: {
	products: {
		product: string;
		quantity: number;
	}[];
	coupon_code: string;
	shipping_address: string;
	is_cod: boolean;
}): Promise<any> {
	return await postWithAuthorization(Payment_API, data, "create order");
}
