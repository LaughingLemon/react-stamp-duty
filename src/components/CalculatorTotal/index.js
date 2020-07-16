import React from 'react';
import './style.css';
import { connect } from "react-redux";

class CalculatorTotal extends React.Component {
    render () {
        const formatter = new Intl.NumberFormat('en-UK', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2
        });

        return (
            <tr><td>&nbsp;</td><td>Total</td><td>{formatter.format(this.props.totalTax)}</td></tr>
        );
    }
}

const mapStateToProps = (state) => (
    {
        totalTax: state.totalTax
    }
);


export default connect(mapStateToProps)(CalculatorTotal);
