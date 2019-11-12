import React from 'react';
import './App.css';
import TableBlock from './TableBlock';
import TupleBlock from './TupleBlock';
import * as Data from './data-source';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: Data.loadingSheet
    }
  }

  componentDidMount() {
    Data.comicSheet(sheet => this.setState({ sheet: sheet }));
    //Data.comicData(sheet => this.setState({ sheets: [ sheet ] }));
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
          this.state.sheet.map((block,i) => (
              (block.type === 'blank') ? <div key={i} >&nbsp;</div>
            : (block.type === 'scalar') ? <div key={i}>{block.value}</div>
            : (block.type === 'tuple') ? <TupleBlock key={i} block={ block } />
            : (block.type === 'table') ? <TableBlock key={i} block={ block } />
            : <div key={i}>Bad block: {block.type}</div>
          ))
        }
      </div>
    );
  }
}

export default App;
