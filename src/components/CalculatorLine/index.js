import React from 'react';
import './style.css';

const CalculatorLine = (props) => {
    const formatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });

    const lower = formatter.format(props.lowerBound);
    const upper = props.lowerBound > 0.00 && props.upperBound === 0.00 ? "Above" : formatter.format(props.upperBound);
    let taxable = 0.00;
    if (props.amount > 0.00 && props.amount >= props.upperBound) {
        taxable = props.upperBound - props.lowerBound;
    } else
    if (props.amount > 0.00 && props.amount >= props.lowerBound) {
        taxable = props.amount - props.lowerBound;
    }

    const tax = taxable * props.rate;

    return (
        <tr className="CalculatorLine">
            <td>Band {lower} to {upper} at {(props.rate * 100) + "%"}</td>
            <td>{formatter.format(taxable)}</td><td>{formatter.format(tax)}</td>
        </tr>
    );
};

CalculatorLine.defaultProps = {
    lowerBound: 0.00, 
    upperBound: 0.00,
    amount: 0.00,
    rate: 0.00    
}

export default CalculatorLine;
