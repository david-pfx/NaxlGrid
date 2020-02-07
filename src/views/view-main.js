import React from 'react';

import ViewSheet from './view-sheet';
import * as Data from '../data/data-source';
import * as Sheets from "../data/get-sheets";
//import assert from 'assert';

////////////////////////////////////////////////////////////////////////////////
// Root component to construct the view and maintain state
//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const sel = { kind: 'home' };
    this.state = {
      datasetid: '$home',
      sel: sel,
      sheet: Sheets.getSheet(sel),
    }
  }

  doSelect(sel) {
    console.log('doSelect', sel, 'state', this.state.sel);
    const newsel = { 
      ...sel, 
      datasetid: sel.datasetid || this.state.sel.datasetid, 
    };
    this.setState({ 
      datasetid: newsel.datasetid,
      sel: newsel,
      sheet: Sheets.getSheet(newsel),
    });
  }

  // add dataset id to action, do it, then reload sheet
  doAction(action, args) {
    Data.doAction(action, { 
      ...args, 
      datasetid: this.state.datasetid 
    });
    //console.log('doaction setstate');
    this.setState({
      sheet: Sheets.getSheet(this.state.sel),
    })
  }  
  
  render() {
    // note the use of arrow notation to bind this
    return <ViewSheet 
      sheet={this.state.sheet} 
      selectors={Sheets.getSheetList(this.state.datasetid)} 
      doselect={s => this.doSelect(s)} 
      doaction={(action, args) => this.doAction(action, args)} />;
  }
}
