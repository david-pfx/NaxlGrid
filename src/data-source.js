// Wrapper for data sources

import comic_table from './data/comic-table';
import settings_table from './data/settings-table';

import album_table from './data/album-table';
import artist_table from './data/artist-table';
import track_table from './data/track-table';

import dataStore from './data-store';

////////////////////////////////////////////////////////////////////////////////
// exports

// get a list of sheets for this dataset
export function getSheetList(ds) {
  if (!ds) return [ 
    getSheetHome(),
    //...dataStore.dataset_get().map(ds => getSheetDataset(ds)),
    ...dataStore.dataset_get().map(ds => getSheetDataset(ds, dataStore.table_get(ds.id))),
  ];

  const tbs = dataStore.table_get(ds.id).sort(t => t.id);
  const shs = dataStore.sheet_get(ds.id);
  console.log('dsid', ds.id, 'ds', ds,'tbs', tbs, 'shs', shs);
  return [
    getSheetHome(),
    getSheetDataset(ds, tbs),
    ...tbs.map(t => getSheet(ds, t)),
    ...shs,
  ];
}

////////////////////////////////////////////////////////////////////////////////

// the store is simply a list of data sets
//let store = [];

export const setupStore = addAll();

////////////////////////////////////////////////////////////////////////////////

// set up all initial data
function addAll() {
  const add_dss = (dss) => dss.forEach(ds => dataStore.dataset_add(ds));
  const add_tbs = (id, tbs) => tbs.forEach(tb => dataStore.table_add({ ...tb, datasetid: id }));
  const add_shs = (id, shs) => shs.forEach(sh => dataStore.sheet_add({ ...sh, datasetid: id }));

  add_dss([{
    id: 'novels', label: 'Novels', title: 'Comic Novels', description: 'Records and notes on a collection of comic novels', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('novels', connectTables([transposeTable(settings_table), comic_table]));
  add_shs('novels', [getSheetPair(dataStore.dataset_get('novels'), settings_table)]);

  add_dss([{
    id: 'music', label: 'Music', title: 'Music Collection', description: 'A collection of musical albums, with artist and track', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('music', connectTables([ album_table, artist_table, track_table ]));

  console.log('datasets', dataStore.dataset_get());
  console.log('tables', dataStore.table_get());
  console.log('sheets', dataStore.sheet_get());
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// home table
function getTableHome() {
  return {
    id: 'home',
    label: 'Home',
    title: 'Available datasets',
    icon: 'table.gif',
    fields: [
      { id: 'id', type: 'text', label: 'Id', width: 10, },
      { id: 'label', type: 'text', label: 'Label', },
      { id: 'title', type: 'text', label: 'Title', },
      { id: 'description', type: 'text', label: 'Description', },
      { id: 'notes', type: 'array', label: 'Notes', },
      { id: 'tables', type: 'array', label: 'Tables', },
    ],
    data: dataStore.dataset_get(),
  }
}

////////////////////////////////////////////////////////////////////////////////
// sheets

// the default start sheet
function getSheetHome() {
  return {
    dataset: null,
    label: 'Home',
    title: 'Home',
    blocks: [
      { kind: 'note', title: 'No dataset loaded.', notes: [ 'Please select a dataset from the list.' ] },
      { kind: 'table', title: 'Available data sets.', table: getTableHome() },
    ],
  }
}

// construct a sheet for the whole dataset
function getSheetDataset(ds, tables = []) {
  return {
    dataset: ds,
    label: ds.label,
    title: ds.title,
    blocks: [
      { kind: 'note', title: ds.description, notes: ds.notes },
        ...tables.map(t => ({ kind: t.transpose ? 'tuple' : 'table', title: t.title, table: t })) 
    ],
  }
}

// construct a sheet pair for a single table
function getSheetPair(ds, table) {
  return {
    dataset: ds,
    label: table.label + ' x2',
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
