// comics sheet definition

import comic_defs from './comic-defs';
import comic_data from './comic-data';

var comic_tuple = [
    {
        key: 'owner', 
        label: 'Owner', 
        type: 'text', 
        value: 'Fred Smith',
    },{
        key: 'light', 
        type: 'lov', 
        label: 'Light', 
        list: [
            { id: 1, text: 'red' },
            { id: 2, text: 'amber' },
            { id: 3, text: 'green' },
        ],
        value: 2,
    },{
        key: 'factor', 
        type: 'decimal', 
        label: 'Ratio factor', 
        value: 12345.6789,
    },{
        key: 'start-date', 
        type: 'date', 
        label: 'Start date', 
        value: new Date(2019, 11, 11),
    },{
        key: 'deadline', 
        type: 'datetime', 
        label: 'Deadline', 
        value: new Date(2020, 11, 11, 23, 59, 59),
    },
]

// a sheet is a list of named value blocks: scalars, tuples and tables
export default [
    {
        id: 'title', 
        type: 'scalar', 
        value: 'Comic Novels',
    },{
        id: 'subtitle', 
        type: 'scalar', 
        value: 'Information about a collection of comic novels',
    },{
        type: 'blank'
    },{
        id: 'settings', 
        type: 'tuple', 
        rows: comic_tuple,
    },{
        type: 'blank'
    },{
        id: 'data',
        type: 'table', 
        defs: comic_defs,
        rows: comic_data,
        //rows: comic_data.map(row=>({ ...row, pix: getpix(row.pix) })),
    }
]
