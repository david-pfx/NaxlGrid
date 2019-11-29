// comics sheet definition

import comic_table from './comic-table';
import settings_table from './settings-table';

// a sheet has a few properties and is a list of blocks, each with a table
export default {
    title: 'Comic Novels',
    subtitle: 'Information about a collection of comic novels',
    blocks: [
    { id: 'settings', kind: 'table', table: settings_table },
    { id: 'comics', kind: 'table', table: comic_table },
    ]
}
