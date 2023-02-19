import { CnR_API } from "../../backend";
export const cnrdata = async () => {
	await fetch(`${CnR_API}`, {
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
