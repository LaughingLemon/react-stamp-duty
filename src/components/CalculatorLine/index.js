import React from 'react';
import './style.css';

class CalculatorLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    render() {
        const formatter = new Intl.NumberFormat('en-UK', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2
        });
    
        return (
            <tr className="CalculatorLine">
                <td>Band {formatter.format(this.props.lowerBound)} to {formatter.format(this.props.upperBound)}</td><td>£0.00</td><td>£0.00</td>
            </tr>
        );
    };
}

CalculatorLine.defaultProps = {
    lowerBound: 0.00, 
    upperBound: 0.00    
}

export default CalculatorLine;
