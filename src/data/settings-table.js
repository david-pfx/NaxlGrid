// settings sheet, single row

export default {
  // heading information
  id: 'settings',
  label: 'Settings',
  comment: 'This is a single row table of settings',

  // column information
  fields: [
  { id: 'owner', type: 'text', label: 'Owner' },
  { id: 'light', type: 'lov',  label: 'Light',  list: [
          { id: 1, text: 're  ' },
          { id: 2, text: 'amber' },
          { id: 3, text: 'green' },
      ]},
  { id: 'factor',     type: 'decimal',  label: 'Ratio factor' },
  { id: 'startdate',  type: 'date',     label: 'Start date' },
  { id: 'deadline',   type: 'datetime', label: 'Deadline' },
  ],
  data: [{
    owner: 'Fred Smith',
    light: 2,
    factor: 12345.6789,
    startdate: new Date(2019, 11, 11),
    deadline: new Date(2020, 11, 11, 23, 59, 59),
  }],
}



