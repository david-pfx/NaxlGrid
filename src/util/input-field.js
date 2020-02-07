import React from 'react';
//import PropTypes from 'prop-types';
//import Datepicker from 'react-datepicker';

import Format from '../util/format';
import Form from 'react-bootstrap/Form';

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
		<Form.Control {...usualProps}
			{...props}
			type={type} 
			value={value || ''}
		/>;

	// construct select input field
	const inputSelect = (values, texts) => {
		//console.log('inputsel', values, texts);
		const option = (v,t) => 
			<option key={v} value={v}>
				{t}
			</option>;
		return (
			<Form.Control as="select" {...usualProps}
				value={value} >
				<option/>
				{values.map((v,x) => option(values[x]+'',texts[x]))}
			</Form.Control>
		)
	}

	// const inputSelect = () => {
	// 	const option = o => 
	// 		<option key={o.id} value={''+o.id}>
	// 			{o.text}
	// 		</option>;
	// 	return (
	// 		<Form.Control as="select" {...usualProps}
	// 			value={value} >
	// 			<option/>
	// 			{field.list.map(o => option(o))}
	// 		</Form.Control>
	// 	)
	// }

	// construct date input field
	const inputDate = () => inputTyped('date');
		// <React.Fragment>
		// 	<Datepicker {...usualProps}
		// 		selected={ value ? new Date(value) : null }
		// 	/>
		// </React.Fragment>;

  const inputters = {
		boolean: () => <input {...usualProps} type="checkbox" checked={value ? true : false} />,
		multiline: () => <textarea {...usualProps} value={Format.format(field, value)} />,
		lov: () => inputSelect(field.list.map(o => o.id), field.list.map(o => o.text)),
		list: () => inputSelect(field.list, field.list),
		// lov: () => inputSelect(),
		// list: () => inputSelect(),
		date: () => inputDate(),
		datetime: () => inputDate(),
		time: () => inputTyped('time'),
		integer: () => inputTyped('number', { step: 1 }),
		decimal: () => inputTyped('number'),
		money: () => inputTyped('number'),
		text: () => inputTyped('text'),
		email: () => inputTyped('email'),
		url: () => inputTyped('text'),
		file: () => inputTyped('file'),
	};

	return inputters[field.type] && inputters[field.type]();
}
