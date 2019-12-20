// comics table definition

import comic_data from './comic-data';

const genre_list = [
    { id: 1, text: 'Adventure' },
    { id: 2, text: 'Fairy tale' },
    { id: 3, text: 'Erotic' },
    { id: 4, text: 'Fantastic' },
    { id: 5, text: 'Heroic Fantasy' },
    { id: 6, text: 'Historic' },
    { id: 7, text: 'Humor' },
    { id: 8, text: 'One of a kind' },
    { id: 9, text: 'Youth' },
    { id: 10, text: 'Thriller' },
    { id: 11, text: 'Science-fiction' },
    { id: 12, text: 'Super Heros' },
    { id: 13, text: 'Western' },
    { id: 14, text: 'Crime' }
];

export default {
    // heading information
    tableid: 'comic',
    label: 'Comics',
    title: 'Comic novels',
    icon: 'comics.png',

    // column information
    fields: [
		{ fieldid: "id", type: "integer", label: "Id", },
        { fieldid: 'title', type: 'text', label: 'Title', required: true },
        { fieldid: 'authors', type: 'text', label: 'Authors' },
        { fieldid: 'genre', type: 'lov', label: 'Genre', list: genre_list },
        { fieldid: 'serie_nb', type: 'integer', label: 'Albums' },
        { fieldid: 'have_nb', type: 'integer', label: 'Owned' },
        { fieldid: 'have', type: 'text', label: 'Have' },
        { fieldid: 'language', type: 'lov', label: 'Language', list: [
            { id: 2, text: 'French', icon: 'flags/fr.png' },
            { id: 1, text: 'English', icon: 'flags/us.png' } ] },
        { fieldid: 'complete', type: 'boolean', label: 'Complete' },
        { fieldid: 'finished', type: 'boolean', label: 'Finished' },
        { fieldid: 'url_bdfugue', type: 'url', label: 'BDFugue' },
        { fieldid: 'url_amazon', type: 'url', width: 38, label: 'Amazon' },
        { fieldid: 'notes', type: 'textmultiline', label: 'Notes' },
        { fieldid: 'pix', type: 'image', label: 'Cover' },
    ],

    data: comic_data.map((row, x) => ({ ...row, id: x+1 })),
}

