// test data definition

import test_data from './test-data';

const lov_list = [
	{	"id": 1,	"text": "Vanilla" },
	{	"id": 2,	"text": "Chocolate"	},
	{	"id": 3,	"text": "Strawberry"	},
	{	"id": 4,	"text": "Green Tea"	},
	{	"id": 5,	"text": "Lemon Cookie"	},
];

export default {
	"tableid": "test",
	"label": "Test Data",
	"icon": "test/testing.png",
	"fields": [
	{ fieldid: "id", type: "integer", label: "Id", },
	{	fieldid: "name", "type": "text", "label": "Title",	},
	{	fieldid: "text", "type": "text", "label": "Text",	},
	{	fieldid: "lov", "type": "lov", "label": "List of Values", "list": lov_list,	},
	{	fieldid: "textmultiline", "type": "textmultiline", "label": "Text multiline", 	},
//	{ fieldid: "parent", "type": "lov", "label": "Parent",	},
//	{ fieldid: "lovlc", "type": "lov", "label": "Lemon Cookie", "list": lov_list,	},
	{	fieldid: "date", "type": "date", "label": "Date",	},
	{	fieldid: "datetime", "type": "datetime", "label": "Date-Time",	},
	{	fieldid: "time", "type": "time", "label": "Time",	},
	{	fieldid: "integer", "type": "integer", "label": "Integer",	},
	{	fieldid: "decimal", "type": "decimal", "label": "Decimal",	},
	{	fieldid: "money", "type": "money", "label": "Money",	},
	{	fieldid: "boolean", "type": "boolean", "label": "Boolean",	},
	{	fieldid: "email", "type": "email", "label": "email",	},
	{	fieldid: "url", "type": "url", "label": "url",	},
	{	fieldid: "document", "type": "document", "label": "Document",	},
	{	fieldid: "image", "type": "image", "label": "Image",	},
	{	fieldid: "content", "type": "content", "label": "Content", }
],

rows: test_data.map((row, x) => ({ ...row, id: x+1 })),
}