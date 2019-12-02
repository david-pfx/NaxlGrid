// display a block 
// a block can be an array of plain text, tables or forms

import React, { Component } from 'react';
import Card, { CardBody } from 'react-bootstrap/Card'

import ViewGrid from './ViewGrid';

////////////////////////////////////////////////////////////////////////////////
// View a block of some kind
//
export default class ViewBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const block = this.props.block;
    const cardStyle = { backgroundColor: 'cyan' };
    const subtitleStyle = { fontStyle: 'italic', fontSize: '1.2rem', textAlign: 'center' };

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
          <Card.Title style={subtitleStyle}>{block.title}</Card.Title>
          { block.tables.map((table,x) =>
            <ViewGrid key={x} table={table} dataset={block.tables.dataset} />
          )}
        </Card> 
      )
    }
    return <div>bad kind</div>;
  }
}
