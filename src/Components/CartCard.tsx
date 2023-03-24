import { useState } from "react";
import { Link } from "react-router-dom";
import tempImg from "../Assets/Product_3.webp";
import { CartItem } from "../Interfaces/Products";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../Interfaces/Store";
import {
	increaseQuantityOfProductInCart,
	decreaseQuantityOfProductInCart,
	removeProductFromCart,
	addProductInWishlist,
	removeProductFromWishlist,
} from "../Data/storingData";
import { DeleteButtonForCart } from "./DeleteButtons";
import { WishlistButtonForCart } from "./WishlistButtons";
import { MinusButtonForCart, PlusButtonForCart } from "./PlusMinusButtons";

export default function CartCard({ item }: { item: CartItem }): JSX.Element {
	const dispatch = useDispatch();
	const [deleteToggle, setDeleteToggle] = useState(false);
	const userId = useSelector((state: Store) => state.userProfile.id);
	const wishlistItems = useSelector((state: Store) => state.wishlist[userId]);
	const deletebutton = () => {
		if (item?.product?.guid) {
			setDeleteToggle(!deleteToggle);
			setTimeout(() => {
				dispatch(removeProductFromCart({ guid: item?.product?.guid }));
				setDeleteToggle(false);
			}, 900);
		}
	};
	return (
		<div
			className={`${
				deleteToggle
					? "row py-2 animate__animated animate__fadeOutLeft"
					: "row px-2 py-3"
			}`}
		>
			<div className="col-4">
				<Link to={`/shop/products/${item?.product?.guid}`}>
					<img
						className="border5px shadow w-100 h-auto"
						src={
							item?.product?.Product_Images?.[0]?.dbImage ||
							tempImg
						}
						alt="Product_Image"
					/>
				</Link>
			</div>
			<div className="col-8 text-start">
				<div className="row">
					<div className="col-lg-12">
						<Link
							className="colorblue fw-bold fontsize20 lightbluehover"
							to={`/shop/products/${item?.product?.guid}`}
						>
							{item?.product?.Product_Name}
						</Link>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-12">
						<MinusButtonForCart
							isAuthenticated={userId !== -1 ? true : false}
							guid={item?.product?.guid}
							decreaseQuantityOfProductInCart={
								decreaseQuantityOfProductInCart
							}
						/>
						<input
							className="bgcolorgreyish text-center colorblue border-0 border5px mx-2"
							type="number"
							value={item?.quantity}
							disabled
							style={{ width: 50, height: 40 }}
						/>
						<PlusButtonForCart
							isAuthenticated={userId !== -1 ? true : false}
							guid={item?.product?.guid}
							increaseQuantityOfProductInCart={
								increaseQuantityOfProductInCart
							}
						/>
						<DeleteButtonForCart
							isAuthenticated={userId !== -1 ? true : false}
							onClick={() => deletebutton()}
						/>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-12">
						<p className="colorblue mypara mb-0 fontsize20">
							₹ {item?.product?.Product_SellingPrice} x{" "}
							{item?.quantity} = ₹{" "}
							{item?.product?.Product_SellingPrice *
								item?.quantity}
						</p>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-12">
						<WishlistButtonForCart
							isAuthenticated={userId !== -1 ? true : false}
							guid={item?.product?.guid}
							wishlistItems={wishlistItems}
							addProductInWishlist={addProductInWishlist}
							removeProductFromWishlist={
								removeProductFromWishlist
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
