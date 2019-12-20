// display a block 
// a block can be an array of plain text, tables or forms

import React from 'react';
import Card from 'react-bootstrap/Card'
//import Card, { CardBody } from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import ViewGrid from './view-grid';
import ViewTranspose from './view-transpose';
const imageUrl = '/image/'; // config

////////////////////////////////////////////////////////////////////////////////
// Component to view a block of some kind
//
export default function(props) {
  //console.log('view block', props);
  const block = props.block;
  const cardStyle = { 
    backgroundColor: 'cyan',
    marginTop: '0.5rem', 
  };
  const subtitleStyle = { fontStyle: 'bold', fontSize: '1.2rem' };

  switch (block.kind) {
    case 'note':
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>
          <Row>
            <Col>
              <Image src={imageUrl + 'document-32.png'} width='20px' />&nbsp;
              {block.title}
            </Col>
            <Col>
              <Button 
                size="sm"
                style={{ marginRight: '0.3rem', marginTop: '0.3rem', float: 'right'}} 
                onClick={e => props.action('NEW', { noteid: block.table.tableid })} >+</Button>
            </Col>
            </Row>
          </Card.Title>
          {block.notes.map((note, x) =>
            <Card.Text key={x}>
              {note}
            </Card.Text>
          )}
        </Card>
      )
    case 'table':
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>
          <Row>
            <Col>
              <Image src={imageUrl + block.table.icon} width='20px' />&nbsp;
              {block.title}
            </Col>
            <Col>
              <Button 
                size="sm"
                style={{ marginRight: '0.3rem', marginTop: '0.3rem', float: 'right'}} 
                onClick={e => props.action('NEW', { tableid: block.table.tableid })} >+</Button>
            </Col>
            </Row>
          </Card.Title>
          <ViewGrid table={block.table} />
        </Card>
      )
    case 'tuple':
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>
            <Image src={imageUrl + block.table.icon} width='20px' />&nbsp;
            {block.title}
          </Card.Title>
          <ViewTranspose table={block.table} />
        </Card>
      )
    default:
      return <div>bad kind</div>;
  }
}
