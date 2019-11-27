// display block as tuple

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Format from './format';

export default class TupleBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const props = this.props;
    const rowColour0 = '#81c784';
    const rowColour1 = '#c8e6c9';

    const columns = [{
      id: 0, 
      dataField: 'label',
      headerStyle: { 
        padding: 0, 
        width: '20%' 
      },
      style: { 
        backgroundColor: 'tomato',
        fontWeight: 'bold',
      },
    }, {
      id: 1, 
      dataField: 'value',
      headerStyle: { 
        padding: 0, 
        width: '30%' 
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: (rowIndex % 2 === 0) ? rowColour0 : rowColour1,
        }
      },
      formatter: (cell,row) => Format.format(cell, row.type, row.list),
    }, {
      id: 2, 
      dataField: 'comment',
      headerStyle: { padding: 0 },
    }];
  
    return <div>
        <BootstrapTable keyField='id'
          data={props.rows}
          columns={columns}
          bordered={true}
          hover condensed
          bootstrap4
        />
      </div>
  }
}
