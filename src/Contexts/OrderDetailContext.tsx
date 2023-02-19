import { createContext, useReducer } from "react";
import { OrderDetailReducer, setStorage } from "./OrderDetailReducer";
const storage = localStorage.getItem("orderdetail")
	? JSON.parse(localStorage.getItem("orderdetail")!)
	: { orderdetailItems: [], buyAgainProducts: [] };
const initialState = {
	orderdetails: storage,
	...(setStorage(storage) as unknown as object),
};
export const OrderDetailContext = createContext(initialState);

const OrderDetailProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(OrderDetailReducer, initialState);
	const addOrderDetail = (payload: any) => {
		dispatch({ type: "ADD_ORDER_DETAIL", payload });
	};
	const contextValues = {
		addOrderDetail,
		...state,
	};
	return (
		<OrderDetailContext.Provider value={contextValues}>
			{children}
		</OrderDetailContext.Provider>
	);
};
export default OrderDetailProvider;
