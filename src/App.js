import React from 'react';
import './App.css';
import MainGrid from './MainGrid';
import * as Data from './data-source';

class App extends React.Component {
  constructor(props) {
    super(props);
    Data.getTestData(sheet => {
      this.state = {
        sheets: [sheet],
      }
    })
  }

  componentDidMount() {
    Data.comicData(sheet => this.setState({ sheets: [ sheet ] }));
    //Data.comicData(sheet => this.setState({ sheets: this.state.sheets.concat(sheet) }));
    //Data.webData(sheet => this.setState({ sheets: this.state.sheets.concat(sheet) }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>header</p>
        </header>
        { 
          this.state.sheets.map((sheet,i) => 
            <MainGrid key={i} sheet={ sheet } />
          )
        }
      </div>
    );
  }
}

export default App;
