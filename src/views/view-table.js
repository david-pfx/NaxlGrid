// display block as table 

import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
//import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
//import { faCheckSquare, faFilter, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

import Format from '../util/format';

//import './view-table.scss' 

// get normal column info
function getColumns(table) {
	return table.fields.map((f, colx) => ({
		id: colx,
		text: colx > 0 && f.label,
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
			textAlign: 'center',
		} : {
			textAlign: Format.textAlign(f.type),
		},
		formatter: value => Format.format(f, value),
		inputter: colx > 0 && Format.input(f) && ((value,ridx,cbs) => Format.input(f, value, cbs)),
		validate: value => Format.validate(f.type, value),
		sort: 'none',
		filter: 'none',
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
				textAlign: 'center',
			} : {
				textAlign: 'left',
			},
		formatter: (cell, ridx) => (colx === 0) ? cell
			:	Format.format(table.fields[ridx+1], cell),
		//inputter: (cell,ridx,cbs) => colx > 0 && Format.input(table.fields[ridx+1]) && Format.input(table.fields[ridx+1], cell, cbs),
	}));
}

// construct a single table cell for input
function makeCellInput(row, column, ridx, cbs) {
	// handlers
	const onchange = (e) => {
		cbs.setedit(ridx, column.id, column.validate(e.target.value));
	}
	const onblur = (e) => {
		cbs.saveitem();
	}
	const onkeydown = (e) => {
		if (e.key === 'Escape') cbs.setedit();
	}
	
	// format for input as  controlled component
	const contents = column.inputter(cbs.getnewvalue(), ridx, { 
		onchange: onchange,
	});

	return <td key={column.id} 
		onBlur={onblur}
		onKeyDown={onkeydown}
		style={column.style} >
		{contents}
	</td>
}

// construct a single table cell for display
function makeCell(row, column, ridx, cbs) {
	if (column.inputter && cbs.isedit(ridx, column.id))
		return makeCellInput(row, column, ridx, cbs);

	const value = row[column.dataField];

	// handlers
	const onclick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		cbs.setedit(ridx, column.id, value);
	}
	const contents = column.formatter(value, ridx);

	return <td key={column.id} 
			style={column.style} 
			onClick={onclick} >
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

// construct a table header
function makeHeader(columns) {
	//const sorticon = s => s ==='up' ? faSortUp : s === 'down' ? faSortDown : faSort;
	const menu = c => <FaIcon icon={faEllipsisV} style={{ fontWeight: '100', color: 'gray', float: 'left' }}/>;
	const sort = c => <FaIcon icon={faSort} style={{ fontWeight: '100', color: 'gray', float: 'right' }}/>;
	const filter = c => <FaIcon icon={faFilter} style={{ fontWeight: '100', color: 'gray', float: 'right' }}/>;
	return (
		<tr>
			{columns.map((c,x) =>
				<th id={x} key={x} style={c.headerStyle} onClick={() => {}} >
					{menu(c)}
					{c.text}
					{c.sort && sort(c)}
					{c.filter && filter(c)}
				</th>
			)}
		</tr>
	)
}

// return a table body
function makeBody(table, istrans, cbs) {
	const style = {
		tableLayout: 'fixed',
	};
	const columns = (istrans) ?  getColumnsTrans(table) : getColumns(table);
	const rows = (istrans) ? table.tdata : table.rows;
	const onsubmit = (e) => { 
		e.preventDefault();
		cbs.saveitem();
	}

	return (
		<Form onSubmit={onsubmit}>
			<Table striped bordered hover responsive size="sm"
				style={style} 
				>
				<thead>
					{makeHeader(columns)}
				</thead>
				<tbody>
					{rows.map((r,x) => makeRow(r, columns, x, cbs)) }
				</tbody>
			</Table>
		</Form>
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
		saveitem: (e) => {
			this.saveitem();
		},	
		getnewvalue: () => this.state.newvalue,
	}

	setEdit(ridx, cidx, value) {
			//console.log('setedit', ridx, cidx, value);
			this.setState({ 
			ridx: ridx, 
			cidx: cidx,
			newvalue: value,
		});
	}
	
	saveitem() {
		const table = this.props.table;
		const row = table.rows[this.state.ridx];
		const field = table.fields[this.state.cidx];
		console.log('saveitem', table, row, field);
		this.props.cbUpdate(row, field.fieldid, this.state.newvalue);
		this.setEdit();
	}

	render() {
		return makeBody(this.props.table, this.props.istrans, this.callBacks);
	}
}

