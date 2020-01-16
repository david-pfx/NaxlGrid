// data store holding all data state
// time-travelling immutable

export default { undo, redo, dataset_all, dataset_get, dataset_put, sheet_all, sheet_get, sheet_put, table_all, table_get, table_put, row_put };

const initialState = {
  datasets: [],
  tables: [],
  sheets: [],
}

const stateStack = [initialState];
var stateCurrent = 0;

function topStack() {
  return stateStack[stateCurrent];
}

// add a new state, discarding any other future
function pushNext(state) {
  stateStack.length = stateCurrent + 1;
  stateStack.push(state);
  stateCurrent++;
}

// travel back to a previous state (return false if none)
function undo() {
  if (stateCurrent === 0) return false;
  stateCurrent--;
  return true;
}

// travel forward to a future state (return false if none)
function redo() {
  if (stateCurrent === stateStack.length - 1) return false;
  stateCurrent++;
  return true;
}

// query functions
function dataset_all() {
  return topStack().datasets;
}

function dataset_get(dsid) {
  return topStack().datasets.find(d => d.datasetid === dsid);
}

function table_all(dsid) {
  return topStack().tables.filter(t => t.datasetid === dsid);
}

function table_get(dsid, tbid) {
  return topStack().tables.find(t => t.datasetid === dsid && t.tableid === tbid);
}

function sheet_all(dsid) {
  return topStack().sheets.filter(t => t.datasetid === dsid);
}

function sheet_get(dsid, shid) {
  return topStack().sheets.find(t => t.datasetid === dsid && t.id === shid);
}

// put dataset, new or merge on id
function dataset_put(ds) {
  const newds = (ds.id) 
    ? topStack().datasets.map(d => d.id === ds.id ? { ...d, ...ds } : d)
    : [ ...topStack().datasets, {  
        id: topStack().datasets.length + 1,
        notes: [], 
        ...ds,
      } ];
  // validate here
  pushNext({ 
    ...topStack(), 
    datasets: newds, 
  });
}

// put sheet in dataset, new or merge on id
function sheet_put(dsid, sh) {
  const newsh = (sh.id) 
    ? topStack().sheets.map(s => s.id === sh.id ? { ...s, ...sh } : s)
    : [ ...topStack().sheets, {  
        id: topStack().sheets.length + 1,
        rows: [], 
        datasetid: dsid,
        ...sh,
      } ];
  // validate here
  pushNext({ 
    ...topStack(), 
    sheets: newsh, 
  });
}

// put table in dataset, new or merge on id
function table_put(dsid, tb) {
  const newtb = (tb.id) 
    ? topStack().tables.map(t => t.id === tb.id ? { ...t, ...tb } : t)
    : [ ...topStack().tables, {  
        id: topStack().tables.length + 1,
        rows: [], 
        datasetid: dsid,
        ...tb,
      } ];
  // validate here
  pushNext({ 
    ...topStack(), 
    tables: newtb, 
  });
}

// put row to table in dataset, new or merge on id
function row_put(dsid, tbid, row) {
  console.log('row_put', dsid, tbid, row);
  const table = table_get(dsid, tbid);
  const newrows = (row.id) 
    ? [ ...table.rows.map(r => r.id === row.id ? { ...r, ...row } : r) ]
    : [ ...table.rows, { id: table.rows.length + 1, ...row } ];
  table_put(dsid, { ...table, rows: newrows });
}

