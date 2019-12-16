import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Data from './data-source';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('home', () => {
  const list = Data.getSheetList();
  console.log(list);
  console.log(Data.getSheet(list[0]));
  console.log(Data.getSheet(list[1]));
  console.log(Data.getSheet(list[2]));
});
it('novels', () => {
  console.log(Data.getSheetList('novels'));
});
