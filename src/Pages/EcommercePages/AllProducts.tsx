import ShopCard from "../../Components/ShopCard";
import Base from "../../Base";
import { BaseContext, ProductsContext } from "../../Context";
import { products } from "../../APIs/ecommerce/ecommerce";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactPaginate from "react-paginate";
import DataLoader from "../../Components/DataLoader";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";

// ANCHOR Drag Detection

// const MoveDragThreshold = 10;
// function useDragDetection() {
// 	const [mouseDown, setMouseDown] = useState(false);
// 	const [dragging, setDragging] = useState(false);
// 	useEffect(() => {
// 		var mounted = true;
// 		let mouseMove = 0;
// 		function handleMouseUp() {
// 			setMouseDown(false);
// 		}
// 		function handleMouseMove(e) {
// 			mouseMove += Math.abs(e.movementX) + Math.abs(e.movementY);
// 			setDragging(mouseMove > MoveDragThreshold);
// 		}
// 		if (mounted) {
// 			if (mouseDown) {
// 				document.addEventListener("mouseup", handleMouseUp);
// 				document.addEventListener("mousemove", handleMouseMove);
// 			}
// 		}
// 		return () => {
// 			document.removeEventListener("mouseup", handleMouseUp);
// 			document.removeEventListener("mousemove", handleMouseMove);

// 			mounted = false;
// 		};
// 	}, [mouseDown]);
// 	function handleMouseDown() {
// 		setMouseDown(true);
// 		setDragging(false);
// 	}
// 	return {
// 		handleMouseDown,
// 		dragging,
// 	};
// }
// ANCHOR Main Function
const AllProducts = () => {
	const { category } = useParams();
	// ANCHOR All States
	const navigate = useNavigate();
	const [allCategoryWiseProducts, setCategoryWiseProducts] = useState([]);
	// const [home_products, setHome_Products] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setPageCount] = useState(1);
	const [allprodCategory, setallprodCategory] = useState(true);
	const [toggleAllProducts, setToggleAllProducts] = useState(false);
	const [activeCategory, setActiveCategory] = useState(-1);
	const { allProductCategories }: any = useContext(BaseContext);
	const { handleAllProducts, allProducts, selectProducts }: any =
		useContext(ProductsContext);
	/* -------------------------------------------------------------------------- */
	/*                             ANCHOR data loader                             */
	/* -------------------------------------------------------------------------- */
	const [loading, setLoading] = useState(false);
	/* -------------------------------------------------------------------------- */
	/*                              ANCHOR Pagination                             */
	/* -------------------------------------------------------------------------- */
	const PER_PAGE = 9;
	function handlePageClick({ selected: selectedPage }: any) {
		setCurrentPage(selectedPage);
	}
	const offset = currentPage * PER_PAGE;
	/* -------------------------------------------------------------------------- */
	/*                        ANCHOR Fetching Product Data                        */
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			const getProducts = async () => {
				await products({ limit: PER_PAGE, offset }).then(
					(data: any) => {
						setLoading(true);
						if (category !== "allproducts") {
							selectProducts(
								category,
								PER_PAGE,
								offset,
								(data: any) => {
									setCurrentPage(0);
									setPageCount(data?.count / PER_PAGE);
								}
							);
						} else {
							handleAllProducts(data?.results);
							setPageCount(data?.count / PER_PAGE);
						}
					}
				);
			};
			getProducts();
		}
		return () => {
			mounted = false;
		};
	}, [currentPage, category]);

	// const handleHomeProducts = (array) => {
	// 	setHome_Products(array);
	// };
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			console.log(allCategoryWiseProducts, "OOOOOOOOOO");
			// handleHomeProducts(allCategoryWiseProducts);
			// console.log(home_products);
		}
		return () => {
			mounted = false;
		};
	}, [allCategoryWiseProducts]);

	/* -------------------------------------------------------------------------- */
	/*                               ANCHOR Carousel                              */
	/* -------------------------------------------------------------------------- */

	// const NextArrow = () => {
	// 	return (
	// 		<button className={"d-none"}>
	// 			<i className="fas fa-2x fa-angle-right"></i>
	// 		</button>
	// 	);
	// };
	// const PrevArrow = () => {
	// 	return (
	// 		<button className={"d-none"}>
	// 			<i className="fas fa-2x fa-angle-left"></i>
	// 		</button>
	// 	);
	// };
	// var settings = {
	// 	dots: true,
	// 	dotsClass: "d-flex mt-3 dotcss list-unstyled justify-content-center",
	// 	arrows: true,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 1,
	// 	pauseOnHover: true,
	// 	nextArrow: <NextArrow />,
	// 	prevArrow: <PrevArrow />,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 3,
	// 				slidesToScroll: 1,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 600,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 2,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 				dots: false,
	// 			},
	// 		},
	// 	],
	// };

	// ANCHOR Drag Detection

	// const { handleMouseDown, dragging } = useDragDetection();
	// function handleChildClick(e) {
	// 	if (dragging) {
	// 		e.preventDefault();
	// 	}
	// }

	// ANCHOR Category Wise Products
	const selectProductsCategoryWise = (category: any) => {
		selectProducts(category, PER_PAGE, offset, (data: any) => {
			setCurrentPage(0);
			setPageCount(data?.count / PER_PAGE);
		});
	};

	const handleActiveCategory = (val: any) => {
		setActiveCategory(val);
		setallprodCategory(false);
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | All Products</title>
			</Helmet>
			<Base>
				<Breadcrumb title="All Products" />
				{loading ? (
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
												category === "allproducts" &&
												allprodCategory
													? "colorlightblue fontsize20 bgnone border-0 lightbluehover"
													: "colorblue fontsize20 bgnone border-0 lightbluehover"
											}
											onClick={() => {
												setCategoryWiseProducts(
													allProducts
												);
												handleActiveCategory(-1);
												setallprodCategory(true);
												setCurrentPage(0);
												setToggleAllProducts(
													!toggleAllProducts
												);
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
															className={`colorblue fontsize20 bgnone border-0 lightbluehover ${
																(index ===
																	activeCategory ||
																	category ===
																		item?.category) &&
																"colorlightblue"
															}`}
															onClick={() => {
																selectProductsCategoryWise(
																	item?.category
																);
																handleActiveCategory(
																	index
																);
																setToggleAllProducts(
																	!toggleAllProducts
																);
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
								{/* <div className="row mx-0 justify-content-center">
									<h1 className="text-center mb-3 colorblue" style={{ fontSize: "40px" }}>
										Featured Products
									</h1>
									<Slider className="" {...settings}>
										{home_products ? (
											home_products.map((product, index) => {
												return (
													<div onMouseDownCapture={handleMouseDown} onClickCapture={handleChildClick} key={index}>
														<FeaturedProdCard product={product} />
													</div>
												);
											})
										) : (
											<h1>No Products To Show</h1>
										)}
									</Slider>
								</div> */}
								<div className="row mx-2 justify-content-center">
									{allProducts ? (
										allProducts.map(
											(product: any, index: any) => {
												return (
													<ShopCard
														product={product}
														key={index}
													/>
												);
											}
										)
									) : (
										<h1>No Products To Show</h1>
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
										onPageChange={handlePageClick}
										containerClassName={
											"pagination fontsize18 d-flex justify-content-center align-items-center mb-0 pb-0 mt-4 pt-4 p-0"
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
								</div>
							</div>
						</div>
					</section>
				) : (
					<DataLoader />
				)}
			</Base>
		</>
	);
};
export default AllProducts;
