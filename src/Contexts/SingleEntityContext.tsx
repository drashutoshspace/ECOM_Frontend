import { createContext, useReducer } from "react";
import { SingleEntityReducer, sum } from "./SingleEntityReducer";
const storage = sessionStorage.getItem("singleEntity")
	? JSON.parse(sessionStorage.getItem("singleEntity")!)
	: {};

const initialState = {
	singleEntityValue: storage,
	...(sum(storage) as unknown as object),
};
export const SingleEntityContext = createContext(initialState);

const SingleEntityProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(SingleEntityReducer, initialState);
	const addSingleCourse = (payload: any) => {
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
	return (
		<SingleEntityContext.Provider value={contextValues}>
			{children}
		</SingleEntityContext.Provider>
	);
};
export default SingleEntityProvider;
