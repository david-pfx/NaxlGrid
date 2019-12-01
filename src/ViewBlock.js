// display a block 
// a block can be an array of plain text, tables or forms

import React, { Component } from 'react';
import Card, { CardBody } from 'react-bootstrap/Card'

import TableGrid from './ViewGrid';

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
          { block.notes.map(n =>
            <Card.Text>
              {n}
            </Card.Text>
          )}
        </Card> 
      )
    }
    if (block.kind === 'table') {
      return (
        <Card style={cardStyle}>
          <Card.Title style={subtitleStyle}>{block.title}</Card.Title>
          { block.tables.map(t =>
            <TableGrid table={t}/>
          )}
        </Card> 
      )
    }
    return <div>bad kind</div>;
  }
}
