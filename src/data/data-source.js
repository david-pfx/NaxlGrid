// Wrapper for data sources

//import * as assert from 'assert-plus';
//import { strict as assert } from 'assert';
//import assert from 'assert';
import comic_table from '../sample/comic-table';
import settings_table from '../sample/settings-table';

import album_table from '../sample/album-table';
import artist_table from '../sample/artist-table';
import track_table from '../sample/track-table';

import dataStore from './data-store';

//require('./assert');

export const setupStore = addAll();

////////////////////////////////////////////////////////////////////////////////
// exports

// get a list of sheets for home, or for a dataset
export function getSheetList(dsid) {
  //assert.ok(dsid);
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
export function getSheet({ kind, id, dsid }) {
  //console.log('getSheet', kind, id, dsid);
  const func = {
    'home': () => getSheetHome(),
    'dataset': () => getSheetDataset(dataStore.dataset_get(dsid)),
    'table': () => getSheetTable(dataStore.dataset_get(dsid), getConnectedTable(dsid, id)),
    'sheet': () => dataStore.sheet_get(dsid, id), // BUG: table may be stale
  }[kind];
  return (func) ? func() : {};
}

// available actions
export function doAction(action, payload) {
  console.log('do action', action, payload);
  if (action === 'NEW') {
    if (payload.tableid)
      return doNewTable(payload);
    if (payload.sheet)
      return doNewSheet(payload);
    alert(`action: ${action}, payload: ${JSON.stringify(payload)}`);
  }
}

function doNewTable({ dsid, tableid }) {
  if (tableid === 'home') {
    dataStore.dataset_add({
      label: '<new-dataset>', 
      title: 'New Dataset', 
      description: '', 
      notes: [],
    });
  } else if (tableid === 'table') {
    //assert.ok(dsid);
    dataStore.table_add(dsid, {
      label: '<new-table>',
      title: 'New Table',
      icon: 'table.gif',
      fields: [
        { id: "id", type: "integer", label: "Id", },
        { id: "field1", type: "text", label: "Field 1", },
        { id: "field2", type: "text", label: "Field 2", },
      ],
      data: [],
    });
  } else {
    //assert.ok(dsid);
    //assert.ok(tableid);
    const table = dataStore.table_get(dsid, tableid);
    const newrow = table.fields.reduce((acc, f) => ({ ...acc, [f.id]: '' }), {});
    console.log('table', table, 'newrow', newrow);
    dataStore.table_add(dsid, tableid, newrow);
  } 
}

function doNewSheet({ dsid }) {
  dataStore.sheet_add(dsid, {
    label: '<new-sheet>',
    title: 'New Sheet',
    blocks: [],
  });
}

////////////////////////////////////////////////////////////////////////////////

// set up all initial data
function addAll() {
  const add_dss = (dss) => dss.forEach(ds => dataStore.dataset_add(ds));
  const add_tbs = (id, tbs) => tbs.forEach(tb => dataStore.table_add(id, tb));
  const add_shs = (id, shs) => shs.forEach(sh => dataStore.sheet_add(id, sh));

  add_dss([{
    id: 'novels', label: 'Novels', title: 'Comic Novels', description: 'Records and notes on a collection of comic novels', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('novels', [transposeTable(settings_table), comic_table]);
  add_shs('novels', [getSheetPair(dataStore.dataset_get('novels'), transposeTable(settings_table))]);

  add_dss([{
    id: 'music', label: 'Music', title: 'Music Collection', description: 'A collection of musical albums, with artist and track', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('music', [ album_table, artist_table, track_table ]);

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
function getConnectedTable(dsid, tableid) {
  const table = dataStore.table_get(dsid, tableid);
  table.fields.forEach(f => {
    if (f.type === 'lookup') {
      const [t1,t2] = f.target.split('.');
      const table = dataStore.table_get(dsid, t1);
      const field = table && table.fields.find(f => f.id === t2);
      // if ok construct a pair of table data and relevant field
      if (table && field) {
        f.list = {
          data: table.data,
          field: field,
        }
        //console.log('fixtables', f);
      }
    }
  });
  return table;
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
