// display block as table 

import React from 'react';
import Table from 'react-bootstrap/Table';

import Format from '../util/format';

import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'

//import './view-table.scss' 

// get normal column info
function getColumns(table) {
	return table.fields.map((f, colx) => ({
		id: colx,
		text: f.label,
		dataField: f.fieldid,
		headerStyle: {
			backgroundColor: 'tomato',
			textAlign: 'center',
			width: f.width ? f.width + '%' 
				: (colx === 0) ? '3rem' 
				: Format.relWidth(f.type) + '%',
		},
		style: colx === 0 ? {
			backgroundColor: 'tomato',
			fontWeight: 'bold',
		} : {},
		formatter: cell => Format.format(cell, f.type, f.list),
		align: Format.textAlign(f.type),
	}));
}

// get transpose column info
function getColumnsTrans(table) {
	return table.tfields.map((f, colx) => ({
		id: colx,
		text: f.label,
		dataField: f.fieldid,
		headerStyle: {
			backgroundColor: 'tomato',
			textAlign: 'center',
			width: (colx === 0) ? '8rem' : '100%',
		},
		style: colx === 0 ? { 
				backgroundColor: 'tomato',
				fontWeight: 'bold' ,
			} : {},
		formatter: (cell, ridx) => (colx === 0) ? cell
			:	Format.format(cell, table.fields[ridx+1].type, table.fields[ridx+1].list),
	}));
}

function tableHeader(columns) {
	return (
		<tr>
			{columns.map((c,x) =>
				<th id={x} key={x} style={c.headerStyle} >
					{c.text}
				</th>
			)}
		</tr>
	)
}

function tableCell(row, column, ridx) {
	const value = row[column.dataField];
	const formatted = column.formatter(value, ridx);
	return <td key={column.id} style={column.style}>
		{formatted}
	</td>
}

function tableRow(row, columns, ridx) {
	const style = {
		backgroundColor: (ridx % 2 === 0) ? 'lavender' : 'ivory',
	}
	return (
		<tr key={ridx} style={style}>
			{columns.map(c => tableCell(row, c, ridx))}
		</tr>
	);
}
function tableBody(table, istrans) {
	const style = {
		tableLayout: 'fixed',
	};
	const columns = (istrans) ?  getColumnsTrans(table) : getColumns(table);
	const rows = (istrans) ? table.tdata : table.data;
	return (
		<Table striped bordered hover responsive
				style={style}
				size="sm">
			<thead>
				{tableHeader(columns)}
			</thead>
			<tbody>
				{rows.map((r,x) => tableRow(r, columns, x)) }
			</tbody>
		</Table>
	);
}

export default function(props) {
		return tableBody(props.table, props.istrans);
		
		// const body =  (this.state.error) ? <Alert type="danger"  title="Error" message={this.state.error.message}/> 
		// 	: (this.state.loading) ? <Spinner></Spinner> 
		// 	: tableBody(table.fields, table.data);
}

