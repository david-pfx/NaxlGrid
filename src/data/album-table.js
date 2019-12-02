// Album table

import album_data from './album-data'

export default {
	id: "album",
	title: "Albums",
  icon: "cd.png",
	fields: [
		{ id: "id", type: "integer", label: "Id", },
		{ id: "title", type: "text", label: "Title", required: true },
		{ id: "url", type: "url", label: "Amazon" },
		{ id: "artist", type: "lookup", label: "Artist", target: "artist.name" },
		{ id: "description", type: "textmultiline", label: "Description" },
		{ id: "cover", type: "image", label: "Album Cover" }
	],
	data: album_data.map((row, x) => ({ ...row, id: x+1 })),
}