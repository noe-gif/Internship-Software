import React from 'react'
import {render, fireEvent, getNodeText, screen} from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { TimezoneFilterProvider } from 'src/context/timezoneFilterContext';

const wrapper = ({children}) => {
  return (
    <TimezoneFilterProvider>
        {children}
    </TimezoneFilterProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper, ...options})

const hookWrapper = (hook, options) => {
    return renderHook(hook, {wrapper, ...options});
};

export {customRender as render, hookWrapper as renderHook, act, fireEvent, getNodeText, screen}