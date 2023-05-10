/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import IconCounter from 'src/components/fragment/iconCounter';

describe('IconCounter Component', () => {
  it('should display the counter pass as parameter', () => {
    render(<IconCounter  counter={2}/>);

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
