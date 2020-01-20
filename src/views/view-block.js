// display a block 
// a block can be an array of plain text, tables or forms

import React from 'react';
import Card from 'react-bootstrap/Card'
//import Card, { CardBody } from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import ViewTable from './view-table';
import { importCsv } from '../data/parse-content';

const imageUrl = '/image/'; // config

const cardStyle = { 
  backgroundColor: 'cyan',
  marginTop: '0.5rem', 
};
const subtitleStyle = { fontStyle: 'bold', fontSize: '1.2rem' };
const buttonStyle = { marginRight: '0.3rem', marginTop: '0.3rem', float: 'right'};

// view a note block
function renderNote(block, cbs) {
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
            style={buttonStyle} 
            onClick={cbs.newNoteHandler} >
              <FaIcon icon={faPlus} />
            </Button>
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
}

// view a table block
function renderTable(block, importing, cbs) {

  const inputFile = 
    <Form.Control
      type='file'
      autoFocus={true}
      accept='.csv'
      onKeyPress={e => { if (e.key === 'Escape') cbs.importHandler(false); }}
      onChange={e => cbs.importHandler(false, e.target.files[0])}
    />

  return (
    <Card style={cardStyle}>
      <Card.Title style={subtitleStyle}>
      <Row>
        <Col>
          <Image 
            src={imageUrl + block.table.icon} 
            width='20px' />
          &nbsp;
          {block.title}
        </Col>
      </Row>
      </Card.Title>

      <ViewTable 
        table={block.table} 
        istrans={block.kind === 'trans'}
        doaction={cbs.doaction} />
        
      <Form>
        <Button size="sm"
          style={{ marginTop: '-1rem' }}
          onClick={cbs.newTableHandler} >
          <FaIcon icon={faPlus} />
        </Button>
        { block.table.tableid === '$table' && (
          (importing && inputFile) || 
            <Button size="sm"
              style={{ marginTop: '-1rem', marginLeft: '1rem' }}
              onClick={e => cbs.importHandler(true)} >
              <FaIcon icon={faFileImport} />
            </Button>
          )
        }
      </Form>
    </Card>
  )

}

////////////////////////////////////////////////////////////////////////////////
// Component to view a block of some kind
// transient state for import mode
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      importing: false
    }
  }
  
  render() {
    const props = this.props;
    //console.log('view block', props);
    const block = props.block;

    const newNoteHandler = () => props.doaction('NEW', { noteid: block.table.tableid });
    const newTableHandler = () => props.doaction('NEW', { tableid: block.table.tableid });

    const importHandler = (importing, file) => {
      console.log('import', importing, file);
      this.setState({ importing: importing });
      if (file)
        importCsv(file, 
          (data) => props.doaction('PUT', { tableid: block.table.tableid, newrow: data }),
          (msg) => alert(msg));
    }

    switch (block.kind) {
      case 'note':
        return renderNote(block, { 
          newNoteHandler: newNoteHandler,
        });
      case 'table':
      case 'trans':
        return renderTable(block, this.state.importing, { 
          newTableHandler: newTableHandler,
          importHandler: importHandler,
          doaction: props.doaction,
        });
      default:
        return <div>bad kind</div>;
    }
  }
}