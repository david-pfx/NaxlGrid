// View a sheet consisting of multiple blocks

import React from 'react';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ViewBlock from './view-block';

////////////////////////////////////////////////////////////////////////////////
// Component to view a sheet as a list of blocks
//
export default function(props) {
  const sheet = props.sheet;
  document.title = `Naxl - ${sheet.label}`;

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

  const variant = (k) => ({
      home: 'primary',
      dataset: 'success',
      table: 'warning',
      pair: 'secondary',
    }[k] || 'danger');

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
                    variant={variant(s.kind)}
                    style={{ margin: '0.3rem'}} 
                    onClick={e => props.doselect(s) }>
                      { s.label }
                  </Button>
                </Row>) 
            }
        </Col>
        <Col> 
          <Row style={titleStyle}>
            <Col sm="1" />
            <Col>{sheet.title}</Col>
            <Col sm="1">
              <Button size="sm"
                style={buttonStyle} 
                onClick={e => props.doaction('NEW', { sheet: sheet })}>
                <FaIcon icon={faPlus} />
              </Button>
            </Col>
          </Row>
          { 
            sheet.blocks.map((b,x) => <ViewBlock 
              key={x} 
              block={b} 
              doselect={props.doselect} 
              doaction={props.doaction} />) 
          }
        </Col>
      </Row>
    </Container>
  );
}
