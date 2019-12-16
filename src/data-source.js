// Wrapper for data sources

import comic_table from './data/comic-table';
import settings_table from './data/settings-table';

import album_table from './data/album-table';
import artist_table from './data/artist-table';
import track_table from './data/track-table';

import dataStore from './data-store';

////////////////////////////////////////////////////////////////////////////////
// exports

// get a list of sheets for home, or for a dataset
export function getSheetList(dsid) {
  if (!dsid) return [ 
    { kind: 'home', label: 'Home' },
    ...dataStore.dataset_all().map(d => ({ kind: 'dataset', id: d.id, dsid: d.id, label: d.label })),
  ];

  const tbs = id => dataStore.table_all(id).sort(t => t.id);
  const shs = id => dataStore.sheet_all(id);
  const ds = dataStore.dataset_get(dsid);
  return [
    { kind: 'home', label: 'Home' },
    { kind: 'dataset', id: dsid, dsid: dsid, label: ds.label },
    ...tbs(ds.id).map(t => ({ kind: 'table', dsid: dsid, id: t.id, label: t.label })),
    ...shs(ds.id).map(s => ({ kind: 'sheet', dsid: dsid, id: s.id, label: s.label })),
  ];
}

// get a list by selection from the list
export function getSheet({kind, id, dsid}) {
  //const {kind, id} = arg;
  console.log('getSheet', kind, id, dsid);
  const func = {
    'home': a => getSheetHome(),
    'dataset': a => getSheetDataset(dataStore.dataset_get(a)),
    'table': (a,b) => getSheetTable(dataStore.dataset_get(b), dataStore.table_get(b, a)),
    'sheet': (a,b) => dataStore.sheet_get(b, a), // BUG
  }[kind];
  return (func) ? func(id, dsid) : {};
}

export function doAction(action, payload) {
  if (action === 'NEW') {
    if (!payload.dsid) {
      dataStore.dataset_add(payload);
    } else {
      dataStore.table_add(payload);
    }
  } else alert(`action: ${action}, payload: ${JSON.stringify(payload)}`);
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
  add_shs('novels', [getSheetPair(dataStore.dataset_get('novels'), transposeTable(settings_table))]);

  add_dss([{
    id: 'music', label: 'Music', title: 'Music Collection', description: 'A collection of musical albums, with artist and track', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('music', connectTables([ album_table, artist_table, track_table ]));

  //console.log('datasets', dataStore.dataset_get());
  //console.log('tables', dataStore.table_get());
  //console.log('sheets', dataStore.sheet_get());
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// datasets table
function getTableDatasets() {
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
    data: dataStore.dataset_all(), // TODO: get tables
  }
}

// table of tables
function getTableTables(ds) {
  return {
    id: 'table',
    label: 'Tables',
    title: `Available tables in dataset ${ds.label}`,
    icon: 'table.gif',
    fields: [
      { id: 'id', type: 'text', label: 'Id', width: 10, },
      { id: 'label', type: 'text', label: 'Label', },
      { id: 'title', type: 'text', label: 'Title', },
      { id: 'icon', type: 'image', label: 'Icon', },
      { id: 'fields', type: 'array', label: 'Fields', },
      { id: 'data', type: 'array', label: 'Rows', },
    ],
    data: dataStore.table_all(ds.id),
  }
}

////////////////////////////////////////////////////////////////////////////////
// sheets

// the default start sheet
function getSheetHome() {
  const table = getTableDatasets();
  return {
    dsid: null,
    label: 'Home',
    title: 'Home',
    blocks: [
      { kind: 'note', title: 'No dataset loaded.', notes: [ 'Please select a dataset from the list.' ] },
      { kind: 'table', title: table.title, table: table, },
    ],
  }
}

// construct a sheet for the whole dataset
function getSheetDataset(ds) {
  const table = getTableTables(ds);
  return {
    dsid: ds.id,
    label: ds.label,
    title: ds.title,
    blocks: [
      { kind: 'note', title: ds.description, notes: ds.notes },
      { kind: 'table', title: table.title, table: table, },
    ],
  }
}

// construct a sheet for a single table
function getSheetTable(ds, table) {
  return {
    dsid: ds.id,
    label: table.label,
    title: table.title,
    blocks: [
      { kind: table.transpose ? 'tuple' : 'table', title: table.title, table: table },
  ]}
}

// construct a sheet pair for a single table
function getSheetPair(ds, table) {
  return {
    dsid: ds.id,
    label: table.label + ' x2',
    title: table.title,
    blocks: [
      { kind: 'table', title: 'Regular table', table: table },
      { kind: 'tuple', title: 'Transposed table', table: table },
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
