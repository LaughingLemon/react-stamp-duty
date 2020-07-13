import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StampDutyCalculator from './';

test('renders StampDutyCalculator container', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<StampDutyCalculator />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toEqual(<p>Calculator</p>);
});
