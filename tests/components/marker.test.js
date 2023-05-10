/**
 * @jest-environment jsdom
 */

import React from "react"
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Marker from 'src/components/fragment/marker';

describe('Marker', () => {
  it('display the label correctly', () => {
    render(<Marker label="15" />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});