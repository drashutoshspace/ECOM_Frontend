import { TnC_API } from "../../backend";
export const tncdata = async () => {
	await fetch(`${TnC_API}`, {
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
