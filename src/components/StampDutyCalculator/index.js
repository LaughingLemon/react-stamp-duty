import React from 'react';
import './style.css';
import CalculatorLine from "../CalculatorLine";
import CalculatorTotal from '../CalculatorTotal';
import { connect } from "react-redux";
import { resetTotalTax } from "../../actions/tax";

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

    onAmountChange(evt) {
        evt.preventDefault();

        this.props.dispatch(resetTotalTax());
        this.setState({taxableAmount: evt.target.value});
    }

    render() {
        return (
            <div className="StampDutyCalculator">
                <div><label htmlFor="amount">Amount</label><input type="number" name="amount" id="amount" onChange={this.onAmountChange} /></div>
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
