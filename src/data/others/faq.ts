import { FAQs_API } from "../../backend";
export const faqdata = async () => {
	await fetch(`${FAQs_API}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.catch((err) => console.log(err));
};
