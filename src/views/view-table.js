// display block as table 

import React from 'react';
import Table from 'react-bootstrap/Table';

import Format from '../util/format';

import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'

//import './view-table.scss' 

// const normalTable = {
// 	value: (table,r,c) => table.data[r][table.fields[c].fieldid],
// 	field: (table,r,c) => table.fields[c],
// 	width: (f,x) => f.width ? f.width + '%' 
// 		: (x === 0) ? '3rem' 
// 		: Format.relWidth(f.type) + '%',

// }


// function getCellField(fields, r, c, trans) {
// 	return !trans ? fields[c]
// 		: (c === 0) ? 'text' : fields[r].type;
// }

// function getCellValue(fields, rows, r, c, trans) {
// 	return !trans ? rows[r][fields[c].fieldid]
// 		: (c === 0) ? fields[r].label : rows[c][fields[r].fieldid];
// }

function tableHeader(fields) {
	const style = (f,x) => ({
		backgroundColor: 'coral',
		textAlign: 'center',
		width: f.width ? f.width + '%' 
			: (x === 0) ? '3rem' 
			: Format.relWidth(f.type) + '%',
	});
	return (
		<tr>
			{fields.map((f,x) =>
				<th id={f.id} key={f.id} style={style(f,x)} >
					{f.label}
				</th>
			)}
		</tr>
	)
}

function tableCell(row, field, idx) {
	const value = row[field.fieldid];
	const formatted = Format.format(value, field.type, field.list);
	const style = (f,x) => (x === 0) ? {
			backgroundColor: 'coral',
			fontWeight: 'bold',
			textAlign: 'center',
		} : {
			textAlign: Format.textAlign(f.type),
		};
	return <td key={idx} style={style(field,idx)}>{formatted}</td>
}

function tableRow(row, fields, ridx) {
	const style = x => ({
		backgroundColor: (x % 2 === 0) ? 'lavender' : 'ivory',
	})
	return (
		<tr key={row.id} style={style(ridx)}>
			{fields.map((f, fidx) => tableCell(row, f, fidx))}
		</tr>
	);
}

function tableBody(table, istrans) {
	const style = {
		tableLayout: 'fixed',
	};
	return (
		<Table striped bordered hover responsive
				style={style}
				size="sm">
			<thead>
				{tableHeader(istrans ? table.tfields : table.fields)}
			</thead>
			<tbody>
				{ istrans ? table.tdata.map((r,x) => tableRow(r, table.tfields, x))
									: table.data.map((r,x) => tableRow(r, table.fields, x)) }
			</tbody>
		</Table>
	);
}

export default function(props) {
	const 
		table = props.table,
		istrans = props.istrans;

		return tableBody(table, istrans);
		// const body =  (this.state.error) ? <Alert type="danger"  title="Error" message={this.state.error.message}/> 
		// 	: (this.state.loading) ? <Spinner></Spinner> 
		// 	: tableBody(table.fields, table.data);
}

