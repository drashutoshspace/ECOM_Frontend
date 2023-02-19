import { PrivP_API } from "../../backend";
export const privpdata = async () => {
	await fetch(`${PrivP_API}`, {
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
