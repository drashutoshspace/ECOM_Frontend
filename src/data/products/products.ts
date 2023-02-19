import { Products_API, ProductCategory_API } from "../../backend";
export const products = async (limit, offset, next) => {
	await fetch(`${Products_API}?limit=${limit}&offset=${offset}`)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const productsCategory = async (next) => {
	await fetch(ProductCategory_API)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
export const categoryWiseProducts = async (category_name, limit, offset, next) => {
	await fetch(`${Products_API}?cat_name=${category_name}&limit=${limit}&offset=${offset}`)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			console.log(data);
			next(data);
		})
		.catch((err) => console.log(err));
};
export const singleProduct = async (id, next) => {
	await fetch(`${Products_API}/${id}`)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
