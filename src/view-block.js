// display a block 
// a block can be an array of plain text, tables or forms

import React, { Component } from 'react';
import Card, { CardBody } from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

import ViewGrid from './view-grid';
import ViewTranspose from './view-transpose';
const imageUrl = '/image/'; // config

////////////////////////////////////////////////////////////////////////////////
// View a block of some kind
//
export default class ViewBlock extends Component {
  render() {
    const block = this.props.block;
    const cardStyle = { 
      backgroundColor: 'cyan',
      marginTop: '0.5rem', 
    };
    const subtitleStyle = { fontStyle: 'bold', fontSize: '1.2rem' };

    if (block.kind === 'note') {
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>{block.title}</Card.Title>
          { block.notes.map((note,x) =>
            <Card.Text key={x}>
              {note}
            </Card.Text>
          )}
        </Card> 
      )
    }
    if (block.kind === 'table') {
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>
            <Image src={imageUrl + block.table.icon} width='20px' />&nbsp;
            {block.title}
          </Card.Title>
          <ViewGrid table={block.table} dataset={block.table.dataset} />
          {/* { block.tables.map((table,x) =>
            <ViewGrid key={x} table={table} dataset={block.tables.dataset} />
          )} */}
        </Card> 
      )
    }
    if (block.kind === 'tuple') {
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>
            <Image src={imageUrl + block.table.icon} width='20px' />&nbsp;
            {block.title}
          </Card.Title>
          <ViewTranspose table={block.table} dataset={block.table.dataset} />
          {/* { block.tables.map((table,x) =>
            <ViewTranspose key={x} table={table} dataset={block.tables.dataset} />
          )} */}
        </Card> 
      )
    }
    return <div>bad kind</div>;
  }
}
