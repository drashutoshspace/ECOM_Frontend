import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../Interfaces/Products";
import { useSelector } from "react-redux";
import { Store } from "../Interfaces/Store";
import { addProductInCart } from "../Data/storingData";
import { WishlistButtonForProfileWishlistCard } from "./WishlistButtons";
import { isProductInCart } from "../Utilities/Utils";
import {
	AddToCartButtonForProfileWishlistCard,
	ViewCartButtonForProfileWishlistCard,
} from "./ActionButtons";
import tempImg from "../Assets/Product_3.webp";

export default function ProfileWishlistCard({
	product,
}: {
	product: Product;
}): JSX.Element {
	const userId = useSelector((state: Store) => state.userProfile.id);
	const [plusMinus, setPlusMinus] = useState(1);
	const [animateButton, setAnimateButton] = useState(false);
	const wishlistItems = useSelector((state: Store) => state.wishlist[userId]);
	const cartItems = useSelector((state: Store) => state.cart[userId]);
	useEffect(() => {
		const timer = setTimeout(() => setAnimateButton(false), 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [animateButton]);
	return (
		<div className="row px-2 py-3">
			<div className="col-4">
				<Link to={`/shop/products/${product?.guid}`}>
					<img
						className="border5px shadow w-100 h-auto"
						src={product?.Product_Images?.[0]?.dbImage || tempImg}
						alt="Product_Image"
					/>
				</Link>
			</div>
			<div className="col-8 text-start">
				<div className="row">
					<div className="col-lg-12">
						<Link
							className="colorblue fw-bold fontsize16 lightbluehover"
							to={`/shop/products/${product?.guid}`}
						>
							{product?.Product_Name}
						</Link>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-12">
						{!isProductInCart(cartItems, product?.guid) ? (
							<>
								<button
									className="colorblue border-0 border5px bgyellow bglightblue"
									onClick={() =>
										plusMinus > 1 &&
										setPlusMinus(plusMinus - 1)
									}
									style={{ width: 40, height: 40 }}
								>
									<i className="fas fa-minus" />
								</button>
								<input
									className="bgcolorgreyish text-center colorblue border-0 border5px mx-2"
									type="number"
									value={plusMinus}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										setPlusMinus(e.target.valueAsNumber);
									}}
									style={{ width: 50, height: 40 }}
								/>
								<button
									className="colorblue border-0 border5px bgyellow bglightblue"
									onClick={() => setPlusMinus(plusMinus + 1)}
									style={{ width: 40, height: 40 }}
								>
									<i className="fas fa-plus" />
								</button>
								<div className="col mt-3 me-3 d-flex align-items-center">
									<AddToCartButtonForProfileWishlistCard
										isAuthenticated={
											userId !== -1 ? true : false
										}
										animateButton={animateButton}
										plusMinus={plusMinus}
										setAnimateButton={setAnimateButton}
										product={product}
										addProductInCart={addProductInCart}
									/>
								</div>
							</>
						) : (
							<div className="col mt-3 me-3 d-flex align-items-center">
								<ViewCartButtonForProfileWishlistCard />
							</div>
						)}
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-12">
						<p className="colorblue mypara mb-0 fontsize16">
							₹ {product?.Product_SellingPrice}
						</p>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-12">
						<WishlistButtonForProfileWishlistCard
							guid={product?.guid}
							wishlistItems={wishlistItems}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
