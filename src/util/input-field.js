import React from 'react';
//import PropTypes from 'prop-types';
//import Datepicker from 'react-datepicker';

import Format from '../util/format';

// construct input field, given data and callback
// or just return true if an editable field
export default function(field, data, cbs) {

	const usualProps = {
    id: field.id,
    key: field.id,
		autoFocus: true,
		onChange: cbs && cbs.onchange,
		onKeyPress: cbs && cbs.onkeypress,
	}
	
	// construct a simple typed input field
	const inputTyped = (type, props) => 
		<input {...usualProps}
			{...props}
			type={type} 
			value={data}
		/>;

	// construct select input field
	const inputSelect = () => {
		const option = o => 
			<option key={o.id} value={''+o.id}>
				{o.text}
			</option>;
		return (
			<select {...usualProps}
				value={data} >
				<option/>
				{field.list.map(o => option(o))}
			</select>
		)
	}

	// construct date input field
	const inputDate = () => inputTyped('date');
		// <React.Fragment>
		// 	<Datepicker {...usualProps}
		// 		selected={ data ? new Date(data) : null }
		// 	/>
		// </React.Fragment>;

  const inputSimple = {
		boolean: () => <input {...usualProps} type="checkbox" checked={data ? true : false} />,
		textmultiline: () => <textarea {...usualProps} value={Format.format(field, data)} />,
		lov: () => inputSelect(),
		list: () => inputSelect(),
		date: () => inputDate(),
		datetime: () => inputDate(),
		time: () => inputTyped('time'),
		integer: () => inputTyped('number', { step: 1 }),
		decimal: () => inputTyped('number', { step: 0.1 }),
		money: () => inputTyped('number', { step: 0.01 }),
		text: () => inputTyped('text'),
	};

	const f = inputSimple[field.type];
	return (data === null || data === undefined) ? !!f : f();
}
