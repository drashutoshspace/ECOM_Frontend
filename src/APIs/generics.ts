import { toast } from "react-toastify";

export async function getWithAuthorization(
	endpoint: string,
	operation?: string
): Promise<any> {
	const tokenValue = localStorage
		.getItem("currentToken")!
		.replace(/['"]+/g, "");
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
	payload: object,
	operation: string
): Promise<any> {
	const tokenValue = localStorage
		.getItem("currentToken")!
		.replace(/['"]+/g, "");
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Token " + tokenValue,
			},
			body: JSON.stringify(payload),
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
