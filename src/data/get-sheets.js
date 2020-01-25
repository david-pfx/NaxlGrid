// get various sheets

import * as Data from './data-source';
import dataStore from './data-store';

////////////////////////////////////////////////////////////////////////////////
// exports
// get a list of sheets for home, or for a dataset
export function getSheetList(dsid) {
  //assert.ok(dsid);
  if (dsid == '$home')
    return [
      { kind: 'home', label: 'Home', dsid: '$home' },
      ...dataStore.dataset_all().map(d => ({
        kind: 'dataset', label: d.label, dsid: d.datasetid,
      })),
    ];
  const tbs = id => dataStore.table_all(id).sort(t => t.label);
  const shs = id => dataStore.sheet_all(id);
  const ds = dataStore.dataset_get(dsid);
  return [
    { kind: 'home', label: 'Home', dsid: '$home' },
    { kind: 'dataset', label: ds.label, dsid: dsid, },
    ...tbs(dsid).map(t => ({ kind: 'table', label: t.label, dsid: dsid, tableid: t.tableid, })),
    ...shs(dsid).map(s => ({ kind: 'sheet', label: s.label, dsid: dsid, sheetid: s.id, })),
  ];
}

// get a list by selection from the list
export function getSheet(args) {
  //console.log('getSheet', kind, id, dsid);
  const func = {
    'home': () => getSheetHome(),
    'dataset': () => getSheetDataset(dataStore.dataset_get(args.dsid)),
    'table': () => getSheetTable(dataStore.dataset_get(args.dsid), Data.getConnectedTable(args.dsid, args.tableid)),
    'field': () => getSheetTableField(dataStore.dataset_get(args.dsid), Data.getConnectedTable(args.dsid, args.tableid)),
    'sheet': () => dataStore.sheet_get(args.dsid, args.sheetid),
  }[args.kind];
  return (func) ? func() : {};
}

////////////////////////////////////////////////////////////////////////////////
// sheets
// the default start sheet
export function getSheetHome() {
  const table = Data.getTableDatasets();
  return {
    sheetid: 'home',
    label: 'Home',
    kind: 'home',
    title: 'Home',
    blocks: [
      { kind: 'note', title: 'No dataset selected.', notes: ['Please select a dataset from the list.'] },
      { kind: 'table', title: table.title, table: table, },
    ],
  };
}

// construct a sheet for the whole dataset
export function getSheetDataset(ds) {
  const table = Data.getTableTables(ds);
  return {
    sheetid: ds.datasetid,
    dsid: ds.datasetid,
    label: ds.label,
    kind: 'dataset',
    title: ds.title,
    blocks: [
      { kind: 'note', title: ds.description, notes: ds.notes },
      { kind: 'table', title: table.title, table: table, },
    ],
  };
}

// construct a table sheet for a single table
export function getSheetTable(ds, table) {
  return {
    sheetid: table.tableid,
    dsid: ds.id,
    label: table.label,
    kind: 'table',
    title: table.title,
    blocks: [
      { kind: table.transpose ? 'trans' : 'table', title: table.description, table: table },
    ]
  };
}

// construct a sheet pair for a single table
export function getSheetPair(ds, table) {
  return {
    sheetid: table.tableid,
    dsid: ds.id,
    label: table.label + ' x2',
    kind: 'pair',
    title: table.title,
    blocks: [
      { kind: 'table', title: 'Regular table', table: table },
      { kind: 'trans', title: 'Transposed table', table: table },
    ]
  };
}

// construct a field sheet for a single table
export function getSheetTableField(ds, table) {
  var st = getSheetTable(ds,table);
  var tf = Data.getTableFields(ds,table);
  return { 
    ...st,
    kind: 'field',
    blocks: [
      { kind: 'table', title: st.title, table: tf },
      ...st.blocks,
    ],
  };
}
