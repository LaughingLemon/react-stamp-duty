import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StampDutyCalculator from './';
import CalculatorLine from "../CalculatorLine";

test('renders StampDutyCalculator container', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<StampDutyCalculator />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('table');
    expect(result.props.children).toEqual([
        <tr><th>Band</th><th>Amount Taxable</th><th>Stamp Duty</th></tr>,
        <CalculatorLine lowerBound={125001} upperBound={250000} rate={0.02} />,
        <CalculatorLine lowerBound={250001} upperBound={925000} rate={0.05} />,
        <CalculatorLine lowerBound={925001} upperBound={1500000} rate={0.10} />,
        <CalculatorLine lowerBound={1500001} rate={0.12} />]);
});
