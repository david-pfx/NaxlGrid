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
	id: "track",
	label: 'Tracks',
	title: "Music tracks",
  icon: "music.png",
	fields: [
		{ id: "id", type: "integer", label: "Id", },
		{ id: "name", type: "text", label: "Name", required: true, },
		{ id: "album", type: "lookup", label: "Album", target: "album.title" },
		{ id: "length", type: "text", label: "Length", width: 10 },
		{ id: "genre", type: "lov", label: "Genre", list: genre_list,
		}
	],
	data: track_data.map((row, x) => ({ ...row, id: x+1 })),
}