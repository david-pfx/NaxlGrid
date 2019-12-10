// View a sheet consisting of multiple blocks

import React from 'react';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import ViewBlock from './view-block';

////////////////////////////////////////////////////////////////////////////////
// Component to view a sheet as a list of blocks
//
export default function(props) {
  const sheet = props.sheet;
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
            { // A button for each sheet in the left sidebar
              props.selectors.map(s => <Row key={s.label}>
                <Button block style={{ margin: '0.3rem'}} onClick={e => s.select() }>{ s.label }</Button>
              </Row>) 
            }
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
