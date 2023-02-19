import { Login_API, Logout_API, Register_API } from "../../backend";
import { toast } from "react-toastify";
export const signup = (user: any) => {
	return fetch(Register_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const signin = (user: any) => {
	const formData = new FormData();
	for (const name in user) {
		formData.append(name, user[name]);
	}
	return fetch(Login_API, {
		method: "POST",
		body: formData,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const authenticate = (data: any, next: any) => {
	if (typeof window !== undefined) {
		localStorage.setItem("token", JSON.stringify(data));
		next();
	}
};
export const isAuthenticated = () => {
	if (typeof window == undefined) {
		return false;
	}
	if (localStorage.getItem("token")) {
		return true;
	} else {
		return false;
	}
};
export const signout = (next: any) => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	if (typeof window !== undefined) {
		localStorage.removeItem("token");
		return fetch(Logout_API, {
			method: "POST",
			headers: {
				Authorization: "Token " + tokenValue,
			},
			body: null,
		})
			.then((response) => {
				if (response?.status === 403 || response?.status === 401) {
					return toast(
						`Something went wrong! Status: ${response.statusText}`,
						{
							type: "error",
							autoClose: 5000,
							position: "bottom-center",
							hideProgressBar: false,
							pauseOnHover: true,
							pauseOnFocusLoss: true,
						}
					);
				}
				return response.json();
			})
			.then((data) => {
				next(data);
			})
			.catch((err) => console.log(err));
	}
};
