import {
	Products_API,
	ProductCategory_API,
	RatingCountAPI,
	ReviewRatingForm_API,
	CouponValidity_API,
	RazorpayKey_API,
	InvoiceRequest_API,
} from "../../backend";
import {
	getWithAuthorization,
	getWithoutAuthorization,
	postWithoutAuthorization,
	postWithAuthorization,
} from "../generics";
import { toast } from "react-toastify";

export async function products({
	limit,
	offset,
}: {
	limit: number;
	offset: number;
}): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}?limit=${limit}&offset=${offset}`,
		"get products"
	);
}

export async function productsCategory(): Promise<any> {
	return await getWithoutAuthorization(
		ProductCategory_API,
		"get product categories"
	);
}

export async function categoryWiseProducts({
	limit,
	offset,
	category_name,
}: {
	limit: number;
	offset: number;
	category_name: string;
}): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}?cat_name=${category_name}&limit=${limit}&offset=${offset}`,
		"get products"
	);
}

export async function singleProduct({ id }: { id: string }): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}/${id}`,
		"get product"
	);
}

export async function search({
	searchInput,
	limit,
	offset,
}: {
	searchInput: string;
	limit: number;
	offset: number;
}): Promise<any> {
	return await getWithoutAuthorization(
		`${Products_API}?limit=${limit}&offset=${offset}&search=${searchInput}`,
		"search"
	);
}

export async function singleReview(data: { product_id: string }): Promise<any> {
	return await getWithAuthorization(
		`${ReviewRatingForm_API}${data.product_id}`,
		"get review"
	);
}

export async function ratingCount(data: { product_id: string }): Promise<any> {
	return await getWithoutAuthorization(
		`${RatingCountAPI}?guid=${id}`,
		"get rating"
	);
}

export async function reviewRating(data: {
	product_id: string;
	rating: number;
	review: string;
}): Promise<any> {
	return await postWithAuthorization(
		ReviewRatingForm_API,
		data,
		"add review"
	);
}

export async function deleteReview(data: { product_id: string }): Promise<any> {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	try {
		const response = await fetch(
			`${ReviewRatingForm_API}${data.product_id}/`,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Token " + tokenValue,
				},
			}
		);
		return await response.json();
	} catch (err) {
		toast.error(`Cannot update review currently!`);
		return console.log(err);
	}
}

export async function updateReview(data: {
	product_id: string;
	rating: number;
	review: string;
}): Promise<any> {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	try {
		const response = await fetch(
			`${ReviewRatingForm_API}${data.product_id}/`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Token " + tokenValue,
				},
				body: JSON.stringify(data),
			}
		);
		return await response.json();
	} catch (err) {
		toast.error(`Cannot update review currently!`);
		return console.log(err);
	}
}

export async function coupon(data: { coupon: string }): Promise<any> {
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
