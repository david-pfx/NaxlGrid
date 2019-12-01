// Wrap data sources

import comic_table from './data/comic-table';
import settings_table from './data/settings-table';

import album_table from './data/album-table';
import artist_table from './data/artist-table';
import track_table from './data/track-table';


export let loadingSheet = {
  title: 'Loading, please wait...',
  blocks: [],
}

// comics sheet definition

// a sheet has a few properties and is a list of blocks, each with a table
const comic_sheet = {
  title: 'Comic Novels',
  blocks: [
    { kind: 'note', title: 'Information about a collection of comic novels', notes: [ 'this is a note', 'this is another note' ] },
    { kind: 'table', title: 'The actual data tables', tables: [ settings_table, comic_table ] },
  ],
}

const music_sheet = {
  title: 'Music Collection',
  blocks: [
    { kind: 'note', title: 'A collection of musical albums, with artist and track', notes: [ 'this is a note', 'this is another note' ] },
    { kind: 'table', title: 'The actual data tables', tables: [ album_table, artist_table, track_table ] },
  ],
}

export function getSheet(cb) {
  cb(music_sheet);
}

