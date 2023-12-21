import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Range from '../Range';

describe('Range Component', () => {
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

    console.log(screen.getByRole('textbox', { name: 'min' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'min' }), {
      target: { value: '50' }
    });
    console.log(screen.getByRole('textbox', { name: 'min' }));

    fireEvent.change(screen.getByRole('textbox', { name: 'max' }), {
      target: { value: '75' }
    });

    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
    expect(screen.getByDisplayValue('75')).toBeInTheDocument();
  });

  it('should handle drag interaction correctly', () => {
    render(<Range min={1} max={100} currency='€' />);

    fireEvent.mouseDown(screen.getByTestId('min-bullet'));
    fireEvent.mouseMove(screen.getByTestId('container'), {
      clientX: 10
    });
    fireEvent.mouseUp(screen.getByTestId('min-bullet'));

    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
  });
});
