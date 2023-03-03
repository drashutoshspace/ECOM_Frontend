import {
	Login_API,
	Logout_API,
	Register_API,
	EmailChange_API,
	MyOrders_API,
	PasswordChange_API,
	ProfileData_API,
	GoogleAuth_API,
} from "../../backend";
import {
	getWithAuthorization,
	postWithoutAuthorization,
	postWithAuthorization,
} from "../generics";

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

export async function authenticate(data: any, next: any): Promise<void> {
	if (typeof window !== undefined) {
		localStorage.setItem("token", JSON.stringify(data));
		next();
	}
}

export async function isAuthenticated(): Promise<boolean> {
	if (typeof window === undefined) {
		return false;
	}
	if (localStorage.getItem("token")) {
		return true;
	} else {
		return false;
	}
}

export async function signOut(next: (data: any) => void): Promise<any> {
	if (typeof window !== undefined) {
		const data = await postWithAuthorization(
			Logout_API,
			undefined,
			"logout"
		);
		localStorage.removeItem("token");
		next(data);
	}
}

export async function emailChange(data: {
	newemail1: string;
	newemail2: string;
}): Promise<any> {
	return await postWithAuthorization(EmailChange_API, data, "change email");
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
	return await postWithAuthorization(ProfileData_API, data, "update profile");
}

export async function googleLogin(data: {
	access_token: string;
	code: string;
	id_token: string;
}): Promise<void> {
	localStorage.setItem(
		"token",
		(
			(await postWithoutAuthorization(
				GoogleAuth_API,
				data,
				"login from Google"
			)) as any
		).data.key
	);
}
