// display block as tuple

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './App.css';

class TupleBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const cols = [{
      headerName: "Key", field: "id"
    }, {
      headerName: "Value", field: "value"
    }];
    const style = {
      height: 130,
      width: 1000,
    }
    return (
      <div
        className="ag-theme-balham"
        style={style} >
        <AgGridReact
          onGridReady={params => this.gridApi = params.api}
          columnDefs={cols}
          rowData={this.props.block.rows}>
        </AgGridReact>
      </div>
    );
  }
}

export default TupleBlock;
