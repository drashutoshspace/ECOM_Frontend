import {
	Login_API,
	Logout_API,
	Register_API,
	EmailChange_API,
	MyOrders_API,
	PasswordChange_API,
	ProfileData_API,
	EmailVerify_API,
} from "../../backend";
import {
	getWithAuthorization,
	postWithoutAuthorization,
	postWithAuthorization,
} from "../generics";
import { toast } from "react-toastify";

export async function signUp(data: {
	username: string;
	email: string;
	password1: string;
	password2: string;
}): Promise<any> {
	return await postWithoutAuthorization(Register_API, data, "register");
}

export async function signIn(data: {
	username?: string;
	email?: string;
	password: string;
}): Promise<any> {
	return postWithoutAuthorization(Login_API, data, "login");
}

export async function signOut(): Promise<any> {
	const tokenValue = localStorage
		.getItem("currentToken")!
		.replace(/['"]+/g, "");
	try {
		const response = await fetch(Logout_API, {
			method: "POST",
			headers: {
				Authorization: "Token " + tokenValue,
			},
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot update profile currently!`);
		return console.log(err);
	}
}

export async function emailChange(data: {
	newemail1: string;
	newemail2: string;
}): Promise<any> {
	return await postWithAuthorization(EmailChange_API, data, "change email");
}

export async function verifyEmailInSignUp(data: { key: string }): Promise<any> {
	return await postWithoutAuthorization(EmailVerify_API, data, "verify email");
}

export async function userOrders(): Promise<any> {
	return await getWithAuthorization(MyOrders_API, "get orders");
}

export async function passwordChange(data: {
	old_password: string;
	new_password1: string;
	new_password2: string;
}): Promise<any> {
	return await postWithAuthorization(
		PasswordChange_API,
		data,
		"change password"
	);
}

export async function profileData(): Promise<any> {
	return await getWithAuthorization(ProfileData_API, "get profile");
}

export async function profileDataUpdate(data: FormData): Promise<any> {
	const tokenValue = localStorage
		.getItem("currentToken")!
		.replace(/['"]+/g, "");
	try {
		const response = await fetch(ProfileData_API, {
			method: "POST",
			headers: {
				Authorization: "Token " + tokenValue,
			},
			body: data,
		});
		return await response.json();
	} catch (err) {
		toast.error(`Cannot update profile currently!`);
		return console.log(err);
	}
}
