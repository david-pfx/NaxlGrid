// display block as table

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './App.css';

function colsToAgGrid(fields) {
  return fields.map(f => {
    let ret = {
      headerName: f.label,
      field: f.id,
    }
    //if (f.width) ret.width = f.width;
    return ret;
  });
}

class TableBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidMount() {
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridcolumnApi = params.columnApi;
    //this.gridApi.sizeColumnsToFit();
    this.gridcolumnApi.autoSizeColumns();
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
          onGridReady={this.onGridReady}
          columnDefs={colsToAgGrid(this.props.block.defs.fields)}
          defaultColDef={{ resizable: true }}
          rowData={this.props.block.rows}>
        </AgGridReact>
      </div>
    );
  }
}

export default TableBlock;
