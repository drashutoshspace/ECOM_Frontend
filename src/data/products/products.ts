import { Products_API, ProductCategory_API } from "../../backend";
export const products = async (limit: any, offset: any, next: any) => {
	await fetch(`${Products_API}?limit=${limit}&offset=${offset}`)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const productsCategory = async (next: any) => {
	await fetch(ProductCategory_API)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const categoryWiseProducts = async (
	category_name: any,
	limit: any,
	offset: any,
	next: any
) => {
	await fetch(
		`${Products_API}?cat_name=${category_name}&limit=${limit}&offset=${offset}`
	)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const singleProduct = async (id: any, next: any) => {
	await fetch(`${Products_API}/${id}`)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
