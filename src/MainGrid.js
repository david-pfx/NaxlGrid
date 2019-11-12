// main grid page for NaxlGrid

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './App.css';

class MainGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidMount() {
  }

  render() {
    const style = {
      height: 500,
      width: 1000,
    }
    return (
      <div
        className="ag-theme-balham"
        style={style} >
        <AgGridReact
          onGridReady={params => this.gridApi = params.api}
          columnDefs={this.props.sheet.columnDefs}
          rowData={this.props.sheet.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default MainGrid;
