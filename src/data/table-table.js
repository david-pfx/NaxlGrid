// template for table of tables

export default {
	tableid: 'table',
	label: 'Tables',
	title: `Available tables in dataset`,
	icon: 'table.gif',
	fields: [
		{ fieldid: 'id', type: 'text', label: 'Id', width: 10, },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'title', type: 'text', label: 'Title', },
		{ fieldid: 'icon', type: 'image', label: 'Icon', },
		{ fieldid: 'fields', type: 'array', label: 'Fields', },
		{ fieldid: 'data', type: 'array', label: 'Rows', },
	],
	data: [],
}