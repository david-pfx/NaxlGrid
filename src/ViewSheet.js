// View a sheet consisting of multiple blocks

import React from 'react';
import Container from 'react-bootstrap/Container';

import * as Data from './data-source';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import ViewBlock from './ViewBlock';

export default class App extends React.Component {
  render() {
    const sheet = this.props.sheet;
    const titleBgColor = 'yellow';
    const sidebarBgColor = 'palegreen';
    const titleStyle = { fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' };

    return (
      <Container fluid style={{ lineHeight: 1.2, backgroundColor: titleBgColor }}>
        <Row>
          <Col lg={1} 
               style={{ backgroundColor: sidebarBgColor }}>
              <Row>
                <Image src="n-logo.png" height="40" style={{ marginLeft: 'auto', marginRight: 'auto' }}/>
              </Row>
              { Data.allSheets.map(s => <Row key={s.id}>
                <Button block style={{ margin: '1rem'}} onClick={e => this.props.selectSheet(s.id,e)}>{ s.label }</Button>
              </Row>) }
          </Col>
          <Col> 
            <Row style={{ backgroundColor: titleBgColor }}>
              <Col style={titleStyle}>{sheet.title}</Col>
            </Row>
            { sheet.blocks.map((b,x) => <ViewBlock key={x} block={b} />) }
          </Col>
        </Row>
      </Container>
    );
  }
}
