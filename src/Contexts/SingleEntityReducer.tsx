const Storage = (singleEntityValue) => {
	sessionStorage.setItem("singleEntity", JSON.stringify(singleEntityValue !== null ? singleEntityValue : {}));
};
export const sum = (obj) => {
	Storage(obj);
	return;
};
export const SingleEntityReducer = (state, action) => {
	switch (action.type) {
		case "ADD_COURSE":
			state.singleEntityValue = action.payload;

			return {
				...state,
				...sum(state.singleEntityValue),
				singleEntityValue: state.singleEntityValue,
			};

		case "REMOVE":
			state.singleEntityValue = {};
			return {
				...state,
				...sum(state.singleEntityValue),
				singleEntityValue: state.singleEntityValue,
			};
		default:
			return state;
	}
};
