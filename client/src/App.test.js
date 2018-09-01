import React from 'react';
import { render, cleanup } from 'react-testing-library';
import App from './App';

test('<App />', () => {
  const { debug } = render(<App />)
  debug();
});

