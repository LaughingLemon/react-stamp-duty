import React from 'react';
import './style.css';
import { addToTotalTax } from "../../actions/tax";
import { connect } from "react-redux";

class CalculatorLine extends React.Component {
    constructor(props) {
        super(props);
        this.changeTax = this.changeTax.bind(this);
        
        this.formatter = new Intl.NumberFormat('en-UK', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2
        });

        this.taxable = 0.00;
        this.tax = 0.00;
    }

    changeTax(tax) {
        console.log("tax", tax);
        if (tax > 0.00) {
            this.props.dispatch(addToTotalTax({tax: tax}));
        }
    }

    componentDidUpdate() {
        this.changeTax(+this.tax.toFixed(2));
    }

    shouldComponentUpdate(nextProps, nextState) {
        const rerender = nextProps.amount !== this.props.amount;

        this.taxable = 0.00;

        this.lower = this.formatter.format(this.props.lowerBound);
        this.upper = nextProps.lowerBound > 0.00 && 
                     nextProps.upperBound === 0.00 ? 
                     "Above" : 
                     this.formatter.format(nextProps.upperBound);

        if (nextProps.amount > 0.00 && nextProps.upperBound > 0.00 && nextProps.amount >= nextProps.upperBound) {
            this.taxable = nextProps.upperBound - nextProps.lowerBound;
        } else
        if (nextProps.amount > 0.00 && nextProps.amount >= nextProps.lowerBound) {
            this.taxable = nextProps.amount - nextProps.lowerBound;
        }

        this.tax = this.taxable * nextProps.rate;

        return rerender;
    }
    
    render() {
        return (
            <tr className="CalculatorLine">
                <td>Band {this.lower} to {this.upper} at {(this.props.rate * 100) + "%"}</td>
                <td>{this.formatter.format(this.taxable)}</td><td>{this.formatter.format(this.tax)}</td>
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

const mapStateToProps = (state) => (
    {
        totalTax: state.totalTax
    }
);

export default connect(mapStateToProps)(CalculatorLine);
