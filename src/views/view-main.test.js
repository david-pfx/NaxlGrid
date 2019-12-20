import React from 'react';
import ReactDOM from 'react-dom';
import Main from './view-main';
import * as Data from '../data/data-source';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main />, div);
  ReactDOM.unmountComponentAtNode(div);
});
