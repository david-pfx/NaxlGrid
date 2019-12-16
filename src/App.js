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
      sheet: Data.getSheet({ kind: 'home' }),
    }
  }

  componentDidMount() {
    //this.setState({ sheet: Data.getSheetList()[1] });
    //Data.testData();
  }

  doSelect(sel) {
    //console.log('sel', sel);
    this.setState({ 
      dsid: sel.dsid,
      sheet: Data.getSheet(sel),
    });
  }

  doAction(action, payload) {
    Data.doAction(action, payload);
    this.forceUpdate();
  }  
  
  render() {
    //console.log('props', this.props);
    const sel = Data.getSheetList(this.state.dsid).map(s => ({
      label: s.label, 
      select: () => this.doSelect(s),
      //select: () => this.setState({ sheet: Data.getSheet(s) }),
    }));
    
    //console.log('sellist', sel);
    return <ViewSheet 
      sheet={this.state.sheet} 
      action={(action, payload) => this.doAction(action, { ...payload, dsid: this.state.dsid })}
      selectors={sel} />;
  }
}
