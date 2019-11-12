// Wrap data sources

import comic_sheet from './comic-sheet';
//import comic_defs from './comic-defs';
//import comic_data from './comic-data';

//console.log('comic defs', JSON.stringify(comic_sheet));
//console.log('comic defs', JSON.stringify(comic_defs.fields));

export let loadingSheet = [
  {
      type: 'scalar', 
      value: 'Loading, please wait...',
  },
]

export function comicSheet(cb) {
  cb(comic_sheet);
}

// let colDefs = [{
//   headerName: "Make", field: "make"
// }, {
//   headerName: "Model", field: "model"
// }, {
//   headerName: "Price", field: "price"
// }]

// export function getTestData(cb) {
//   cb({
//     columnDefs: colDefs,
//     rowData: [{
//       make: "Toyota", model: "Celica", price: 35000
//     }, {
//       make: "Ford", model: "Mondeo", price: 32000
//     }, {
//       make: "Porsche", model: "Boxter", price: 72000
//     }]
//   })
// }

// // get some preloaded data
// export function webData(cb) {
//   fetch('https://api.myjson.com/bins/ly7d1')
//     .then(result => result.json())
//     .then(data => cb({
//       columnDefs: colDefs,
//       rowData: data
//     }))
// }

// export function comicData(cb) {
//   const defs = comic_defs.fields.map(f => ({ 
//     headerName: f.label, 
//     field: f.id,
//   }));
//   cb({ cols: defs, rows: comic_data });
// }

