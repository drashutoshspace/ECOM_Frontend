import { User } from "./User";
import { Product } from "./Products";

export interface Order {
	model_id: number;
	order_id: string;
	razorpay_order_id: string;
	transaction_id: string;
	payable: number;
	user: User;
	status: string;
	payment_method: string;
	shipping_address: string;
	billing_address: string;
	is_delivered: boolean;
	is_paid: boolean;
	ordered_products: string;
	products: Product[];
	applied_coupon: string;
	date_created: Date;
	date_modified: Date;
}
