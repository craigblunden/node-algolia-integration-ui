import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Form from './Form';

afterEach(cleanup)


test('<App />', () => {
  const handleSubmit = jest.fn()
  const { getByTestId } = render(<Form onSubmit={handleSubmit} />)

  expect(getByTestId('form')).toBeTruthy();
  expect(getByTestId('form-submit')).toBeTruthy();
  
  fireEvent.submit(getByTestId('form'))
  expect(handleSubmit).toHaveBeenCalledTimes(1)

});

