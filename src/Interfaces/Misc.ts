import { User } from "./user";

export interface Feedback {
	name: string;
	email: string;
	message: string;
}

export interface ContactUs {
	name: string;
	email: string;
	message: string;
	subject: string;
}

export interface ReportABug {
	email: User;
	comments: string;
	file: File;
}

export interface Policies {
	heading: string;
	content: string;
	priority: number;
	is_visible: boolean;
}

export interface Banner {
	banner_title: string;
	banner_text: string;
	banner_image: string;
	banner_button_url: string;
	is_visible: boolean;
}

export interface Testimonials {
	user: User;
	rating: number;
	review: string;
	file: string;
	is_visible: boolean;
}
