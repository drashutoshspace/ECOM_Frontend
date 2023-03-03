import { useEffect, useContext } from "react";
import ProductListCard from "./ProductListCard";
import { ProductsContext } from "../Context";
import { products } from "../APIs/ecommerce/ecommerce";
import { Product } from "../Interfaces/Products";

export default function ProductList({
	handleHomeProducts,
	home_products,
}: any): JSX.Element {
	const { allProducts, handleAllProducts }: any = useContext(ProductsContext);
	useEffect(() => {
		const getProducts = async () => {
			await products({ limit: 6, offset: 0 }).then((data: any) => {
				handleAllProducts(data.results);
			});
		};
		getProducts();
	}, []);
	useEffect(() => {
		handleHomeProducts(allProducts);
	}, [allProducts]);
	return (
		<section className="section overflow-hidden bluebgleft">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12">
						<div
							className="section-title mb-2"
							data-aos="zoom-in"
							data-aos-duration="1000"
							data-aos-once="true"
						>
							<h4 className="title colorblue">
								Featured Products
							</h4>
						</div>
					</div>
				</div>
				<div className="row">
					{home_products.map((product: Product, index: number) => {
						return (
							<ProductListCard key={index} product={product} />
						);
					})}
				</div>
			</div>
		</section>
	);
}
