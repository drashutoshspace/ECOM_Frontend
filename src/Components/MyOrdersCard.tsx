import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BaseContext } from "../Context";
import { OrderDetailContext } from "../Contexts/OrderDetailContext";
const MyOrderCard = ({ my_order }: any) => {
	const { addOrderDetail, orderdetails }: any =
		useContext(OrderDetailContext);
	const { cookies }: any = useContext(BaseContext);
	useEffect(() => {
		if (
			!orderdetails.orderdetailItems.find(
				(item: any) => item.order_id === my_order.order_id
			)
		) {
			addOrderDetail({ order: my_order, userID: cookies?.user?.[0]?.id });
		}
	}, []);
	return (
		<>
			<div className="row bgcolorwhite shadow border5px text-start mt-4 p-2">
				<div className="col-lg-6">
					<p className="mypara fw-bold colorblue my-2">
						Order ID:&nbsp;&nbsp;
						<Link
							to={`/profile/orderdetail/${my_order.order_id}`}
							className="colorlightblue text-decoration-underline yellowhover"
						>
							{my_order.order_id}
						</Link>
					</p>
				</div>
				<div className="col-lg-6">
					<p className="mypara fw-bold colorblue my-2">
						Date:&nbsp;&nbsp;
						<span className="colorlightblue">
							{my_order.date_created
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
						<span className="colorlightblue">
							{my_order.status}
						</span>
					</p>
				</div>
				<div className="col-lg-6">
					<p className="mypara fw-bold colorblue my-2">
						Payment Staus:&nbsp;&nbsp;
						<span className="colorlightblue">
							{my_order.is_paid ? "Paid" : "Not Paid"}
						</span>
					</p>
				</div>
				<div className="col-lg-6">
					<p className="mypara fw-bold colorblue my-2">
						Total Amount:&nbsp;&nbsp;
						<span className="colorlightblue">
							₹ {my_order.payable}
						</span>
					</p>
				</div>
				{my_order.applied_coupon ? (
					<div className="col-lg-12">
						<p className="mypara fw-bold colorblue my-2">
							Coupon Applied:&nbsp;&nbsp;
							<span className="colorlightblue">
								{my_order.applied_coupon}
							</span>
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
						<span className="colorlightblue">
							{my_order.shipping_address}
						</span>
					</p>
				</div>
				<div
					className="col-lg-12"
					style={{ borderTop: "1px solid #00ebc7" }}
				>
					<p className="mypara fw-bold colorblue my-2">
						<Link
							to={`/profile/orderdetail/invoice/${my_order.model_id}`}
							className="colorlightblue text-decoration-underline yellowhover"
						>
							Invoice
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};
export default MyOrderCard;
