import { ContactUsForm_API } from "../../backend";
export const contactusForm = async ({ name, email, subject, message }, next) => {
	return await fetch(ContactUsForm_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, subject, message }),
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
