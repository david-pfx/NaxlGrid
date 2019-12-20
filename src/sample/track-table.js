// track table

import track_data from './track-data'

const genre_list = [
	{ id: 1, text: "Blues" },
	{ id: 2, text: "Classical" },
	{ id: 3, text: "Country" }, 
	{ id: 4, text: "Electronic" },
	{ id: 5, text: "Folk" },
	{ id: 6, text: "Jazz" },
	{ id: 7, text: "New age" },
	{ id: 8, text: "Reggae" }
];

export default {
	tableid: "track",
	label: 'Tracks',
	title: "Music tracks",
  icon: "music.png",
	fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
		{ fieldid: "name", type: "text", label: "Name", required: true, },
		{ fieldid: "album", type: "lookup", label: "Album", target: "album.title" },
		{ fieldid: "length", type: "text", label: "Length", width: 10 },
		{ fieldid: "genre", type: "lov", label: "Genre", list: genre_list },
	],
	data: track_data.map((row, x) => ({ ...row, id: x+1 })),
}