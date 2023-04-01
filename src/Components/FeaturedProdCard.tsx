import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../Interfaces/Products";
import { useSelector } from "react-redux";
import { Store } from "../Interfaces/Store";
import {
	addProductInCart,
	addProductInWishlist,
	removeProductFromWishlist,
} from "../Data/storingData";
import { WishlistButtonForCard } from "./WishlistButtons";
import { isProductInCart } from "../Utilities/Utils";
import { AddToCartButtonForCard, ViewCartButtonForCard } from "./ActionButtons";
import tempImg from "../Assets/Product_3.webp";

export default function FeaturedProdCard({
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
		<div className="card mycard border-0 m-3 shadow hovergoup">
			<Link className="text-center" to={`/shop/prodsin/${product?.guid}`}>
				<img
					// className="w-75"
					height="250px"
					alt="Product_Image"
					src={`${product?.Product_Images?.[0]?.dbImage || tempImg}`}
				/>
			</Link>
			<span
				className="d-flex justify-content-center align-items-center"
				id="mydiscountper"
			>
				{Math.abs(
					parseInt(product?.Product_Discount?.toString()) -
						parseFloat(product?.Product_Discount?.toString())
				) > 0.5
					? parseInt(product?.Product_Discount?.toString()) + 1
					: parseInt(product?.Product_Discount?.toString())}
				%
			</span>
			<WishlistButtonForCard
				isAuthenticated={userId !== -1 ? true : false}
				guid={product?.guid}
				wishlistItems={wishlistItems}
				addProductInWishlist={addProductInWishlist}
				removeProductFromWishlist={removeProductFromWishlist}
			/>
			<div className="text-center mycardbody">
				<div className="row my-1">
					<div className="col">
						<h5 className="mb-0">
							<Link
								to={`/shop/prodsin/${product?.guid}`}
								className="colorblue lightbluehover"
							>
								{product?.Product_Name}
							</Link>
						</h5>
					</div>
				</div>
				<div className="row my-1">
					<div className="col">
						<p className="mb-0">
							<span className="fontsize16 fw-bold colorlightblue">
								₹ {product?.Product_SellingPrice}
							</span>
							&nbsp;&nbsp;
							<span className="fontsize18" id="mydiscountpri">
								₹ {product?.Product_MRP}
							</span>
						</p>
					</div>
				</div>
				<div className="row my-1">
					<div className="col ms-3 d-flex justify-content-center align-items-center">
						<button
							className="h-75 w-75 colorblue border-0 border5px bgyellow bglightblue"
							onClick={() =>
								plusMinus > 1 && setPlusMinus(plusMinus - 1)
							}
						>
							<i className="fas fa-minus" />
						</button>
						<input
							className="bgcolorgreyish text-center colorblue h-75 w-75 border-0 border5px mx-2"
							type="number"
							value={plusMinus}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => {
								setPlusMinus(e.target.valueAsNumber);
							}}
						/>
						<button
							className="h-75 w-75 colorblue border-0 border5px bgyellow bglightblue"
							onClick={() => setPlusMinus(plusMinus + 1)}
						>
							<i className="fas fa-plus" />
						</button>
					</div>
					<div className="col me-3 d-flex align-items-center">
						{!isProductInCart(cartItems, product?.guid) ? (
							<AddToCartButtonForCard
								isAuthenticated={userId !== -1 ? true : false}
								animateButton={animateButton}
								plusMinus={plusMinus}
								setAnimateButton={setAnimateButton}
								product={product}
								addProductInCart={addProductInCart}
							/>
						) : (
							<ViewCartButtonForCard />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
