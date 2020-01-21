// settings sheet, single row

export default {
  // heading information
  tableid: 'settings',
  label: 'Settings',
  title: 'Current settings',
  icon: 'test/settings.jpg',
  description: 'A single row table of settings, can usefully be transposed',

  // column information
  fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
    { fieldid: 'owner', type: 'text', label: 'Owner' },
    { fieldid: 'light', type: 'lov',  label: 'Light',  list: [
            { id: 1, text: 'red ' },
            { id: 2, text: 'amber' },
            { id: 3, text: 'green' },
        ]},
    { fieldid: 'factor',     type: 'decimal',  label: 'Ratio factor' },
    { fieldid: 'price',      type: 'money',  label: 'Price of goods' },
    { fieldid: 'startdate',  type: 'date',     label: 'Start date' },
    { fieldid: 'deadline',   type: 'datetime', label: 'Deadline' },
  ],
  rows: [{
    id: 1,
    owner: 'Fred Smith',
    light: 2,
    factor: 12345.678,
    price: 9876.54,
    startdate: new Date(2019, 11, 31),
    deadline: new Date(2020, 11, 31, 23, 59, 59),
  }],
}



