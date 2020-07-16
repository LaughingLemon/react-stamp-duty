
const addToTotalTax = ({tax = 0.00}) => ({
    type: "ADD_TO_TOTAL_TAX",
    tax
});

const resetTotalTax = () => ({
    type: "RESET_TOTAL_TAX"
});

export { addToTotalTax, resetTotalTax };
