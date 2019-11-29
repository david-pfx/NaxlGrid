// Wrap data sources

import comic_sheet from './data/comic-sheet';

export let loadingSheet = [
  {
      type: 'scalar', 
      value: 'Loading, please wait...',
  },
]

export let tuple_fields = [
  {
    id: 'label', type: 'text', label: 'Label', width: 25, 
  },
  {
    id: 'value', type: 'text', label: 'Value', width: 100, 
  },
]

export function comicSheet(cb) {
  cb(comic_sheet);
}

