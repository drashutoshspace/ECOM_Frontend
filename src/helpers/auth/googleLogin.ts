import axios from "axios";
import { GoogleAuth_API } from "../../backend";
const googleLogin = async (accesstoken, next) => {
	await axios
		.post(GoogleAuth_API, {
			access_token: accesstoken,
		})
		.then((res) => {
			localStorage.setItem("token", res.data.key);
		});
};
export default googleLogin;
