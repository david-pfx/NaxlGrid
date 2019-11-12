// comics sheet definition

import comic_defs from './comic-defs';
import comic_data from './comic-data';

var comic_tuple = [
    {
        id: 'options', 
        type: 'string', 
        label: 'Options', 
        value: "on off something nothing",
    },{
        id: 'factor', 
        type: 'number', 
        label: 'Ratio factor', 
        value: 12345.6789,
    },{
        id: 'start-date', 
        type: 'date', 
        label: 'Start date', 
        value: new Date(2019, 11, 11),
    },{
        id: 'end-date', 
        type: 'date', 
        label: 'End date', 
        value: new Date(2020, 11, 11),
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
        value: comic_tuple,
    },{
        type: 'blank'
    },{
        id: 'data',
        type: 'table', 
        defs: comic_defs,
        data: comic_data,
    }
]
