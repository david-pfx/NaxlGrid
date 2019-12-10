// Wrap data sources

import comic_table from './data/comic-table';
import settings_table from './data/settings-table';

import album_table from './data/album-table';
import artist_table from './data/artist-table';
import track_table from './data/track-table';
//import { get } from 'http';

////////////////////////////////////////////////////////////////////////////////
// exports

// get a list of sheets for this dataset
export function getSheetList(ds) {
  return (ds) ? [
    getSheetHome(),
    getSheetDataset(ds),
    ...ds.tables.map(t => getSheet(ds, t)),
    ...ds.sheets,
  ] : [
    getSheetHome(),
    ...home_table.data.map(d => getSheetDataset(d)),
  ]
}

////////////////////////////////////////////////////////////////////////////////

// the store is simply a list of data sets
let store = [];

export const setupStore = addAll();

function addDataSet(ds) {
  store.push(ds);
  if (!ds.tables) ds.tables = [];
  if (!ds.sheets) ds.sheets = [];
  return ds;
}

function addTable(ds, table) {
  ds.tables.push(table);
  return table;
}

function addSheet(ds, sheet) {
  ds.sheets.push(sheet);
  return sheet;
}

////////////////////////////////////////////////////////////////////////////////

// home table
const home_table = {
  id: 'home',
  label: 'Home',
  title: 'Available datasets',
  icon: 'table.gif',
  fields: [
    { id: 'id', type: 'text', label: 'Id', },
    { id: 'label', type: 'text', label: 'Label', },
    { id: 'title', type: 'text', label: 'Title', },
    { id: 'description', type: 'text', label: 'Description', },
    { id: 'notes', type: 'text', label: 'Notes', },
    { id: 'tables', type: 'text', label: 'Tables', },
  ],
  data: store,
}

////////////////////////////////////////////////////////////////////////////////

// set up all initial data
function addAll() {
  let cds = addDataSet({
    id: 'comics', label: 'Comics', title: 'Comic Novels', description: 'Records and notes on a collection of comic novels', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  });
  [transposeTable(settings_table), comic_table].forEach(table => {
    addTable(cds, table);
  });
  connectTables(cds.tables);

  let mds = addDataSet({
    id: 'music', label: 'Music', title: 'Music Collection', description: 'A collection of musical albums, with artist and track', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  });
  [ album_table, artist_table, track_table ].forEach(table => {
    addTable(mds, table);
  });
  connectTables(mds.tables);

  return true;
}

////////////////////////////////////////////////////////////////////////////////
// sheets

// the default start sheet
function getSheetHome() {
  return {
    //dataset: home_table,
    label: 'Home',
    title: 'Home',
    blocks: [
      { kind: 'note', title: 'No data sheet loaded.', notes: [ 'Please select a data sheet from the list.' ] },
      { kind: 'table', title: 'Available data sets.', table: home_table },
    ],
  }
}

// construct a sheet for the whole dataset
function getSheetDataset(ds) {
  return {
    dataset: ds,
    label: ds.label,
    title: ds.title,
    blocks: [
      { kind: 'note', title: ds.description, notes: ds.notes },
        ...ds.tables.map(t => ({ kind: t.transpose ? 'tuple' : 'table', title: t.title, table: t })) 
    ],
  }
}

// construct a sheet pair for a single table
function getSheetPair(ds, table) {
  return {
    dataset: ds,
    label: ds.label + ' x2',
    title: table.title,
    blocks: [
      { kind: 'table', title: 'Regular table', table: table },
      { kind: 'tuple', title: 'Transposed table', table: transposeTable(table) },
  ]}
}

// construct a sheet for a single table
function getSheet(ds, table) {
  return {
    dataset: ds,
    label: table.label,
    title: table.title,
    blocks: [
      { kind: table.transpose ? 'tuple' : 'table', title: table.title, table: table },
      //{ kind: 'table', title: 'Regular table', table: table },
  ]}
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

// add transpose fields to the table
function transposeTable(table) {
  // transpose fields: column name then one per row
  const tfields = [
    { id: 'id', type: 'text', label: 'Name', }
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
  
  return { ...table, transpose: true, tfields: tfields, tdata: tdata };
}
