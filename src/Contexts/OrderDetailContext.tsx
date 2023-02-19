import React, { createContext, useReducer } from "react";
import { OrderDetailReducer, setStorage } from "./OrderDetailReducer";
export const OrderDetailContext = createContext();
const storage = localStorage.getItem("orderdetail") ? JSON.parse(localStorage.getItem("orderdetail")) : { orderdetailItems: [], buyAgainProducts: [] };
const initialState = { orderdetails: storage, ...setStorage(storage) };
const OrderDetailProvider = ({ children }) => {
	const [state, dispatch] = useReducer(OrderDetailReducer, initialState);
	const addOrderDetail = (payload) => {
		dispatch({ type: "ADD_ORDER_DETAIL", payload });
	};
	const contextValues = {
		addOrderDetail,
		...state,
	};
	return <OrderDetailContext.Provider value={contextValues}>{children}</OrderDetailContext.Provider>;
};
export default OrderDetailProvider;
