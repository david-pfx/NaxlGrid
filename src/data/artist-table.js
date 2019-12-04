
import artist_data from './artist-data'

export default {
	id: "artist",
	title: "Music Artists",
  icon: "star.png",
	fields: [
		{ id: "id", type: "integer", label: "Id", },
		{ id: "name", type: "text", label: "Name"  },
		{ id: "url", type: "url", label: "Web site" },
		{ id: "url_wiki", type: "url_wiki", label: "Wikipedia" },
		{ id: "photo", type: "image", label: "Photo" },
		{ id: "description", type: "textmultiline", label: "Description" },
	],
	data: artist_data.map((row, x) => ({ ...row, id: x+1 })),
}