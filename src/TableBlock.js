// display block as table

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './App.css';

function colsToAgGrid(fields, transpose) {
  return fields.map((f,x) => {
    let ret = {
      headerName: f.label,
      field: f.id,
      cellStyle: { 
        backgroundColor: (transpose && x == 0) ? 'orange': 'lightcyan', 
        textAlign: 'left',
        fontWeight: (transpose && x == 0) ? 'bold' : 'normal',
        //verticalAlign: 'middle',
      },
      headerStyle: {
        background: 'lightorange',
        fontWeight: (transpose && x == 0) ? 'bold' : 'normal',
      },
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
    const props = this.props;
    const headerheight = 32;
    const rowheight = 28;
    const style = {
      height: Math.min(500, headerheight + props.rows.length * rowheight),
      width: 1000,
    }
    return (
      <div
        className="ag-theme-balham"
        style={style} >
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={colsToAgGrid(props.cols, props.kind === 'tuple')}
          defaultColDef={{ resizable: true }}
          rowData={props.rows} 
          headerHeight={props.kind==='tuple'?0:25}
          rowHeight={25}>
        </AgGridReact>
      </div>
    );
  }
}

export default TableBlock;
