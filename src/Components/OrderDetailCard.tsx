import { Link } from "react-router-dom";
import tempImg from "../Assets/Product_3.webp";
import { Order } from "../Interfaces/Orders";
import { useEffect, useState } from "react";
import { userOrders } from "../APIs/user/user";
import DataLoader2 from "./DataLoader2";

export default function OrderDetailCard({ id }: { id?: string }): JSX.Element {
	const [loading, setLoading] = useState<boolean>(false);
	const [orderDetail, setOrderDetail] = useState<Order>();
	useEffect(() => {
		const getMyOrders = async () => {
			await userOrders().then((data: Order[]) => {
				setOrderDetail(
					data.find((value: Order) => value.order_id === id)
				);
				setLoading(false);
			});
		};
		getMyOrders();
	}, []);
	return (
		<>
			{!loading ? (
				<>
					<h3 className="colorblue text-center mb-4">
						Products You Bought
					</h3>
					{orderDetail?.ordered_products
						.split("\n")
						.map((product: string, index: number) => {
							return (
								index !==
									orderDetail.ordered_products.split("\n")
										.length -
										1 && (
									<div key={index} className="row px-2 py-3">
										<div className="col-4">
											<Link
												to={`/shop/products/${
													product.split(",")[0]
												}`}
											>
												<img
													className="border5px shadow w-100 h-auto"
													src={`${
														product.split(",")[4] ||
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
															product.split(
																","
															)[0]
														}`}
													>
														{product.split(",")[1]}
													</Link>
												</div>
											</div>
											<div className="row mt-2">
												<div className="col-lg-12">
													<p className="mb-0 colorblue mypara fontsize16">
														₹{" "}
														{product.split(",")[3]}
													</p>
												</div>
											</div>
											<div className="row mt-2">
												<div className="col-lg-12">
													<p className="mb-0 colorblue mypara fontsize16">
														{product.split(",")[2]}
													</p>
												</div>
											</div>
										</div>
									</div>
								)
							);
						})}
				</>
			) : (
				<DataLoader2 />
			)}
		</>
	);
}
