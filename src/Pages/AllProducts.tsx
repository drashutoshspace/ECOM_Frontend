import ProductListCard from "../Components/ProductListCard";
import Base from "../Base";
import { products } from "../APIs/ecommerce/ecommerce";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactPaginate from "react-paginate";
import DataLoader from "../Components/DataLoader";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../Components/Breadcrumb";
import { Product } from "../Interfaces/Products";
import { useSelector } from "react-redux";
import { Store } from "../Interfaces/Store";
import { categoryWiseProducts } from "../APIs/ecommerce/ecommerce";

export default function AllProducts(): JSX.Element {
	const { linkCategory } = useParams();
	const [category, setCategory] = useState<string>(linkCategory as string);
	useEffect(() => setCategory(linkCategory as string), [linkCategory]);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageCount, setPageCount] = useState(1);
	const [loading, setLoading] = useState(false);
	const allProductCategories = useSelector(
		(state: Store) => state.allProductCategories
	);
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const PER_PAGE = 9;
	useEffect(() => {
		const selectProducts = async (
			category: string,
			limit: number,
			offset: number
		) => {
			await categoryWiseProducts({ limit, offset, category }).then(
				(data: any) => {
					setPageCount(data?.count / PER_PAGE);
					setAllProducts(data?.results);
					setLoading(false);
				}
			);
		};
		const getProducts = async () => {
			await products({
				limit: PER_PAGE,
				offset: currentPage * PER_PAGE,
			}).then((data: any) => {
				setLoading(true);
				if (category !== "allproducts") {
					selectProducts(category, PER_PAGE, currentPage * PER_PAGE);
				} else {
					setPageCount(data?.count / PER_PAGE);
					setAllProducts(data?.results);
					setTimeout(() => {
						setLoading(false);
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}, 500);
				}
			});
		};
		getProducts();
	}, [currentPage, category, linkCategory]);
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | All Products</title>
			</Helmet>
			<Base>
				<Breadcrumb title={category} />
				<section className="section overflow-hidden">
					<div className="row">
						<div className="col-lg-2 text-center">
							<h2
								className="mb-3 colorblue"
								style={{ fontSize: "35px" }}
							>
								Browse
							</h2>
							<ul className="text-lg-left list-unstyled text-center">
								<li>
									<button
										className={
											category === "allproducts"
												? "colorlightblue fontsize16 bgnone border-0 lightbluehover"
												: "colorblue fontsize16 bgnone border-0 lightbluehover"
										}
										onClick={() => {
											setCategory("");
											setCurrentPage(0);
											navigate("/shop/allproducts");
										}}
									>
										All Products
									</button>
								</li>
								{allProductCategories &&
									allProductCategories.map(
										(item: any, index: any) => {
											return (
												<li key={index}>
													<button
														className={`colorblue fontsize16 bgnone border-0 lightbluehover ${
															category ===
																item?.category &&
															"colorlightblue"
														}`}
														onClick={() => {
															setCategory(
																item?.category
															);
															setCurrentPage(0);
															navigate(
																`/shop/${item?.category}`
															);
														}}
													>
														{item?.category}
													</button>
												</li>
											);
										}
									)}
							</ul>
						</div>
						<div className="col-lg-10">
							<div className="row mx-2 justify-content-center">
								{allProducts?.length > 0 ? (
									<>
										{allProducts?.map(
											(
												product: Product,
												index: number
											) => {
												return (
													<ProductListCard
														product={product}
														key={index}
													/>
												);
											}
										)}
										<ReactPaginate
											previousLabel={
												<i className="fas fa-arrow-left"></i>
											}
											nextLabel={
												<i className="fas fa-arrow-right"></i>
											}
											pageCount={pageCount}
											pageRangeDisplayed={1}
											marginPagesDisplayed={2}
											onPageChange={(selectedItem: {
												selected: number;
											}) =>
												setCurrentPage(
													selectedItem.selected
												)
											}
											containerClassName={
												"pagination fontsize16 d-flex justify-content-center align-items-center mb-0 pb-0 mt-4 pt-4 p-0"
											}
											pageClassName={
												"colorblue hovergoup fw-bold h-100 bgyellow border5px mx-2 bglightblue px-2"
											}
											nextClassName={
												"bgyellow hovergoup d-flex align-items-center mx-2 fontsize16 h-100 px-2 border5px bglightblue"
											}
											previousClassName={
												"bgyellow hovergoup d-flex align-items-center mx-2 fontsize16 h-100 px-2 border5px bglightblue"
											}
											previousLinkClassName={
												"pagination__link colorblue"
											}
											nextLinkClassName={
												"pagination__link colorblue"
											}
											disabledClassName={
												"pagination__link--disabled"
											}
											activeClassName={
												"pagination__link--active lightbluebg"
											}
										/>
									</>
								) : (
									<h1
										className="text-center colorblue"
										style={{ marginTop: "150px" }}
									>
										No Products To Show
									</h1>
								)}
							</div>
						</div>
					</div>
				</section>
				{loading && <DataLoader />}
			</Base>
		</>
	);
}
