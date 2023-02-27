import { Products_API } from "../../backend";
export const search = async (
	searchInput: any,
	limit: any,
	offset: any,
	next: any
) => {
	await fetch(
		`${Products_API}?limit=${limit}&offset=${offset}&search=${searchInput}`
	)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
