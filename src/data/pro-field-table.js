// template for table of fields

export default {
	tableid: '$field',
	label: 'Fields',
	title: '`Defined fields in table',
	description: 'A virtual table constructed to display the fields in a table.',
	icon: 'table.gif',
	system: true,
	fields: [
		{ fieldid: 'id', type: 'integer', label: 'Id', width: 10, },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'type', type: 'text', label: 'Type', },
		{ fieldid: 'fieldid', type: 'text', label: 'Field Id', },
		{ fieldid: 'width', type: 'integer', label: 'Width', },
	],
	rows: [],
}