// Wrapper for data sources

import assert from 'assert';

import dataset_table from './pro-dataset-table';
import table_table from './pro-table-table';
import field_table from './pro-field-table';

import dataset_data from '../sample/dataset-data';
import test_table from '../sample/test-table';
import comic_table from '../sample/comic-table';
import settings_table from '../sample/settings-table';
import album_table from '../sample/album-table';
import artist_table from '../sample/artist-table';
import track_table from '../sample/track-table';

import dataStore from './data-store';
import { getSheetPair } from './get-sheets';

export const setupStore = addAll();

// available actions
export function doAction(action, payload) {
  console.log('do action:', action, 'payload', payload);
  const fntable = {
    NEW$dataset: () => dataStore.dataset_put({
        datasetid: 'new-dataset', 
        label: '<new-dataset>', 
        title: 'New Dataset', 
        description: '', 
        notes: [],
      }),
    NEW$table: () => dataStore.table_put(payload.datasetid, {
      tableid: 'new-table',
      label: '<new-table>',
      title: 'New Table',
      icon: 'table.gif',
      fields: [
        { fieldid: "id", type: "integer", label: "Id", width: 10, },
        { fieldid: "field1", type: "text", label: "Field 1", },
        { fieldid: "field2", type: "text", label: "Field 2", },
      ],
      rows: [],
    }),
    NEW$sheet: () => dataStore.sheet_put(payload.datasetid, { 
        sheetid: 'new-sheet',
        label: '<new-sheet>',
        title: 'New Sheet',
        blocks: [],
      }),
    NEW$field: () => dataStore.field_put(payload.datasetid, payload.parentid, { 
        label: '<new-field>', 
        type: 'text' 
      }),
    NEW$row: () => dataStore.row_put(payload.datasetid, payload.tableid, { }),
    PUT$dataset: () => dataStore.dataset_put(payload.newrow),
    PUT$sheet: () => dataStore.sheet_put(payload.datasetid, payload.newrow),
    PUT$table: () => dataStore.table_put(payload.datasetid, payload.newrow),
    PUT$field: () => dataStore.field_put(payload.datasetid, payload.parentid, payload.newrow),
    PUT$row: () => dataStore.row_put(payload.datasetid, payload.tableid, payload.newrow),
  };
  const fn = fntable[action + payload.tableid] || fntable[action + '$row'];
  assert.ok(fn, `action: ${action} tableid: ${payload.tableid}`)
  return fn ? fn() : alert('oops');
}

////////////////////////////////////////////////////////////////////////////////

// set up all initial data
function addAll() {
  const add_dss = (dss) => dss.forEach(ds => dataStore.dataset_put(ds));
  const add_tbs = (id, tbs) => tbs.forEach(tb => dataStore.table_put(id, tb));
  const add_shs = (id, shs) => shs.forEach(sh => dataStore.sheet_put(id, sh));

  add_dss(dataset_data);

  add_tbs('tests', [ test_table, transposeTable(settings_table) ]);
  add_tbs('novels', [comic_table]);
  add_tbs('music', [ album_table, artist_table, track_table ]);
  
  add_shs('tests', [ getSheetPair(dataStore.dataset_get('tests'), transposeTable(settings_table)) ]);
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// table of datasets
export function getTableDatasets() {
  return { 
    ...dataset_table,
    rows: dataStore.dataset_all().map(d => ({
      ...d,
      tables: dataStore.table_all(d.datasetid),
    })),
  }
}

// table of tables
export function getTableTables(ds) {
  return {
    ...table_table,
    title: `Available tables in dataset ${ds.label}`,
    rows: dataStore.table_all(ds.datasetid),
  }
}

// table of tables
export function getTableFields(ds, table) {
  return {
    ...field_table,
    title: `Available fields in table ${table.label}`,
    parentid: table.tableid,
    rows: table.fields,
  };
}

////////////////////////////////////////////////////////////////////////////////

// set up connections between tables for lookups
export function getConnectedTable(dsid, tbid) {
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
