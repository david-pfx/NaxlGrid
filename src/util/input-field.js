import React from 'react';
//import PropTypes from 'prop-types';
//import Datepicker from 'react-datepicker';

import Format from '../util/format';

// construct input field, given data and callback
// or just return true if an editable field
export default function(field, value, cbs) {

	const usualProps = {
    id: field.id,
    key: field.id,
		autoFocus: true,
		onChange: cbs && cbs.onchange,
		onKeyPress: cbs && cbs.onkeypress,
	}
	
	// construct a simple typed input field
	// make sure value is defined so component is controlled
	const inputTyped = (type, props) => 
		<input {...usualProps}
			{...props}
			type={type} 
			value={value || ''}
		/>;

	// construct select input field
	const inputSelect = () => {
		const option = o => 
			<option key={o.id} value={''+o.id}>
				{o.text}
			</option>;
		return (
			<select {...usualProps}
				value={value} >
				<option/>
				{field.list.map(o => option(o))}
			</select>
		)
	}

	// construct date input field
	const inputDate = () => inputTyped('date');
		// <React.Fragment>
		// 	<Datepicker {...usualProps}
		// 		selected={ value ? new Date(value) : null }
		// 	/>
		// </React.Fragment>;

  const inputSimple = {
		boolean: () => <input {...usualProps} type="checkbox" checked={value ? true : false} />,
		textmultiline: () => <textarea {...usualProps} value={Format.format(field, value)} />,
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
	return f && f();
	//return (value === null || value === undefined) ? !!f : f();
}
