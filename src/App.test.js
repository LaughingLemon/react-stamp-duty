import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';
import StampDutyCalculator from './components/StampDutyCalculator';

test('renders App container', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toEqual(
        <header className="App-header">
            <StampDutyCalculator />
        </header>
    );
});
