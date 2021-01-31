const Reducer = (state, action) => {
	switch (action.type) {
		case 'SET_ACCENT':
			return {
				...state,
				accent: action.payload
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default Reducer;