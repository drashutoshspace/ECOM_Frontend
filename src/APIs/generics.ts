import { toast } from "react-toastify";

export async function getWithAuthorization(
	endpoint: string,
	operation?: string
): Promise<any> {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	try {
		const response = await fetch(endpoint, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: "Token " + tokenValue,
			},
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot ${operation} currently!`);
		return console.log(err);
	}
}

export async function getWithoutAuthorization(
	endpoint: string,
	operation?: string
): Promise<any> {
	try {
		const response = await fetch(endpoint, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot ${operation} currently!`);
		return console.log(err);
	}
}

export async function postWithAuthorization(
	endpoint: string,
	payload?: object,
	operation?: string
): Promise<any> {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type":
					endpoint.slice(34, endpoint.length - 1) !== "get_profile" ||
					"reportabug"
						? "application/json"
						: "multipart/form-data",
				Authorization: "Token " + tokenValue,
			},
			body:
				endpoint.slice(34, endpoint.length - 1) !== "get_profile" ||
				"reportabug"
					? payload
						? JSON.stringify(payload)
						: null
					: (payload as any),
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot ${operation} currently!`);
		return console.log(err);
	}
}

export async function postWithoutAuthorization(
	endpoint: string,
	payload?: object,
	operation?: string
): Promise<any> {
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: payload ? JSON.stringify(payload) : null,
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot ${operation} currently!`);
		return console.log(err);
	}
}
