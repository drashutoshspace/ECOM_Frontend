import { toast } from "react-toastify";
import { InvoiceRequest_API } from "../../backend";
export const invoiceRequest = async (order_id: any) => {
	const tokenValue = localStorage.getItem("token")!.replace(/['"]+/g, "");
	return await fetch(InvoiceRequest_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Token " + tokenValue,
		},
		body: JSON.stringify(order_id),
	})
		.then((res) => {
			if (!res.ok) {
				return toast("Something Went Wrong! Try Again", {
					type: "error",
					autoClose: 5000,
					position: "bottom-center",
					hideProgressBar: false,
					pauseOnHover: true,
					pauseOnFocusLoss: true,
				});
			}
			return res.json();
		})
		.catch((err) => console.log(err));
};
