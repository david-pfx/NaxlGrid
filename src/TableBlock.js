// display block as table

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Format from './format';

// function getColumns(fields, transpose) {
//   return fields.map((f,x) => {
//     let ret = {
//       id: x,
//       text: f.label,
//       dataField: f.id,
//     }
//     return ret;
//   });
// }
// function colsToAgGrid(fields, transpose) {
//   return fields.map((f,x) => {
//     let ret = {
//       headerName: f.label,
//       field: f.id,
//       //width: 100,
//       //width: f.width || 100,
//       //      width: f.width || f.label.length,
//       cellStyle: { 
//         backgroundColor: (transpose && x === 0) ? 'orange': 'lightcyan', 
//         textAlign: 'left',
//         fontWeight: (transpose && x === 0) ? 'bold' : 'normal',
//         //verticalAlign: 'middle',
//       },
// //      headerStyle: {
// //        background: 'lightorange',
// //        fontWeight: (transpose && x == 0) ? 'bold' : 'normal',
// //      },
//     }
//     //if (f.width) ret.width = f.width;
//     return ret;
//   });
// }

export default class TableBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  tableColumns() {
    return this.props.cols.map((f, x) => ({
      id: x,
      text: f.label,
      dataField: f.id,
      formatter: (cell,row) => Format.format(cell, f.type, f.list),
    }));
  }
  
  tupleColumns() {
    return [{
      id: 0, 
      text: 'Key',
      dataField: 'label',
    },
    {
      id: 1, 
      text: 'Value',
      dataField: 'value',
      formatter: (cell,row) => Format.format(cell, row.type, row.list),
    }];
  }
  
  render() {
    const props = this.props;
    const istuple = props.kind === 'tuple';
    //const headerheight = 32;
    const rowheight = 28;
    // const style = {
    //   height: Math.min(500, headerheight + props.rows.length * rowheight),
    //   width: 1000,
    // }
    const cols = istuple ? this.tupleColumns() : this.tableColumns();
    // const rows = props.rows.map((row,x) => {
    //   let newrow = { key: x }
    //   props.cols.map(col => {
    //     newrow[col.id] = Format.format(row[col.id], col);
    //   });
    //   return newrow;
    // });
    // console.log("render:", cols, rows);
    return (
      <div >
        <BootstrapTable keyField='id' 
          data={this.props.rows} 
          columns={cols}
          bordered={true}
          striped hover condensed
        />
      </div>
    );
  }
}
//export default TableBlock;
