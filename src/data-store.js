// data store holding all data state
// time-travelling immutable

export default { dataset_add, dataset_all, table_add, sheet_add, dataset_get, table_all, table_get, sheet_all, sheet_get };

const initialState = {
  datasets: [],
  tables: [],
  sheets: [],
}

const stateStack = [];

const topStack = () => (stateStack.length === 0) ? initialState : stateStack[stateStack.length-1];

function dataset_add(ds) {
  const newds = { 
    id: topStack().datasets.length,
    notes: [], 
    ...ds,
  };
  // validate here
  stateStack.push({ 
    ...topStack(), 
    datasets: [ ...topStack().datasets.filter(d => d.id !== ds.id), newds ], 
  });
}

function table_add(tb) {
  const newtb = {
    id: topStack().tables.length,
    data: [], 
    ...tb,
  }
  stateStack.push({ 
    ...topStack(), 
    tables: [ ...topStack().tables.filter(t => t.id !== tb.id), newtb ],
  });
}

function sheet_add(sh) {
  const newsh = {
    id: topStack().sheets.length,
    data: [], 
    ...sh,
  }
  stateStack.push({ 
    ...topStack(), 
    sheets: [ ...topStack().sheets.filter(s => s.id !== sh.id), newsh ] ,
  });
}

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
