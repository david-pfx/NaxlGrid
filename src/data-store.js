// data store holding all data state
// time-travelling immutable

export default { dataset_add, table_add, sheet_add, dataset_get, table_get, sheet_get };

const initialState = {
  datasets: [],
  tables: [],
  sheets: [],
}

const stateStack = [];

const topStack = () => (stateStack.length === 0) ? initialState : stateStack[stateStack.length-1];

function dataset_add(ds) {
  const newds = { 
    notes: [], ...ds,
  };
  // validate here
  stateStack.push({ ...topStack(), datasets: [ ...topStack().datasets.filter(d => d.id !== ds.id), newds ] });
}

function table_add(tb) {
  const newtb = {
    data: [], ...tb,
  }
  stateStack.push({ ...topStack(), tables: [ ...topStack().tables.filter(t => t.id !== tb.id), newtb ] });
}

function sheet_add(sh) {
  const newsh = {
    data: [], ...sh,
  }
  stateStack.push({ ...topStack(), sheets: [ ...topStack().sheets.filter(s => s.id !== sh.id), newsh ] });
}

function dataset_get(dsid) {
  return (dsid) ? topStack().datasets.find(d => d.id === dsid) : topStack().datasets;
}

function table_get(dsid) {
  return (dsid) ? topStack().tables.filter(t => t.datasetid === dsid) : topStack().tables;
}

function sheet_get(dsid) {
  return (dsid) ? topStack().sheets.filter(s => s.datasetid === dsid) : topStack().sheets;
}
