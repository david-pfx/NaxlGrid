// View a sheet consisting of multiple blocks

import React from 'react';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import ViewBlock from './view-block';

////////////////////////////////////////////////////////////////////////////////
// Component to view a sheet as a list of blocks
//
export default function(props) {
  const sheet = props.sheet;
  const titleBgColor = 'yellow';
  const sidebarBgColor = 'palegreen';
  const titleStyle = { 
    backgroundColor: titleBgColor,
    fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' 
  };
  const sidebarStyle = { 
    backgroundColor: sidebarBgColor 
  };
  const buttonStyle = { 
    marginRight: '0.3rem', marginTop: '0.3rem', float: 'right'
  };

  document.title = `Naxl - ${sheet.title}`;

  return (
    <Container fluid style={{ lineHeight: 1.2, backgroundColor: titleBgColor }}>
      <Row>
        <Col lg={1} key={1}
          style={sidebarStyle}>
            <Row>
              <Image 
                src="n-logo.png" 
                height="40" 
                style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </Row>
            { // A button for each sheet in the left sidebar
              props.selectors.map((s,x) => 
                <Row key={x}>
                  <Button block 
                    style={{ margin: '0.3rem'}} 
                    onClick={e => s.select() }>
                      { s.label }
                  </Button>
                </Row>) 
            }
        </Col>
        <Col> 
          <Row style={titleStyle}>
            <Col lg="11">{sheet.title}</Col>
            <Col>
              <Button size="sm"
                style={buttonStyle} 
                onClick={e => props.doaction('NEW', { sheet: sheet })} >+
              </Button>
            </Col>
          </Row>
          { 
            sheet.blocks.map((b,x) => <ViewBlock 
              key={x} 
              block={b} 
              doaction={props.doaction} />) 
          }
        </Col>
      </Row>
    </Container>
  );
}
