// The screen axes match the grid axes: x increases right, y increases down.
export function boardView(width,height,cols,rows){
 const size=Math.max(1,Math.min((width-24)/cols,(height-24)/rows,110));
 const left=(width-cols*size)/2,top=(height-rows*size)/2;
 return {size,left,top,project:(x,y)=>[left+(x+.5)*size,top+(y+.5)*size]};
}
