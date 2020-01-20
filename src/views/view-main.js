import React from 'react';

import ViewSheet from './view-sheet';
import * as Data from '../data/data-source';

////////////////////////////////////////////////////////////////////////////////
// Root component to construct the view and maintain state
//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const sel = { kind: 'home' };
    this.state = {
      sel: sel,
      sheet: Data.getSheet(sel),
    }
  }

  componentDidMount() {
    //this.doSelect(Data.getSheetList()[1]);
  }

  doSelect(sel) {
    //console.log('sel', sel);
    this.setState({ 
      dsid: sel.dsid,
      sel: sel,
      sheet: Data.getSheet(sel),
    });
  }

  doAction(action, args) {
    Data.doAction(action, { 
      ...args, 
      datasetid: this.state.dsid 
    });
    //console.log('doaction setstate');
    this.setState({
      sheet: Data.getSheet(this.state.sel),
    })
  }  
  
  render() {
    //console.log('props', this.props);
    const selpairs = Data.getSheetList(this.state.dsid).map(s => ({
      label: s.label, 
      select: () => this.doSelect(s),
    }));
    
    //console.log('sellist', sel);
    return <ViewSheet 
      sheet={this.state.sheet} 
      doaction={(action, args) => this.doAction(action, args)}
      selectors={selpairs} />;
  }
}
