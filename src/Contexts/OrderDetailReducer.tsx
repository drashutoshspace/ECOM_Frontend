const Storage = (orderdetails) => {
	localStorage.setItem(
		"orderdetail",
		JSON.stringify(orderdetails.orderdetailItems.length > 0 || orderdetails.buyAgainProducts.length > 0 ? orderdetails : { orderdetailItems: [], buyAgainProducts: [] })
	);
};
export const setStorage = (orderdetails) => {
	Storage(orderdetails);
};
export const OrderDetailReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ORDER_DETAIL":
			if (!state.orderdetails.orderdetailItems.find((item) => item.order_id === action.payload.order.order_id && item.userID === action.payload.userID)) {
				state.orderdetails.orderdetailItems.push({
					products: action.payload.order.ordered_products,
					order_id: action.payload.order.order_id,
					userID: action.payload.userID,
				});
			}
			action.payload.order.products.map(
				(item) =>
					!state.orderdetails.buyAgainProducts.find((prod) => prod?.product?.guid === item?.guid && prod?.userID === action.payload.userID) &&
					state.orderdetails.buyAgainProducts.push({ product: item, userID: action.payload.userID })
			);
			return {
				...state,
				...setStorage(state.orderdetails),
				orderdetails: { ...state.orderdetails, orderdetailItems: [...state.orderdetails.orderdetailItems] },
			};
		default:
			return state;
	}
};
