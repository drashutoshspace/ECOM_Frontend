const Storage = (singleEntityValue: any) => {
	sessionStorage.setItem(
		"singleEntity",
		JSON.stringify(singleEntityValue !== null ? singleEntityValue : {})
	);
};
export const sum = (obj: any) => {
	Storage(obj);
	return;
};
export const SingleEntityReducer = (state: any, action: any) => {
	switch (action.type) {
		case "ADD_COURSE":
			state.singleEntityValue = action.payload;

			return {
				...state,
				...(sum(state.singleEntityValue) as unknown as object),
				singleEntityValue: state.singleEntityValue,
			};

		case "REMOVE":
			state.singleEntityValue = {};
			return {
				...state,
				...(sum(state.singleEntityValue) as unknown as object),
				singleEntityValue: state.singleEntityValue,
			};
		default:
			return state;
	}
};
