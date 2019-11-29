// Wrap data sources

import comic_sheet from './data/comic-sheet';

export let loadingSheet = {
  title: 'Loading, please wait...',
  blocks: [],
}

export function comicSheet(cb) {
  cb(comic_sheet);
}

