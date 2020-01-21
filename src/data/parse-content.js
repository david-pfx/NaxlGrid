// process imported content file
// (c) 2019 David Bennett

// note: default depends on ES6 which breaks Edge
import parse from 'csv-parse/lib/es5';

// simple logging function, easy to disable
function logall(...args) {
  console.log(...args)
}

export function importCsv(file, cbok, cberr) {
  const fr = new FileReader();
  fr.onload = () => {
    parseCsv(fr.result, file.name, cbok, cberr);
  }
  fr.readAsText(file);
}

// convert given CSV text into table
function parseCsv(filename, source, cbok, cberr) {
  parse(filename, {
    columns: true,
    cast: true,
  }, (err,output) => {
    if (err)
      cberr(`Error ${err.code}: ${err.message}`);
    else cbok(createTable(output, source));
  })
}

function peekType(value) {
  let retable = [
    { regex: /^(-|\+)?(\d+)$/, type: 'integer' },
    { regex: /^(-|\+)?(\d+[.]\d*|[.]\d+)$/, type: 'decimal' },
    { regex: /^(-|\+)?[$](\d+|\d+[.]\d*|[.]\d+)$/, type: 'money' },
    { regex: /^\d\d\d\d-\d\d-\d\d/, type: 'date' },
    { regex: /^\d\d\d\d\/\d\d\/\d\d/, type: 'date' },
    { regex: /\n/, type: 'textmultiline' },
    { regex: /.*/, type: 'text' },
  ]
  let match = retable.find(t => t.regex.test(value))
  return match.type
}

// Create a model from the keys of a data row object
function createTable(rows, filename) {
  logall('create', filename, rows)
  // title case function
  const titleCase = str => str.replace(/\b\w+/g, s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase() );

  // create fields from CSV row
  const fields = (row) => Object.keys(row).map(k => {
    return {
      fieldid: k,
      type: peekType(row[k]),
      label: titleCase(k),
    }
  })

  // get rid of known extension
  const barename = filename.replace(/[.]csv$/i, '');
  const idrows = rows.map((row, x) => ({ id: x+1, ...row }));

  return {
    tableid: barename.toLowerCase(),
    label: titleCase(barename),
    title: titleCase(barename),
    source: filename,
    description: `Created by uploading ${filename}`,
    icon: 'table.gif',
    fields: fields(idrows[0]),
    rows: idrows,
  }    
}