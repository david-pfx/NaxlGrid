// template for table of tables

export default {
	tableid: '$table',
	label: 'Tables',
	title: '`Available tables in dataset',
	description: 'A virtual table constructed to display the tables in a dataset.',
	icon: 'table.gif',
	system: true,
	fields: [
		{ fieldid: 'id', type: 'integer', label: 'Id', width: 10, },
		{ fieldid: 'tableid', type: 'text', label: 'Table Id', },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'title', type: 'text', label: 'Title', },
		{ fieldid: 'icon', type: 'image', label: 'Icon', },
		{ fieldid: 'description', type: 'multiline', label: 'Description', },
		{ fieldid: 'fields', type: 'array', label: 'Fields', },
		{ fieldid: 'rows', type: 'array', label: 'Rows', },
	],
	rows: [],
}