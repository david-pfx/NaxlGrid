// display block as table

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Format from './format';

////////////////////////////////////////////////////////////////////////////////
// View a table in grid format
//
export default class ViewGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const props = this.props;
    const rows = props.table.data;

    //const aggwidth = props.table.fields.reduce((acc,f) => acc + Format.relWidth(f.type));

    const columns = props.table.fields.map((f, x) => ({
      text: f.label,
      dataField: f.id,
      headerStyle: {
        backgroundColor: 'tomato',
        textAlign: 'center',
        width: (x === 0) ? '3rem' : Format.relWidth(f.type) + '%',
      },
      style: x === 0 ? { backgroundColor: 'tomato' } : {},
      formatter: (cell,row) => Format.format(cell, f.type, f.list),
      align: Format.textAlign(f.type),
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
