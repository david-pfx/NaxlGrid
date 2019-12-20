// data store holding all data state
// time-travelling immutable

export default { undo, redo, dataset_all, dataset_get, dataset_add, sheet_all, sheet_get, sheet_add, table_all, table_get, table_add, row_add };

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
  return topStack().datasets.find(d => d.id === dsid);
}

function table_all(dsid) {
  return topStack().tables.filter(t => t.datasetid === dsid);
}

function table_get(dsid, tbid) {
  return topStack().tables.find(t => t.datasetid === dsid && t.id === tbid);
}

function sheet_all(dsid) {
  return topStack().sheets.filter(t => t.datasetid === dsid);
}

function sheet_get(dsid, shid) {
  return topStack().sheets.find(t => t.datasetid === dsid && t.id === shid);
}

// add dataset
function dataset_add(ds) {
  const newds = { 
    id: topStack().datasets.length + 1,
    notes: [], 
    ...ds,
  };
  // validate here
  pushNext({ 
    ...topStack(), 
    datasets: [ ...topStack().datasets.filter(d => d.id !== ds.id), newds ], 
  });
}

// add sheet to dataset
function sheet_add(dsid, sh) {
  const newsh = {
    id: topStack().sheets.length + 1,
    data: [], 
    ...sh,
    datasetid: dsid,
  }
  pushNext({ 
    ...topStack(), 
    sheets: [ ...topStack().sheets.filter(s => s.id !== sh.id), newsh ] ,
  });
}

// add table to dataset
function table_add(dsid, tb) {
  const newtb = {
    id: topStack().tables.length + 1,
    data: [], 
    ...tb,
    datasetid: dsid,
  }
  pushNext({ 
    ...topStack(), 
    tables: [ ...topStack().tables.filter(t => t.id !== tb.id), newtb ],
  });
}

// add row to table in dataset
function row_add(dsid, tbid, row) {
  const table = table_get(dsid, tbid);
  const newrow = {
    id: table.data.length + 1,
    ...row,
  }
  const newtable = { 
    ...table,
    data: [ ...table.data.filter(r => r.id !== newrow.id), newrow ],
  }
  //console.log(newtable);
  table_add(dsid, newtable);
}

