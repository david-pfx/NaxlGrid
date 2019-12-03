import React from 'react';

import ViewSheet from './ViewSheet';
import * as Data from './data-source';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: Data.home_sheet
    }
  }

  // function to load a new sheet
  getSheet = (id) => Data.getSheet(id, sheet => this.setState({ sheet: sheet }));

  componentDidMount() {
    //this.getSheet('comic');
    this.getSheet('music2');
    //Data.testData();
  }

  render() {
    return <ViewSheet sheet={this.state.sheet} selectSheet={this.getSheet} />;
  }
}
