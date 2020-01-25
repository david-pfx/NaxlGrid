// template for table of datasets

export default {
	tableid: '$dataset',
	label: 'Home',
	title: 'Available datasets',
	description: 'A virtual table constructed to display the available datasets.',
	icon: 'table.gif',
	system: true,
	fields: [
		{ fieldid: 'id', type: 'integer', label: 'Id', width: 10, },
		{ fieldid: 'datasetid', type: 'text', label: 'Dataset Id', },
		{ fieldid: 'label', type: 'text', label: 'Label', },
		{ fieldid: 'title', type: 'text', label: 'Title', },
		{ fieldid: 'description', type: 'textmultiline', label: 'Description', },
		{ fieldid: 'notes', type: 'array', label: 'Notes', },
		{ fieldid: 'tables', type: 'array', label: 'Tables', },
	],
	rows: [],
}