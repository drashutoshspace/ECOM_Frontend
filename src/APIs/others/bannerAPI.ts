import { GetBanners_API } from "../../backend";
export const getBanner = async () => {
	return await fetch(GetBanners_API, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.log(err));
};
