import React from 'react';

import ViewSheet from './ViewSheet';
import * as Data from './data-source';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheet: Data.loadingSheet
    }
  }

  componentDidMount() {
    Data.getSheet(sheet => this.setState({ sheet: sheet }));
  }

  render() {
    return <ViewSheet sheet={this.state.sheet} />;
  }
}
