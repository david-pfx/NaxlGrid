import React from 'react';

import ViewSheet from './view-sheet';
import * as Data from '../data/data-source';
import * as Sheets from "../data/get-sheets";

////////////////////////////////////////////////////////////////////////////////
// Root component to construct the view and maintain state
//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const sel = { kind: 'home' };
    this.state = {
      dsid: '$home',
      sel: sel,
      sheet: Sheets.getSheet(sel),
    }
  }

  doSelect(sel) {
    console.log('doSelect', sel, 'state', this.state.sel);
    const newsel = { ...sel, dsid: sel.dsid || this.state.sel.dsid, };
    this.setState({ 
      dsid: newsel.dsid,
      sel: newsel,
      sheet: Sheets.getSheet(newsel),
    });
  }

  doAction(action, args) {
    Data.doAction(action, { 
      ...args, 
      datasetid: this.state.dsid 
    });
    //console.log('doaction setstate');
    this.setState({
      sheet: Sheets.getSheet(this.state.sel),
    })
  }  
  
  render() {
    
    //console.log('sellist', sel);

    // note the use of arrow notation to bind this
    return <ViewSheet 
      sheet={this.state.sheet} 
      selectors={Sheets.getSheetList(this.state.dsid)} 
      doselect={s => this.doSelect(s)} 
      doaction={(action, args) => this.doAction(action, args)} />;
  }
}
