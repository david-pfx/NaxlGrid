// template for table of datasets

export default {
	tableid: 'home',
	label: 'Home',
	title: 'Available datasets',
	icon: 'table.gif',
	fields: [
		{ fieldid: 'id', type: 'integer', label: 'Id', width: 10, },
		{ fieldid: 'datasetid', type: 'text', label: 'Dataset Id', },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'title', type: 'text', label: 'Title', },
		{ fieldid: 'description', type: 'text', label: 'Description', },
		{ fieldid: 'notes', type: 'array', label: 'Notes', },
		{ fieldid: 'tables', type: 'array', label: 'Tables', },
	],
	data: [],
}