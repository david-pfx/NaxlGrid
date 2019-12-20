// settings sheet, single row

export default {
  // heading information
  tableid: 'settings',
  label: 'Settings',
  title: 'Current settings',
  comment: 'This is a single row table of settings',

  // column information
  fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
    { fieldid: 'owner', type: 'text', label: 'Owner' },
    { fieldid: 'light', type: 'lov',  label: 'Light',  list: [
            { id: 1, text: 're  ' },
            { id: 2, text: 'amber' },
            { id: 3, text: 'green' },
        ]},
    { fieldid: 'factor',     type: 'decimal',  label: 'Ratio factor' },
    { fieldid: 'startdate',  type: 'date',     label: 'Start date' },
    { fieldid: 'deadline',   type: 'datetime', label: 'Deadline' },
  ],
  data: [{
    id: 1,
    owner: 'Fred Smith',
    light: 2,
    factor: 12345.6789,
    startdate: new Date(2019, 11, 11),
    deadline: new Date(2020, 11, 11, 23, 59, 59),
  }],
}



