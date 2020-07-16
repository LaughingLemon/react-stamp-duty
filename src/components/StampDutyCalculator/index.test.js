import React from 'react';
import StampDutyCalculator from './';
import CalculatorLine from "../CalculatorLine";
import { shallow, mount } from "enzyme";

test('renders StampDutyCalculator container', () => {
    const result = shallow(<StampDutyCalculator />);

    expect(result.find(CalculatorLine)).toHaveLength(4);
});

test('renders with amount', () => {
    const result = mount(<StampDutyCalculator />);
    const amountInput = result.find("#amount");
    console.log("amountInput", amountInput);

    amountInput.simulate('change', { target: { name: 'value', value: 750000 } });

    expect(result.state('taxableAmount')).toEqual(750000);
    expect(result.totalTax).toEqual(30000);
});
