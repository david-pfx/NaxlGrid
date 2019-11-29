import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
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
  }

  render() {
    const titleBgColor = 'yellow';
    const sidebarBgColor = 'lightgray';
    const sheet = this.state.sheet;
    //const rowStyle = { borderStyle: 'solid', borderWidth: 1, borderColor: '#dee2e6',padding: 5 };
    const cardStyle = { backgroundColor: 'cyan' };
    const titleStyle = { fontWeight: 'bold', fontSize: 'large', textAlign: 'center' };
    const subtitleStyle = { fontSize: 'large', textAlign: 'center' };
    //const bodyStyle = { padding: '1rem' };

    return (
      <Container fluid rounded style={{ lineHeight: 1.2, backgroundColor: titleBgColor }}>
        <Row style={{ backgroundColor: titleBgColor }}>
          <Image src="n-logo.png" height="40" />
        </Row>
        <Row>
          <Col lg={1} 
               style={{ backgroundColor: sidebarBgColor }}>
            left column
          </Col>
          <Col> 
          <Card style={cardStyle}>
            <Card.Title style={titleStyle}>{sheet.title}</Card.Title>
            <div style={subtitleStyle}>{sheet.subtitle}</div>
            <Card.Body>
            {
            sheet.blocks.map((block, i) => (
              <Row>
                { (block.kind === 'tuple') ? <TupleBlock table={block.table} />
                : (block.kind === 'table') ? <TableBlock table={block.table} />
                : <div key={i}>Bad block: {block.kind}</div>
                }
              </Row>
            ))
          }
          </Card.Body>
          </Card> 
          </Col>
        </Row>
      </Container>
    );
  }
}
