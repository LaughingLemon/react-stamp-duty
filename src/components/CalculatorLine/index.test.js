import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CalculatorLine from './';

test('renders CalculatorLine container', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£0.00'} to {'£0.00'}</td>,<td>{'£0.00'}</td>,<td>{'£0.00'}</td>]);
});
