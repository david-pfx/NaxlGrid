// Wrap data sources

export function testData() {
  return ({
    columnDefs: [{
      headerName: "Make", field: "make"
    }, {
      headerName: "Model", field: "model"
    }, {
      headerName: "Price", field: "price"
    }],
    rowData: [{
      make: "Toyota", model: "Celica", price: 35000
    }, {
      make: "Ford", model: "Mondeo", price: 32000
    }, {
      make: "Porsche", model: "Boxter", price: 72000
    }]
  })
}

// get some preloaded data
export function webData(cb) {
  fetch('https://api.myjson.com/bins/ly7d1')
    .then(result => result.json())
    .then(rowData => cb(rowData))
}
