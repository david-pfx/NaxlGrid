// display a block 
// a block can be an array of plain text, tables or forms

import React from 'react';
import Card from 'react-bootstrap/Card'
//import Card, { CardBody } from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

import ViewGrid from './view-grid';
import ViewTranspose from './view-transpose';
const imageUrl = '/image/'; // config

////////////////////////////////////////////////////////////////////////////////
// Component to view a block of some kind
//
export default function(props) {
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
          <Card.Title style={subtitleStyle}>{block.title}</Card.Title>
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
            <Image src={imageUrl + block.table.icon} width='20px' />&nbsp;
          {block.title}
          </Card.Title>
          <ViewGrid table={block.table} dataset={block.table.dataset} />
        </Card>
      )
    case 'tuple':
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>
            <Image src={imageUrl + block.table.icon} width='20px' />&nbsp;
          {block.title}
          </Card.Title>
          <ViewTranspose table={block.table} dataset={block.table.dataset} />
        </Card>
      )
    default:
      return <div>bad kind</div>;
  }
}
