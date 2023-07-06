import {
	TnC_API,
	Testimonials_API,
	ReportABug_API,
	PrivP_API,
	FeedbackForm_API,
	OurTeam_API,
	EmailSubscription_API,
	FAQs_API,
	ContactUsForm_API,
	CnR_API,
	GetBanners_API,
} from "../../backend";
import {
	getWithoutAuthorization,
	postWithoutAuthorization,
	postWithAuthorization,
} from "../generics";

export async function tncData(): Promise<any> {
	return await getWithoutAuthorization(TnC_API, "get terms & conditions");
}

export async function testimonialData(): Promise<any> {
	return await getWithoutAuthorization(Testimonials_API, "get testimonials");
}

export async function reportABug(data: FormData): Promise<any> {
	return await postWithAuthorization(ReportABug_API, data, "report a bug");
}

export async function privacyPolicyData(): Promise<any> {
	return await getWithoutAuthorization(PrivP_API, "get privacy policy");
}

export async function feedbackForm(data: {
	name: string;
	email: string;
	message: string;
}): Promise<any> {
	return await postWithoutAuthorization(
		FeedbackForm_API,
		data,
		"post feedback"
	);
}

export async function ourTeamData(): Promise<any> {
	return await getWithoutAuthorization(OurTeam_API, "get team data");
}

export async function emailSubscription(data: { email: string }): Promise<any> {
	return await postWithoutAuthorization(
		EmailSubscription_API,
		data,
		"subscribe"
	);
}

export async function faqData(): Promise<any> {
	return await getWithoutAuthorization(FAQs_API, "get FAQs");
}

export async function contactUs(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): Promise<any> {
	return await postWithoutAuthorization(
		ContactUsForm_API,
		data,
		"post your details currently"
	);
}

export async function cnrData(): Promise<any> {
	return await getWithoutAuthorization(CnR_API, "get cancellations and refund");
}

export async function getBanner(): Promise<any> {
	return await getWithoutAuthorization(GetBanners_API, "get banners");
}
