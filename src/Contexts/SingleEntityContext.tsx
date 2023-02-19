import React, { createContext, useReducer } from "react";
import { SingleEntityReducer, sum } from "./SingleEntityReducer";
export const SingleEntityContext = createContext();
const storage = sessionStorage.getItem("singleEntity") ? JSON.parse(sessionStorage.getItem("singleEntity")) : {};
const initialState = {
	singleEntityValue: storage,
	...sum(storage),
};
const SingleEntityProvider = ({ children }) => {
	const [state, dispatch] = useReducer(SingleEntityReducer, initialState);
	const addSingleCourse = (payload) => {
		dispatch({ type: "ADD_COURSE", payload });
	};
	const handleSingleCheckout = () => {
		dispatch({ type: "REMOVE" });
	};

	const contextValues = {
		addSingleCourse,
		handleSingleCheckout,
		...state,
	};
	return <SingleEntityContext.Provider value={contextValues}>{children}</SingleEntityContext.Provider>;
};
export default SingleEntityProvider;
