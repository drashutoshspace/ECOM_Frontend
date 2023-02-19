import { OurTeam_API } from "../../backend";
export const ourteamdata = async () => {
	await fetch(`${OurTeam_API}`, {
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
