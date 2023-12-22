import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Range from '../Range';

describe('Range Component with min and max values', () => {
  it('sholud render the component', () => {
    render(<Range min={1} max={100} currency='€' />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('should render the component with initial values', () => {
    render(<Range min={1} max={100} currency='€' />);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  it('should render two currency symbols when component has initial values', () => {
    render(<Range min={1} max={100} currency='€' />);

    const currencySymbol = screen.getAllByText('€');
    expect(currencySymbol.length).toBe(2);
  });

  it('should update the displayed values when input values are changed', () => {
    render(<Range min={1} max={100} currency='€' />);

    fireEvent.change(screen.getByRole('textbox', { name: 'min' }), {
      target: { value: '50' }
    });

    fireEvent.change(screen.getByRole('textbox', { name: 'max' }), {
      target: { value: '75' }
    });

    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
    expect(screen.getByDisplayValue('75')).toBeInTheDocument();
  });
});

describe('Range component with fixed values', () => {
  it('renders component with fixed values', () => {
    render(<Range fixedValues={[10, 20, 30, 40, 50]} currency={'€'} />);

    expect(screen.getByLabelText('min').value).toBe('10');
    expect(screen.getByLabelText('max').value).toBe('50');
  });
});
