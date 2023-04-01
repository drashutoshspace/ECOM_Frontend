import { Link } from "react-router-dom";
import tempImg from "../Assets/Product_3.webp";
import { Order } from "../Interfaces/Orders";

export default function OrderDetailCard({ id }: { id?: string }): JSX.Element {
	return (
		<>
			{/* {orderdetails.orderdetailItems.find(
				(item: Order) => item.order_id === id
			) &&
			orderdetails.orderdetailItems.find(
				(item: Order) => item.order_id === id
			).products ? (
				<>
					<h3 className="colorblue text-center mb-4">
						Products You Bought
					</h3>
					{orderdetails.orderdetailItems
						.find((item: Order) => item.order_id === id)
						.products.split("\n")
						.reverse()
						.slice(1)
						.reverse()
						.map((order: string, index: number) => {
							return (
								<div key={index} className="row px-2 py-3">
									<div className="col-4">
										<Link
											to={`/shop/products/${
												order.split(",")[0]
											}`}
										>
											<img
												className="border5px shadow w-100 h-auto"
												src={`${
													order.split(",")[4] ||
													tempImg
												}`}
												alt="Product_Image"
											/>
										</Link>
									</div>
									<div className="col-8 text-start">
										<div className="row">
											<div className="col-lg-12">
												<Link
													className="colorblue fw-bold fontsize16 lightbluehover"
													to={`/shop/products/${
														order.split(",")[0]
													}`}
												>
													{order.split(",")[1]}
												</Link>
											</div>
										</div>
										<div className="row mt-2">
											<div className="col-lg-12">
												<p className="mb-0 colorblue mypara fontsize16">
													₹ {order.split(",")[3]}
												</p>
											</div>
										</div>
										<div className="row mt-2">
											<div className="col-lg-12">
												<p className="mb-0 colorblue mypara fontsize16">
													{order.split(",")[2]}
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</>
			) : (
				""
			)} */}
		</>
	);
}
