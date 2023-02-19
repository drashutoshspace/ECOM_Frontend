import { ContactUsForm_API } from "../../backend";
export const contactusForm = async ({ name, email, subject, message }: any) => {
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
		.catch((err) => console.log(err));
};
