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
import { faPlus, faFileImport, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import ViewTable from './view-table';
import { importCsv } from '../data/parse-content';

const imageUrl = '/image/'; // config

const cardStyle = { 
  backgroundColor: 'cyan',
  marginTop: '0.5rem', 
};
const subtitleStyle = { fontStyle: 'bold', fontSize: '1.2rem' };
const buttonStyle = { marginRight: '0.3rem', marginTop: '0.3rem', float: 'left'};

// view a note block
function renderNote(block, cbs) {
  return (
    <Card style={cardStyle}>
      <Card.Title style={subtitleStyle}>
      <Row>
        <Col sm="1" >
          { // button to create a new note
            false && <Button 
            size="sm"
            style={buttonStyle} 
            onClick={cbs.newNoteHandler} >
              <FaIcon icon={faPlus} />
            </Button>
          }
        </Col>
        <Col  style={{ textAlign: 'center' }}>
          <Image src={imageUrl + 'document-32.png'} width='20px' />&nbsp;
          {block.title}
        </Col>
        <Col sm="1" />
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
        <Col sm="1">
          { cbs.showFieldHandler &&
            <Button size="sm"
              style={{ marginTop: '0.5rem' }}
              onClick={cbs.showFieldHandler} >
              <FaIcon icon={faEllipsisV} />
            </Button>
          }
        </Col>
        <Col style={{ textAlign: 'center' }}>
          <Image 
            src={imageUrl + block.table.icon} 
            width='20px' />
          &nbsp;
          {block.title}
        </Col>
        <Col sm="1" />
      </Row>
      </Card.Title>

      <ViewTable 
        table={block.table} 
        istrans={block.kind === 'trans'}
        cbUpdate={cbs.updateHandler} />
        
      <Form>
        <Button size="sm"
          style={{ marginTop: '-1rem' }}
          onClick={cbs.newRowHandler} >
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

    const newNoteHandler = () => props.doaction('NEW', { 
      noteid: block.table.tableid 
    });
    const showFieldHandler = () => props.doselect({ 
      kind: 'field', 
      tableid: block.table.tableid 
    });
    const newRowHandler = () => props.doaction('NEW', { 
      tableid: block.table.tableid, 
      parentid: block.table.parentid,
    });
    const updateHandler = (row, fieldid, newvalue) => {
      props.doaction('PUT', { 
        tableid: block.table.tableid, 
        parentid: block.table.parentid,
        newrow: {
          id: row.id,
          [fieldid]: newvalue,
        }
      });
    }

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
          newRowHandler: newRowHandler,
          importHandler: importHandler,
          showFieldHandler: !block.table.system && showFieldHandler,
          updateHandler: updateHandler,
        });
      default:
        return <div>bad kind</div>;
    }
  }
}