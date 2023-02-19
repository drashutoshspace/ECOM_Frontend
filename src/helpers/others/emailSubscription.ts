import { EmailSubscription_API } from "../../backend";
export const emailSubscriber = async (email) => {
	return await fetch(EmailSubscription_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(email),
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.log(err));
};
