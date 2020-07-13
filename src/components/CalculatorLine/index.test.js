import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CalculatorLine from './';

test('renders CalculatorLine container', () => {
    const onTaxChangeMock = jest.fn();
    
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£0.00'} to {'£0.00'} at {'0%'}</td>,<td>{'£0.00'}</td>,<td>{'£0.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(0.00);
});

test('CalculatorLine with upper bound set', () => {
    const onTaxChangeMock = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine upperBound={50000} onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£0.00'} to {'£50,000.00'} at {'0%'}</td>,<td>{'£0.00'}</td>,<td>{'£0.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(0.00);
});

test('CalculatorLine with lower bound set', () => {
    const onTaxChangeMock = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine lowerBound={50000}  onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£50,000.00'} to {'Above'} at {'0%'}</td>,<td>{'£0.00'}</td>,<td>{'£0.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(0.00);
});

test('CalculatorLine with amount set', () => {
    const onTaxChangeMock = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine lowerBound={50000.00} upperBound={59999.99} amount={55000} onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£50,000.00'} to {'£59,999.99'} at {'0%'}</td>,<td>{'£5,000.00'}</td>,<td>{'£0.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(0.00);
});

test('CalculatorLine with rate set', () => {
    const onTaxChangeMock = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine lowerBound={50000.00} upperBound={59999.99} amount={55000} rate={0.05} onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£50,000.00'} to {'£59,999.99'} at {'5%'}</td>,<td>{'£5,000.00'}</td>,<td>{'£250.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(250.00);
});

test('CalculatorLine above band', () => {
    const onTaxChangeMock = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine lowerBound={50000.00} upperBound={59999.99} amount={65000} rate={0.05}  onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£50,000.00'} to {'£59,999.99'} at {'5%'}</td>,<td>{'£9,999.99'}</td>,<td>{'£500.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(500.00);
});

test('CalculatorLine below band', () => {
    const onTaxChangeMock = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(<CalculatorLine lowerBound={50000.00} upperBound={59999.99} amount={45000} rate={0.05}  onTaxChange={onTaxChangeMock} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('tr');
    expect(result.props.children).toEqual([<td>Band {'£50,000.00'} to {'£59,999.99'} at {'5%'}</td>,<td>{'£0.00'}</td>,<td>{'£0.00'}</td>]);
    expect(onTaxChangeMock).toBeCalledWith(0.00);
});
