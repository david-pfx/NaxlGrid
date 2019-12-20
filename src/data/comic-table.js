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
    id: 'comic',
    label: 'Comics',
    title: 'Comic novels',
    icon: 'comics.png',

    // column information
    fields: [
		{ id: "id", type: "integer", label: "Id", },
        { id: 'title', type: 'text', label: 'Title', required: true },
        { id: 'authors', type: 'text', label: 'Authors' },
        { id: 'genre', type: 'lov', label: 'Genre', list: genre_list },
        { id: 'serie_nb', type: 'integer', label: 'Albums' },
        { id: 'have_nb', type: 'integer', label: 'Owned' },
        { id: 'have', type: 'text', label: 'Have' },
        { id: 'language', type: 'lov', label: 'Language', list: [
            { id: 2, text: 'French', icon: 'flags/fr.png' },
            { id: 1, text: 'English', icon: 'flags/us.png' } ] },
        { id: 'complete', type: 'boolean', label: 'Complete' },
        { id: 'finished', type: 'boolean', label: 'Finished' },
        { id: 'url_bdfugue', type: 'url', label: 'BDFugue' },
        { id: 'url_amazon', type: 'url', width: 38, label: 'Amazon' },
        { id: 'notes', type: 'textmultiline', label: 'Notes' },
        { id: 'pix', type: 'image', label: 'Cover' },
    ],

    data: comic_data.map((row, x) => ({ ...row, id: x+1 })),
}

