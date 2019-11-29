// display block as table

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Format from './format';

export default class TableBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const props = this.props;
    const rows = props.table.data;
    const columns = props.table.fields.map((f, x) => ({
      text: f.label,
      dataField: f.id,
      headerStyle: {
        backgroundColor: 'tomato',
        hidden: true,
      },
      formatter: (cell,row) => Format.format(cell, f.type, f.list),
    }));
    columns.unshift({
      text: 'Id',
      dataField: 'xxx',
      isDummyField: true,
      headerStyle: {
        backgroundColor: 'tomato',
      },
      formatter: (cell,row, rowIndex) => Format.format(rowIndex+1, 'integer'),
    })
    
    const rowStyle = (row, rowIndex) => {
      return {
        backgroundColor: (rowIndex % 2 === 0) ? 'moccasin' : 'yellowgreen',
      };
    }
    
    return <div >
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
//export default TableBlock;
