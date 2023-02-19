import { useEffect, useContext } from "react";
import ProductListCard from "./ProductListCard";
import { products } from "../../data/products/products";
import { ProductsContext } from "../../Context";
const ProductList = ({ handleHomeProducts, home_products }) => {
	const { allProducts, handleAllProducts } = useContext(ProductsContext);
	useEffect(() => {
		products(6, 0, (data) => {
			handleAllProducts(data.results);
		});
	}, []);
	useEffect(() => {
		handleHomeProducts(allProducts);
	}, [allProducts]);
	return (
		<>
			<section className="section overflow-hidden bluebgleft">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12">
							<div className="section-title mb-2" data-aos="zoom-in" data-aos-duration="1000" data-aos-once="true">
								<h4 className="title colorblue">Featured Products</h4>
							</div>
						</div>
					</div>
					<div className="row">
						{home_products.map((product, index) => {
							return <ProductListCard key={index} product={product} />;
						})}
					</div>
				</div>
			</section>
		</>
	);
};
export default ProductList;
