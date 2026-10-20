// Original generated atlas. Coordinates use its 1280-unit design space.
const ATLAS_URL='assets/environment/garden-atlas-v04.png';
const SPRITES=[
 [24,50,290,425],[344,50,295,425],[650,65,290,410],[955,85,300,390],
 [0,535,320,300],[320,480,325,355],[646,555,300,282],[950,540,325,302],
 [0,850,324,345],[325,850,319,345],[648,845,297,350],[944,924,330,278]
];
export class Art{
 constructor(){this.ready=false;this.image=new Image();this.image.onload=()=>{this.ready=true;};this.image.onerror=()=>{document.getElementById('tip').textContent='Не удалось загрузить рисунки. Попробуй открыть игру ещё раз.';};this.image.src=ATLAS_URL;}
 draw(index,c,x,y,width,height){if(!this.ready)return;const r=SPRITES[index],k=this.image.naturalWidth/1280,scale=Math.min(width/r[2],height/r[3]),w=r[2]*scale,h=r[3]*scale;c.drawImage(this.image,r[0]*k,r[1]*k,r[2]*k,r[3]*k,x-w/2,y-h/2,w,h);}
}
