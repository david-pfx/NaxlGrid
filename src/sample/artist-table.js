
import artist_data from './artist-data'

export default {
	tableid: "artist",
	label: 'Artists',
	title: "Music Artists",
  icon: "star.png",
	fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
		{ fieldid: "name", type: "text", label: "Name"  },
		{ fieldid: "url", type: "url", label: "Web site" },
		{ fieldid: "url_wiki", type: "url_wiki", label: "Wikipedia" },
		{ fieldid: "photo", type: "image", label: "Photo" },
		{ fieldid: "description", type: "textmultiline", label: "Description" },
	],
	rows: artist_data.map((row, x) => ({ ...row, id: x+1 })),
}