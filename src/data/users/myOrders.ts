import { MyOrders_API } from "../../backend";
export const MyOrder = async () => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	await fetch(`${MyOrders_API}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.catch((err) => console.log(err));
};
