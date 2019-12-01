// track table

import trackData from './track-data'

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
	title: "Tracks",
  icon: "music.png",
	fields: [
		{ id: "name", type: "text", label: "Name", required: true, },
		{ id: "album", type: "text", label: "Album" },
		//{ id: "album", type: "lov", label: "Album", object: "album", lovtable: "music_album", lovcolumn: "title" },
		{ id: "length", type: "text", label: "Length", },
		{ id: "genre", type: "lov", label: "Genre", list: genre_list,
		}
	],
	data: trackData,
}