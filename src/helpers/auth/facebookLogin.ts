import axios from "axios";
import { FacebookAuth_API } from "../../backend";
const facebookLogin = (accesstoken: any) => {
	axios
		.post(FacebookAuth_API, {
			access_token: accesstoken,
		})
		.then((res) => {
			localStorage.setItem("token", res.data.key);
		});
};
export default facebookLogin;
