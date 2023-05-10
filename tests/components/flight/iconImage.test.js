/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom';

 import IconImage from 'src/components/fragment/iconImage';

describe('FlightIcon component', () => {
  it('render html element of this component', () => {
    render(<IconImage
      iconInfos={{
        source: 'LANDING_PLANE_ICON.png',
        alt: "Departure Plane Icon",
        className: "turnaroundHeaderClass"
      }}
      isIconRender
    />);

    expect(screen.getByAltText('Departure Plane Icon')).toBeInTheDocument();
  });
});