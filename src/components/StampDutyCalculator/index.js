import React from 'react';
import './style.css';
import CalculatorLine from "../CalculatorLine";
import CalculatorTotal from '../CalculatorTotal';
import { connect } from "react-redux";
import { resetTotalTax } from "../../actions/tax";
import CurrencyInput from "react-currency-input";

class StampDutyCalculator extends React.Component {

    constructor(props) {
        super(props);

        this.onAmountChange = this.onAmountChange.bind(this);

        this.state = {
            taxableAmount: 0.00
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.taxableAmount !== this.state.taxableAmount;
    }

    onAmountChange(evt, maskedValue, floatValue) {
        evt.preventDefault();

        this.props.dispatch(resetTotalTax());
        this.setState({taxableAmount: floatValue});
    }

    render() {
        return (
            <div className="StampDutyCalculator">
                <div><label htmlFor="amount">Amount</label><CurrencyInput prefix="£" value={this.state.taxableAmount} onChangeEvent={this.onAmountChange} /></div>
                <table>
                    <thead><tr><th>Band</th><th>Amount Taxable</th><th>Stamp Duty</th></tr></thead>
                    <tbody>
                    <CalculatorLine lowerBound={125001} upperBound={250000} amount={this.state.taxableAmount} rate={0.02} />
                    <CalculatorLine lowerBound={250001} upperBound={925000} amount={this.state.taxableAmount} rate={0.05} />
                    <CalculatorLine lowerBound={925001} upperBound={1500000} amount={this.state.taxableAmount} rate={0.10} />
                    <CalculatorLine lowerBound={1500001} amount={this.state.taxableAmount} rate={0.12} />
                    <CalculatorTotal />
                    </tbody>
                </table>
            </div>
        );
    }
}


const mapStateToProps = (state) => (
    {
        totalTax: state.totalTax
    }
);


export default connect(mapStateToProps)(StampDutyCalculator);
