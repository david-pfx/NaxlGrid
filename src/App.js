import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
//import Table from 'react-bootstrap/Table'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//import './App.css';
import TableBlock from './TableBlock';
import TupleBlock from './TupleBlock';
import * as Data from './data-source';

export default class App extends React.Component {
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
    const titleBgColor = 'yellow';
    const sidebarBgColor = 'lightgray';
    const rowStyle = { borderStyle: 'solid', borderWidth: 1, borderColor: '#dee2e6',padding: 5 };
    
    return (
      <Container fluid >
        <Row style={{ backgroundColor: titleBgColor }}>
          <Image src="n-logo.png" height="40" />
          <p style={{ height: 0, fontWeight: 'bold', fontSize: 'large', verticalAlign: 'middle', padding: 5 }}>
            NAXL is Not Excel
          </p>
        </Row>
        <Row>
          <Col lg={1} 
               style={{ backgroundColor: sidebarBgColor }}>
            left column
          </Col>
          <Col>  
            {
            this.state.sheet.map((block, i) => (
              <Row>
                {(block.type === 'blank') ? <Col key={i} >&nbsp;</Col>
                  : (block.type === 'scalar') ? <Col key={i} style={rowStyle} >{block.value}</Col>
                  : (block.type === 'tuple') ? <TupleBlock key={i} rows={block.rows} cols={Data.tuple_fields} />
                  : (block.type === 'table') ? <TableBlock key={i} rows={block.rows} cols={block.defs.fields} kind={block.type} />
                  : <div key={i}>Bad block: {block.type}</div>
                }
              </Row>
            ))
          }
          </Col>
        </Row>
      </Container>
    );
  }
}
