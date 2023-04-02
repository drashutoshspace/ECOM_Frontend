import { useEffect, useState } from "react";
import ProductListCard from "./ProductListCard";
import { products } from "../APIs/ecommerce/ecommerce";
import { Product } from "../Interfaces/Products";

export default function ProductList({
	fromHome,
	type,
}: {
	fromHome: boolean;
	type: string;
}): JSX.Element {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	useEffect(() => {
		const getProducts = async () => {
			await products({ limit: 0, offset: 0 }).then((data: Product[]) => {
				fromHome
					? setAllProducts(
							data.filter((item: Product) =>
								type === "Trending"
									? item.is_trending === true
									: type === "Featured"
									? item.is_featured === true
									: item.is_special === true
							)
					  )
					: setAllProducts(data);
			});
		};
		getProducts();
	}, []);
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
							<h1 className="title text-center colorblue">
								{type === "Trending"
									? "Hot Selling Products"
									: type === "Featured"
									? "Featured on Meemokidz"
									: "Our Special Collection"}
							</h1>
						</div>
					</div>
				</div>
				<div className="row">
					{allProducts.map((product: Product, index: number) => {
						return (
							<ProductListCard
								key={index}
								product={product}
								location={"home"}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
