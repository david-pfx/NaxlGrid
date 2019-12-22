// display block as table using react grid

import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

import Format from '../util/format';

const cellEdit = cellEditFactory({
  mode: 'click',
});

////////////////////////////////////////////////////////////////////////////////
// Component to view a table in grid format
//
export default function(props) {
  const rows = props.table.data;

  const columns = props.table.fields.map((f, x) => ({
    text: f.label,
    dataField: f.fieldid,
    sort: true,
    headerStyle: {
      backgroundColor: 'tomato',
      textAlign: 'center',
      width: f.width ? f.width + '%' 
        : (x === 0) ? '3rem' 
        : Format.relWidth(f.type) + '%',
    },
    style: x === 0 ? {
      backgroundColor: 'tomato',
      fontWeight: 'bold',
    } : {},
    formatter: (cell, row) => Format.format(cell, f.type, f.list),
    // sortValue: (cell,row) => Format.format(cell, f.type, f.list), // does not seem to work right
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
      cellEdit={cellEdit}
    />
  </div>
}

