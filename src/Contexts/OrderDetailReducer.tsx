const Storage = (orderdetails: any) => {
	localStorage.setItem(
		"orderdetail",
		JSON.stringify(
			orderdetails.orderdetailItems.length > 0 ||
				orderdetails.buyAgainProducts.length > 0
				? orderdetails
				: { orderdetailItems: [], buyAgainProducts: [] }
		)
	);
};
export const setStorage = (orderdetails: any) => {
	Storage(orderdetails);
};
export const OrderDetailReducer = (state: any, action: any) => {
	switch (action.type) {
		case "ADD_ORDER_DETAIL":
			if (
				!state.orderdetails.orderdetailItems.find(
					(item: any) =>
						item.order_id === action.payload.order.order_id &&
						item.userID === action.payload.userID
				)
			) {
				state.orderdetails.orderdetailItems.push({
					products: action.payload.order.ordered_products,
					order_id: action.payload.order.order_id,
					userID: action.payload.userID,
				});
			}
			action.payload.order.products.map(
				(item: any) =>
					!state.orderdetails.buyAgainProducts.find(
						(prod: any) =>
							prod?.product?.guid === item?.guid &&
							prod?.userID === action.payload.userID
					) &&
					state.orderdetails.buyAgainProducts.push({
						product: item,
						userID: action.payload.userID,
					})
			);
			return {
				...state,
				...(setStorage(state.orderdetails) as unknown as object),
				orderdetails: {
					...state.orderdetails,
					orderdetailItems: [...state.orderdetails.orderdetailItems],
				},
			};
		default:
			return state;
	}
};
