import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../Components/Breadcrumb";
import Base from "../Base";
import { Helmet } from "react-helmet-async";
import { search } from "../data/others/search";
import DataLoader from "../Components/DataLoader";
import ProductListCard from "../Components/EcommerceComp/ProductListCard";
import ReactPaginate from "react-paginate";
const SearchPage = ({ searchResults, setSearchResults }: any) => {
	const { input } = useParams();
	// ANCHOR Pagination
	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setPageCount] = useState(1);
	const PER_PAGE = 9;
	function handlePageClick({ selected: selectedPage }: any) {
		setCurrentPage(selectedPage);
	}
	const offset = currentPage * PER_PAGE;

	// ANCHOR Fetching Search Results
	const [loading, setLoading] = useState(true);
	const [resultsCount, setResultsCount] = useState(-1);
	useEffect(() => {
		search(input, PER_PAGE, offset, (data: any) => {
			setSearchResults(data.results);
			setResultsCount(data?.count);
			setPageCount(data?.count / PER_PAGE);
		});
	}, [input, currentPage]);
	useEffect(() => {
		searchResults?.length > 0 && setLoading(false);
	}, [searchResults, input]);
	const [changeImage2, setChangeImage2] = useState(false);
	const handleChangeImage2 = () => {
		setChangeImage2(!changeImage2);
	};
	return (
		<>
			<Helmet>
				<title>MeeMo Kidz | Search</title>
			</Helmet>
			<Base>
				<Breadcrumb title="Search Results" />
				{resultsCount !== 0 ? (
					loading ? (
						<DataLoader />
					) : (
						<>
							<section className="section">
								<div className="container">
									<div className="row text-center">
										<h1 className="mb-5 colorblue">
											Showing results for - "{input}"
										</h1>
									</div>
									<div className="row">
										{searchResults.map(
											(result: any, index: any) => {
												return (
													<ProductListCard
														key={index}
														product={result}
													/>
												);
											}
										)}
									</div>
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
											"pagination fontsize16 d-flex justify-content-center align-items-center mb-0 pb-0 mt-4 pt-4 p-0"
										}
										pageClassName={
											"colorblue hovergoup h-100 bgyellow border5px mx-2 bglightblue px-2"
										}
										nextClassName={
											"bgyellow hovergoup d-flex align-items-center mx-2 fontsize14 h-100 px-2 border5px bglightblue"
										}
										previousClassName={
											"bgyellow hovergoup d-flex align-items-center mx-2 fontsize14 h-100 px-2 border5px bglightblue"
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
							</section>
						</>
					)
				) : (
					<section className="section">
						<div className="container">
							<div className="row">
								<div
									className="col-lg-12 text-center"
									onMouseEnter={handleChangeImage2}
									onMouseLeave={handleChangeImage2}
								>
									<img
										width="225px"
										src={
											changeImage2
												? "images/Search_Yellow.svg"
												: "images/Search_LightBlue.svg"
										}
										className="loginsvg"
										alt="Search"
									/>
									<h1 className="mt-5 colorblue">
										No results found for "{input}"!
									</h1>
								</div>
							</div>
						</div>
					</section>
				)}
			</Base>
		</>
	);
};
export default SearchPage;
