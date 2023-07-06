import { Link } from "react-router-dom";
import { Order } from "../Interfaces/Orders";

export default function MyOrderCard({ order }: { order: Order }): JSX.Element {
	return (
		<div className="row bgcolorwhite shadow border5px text-start p-2">
			<div className="col-lg-6">
				<p className="mypara fw-bold colorblue my-2">
					Order ID:&nbsp;&nbsp;
					<Link
						to={`/profile/orderdetail/${order.order_id}`}
						className="colorlightblue text-decoration-underline yellowhover"
					>
						{order.order_id}
					</Link>
				</p>
			</div>
			<div className="col-lg-6">
				<p className="mypara fw-bold colorblue my-2">
					Date:&nbsp;&nbsp;
					<span className="colorlightblue">
						{order.date_created
							.split("T")[0]
							.toString()
							.split("-")
							.reverse()
							.toString()
							.replace(",", "/")
							.replace(",", "/")}
					</span>
				</p>
			</div>
			<div className="col-lg-12">
				<p className="mypara fw-bold colorblue my-2">
					Order Status:&nbsp;&nbsp;
					<span className="colorlightblue">{order.status}</span>
				</p>
			</div>
			<div className="col-lg-6">
				<p className="mypara fw-bold colorblue my-2">
					Payment Staus:&nbsp;&nbsp;
					<span className="colorlightblue">
						{order.is_paid ? "Paid" : "Not Paid"}
					</span>
				</p>
			</div>
			<div className="col-lg-6">
				<p className="mypara fw-bold colorblue my-2">
					Total Amount:&nbsp;&nbsp;
					<span className="colorlightblue">₹ {order.payable}</span>
				</p>
			</div>
			{order.applied_coupon ? (
				<div className="col-lg-12">
					<p className="mypara fw-bold colorblue my-2">
						Coupon Applied:&nbsp;&nbsp;
						<span className="colorlightblue">{order.applied_coupon}</span>
					</p>
				</div>
			) : (
				""
			)}
			<div
				className="col-lg-12 shipaddscrollbar overflow-scroll"
				style={{ borderTop: "1px solid #00ebc7" }}
			>
				<p className="mypara fw-bold colorblue my-2">
					Shipping Address:&nbsp;&nbsp;
					<span className="colorlightblue">{order.shipping_address}</span>
				</p>
			</div>
			<div className="col-lg-12" style={{ borderTop: "1px solid #00ebc7" }}>
				<p className="mypara fw-bold colorblue my-2">
					<Link
						to={`/profile/orderdetail/invoice/${order.model_id}`}
						className="colorlightblue text-decoration-underline yellowhover"
					>
						Invoice
					</Link>
				</p>
			</div>
		</div>
	);
}
