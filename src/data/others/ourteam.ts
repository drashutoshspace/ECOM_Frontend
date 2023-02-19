import { OurTeam_API } from "../../backend";
export const ourteamdata = async (next) => {
	await fetch(`${OurTeam_API}`, {
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
