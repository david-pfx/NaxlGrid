// display block as table 

import React from 'react';
import Table from 'react-bootstrap/Table';
//import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
//import { faCheckSquare, faFilter, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

import Format from '../util/format';

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
		align: Format.textAlign(f.type),
		formatter: cell => Format.format(f, cell),
		inputter: colx > 0 && Format.input(f) && ((cell,ridx,cbs) => Format.input(f, cell, cbs)),
		sort: colx > 0 && 'none',
		filter: colx > 0 && 'none',
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
			:	Format.format(table.fields[ridx+1], cell),
		//inputter: (cell,ridx,cbs) => colx > 0 && Format.input(table.fields[ridx+1]) && Format.input(table.fields[ridx+1], cell, cbs),
	}));
}

// construct a table header
function makeHeader(columns) {
	const sorticon = s => s ==='up' ? faSortUp : s === 'down' ? faSortDown : faSort;
	const filtericon = f => faFilter;
	return (
		<tr>
			{columns.map((c,x) =>
				<th id={x} key={x} style={c.headerStyle} onClick={() => {}} >
					{c.text}
					{(c.sort || c.filter) && <div style={{ fontWeight: '100', color: 'gray', float: 'right' }}>
						{c.sort && <FaIcon icon={sorticon(c.sort)} />}
						{c.filter && <FaIcon icon={filtericon(c.filter)} />}
					</div>}
				</th>
			)}
		</tr>
	)
}

// construct a single table cell, display or edit
function makeCell(row, column, ridx, cbs) {
	const value = row[column.dataField];

	// handlers
	const onclick = (e) => {
		e.stopPropagation();
		cbs.setedit(ridx, column.id, value);
	}
	const onchange = (e) => {
		cbs.setedit(ridx, column.id, e.target.value);
	}
	// 
	const onkeydown = (e) => {
		//console.log('keydown', e.key);
		if (e.key === 'Enter') cbs.saveitem(row, column);
		else if (e.key === 'Escape') cbs.setedit();
	}
	const onkeypress = (e) => {
		//console.log('keypress', e.key);
		// if (e.key === 'Enter') cbs.saveitem(row, column);
		// else if (e.key === 'Escape') cbs.setedit();
	}

	const contents = (column.inputter && cbs.isedit(ridx, column.id)) 
		? column.inputter(cbs.getnewvalue(), ridx, { 
				onchange: onchange,
			}) 
		: column.formatter(value, ridx);

	return <td key={column.id} 
			style={column.style} 
			onClick={onclick}
			onKeyPress={onkeypress}
			onKeyDown={onkeydown}>
		{contents}
	</td>
}

// return a single table row
function makeRow(row, columns, ridx, callbacks) {
	const style = {
		backgroundColor: (ridx % 2 === 0) ? 'lavender' : 'ivory',
	}
	return (
		<tr key={ridx} style={style}>
			{columns.map(c => makeCell(row, c, ridx, callbacks))}
		</tr>
	);
}

// return a table body
function makeBody(table, istrans, callbacks) {
	const style = {
		tableLayout: 'fixed',
	};
	const columns = (istrans) ?  getColumnsTrans(table) : getColumns(table);
	const rows = (istrans) ? table.tdata : table.rows;
	return (
		<Table striped bordered hover responsive size="sm"
			style={style} 
			onClick={() => callbacks.setedit()}>
			<thead>
				{makeHeader(columns)}
			</thead>
			<tbody>
				{rows.map((r,x) => makeRow(r, columns, x, callbacks)) }
			</tbody>
		</Table>
	);
}

// return a complete table
// transient state for edit mode
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
	}
	
	callBacks = { 
		isedit: (r,c) => r === this.state.ridx && c === this.state.cidx,
		setedit: (r,c,v) => this.setEdit(r,c,v),
		onclick: (e,r,c) => {
			e.stopPropagation();
			this.setEdit(r, c);
		},
		onchange: (e,r,c) => {
			this.setEdit(r, c, e.target.value);
		},
		getnewvalue: () => this.state.newvalue,
		saveitem: (row, column) => {
			this.props.doaction('PUT', { 
				tableid: this.props.table.tableid, 
				newrow: {
					id: row.id,
					[column.dataField]: this.state.newvalue,
				}
			});
			this.setEdit();
		},
	}

	setEdit(ridx, cidx, value) {
			//console.log('setedit', ridx, cidx, value);
			this.setState({ 
			ridx: ridx, 
			cidx: cidx,
			newvalue: value,
		});
	}
	
	render() {
		return makeBody(this.props.table, this.props.istrans, this.callBacks);
	}
}

