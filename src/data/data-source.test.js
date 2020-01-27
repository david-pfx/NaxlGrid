// unit tests for data store

import * as Data from './data-source';
import * as Sheets from "../data/get-sheets";
import dataStore from './data-store';
//import { exportAllDeclaration } from '@babel/types';

describe('get alls', () => {
  const exps = [
    ['tests', ['test', 'settings']],
    ['novels', ['comic']],
    ['music', ['album', 'artist', 'track']],
  ];
  expect(dataStore.dataset_all().map(ds => ds.datasetid)).toEqual(exps.map(e => e[0]));
  test.each(exps)('dataset %s', (ds,tbs) => {
    expect(dataStore.table_all(ds).map(t => t.tableid)).toEqual(tbs);
  });
});

test('get home sheets', () => {
  const list = Sheets.getSheetList('$home');
  //console.log(list);
  expect(list.length).toEqual(4);
  [ [ 'home', 'home' ],
    [ 'dataset', 'tests' ],
    [ 'dataset', 'novels' ],
    [ 'dataset', 'music', ],
  ].forEach((t,x) => {
    expect(list[x].kind).toEqual(t[0]);
    //expect(list[x].label).toEqual(t[1]);
  });
});

test('get test sheets', () => {
  const list = Sheets.getSheetList('tests');
  expect(list.length).toBe(5);
  [ [ 'home', 'home' ],
    [ 'dataset', 'test' ],
    [ 'table', 'test', ],
    [ 'table', 'settings', ],
    [ 'sheet', 'settings', ],
  ].forEach((t,x) => {
    expect(list[x].kind).toBe(t[0]);
    //expect(list[x].label).toBe(t[1]);
  });
});

test('get novels sheets', () => {
  const list = Sheets.getSheetList('novels');
  expect(list.length).toBe(3);
  [ [ 'home', 'home' ],
    [ 'dataset', 'novels' ],
    [ 'table', 'comic', ],
  ].forEach((t,x) => {
    expect(list[x].kind).toBe(t[0]);
    //expect(list[x].label).toBe(t[1]);
  });
});

test('get music sheets', () => {
  const list = Sheets.getSheetList('music');
  expect(list.length).toBe(5);
  [ [ 'home' ],
    [ 'dataset', 'music' ],
    [ 'table', 'album', ],
    [ 'table', 'artist', ],
    [ 'table', 'track', ],
  ].forEach((t,x) => {
    expect(list[x].kind).toBe(t[0]);
    //expect(list[x].id).toBe(t[1]);
  });
});

// test undo redo
test('add dataset', () => {
  const ids = () => dataStore.dataset_all().map(d => d.datasetid);
  expect(ids()).toEqual(['tests', 'novels', 'music']);
  dataStore.dataset_put({ datasetid: 'xxx' });
  expect(ids()).toEqual(['tests', 'novels', 'music', 'xxx']);

  expect(dataStore.undo()).toBeTruthy();
  //expect(dataStore.undo()).toBeFalsy();
  expect(ids()).toEqual(['tests', 'novels', 'music']);
  
  expect(dataStore.redo()).toBeTruthy();
  expect(dataStore.redo()).toBeFalsy();
  expect(ids()).toEqual(['tests', 'novels', 'music', 'xxx']);

  expect(dataStore.undo()).toBeTruthy();
  expect(ids()).toEqual(['tests', 'novels', 'music']);
  dataStore.dataset_put({ datasetid: 'yyy' });
  expect(ids()).toEqual(['tests', 'novels', 'music','yyy']);
});

test('add table', () => {
  const dsid = 'tests';
  const tables = ['test', 'settings'];
  const ids = () => dataStore.table_all(dsid).map(t => t.tableid);
  expect(ids()).toEqual(tables);
  
  ids().forEach(tbid => {
    expect(dataStore.table_get(dsid, tbid).tableid).toEqual(tbid);
  })
  dataStore.table_put(dsid, { tableid: 'xxx' });
  expect(dataStore.table_get(dsid, 'xxx')).toEqual({ id: 7, tableid: 'xxx', datasetid: dsid, fields: [], rows: [] });
});

test('add row', () => {
  const dsid = 'music';
  const tbid = 'artist';
  const rowids = () => dataStore.table_get(dsid, tbid).rows.map(r => r.id);
  expect(rowids()).toEqual([1,2,3,4,5]);
  
  dataStore.row_put(dsid, tbid, {});
  expect(rowids()).toEqual([1,2,3,4,5,6]);
});