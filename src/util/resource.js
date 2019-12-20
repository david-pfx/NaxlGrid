
// https://flatuicolors.com/palette/au

export const palette = [
  '#f6e58d', 
  '#ffbe76', 
  '#ff7979', 
  '#badc58', 
  '#f9ca24', 
  '#f0932b', 
  '#eb4d4b', 
  '#6ab04c', 
  '#7ed6df', 
  '#e056fd', 
  '#686de0', 
  '#30336b', 
  '#95afc0', 
  '#dff9fb', 
  '#c7ecee', 
  '#22a6b3', 
  '#be2edd', 
  '#4834d4', 
  '#130f40', 
  '#535c68', 
];

export const pickColour = (pal,col) => {
  return palette[col % palette.length];
}