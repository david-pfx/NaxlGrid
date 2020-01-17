// Wrapper for data sources

//import * as assert from 'assert-plus';
//import { strict as assert } from 'assert';
//import assert from 'assert';

import table_table from './table-table';
import dataset_table from './dataset-table';
import test_table from '../sample/test-table';
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
    ...dataStore.dataset_all().map(d => ({ 
      kind: 'dataset', dsid: d.datasetid, label: d.label 
    })),
  ];

  const tbs = id => dataStore.table_all(id).sort(t => t.id);
  const shs = id => dataStore.sheet_all(id);
  const ds = dataStore.dataset_get(dsid);
  return [
    { kind: 'home', label: 'Home' },
    { kind: 'dataset', dsid: dsid, label: ds.label },
    ...tbs(dsid).map(t => ({ kind: 'table', dsid: dsid, tableid: t.tableid, label: t.label })),
    ...shs(dsid).map(s => ({ kind: 'sheet', dsid: dsid, sheetid: s.id, label: s.label })),
  ];
}

// get a list by selection from the list
export function getSheet(args) {
  //console.log('getSheet', kind, id, dsid);
  const func = {
    'home': () => getSheetHome(),
    'dataset': () => getSheetDataset(dataStore.dataset_get(args.dsid)),
    'table': () => getSheetTable(dataStore.dataset_get(args.dsid), getConnectedTable(args.dsid, args.tableid)),
    'sheet': () => dataStore.sheet_get(args.dsid, args.sheetid), // BUG: table may be stale
  }[args.kind];
  return (func) ? func() : {};
}

// available actions
export function doAction(action, payload) {
  console.log(`do action: ${action}, payload: ${JSON.stringify(payload)}`);
  if (action === 'NEW') {
    if (payload.tableid)
      return doNewTable(payload);
    if (payload.sheet)
      return doNewSheet(payload);
  } else if (action === 'PUT') {
    if (payload.tableid === '$dataset')
      return dataStore.dataset_put(payload.newrow);
    if (payload.tableid === '$table')
      return dataStore.table_put(payload.datasetid, payload.newrow);
    return dataStore.row_put(payload.datasetid, payload.tableid, payload.newrow);
  }
  alert('oops');
}

function doNewTable({ datasetid, tableid }) {
  if (tableid === '$dataset') {
    dataStore.dataset_put({
      datasetid: 'new-dataset', 
      label: '<new-dataset>', 
      title: 'New Dataset', 
      description: '', 
      notes: [],
    });
  } else if (tableid === '$table') {
    //assert.ok(dsid);
    dataStore.table_put(datasetid, {
      tableid: 'new-table',
      label: '<new-table>',
      title: 'New Table',
      icon: 'table.gif',
      fields: [
        { fieldid: "id", type: "integer", label: "Id", },
        { fieldid: "field1", type: "text", label: "Field 1", },
        { fieldid: "field2", type: "text", label: "Field 2", },
      ],
      rows: [],
    });
  } else {
    //assert.ok(dsid);
    //assert.ok(tableid);
    const table = dataStore.table_get(datasetid, tableid);
    const newrow = table.fields.reduce((acc, f) => ({ ...acc, [f.id]: '' }), {});
    console.log('table', table, 'newrow', newrow);
    dataStore.row_put(datasetid, tableid, newrow);
  } 
}

function doNewSheet({ dsid }) {
  dataStore.sheet_put(dsid, {
    sheetid: 'new-sheet',
    label: '<new-sheet>',
    title: 'New Sheet',
    blocks: [],
  });
}

////////////////////////////////////////////////////////////////////////////////

// set up all initial data
function addAll() {
  const add_dss = (dss) => dss.forEach(ds => dataStore.dataset_put(ds));
  const add_tbs = (id, tbs) => tbs.forEach(tb => dataStore.table_put(id, tb));
  const add_shs = (id, shs) => shs.forEach(sh => dataStore.sheet_put(id, sh));

  add_dss([{
    datasetid: 'tests', label: 'Test', title: 'Test data', description: 'A collection of test data to exercise lots of stuff', 
    notes: [ 'This is test data contributed to Evolutility.' ],
  }]);
  add_tbs('tests', [ test_table, transposeTable(settings_table) ]);
  add_shs('tests', [getSheetPair(dataStore.dataset_get('tests'), transposeTable(settings_table))]);

  add_dss([{
    datasetid: 'novels', label: 'Novels', title: 'Comic Novels', description: 'Records and notes on a collection of comic novels', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('novels', [comic_table]);

  add_dss([{
    datasetid: 'music', label: 'Music', title: 'Music Collection', description: 'A collection of musical albums, with artist and track', 
    notes: [ 'This is test data from Evolutility, hence the large number of French language titles.' ],
  }]);
  add_tbs('music', [ album_table, artist_table, track_table ]);

  return true;
}

////////////////////////////////////////////////////////////////////////////////
// table of datasets
function getTableDatasets() {
  return { 
    ...dataset_table,
    rows: dataStore.dataset_all().map(d => ({
      ...d,
      tables: dataStore.table_all(d.datasetid),
    })),
  }
}

// table of tables
function getTableTables(ds) {
  return {
    ...table_table,
    title: `Available tables in dataset ${ds.label}`,
    rows: dataStore.table_all(ds.datasetid),
  }
}

////////////////////////////////////////////////////////////////////////////////
// sheets

// the default start sheet
function getSheetHome() {
  const table = getTableDatasets();
  return {
    sheetid: 'home',
    label: 'Home',
    title: 'Home',
    blocks: [
      { kind: 'note', title: 'No dataset selected.', notes: [ 'Please select a dataset from the list.' ] },
      { kind: 'table', title: table.title, table: table, },
    ],
  }
}

// construct a sheet for the whole dataset
function getSheetDataset(ds) {
  const table = getTableTables(ds);
  return {
    sheetid: ds.datasetid,
    dsid: ds.datasetid,
    label: ds.label,
    title: ds.title,
    blocks: [
      { kind: 'note', title: ds.description, notes: ds.notes },
      { kind: 'table', title: table.title, table: table, },
    ],
  }
}

// construct a table sheet for a single table
function getSheetTable(ds, table) {
  return {
    sheetid: table.tableid,
    dsid: ds.id,
    label: table.label,
    title: table.title,
    blocks: [
      { kind: table.transpose ? 'trans' : 'table', title: table.title, table: table },
  ]}
}

// construct a sheet pair for a single table
function getSheetPair(ds, table) {
  return {
    sheetid: table.tableid,
    dsid: ds.id,
    label: table.label + ' x2',
    title: table.title,
    blocks: [
      { kind: 'table', title: 'Regular table', table: table },
      { kind: 'trans', title: 'Transposed table', table: table },
  ]}
}

////////////////////////////////////////////////////////////////////////////////

// set up connections between tables for lookups
function getConnectedTable(dsid, tbid) {
  const table = dataStore.table_get(dsid, tbid);
  table.fields.forEach(f => {
    if (f.type === 'lookup') {
      const [t1,t2] = f.target.split('.');
      const table = dataStore.table_get(dsid, t1);
      const field = table && table.fields.find(f => f.fieldid === t2);
      // if ok construct a pair of table data and relevant field
      if (table && field) {
        f.list = {
          rows: table.rows,
          field: field,
        }
        console.log('fixtables', f);
      }
    }
  });
  return table;
}

// add transpose fields to the table
function transposeTable(table) {
  // transpose fields: column name then one per row
  const tfields = [
    { fieldid: 'id', type: 'text', label: 'Name', },
      ...table.rows.map(d => ({ 
        fieldid: d.id + '', type: 'transpose', label: d.id + '' 
      })),
    ];

  // transpose data: one row per column
  const tdata = table.fields.slice(1).map(f => {
    return table.rows.reduce((acc, d) => {
      acc[d.id] = d[f.fieldid];
      return acc;
    }, { id: f.label });
  });
  
  return { ...table, transpose: true, tfields: tfields, tdata: tdata };
}
