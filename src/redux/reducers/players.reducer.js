const playersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return action.payload;
        case 'UNSET_PLAYERS':
            return [];
        default:
            return state;
    }
};
export default playersReducer;