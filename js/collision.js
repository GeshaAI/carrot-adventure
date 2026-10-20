export const directions={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
export function cell(level,x,y){return level.map[y]?.[x] ?? '#';}
export function canEnter(level,x,y,gates){const c=cell(level,x,y);return c!=='#'&&c!=='~'&&(c!=='a'||(gates&1))&&(c!=='b'||(gates&2));}
