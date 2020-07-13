import React from 'react';
import './style.css';

class CalculatorLine extends React.Component {
    constructor(props) {
        super(props);
        this.changeTax = this.changeTax.bind(this);
    }

    changeTax(tax) {
        this.props.onTaxChange && this.props.onTaxChange(tax);  
    }
    
    render() {
        const formatter = new Intl.NumberFormat('en-UK', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2
        });
        
        const lower = formatter.format(this.props.lowerBound);
        const upper = this.props.lowerBound > 0.00 && 
                      this.props.upperBound === 0.00 ? 
                      "Above" : 
                      formatter.format(this.props.upperBound);

        let taxable = 0.00;
        if (this.props.amount > 0.00 && this.props.amount >= this.props.upperBound) {
            taxable = this.props.upperBound - this.props.lowerBound;
        } else
        if (this.props.amount > 0.00 && this.props.amount >= this.props.lowerBound) {
            taxable = this.props.amount - this.props.lowerBound;
        }

        const tax = taxable * this.props.rate;
        
        this.changeTax(+tax.toFixed(2));

        return (
            <tr className="CalculatorLine">
                <td>Band {lower} to {upper} at {(this.props.rate * 100) + "%"}</td>
                <td>{formatter.format(taxable)}</td><td>{formatter.format(tax)}</td>
            </tr>
        );       
    }
}

CalculatorLine.defaultProps = {
    lowerBound: 0.00, 
    upperBound: 0.00,
    amount: 0.00,
    rate: 0.00    
}

export default CalculatorLine;
