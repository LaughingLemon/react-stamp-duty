import React from 'react';
import './style.css';
import CalculatorLine from "../CalculatorLine";

export default (props) => (
    <div className="StampDutyCalculator">
        <div><label for="amount">Amount</label><input type="number" name="amount" id="amount" /></div>
        <table>
            <tr><th>Band</th><th>Amount Taxable</th><th>Stamp Duty</th></tr>
            <CalculatorLine lowerBound={125001} upperBound={250000} amount={props.amount} rate={0.02} />
            <CalculatorLine lowerBound={250001} upperBound={925000} amount={props.amount} rate={0.05} />
            <CalculatorLine lowerBound={925001} upperBound={1500000} amount={props.amount} rate={0.10} />
            <CalculatorLine lowerBound={1500001} amount={props.amount} rate={0.12} />
        </table>
    </div>
);
