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

        if (nextProps.amount > 0.00 && this.props.upperBound > 0.00 && nextProps.amount >= this.props.upperBound) {
            this.taxable = this.props.upperBound - this.props.lowerBound;
        } else
        if (nextProps.amount > 0.00 && nextProps.amount >= this.props.lowerBound) {
            this.taxable = nextProps.amount - this.props.lowerBound;
        }

        this.tax = this.taxable * this.props.rate;

        return rerender;
    }
    
    render() {
        const lower = this.formatter.format(this.props.lowerBound);
        const upper = this.props.lowerBound > 0.00 && 
                     this.props.upperBound === 0.00 ? 
                     "Above" : 
                     this.formatter.format(this.props.upperBound);

        return (
            <tr className="CalculatorLine">
                <td>Band {lower} to {upper} at {(this.props.rate * 100) + "%"}</td>
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
