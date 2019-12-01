// Album table

import album_data from './album-data'

export default {
	id: "album",
	title: "Albums",
  icon: "cd.png",
	fields: [
		{ id: "title", type: "text", label: "Title", required: true },
		{ id: "url", type: "url", label: "Amazon" },
		{ id: "artist", type: "text", label: "Artist" },
		//{ id: "artist", type: "lov", label: "Artist", object: "artist", required: true, lovtable: "music_artist", lovcolumn: "name" },
		{ id: "description", type: "textmultiline", label: "Description" },
		{ id: "cover", type: "image", label: "Album Cover" }
	],
	data: album_data,
}