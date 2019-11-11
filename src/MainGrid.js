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
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px'
        }} 
        >
        <AgGridReact
          onGridReady={params => this.gridApi = params.api}
          columnDefs={this.props.gridData.columnDefs}
          rowData={this.props.gridData.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default MainGrid;
