
const totalTaxReducerDefaultState = {
    taxableAmounts: [],
    totalTax: 0.00
};

const totalTaxReducer = (state = totalTaxReducerDefaultState, action) => {
    switch(action.type) {
        case "ADD_TO_TOTAL_TAX":
            return {
                ...state,
                totalTax: state.totalTax + action.tax
            }; 
        case "RESET_TOTAL_TAX":
            return {
                ...state,
                totalTax: 0.00
            }; 
        default:
            return state;
    }
};

export default totalTaxReducer;
