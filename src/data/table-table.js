// template for table of tables

export default {
	tableid: 'table',
	label: 'Tables',
	title: `Available tables in dataset`,
	icon: 'table.gif',
	fields: [
		{ fieldid: 'id', type: 'integer', label: 'Id', width: 10, },
		{ fieldid: 'tableid', type: 'text', label: 'Table Id', },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'title', type: 'text', label: 'Title', },
		{ fieldid: 'icon', type: 'image', label: 'Icon', },
		{ fieldid: 'fields', type: 'array', label: 'Fields', },
		{ fieldid: 'data', type: 'array', label: 'Rows', },
	],
	data: [],
}