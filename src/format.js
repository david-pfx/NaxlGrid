// Helpers for string, numbers, and date formats

import React from 'react'
import numeral from 'numeral'
import moment from 'moment'

// include locale support for a few chosen countries -- add more as needed
import 'moment/locale/en-gb'
import 'moment/locale/en-au'
import 'moment/locale/fr'
import 'moment/locale/de'
import 'moment/locale/es'

const locale = null;  // config
const imageUrl = '/image/'; // config
const fileUrl = '/file/'; // config
const classTrue = 'fas fa-check';
const classFalse = 'fas fa-times';

// Set the locale from the browser -- which may need to be configured
moment.locale(locale || window.navigator.userLanguage || window.navigator.language)

const formatLib = {

    // config to override browser
    locale: moment.locale(),
    now: () => moment(),

    // simple pure functions that format a value according to its type
    // may return either string or JSX
    toFormatted: {
        hidden: d => '',
        text: d => '' + d,
        textmultiline: d => d,
        boolean: d => <i className={ d ? classTrue : classFalse }></i>,
        date: d => moment(d).format('L'),
        time: d => moment(d).format('LTS'),
        datetime: d => moment(d).format('L LTS'),
        integer: d => numeral(d).format('0,0'), // TODO: choose format
        decimal: d => numeral(d).format('0,0.0[000]'), // TODO: choose format
        money: d => numeral(d).format('$0,0.00'),
        color: d => (<div>
            <div className="evo-color-box"      // TODO
                style={{ backgroundColor: d }}
                title={d} >
                <span>{d}</span>
            </div>
        </div>),
        html: d => d,
        image: d => <img src={imageUrl + d} className="img-thumbnail" alt="" />,
        url: d => <a href={d} target="_blank" rel="noopener noreferrer">{d} </a>,
        document: d => <a href={encodeURI(fileUrl+d)} target="_blank" rel="noopener noreferrer">{d} </a>, // TODO
        email: d => <a href={'mailto:' + d}>{d}</a>,
        json: d => JSON.stringify(d, null, '\t'),
        /*else if(f.type===ft.lov && icon){
            return <React.Fragment><img src={icon} alt=""></img>{d}</React.Fragment>
        }*/
    },

    isValidType: t => !!this.toFormatted(t),

    format(data, type, list) {
        if (data === null || data === undefined) return '';
        if (type === 'lov') {
            const vv = list.find(v => v.id === data);
            return vv ? vv.text : '[' + data + ']';
        }
        if (!this.toFormatted[type]) return 'bad type';
        return this.toFormatted[type](data);
    },

    formatBrief(d, f) {
        return (f.type === 'json' && d) ? '<json>'
        : this.format(d, f.type, f.list)
    },

};
export default formatLib;
