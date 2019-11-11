import React from 'react';
import './App.css';
import MainGrid from './MainGrid';
import * as Data from './data-source';
import { Component } from 'ag-grid-community';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      gridData: [ Data.testData() ],
    }
  }
  
  componentDidMount() {
    Data.webData(data => {
      this.setState({
        gridData: this.state.gridData.concat({
          columnDefs: Data.testData().columnDefs,
          rowData: data,
        })
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>header</p>
        </header>
        { 
          this.state.gridData.map(data => 
            <MainGrid gridData= { data } />
          )
        }
      </div>
    );
  }
}

export default App;
