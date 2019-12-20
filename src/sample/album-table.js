// Album table

import album_data from './album-data'

export default {
	tableid: "album",
	label: 'Albums',
	title: "Music Albums",
  icon: "cd.png",
	fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
		{ fieldid: "title", type: "text", label: "Title", required: true },
		{ fieldid: "url", type: "url", label: "Amazon" },
		{ fieldid: "artist", type: "lookup", label: "Artist", target: "artist.name" },
		{ fieldid: "description", type: "textmultiline", label: "Description" },
		{ fieldid: "cover", type: "image", label: "Album Cover" }
	],
	data: album_data.map((row, x) => ({ ...row, id: x+1 })),
}