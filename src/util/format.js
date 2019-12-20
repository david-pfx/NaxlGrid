// Helpers for string, numbers, and date formats

import React from 'react'
import numeral from 'numeral'
import moment from 'moment'
import Badge from 'react-bootstrap/badge'

import * as Resource from './resource'

// include locale support for a few chosen countries -- add more as needed
import 'moment/locale/en-gb'
import 'moment/locale/en-au'
import 'moment/locale/fr'
import 'moment/locale/de'
import 'moment/locale/es'

const locale = null;  // config
export const imageUrl = '/image/'; // config
const fileUrl = '/file/'; // config
const classTrue = 'fas fa-check';
const classFalse = 'fas fa-times';

// Set the locale from the browser -- which may need to be configured
moment.locale(locale || window.navigator.userLanguage || window.navigator.language)

const isNumeric = (type) => 'integer,decimal,money'.includes(type);
const isDate = (type) => 'date,time,datetime'.includes(type);

// format simple data value according to its type
// may return string or JSX
const formatSimple = {
    hidden: d => '',
    text: d => '' + d,
    textmultiline: d => d,
    boolean: d => <i className={ d ? classTrue : classFalse }></i>,
    date: d => moment(d).format('L'),
    time: d => moment(d).format('LTS'),
    datetime: d => moment(d).format('L LTS'),
    integer: d => numeral(d).format('0,0'), 
    decimal: d => numeral(d).format('0,0.0[000]'),
    money: d => numeral(d).format('$0,0.00'),
    array: d => `${d.length} items`,
    color: d => (<div>
        <div className="evo-color-box"      // TODO
            style={{ backgroundColor: d }}
            title={d} >
            <span>{d}</span>
        </div>
    </div>),
    html: d => d,
    json: d => JSON.stringify(d, null, '\t'),
    image: d => <a href={imageUrl + d}><img src={imageUrl + d} width="60px" title={d} alt={d} /></a>,
    url: d => <a href={d} target="_blank" rel="noopener noreferrer">{d} </a>,
    document: d => <a href={encodeURI(fileUrl+d)} target="_blank" rel="noopener noreferrer">{d} </a>, // TODO
    email: d => <a href={'mailto:' + d}>{d}</a>,
    /*else if(f.type===ft.lov && icon){
        return <React.Fragment><img src={icon} alt=""></img>{d}</React.Fragment>
    }*/
};

// format data value according to its type with possible list 
// may return string or JSX
function formatAll(data, type, list) {
    if (data === null || data === undefined) return '';
    // for simple lookup, just a list of ids and values
    if (type === 'lov') {
        const vv = list && list.find(v => v.id === data);
        return vv ? <Badge pill variant="primary" style={{ backgroundColor: Resource.pickColour(0,data)}}>{vv.text}</Badge> 
            : '[' + data + ']';
    }
    // for table lookup, list is the target table
    if (type === 'lookup' && list) {
        const row = list.data.find(v => v.id === data);
        return row 
            ? <span style={{ color: 'green' }}>
                {formatAll(row[list.field.id], list.field.type)}
              </span> 
            : '[' + data + ']';
    }
    if (!formatSimple[type]) return 'bad type';
    return formatSimple[type](data);
}

export default {
    // config to override browser
    locale: moment.locale(),
    now: () => moment(),
    isValidType: t => !!this.toFormatted(t),

    // simple pure functions that format a value according to its type
    // may return either string or JSX
    format: (data, type, list) => formatAll(data, type, list),

    // make it shorter for table layout
    // TODO: url show domain 
    formatBrief(d, f) {
        return (f.type === 'json' && d) ? '<json>'
        : this.format(d, f.type, f.list)
    },

    // text alignment for type
    textAlign: (type) => {
        return (isNumeric(type) || isDate(type)) ? 'right'
        : 'boolean,lov,image'.includes(type) ? 'center' : 'left';
    },

    // relative width for type (effectively a percentage)
    relWidth: (type) => {
        return 'integer,boolean'.includes(type) ? 15
        : isNumeric(type) || isDate(type) ? 20 
        : type === 'lov' ? 30
        : 40;
    },

};
