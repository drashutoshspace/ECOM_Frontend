import { Testimonials_API } from "../../backend";
export const testimonialsData = async (next: any) => {
	await fetch(Testimonials_API)
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
