import { TnC_API } from "../../backend";
export const tncdata = async (next: any) => {
	await fetch(`${TnC_API}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
