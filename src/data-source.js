// Wrap data sources

import comic_table from './data/comic-table';
import settings_table from './data/settings-table';

import album_table from './data/album-table';
import artist_table from './data/artist-table';
import track_table from './data/track-table';

////////////////////////////////////////////////////////////////////////////////
// data structures

// the default start sheet
export const home_sheet = {
  label: 'Home',
  title: 'Home',
  blocks: [
    { kind: 'note', title: 'No data sheet loaded.', notes: [ 'Please select a data sheet from the list.' ] },
  ],
}

// comics 
const comic_dataset = {
  id: 'comics',
  label: 'Comics',
  title: 'Comic Novels',
  description: 'Records and notes on a collection of comic novels', 
  notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  tables: connectTables([ settings_table, comic_table ]),
}

// music
const music_dataset = {
  id: 'music',
  label: 'Music',
  title: 'Music Collection',
  description: 'A collection of musical albums, with artist and track', 
  notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  tables: connectTables([ album_table, artist_table, track_table ]),
}

// all initial sheets
const all_sheets = [
  { id: 'home', sheet: home_sheet },
  { id: 'comic', sheet: getSheetAll(comic_dataset) },
  { id: 'music', sheet: getSheetAll(music_dataset) },
  { id: 'music2', sheet: getSheetBoth(music_dataset, album_table) },
]

// construct a sheet for the whole dataset
function getSheetAll(ds) {
  return {
  dataset: ds,
  label: ds.label,
  title: ds.title,
  blocks: [
    { kind: 'note', title: ds.description, notes: ds.notes },
    { kind: 'table', title: 'The actual data tables', tables: ds.tables },
  ]}
}

// construct a sheet for a single table
function getSheetBoth(ds, table) {
  return {
  dataset: ds,
  label: ds.label + ' 2',
  title: table.label,
  blocks: [
    { kind: 'table', title: 'Regular table', tables: [ table ] },
    { kind: 'tuple', title: 'Transposed table', tables: [ transposeTable(table) ] },
  ]}
}

////////////////////////////////////////////////////////////////////////////////
// exports

// list of all sheets, suitable for menu access
export const allSheets = all_sheets.map(s => ({ id: s.id, label: s.sheet.label }));

// get a sheet by ID
export function getSheet(sheet, cb) {
  cb(all_sheets.find(s => s.id === sheet).sheet);
}

export function transposeTable(table) {
  // transpose fields: column name then one per row
  const tfields = [
    { id: "id", type: "text", label: "Name", }
  ].concat(table.data.map(d => (
    { id: d.id + '', type: 'transpose', label: d.id + '' }
  )));

  // transpose data: one row per column
  const tdata = table.fields.slice(1).map(f => {
    return table.data.reduce((acc, d) => {
      acc[d.id] = d[f.id];
      return acc;
    }, { id: f.label });
  });
  
  //console.log('transpose', tfields, tdata);
  return { ...table, tfields: tfields, tdata: tdata };
}

export function testData() {
  transposeTable(comic_table);
}

////////////////////////////////////////////////////////////////////////////////

// set up connections between tables for lookups
function connectTables(tables) {
  tables.forEach(t => {
    t.fields.forEach(f => {
      if (f.type === 'lookup') {
        const [t1,t2] = f.target.split('.');
        const table = tables.find(t => t.id === t1);
        const field = table && table.fields.find(f => f.id === t2);
        // if ok construct a pair of table data and relevant field
        if (table && field) {
          f.list = {
            data: table.data,
            field: field,
          }
          console.log('fixtables', f);
        }
      }
    });
  });
  return tables;
}

//const all_datasets = [ comic_dataset, music_dataset ];

// export function findTable(ds, idvalue) {
//   return ds.tables.find(t => t.id === idvalue);
// }

// export function findRow(table, idvalue) {
//   return table.find(row => row.id === idvalue);
// }

// export function findField(table, idvalue) {
//   return table.fields.find(f => f.id === idvalue);
// }

