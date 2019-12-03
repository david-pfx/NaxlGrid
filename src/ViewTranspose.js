// display block as tuple

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Format from './format';

export default class ViewTuple extends Component {
  render() {
    const table = this.props.table;
    const rows = table.tdata;

    const columns = table.tfields.map((f, colx) => (
      (colx === 0) ? {
        text: f.label,
        dataField: f.id,
        headerStyle: {
          backgroundColor: 'tomato',
          textAlign: 'center',
          width: '8rem',
        },
        style: { 
          backgroundColor: 'tomato',
          fontWeight: 'bold' ,
        },
       } : {
        text: f.label,
        dataField: f.id,
        headerStyle: {
          backgroundColor: 'tomato',
          textAlign: 'center',
          width: '100%',
        },
        style: (cell, row, rowIndex) => ({ 
          align: Format.textAlign(table.fields[rowIndex].type),
        }),
        formatter: (cell, row, rowIndex) => Format.format(cell, table.fields[rowIndex+1].type, table.fields[rowIndex+1].list),
    }));
    
    const rowStyle = (row, rowIndex) => {
      return {
        backgroundColor: (rowIndex % 2 === 0) ? 'moccasin' : 'cornsilk',
      };
    }
    
    return <div>
        <BootstrapTable keyField='id'
          data={rows}
          columns={columns}
          bordered={true}
          rowStyle={rowStyle}
          hover condensed
          tabIndexCell
          bootstrap4
        />
      </div>
  }
}
