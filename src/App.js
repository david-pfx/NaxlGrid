import React from 'react';

import ViewSheet from './view-sheet';
import * as Data from './data-source';

////////////////////////////////////////////////////////////////////////////////
// Root component to construct the view and maintain state
//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: Data.getSheetList()[0],
    }
  }

  componentDidMount() {
    //this.setState({ sheet: Data.getSheetList()[1] });
    //Data.testData();
  }

  render() {
    //console.log('sheets', Data.getSheetList(this.state.sheet.dataset));
    const sel = Data.getSheetList(this.state.sheet.dataset).map(s => ({
      label: s.label, 
      select: () => this.setState({ sheet: s })
    }));
    
    console.log('sel', sel);
    return <ViewSheet 
      sheet={this.state.sheet} 
      selectors={sel} />;
  }
}
