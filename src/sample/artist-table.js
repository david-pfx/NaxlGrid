
import artist_data from './artist-data'

export default {
	tableid: "artist",
	label: 'Artists',
	title: "Music Artists",
	description: "People who perform the music in tis collection.",
  icon: "star.png",
	fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
		{ fieldid: "name", type: "text", label: "Name"  },
		{ fieldid: "url", type: "url", label: "Web site" },
		{ fieldid: "url_wiki", type: "url_wiki", label: "Wikipedia" },
		{ fieldid: "photo", type: "image", label: "Photo" },
		{ fieldid: "description", type: "textmultiline", label: "Description" },
	],
	rows: artist_data,
}