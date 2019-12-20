// template for table of datasets

export default {
	tableid: 'home',
	label: 'Home',
	title: 'Available datasets',
	icon: 'table.gif',
	fields: [
		{ fieldid: 'id', type: 'text', label: 'Id', width: 10, },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'title', type: 'text', label: 'Title', },
		{ fieldid: 'description', type: 'text', label: 'Description', },
		{ fieldid: 'notes', type: 'array', label: 'Notes', },
		{ fieldid: 'tables', type: 'array', label: 'Tables', },
	],
	data: [],
}