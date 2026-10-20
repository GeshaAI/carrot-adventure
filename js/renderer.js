import {Art} from './art.js';
import {boardView} from './view.js';
import {levels} from './levels.js';
import {visualPosition} from './player.js';
export class Renderer{
 constructor(canvas,game){this.cv=canvas;this.c=canvas.getContext('2d');this.game=game;this.art=new Art();this.last=0;this.time=0;this.resize=()=>{const r=canvas.getBoundingClientRect();this.w=r.width;this.h=r.height;const d=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);this.c.setTransform(d,0,0,d,0,0);};new ResizeObserver(this.resize).observe(canvas);this.resize();}
 poly(ps,fill,stroke){const c=this.c;c.beginPath();ps.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.8;c.stroke();}}
 oval(x,y,a,b,color){const c=this.c;c.beginPath();c.ellipse(x,y,Math.max(.01,a),Math.max(.01,b),0,0,Math.PI*2);c.fillStyle=color;c.fill();}
 line(x,y,u,v,col,width=1){const c=this.c;c.beginPath();c.moveTo(x,y);c.lineTo(u,v);c.strokeStyle=col;c.lineWidth=width;c.lineCap='round';c.stroke();}
 grad(x,y,r,a,b){const g=this.c.createRadialGradient(x-r*.3,y-r*.4,r*.05,x,y,r);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
 stone(x,y,z,seed){if(this.art.ready){this.art.draw(seed%3===0?4:6,this.c,x,y-z*.32,z*1.75,z*1.5);return;}this.oval(x+z*.15,y+z*.1,z*.65,z*.23,'#153a3655');this.poly([[x-z*.6,y-z*.15],[x-z*.38,y-z*.85],[x+z*.25,y-z],[x+z*.62,y-z*.5],[x+z*.46,y+z*.05],[x-z*.22,y+z*.18]],'#6b8278');this.poly([[x-z*.6,y-z*.15],[x-z*.38,y-z*.85],[x+z*.25,y-z],[x+z*.1,y-z*.38]],'#b3c1a0');this.poly([[x+z*.1,y-z*.38],[x+z*.25,y-z],[x+z*.62,y-z*.5],[x+z*.46,y+z*.05]],'#879b89');this.oval(x-z*.22,y-z*.72,z*.21,z*.1,'#9db45e');this.line(x+z*.15,y-z*.2,x+z*.31,y-z*.4,'#d7d4b355',1);}
 tree(x,y,z,seed){if(this.art.ready){this.art.draw(5,this.c,x,y-z*.85,z*3.4,z*3.4);return;}const c=this.c;this.oval(x+z*.5,y+z*.15,z*1.15,z*.35,'#0a30314a');this.line(x,y,x-z*.12,y-z*1.4,'#705b3d',z*.22);this.line(x,y-z*.65,x+z*.4,y-z*1.25,'#877445',z*.12);for(let j=0;j<5;j++){let u=x+Math.sin(j*2.4+seed)*z*.48,v=y-z*1.7+Math.cos(j*2.4)*z*.4;this.oval(u,v,z*.72,z*.66,this.grad(u,v,z*.8,j%2?'#bbd86d':'#94c768','#2e7651'));}this.oval(x-z*.2,y-z*2.12,z*.28,z*.1,'#dfed9f55');}
 flower(x,y,z,k){if(this.art.ready){this.art.draw(7,this.c,x,y-z*.11,z*.55,z*.55);return;}this.line(x,y,x,y-z*.19,'#3f8041',1);for(let i=0;i<5;i++)this.oval(x+Math.cos(i*1.257)*z*.065,y-z*.2+Math.sin(i*1.257)*z*.055,z*.052,z*.045,k%2?'#ffd7bd':'#e8e6ff');this.oval(x,y-z*.2,z*.035,z*.033,'#ffd068');}
 carrot(x,y,z,now){if(this.art.ready){this.art.draw(3,this.c,x,y-z*.14+Math.sin(now*3+x)*z*.025,z*.85,z*1.05);return;}const c=this.c,b=Math.sin(now*3+x)*z*.035;this.oval(x,y+z*.09,z*.24,z*.1,'#264e3b44');c.save();c.translate(x,y-z*.27+b);c.rotate(-.35);this.poly([[-z*.17,-z*.17],[z*.13,-z*.2],[z*.16,-z*.06],[0,z*.32],[-z*.14,z*.04]],'#eb7526','#ffe39c');this.line(-z*.06,-z*.12,-z*.03,z*.13,'#ffc65d',z*.06);for(let j=0;j<3;j++)this.line(0,-z*.18,(j-1)*z*.2,-z*(.4+(j%2)*.08),'#4e913d',z*.07);this.line(z*.07,0,z*.12,-z*.02,'#be5923',1);c.restore();}
 bunny(x,y,z,hop,now,win,trap){if(this.art.ready){const c=this.c;this.oval(x,y+z*.08,z*.43*(1-hop*.2),z*.14,'#304d3b44');c.save();c.translate(x,y-z*.55-hop*z*.3-(win?Math.abs(Math.sin(now*6))*z*.12:0));c.rotate(trap?Math.sin(now*30)*.07:Math.sin(now*2)*.012);this.art.draw(hop>.25||win?1:now%4.8>4.62?2:0,c,0,0,z*1.55,z*1.95);c.restore();return;}const c=this.c;this.oval(x+z*.08,y+z*.1,z*.37*(1-hop*.18),z*.14,'#123e3860');y-=hop*z*.3+(win?Math.abs(Math.sin(now*7))*z*.18:0);c.save();c.translate(x,y);if(trap)c.rotate(Math.sin(now*35)*.12);const fur=this.grad(-z*.08,-z*.52,z*.6,'#fffdf1','#c5ddd5');this.oval(z*.3,-z*.23,z*.14,z*.14,'#fffbed');this.oval(-z*.15,z*.04,z*.19,z*.09,'#d5e3d9');this.oval(z*.15,z*.04,z*.19,z*.09,'#f9f7e9');this.oval(0,-z*.27,z*.31,z*.36,fur);const wig=Math.sin(now*3)*.055;c.save();c.rotate(wig);this.oval(-z*.16,-z*.97,z*.112,z*.38,fur);this.oval(-z*.16,-z*.99,z*.053,z*.27,'#e9acb2');c.restore();c.save();c.rotate(-wig);this.oval(z*.16,-z*.95,z*.108,z*.36,fur);this.oval(z*.16,-z*.97,z*.05,z*.25,'#edb8bc');c.restore();this.oval(0,-z*.58,z*.35,z*.29,fur);this.oval(-z*.23,-z*.48,z*.09,z*.05,'#efb4b05c');this.oval(z*.23,-z*.48,z*.09,z*.05,'#efb4b05c');let blink=(now%4.7)>4.54;for(const sign of [-1,1]){this.oval(sign*z*.13,-z*.62,z*.072,blink?z*.012:z*.09,'#223c3b');if(!blink)this.oval(sign*z*.13-z*.016,-z*.65,z*.025,z*.026,'#fffdf1');this.line(sign*z*.24,-z*.45,sign*z*.4,-z*.48,'#a1b7aa',.7);}this.oval(0,-z*.49,z*.046,z*.033,'#d78d99');this.line(0,-z*.46,0,-z*.43,'#819790',1);this.oval(-z*.22,-z*.17,z*.09,z*.14,'#fffbed');this.oval(z*.22,-z*.17,z*.09,z*.14,'#fffbed');c.restore();}
 terrain(view,l,index){
 const d=view.size,key=`${d}:${index}`;
 if(this.terrainKey!==key){
 this.terrainKey=key;const tile=document.createElement('canvas');tile.width=Math.ceil(l.map[0].length*d);tile.height=Math.ceil(l.map.length*d);const c=tile.getContext('2d'),w=tile.width,h=tile.height;let seed=37461+index*3457;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#94bd61');bg.addColorStop(.5,'#7ead53');bg.addColorStop(1,'#709d48');c.fillStyle=bg;c.fillRect(0,0,w,h);
 for(let i=0;i<130;i++){const x=rand()*w,y=rand()*h,r=rand()*d+d*.3,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,i%2?'#c0d99122':'#3c7c3922');g.addColorStop(1,'#85b25800');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
 const floor=(x,y)=>l.map[y]?.[x]&&!'#~'.includes(l.map[y][x]);
 const path=(color,width)=>{c.strokeStyle=color;c.fillStyle=color;c.lineWidth=d*width;c.lineCap='round';c.lineJoin='round';for(let y=0;y<l.map.length;y++)for(let x=0;x<l.map[y].length;x++){if(!floor(x,y))continue;const a=(x+.5)*d,b=(y+.5)*d;c.beginPath();c.arc(a,b,d*width/2,0,Math.PI*2);c.fill();for(const [dx,dy]of [[1,0],[0,1]])if(floor(x+dx,y+dy)){c.beginPath();c.moveTo(a,b);c.lineTo(a+dx*d,b+dy*d);c.stroke();}}};
 path('#698d4350',.76);path('#dfcc91',.66);path('#e8d9ac',.54);
 for(let y=0;y<l.map.length;y++)for(let x=0;x<l.map[y].length;x++)if(floor(x,y))for(let k=0;k<14;k++){const a=(x+.2+rand()*.6)*d,b=(y+.2+rand()*.6)*d;c.fillStyle=k%2?'#a5906040':'#fff3cc66';c.beginPath();c.ellipse(a,b,d*(.008+rand()*.015),d*.009,rand()*3,0,Math.PI*2);c.fill();}
 for(let i=0;i<w*h/110;i++){const a=rand()*w,b=rand()*h,x=Math.floor(a/d),y=Math.floor(b/d);if(floor(x,y)||l.map[y]?.[x]==='~')continue;c.strokeStyle=i%2?'#b8d67880':'#427a3780';c.lineWidth=.7;c.beginPath();c.moveTo(a,b);c.lineTo(a-1,b-2-rand()*3);c.moveTo(a,b);c.lineTo(a+2,b-3);c.stroke();}
 this.terrainCanvas=tile;
 }
 this.c.drawImage(this.terrainCanvas,view.left,view.top);
 }
 draw(now){
 const g=this.game;if(!g.paused)this.time=now/1000;
 const t=this.time,c=this.c,W=this.w,H=this.h,s=g.state,l=levels[s.index];
 const view=boardView(W,H,l.map[0].length,l.map.length),d=view.size,z=d*.52;
 const point=view.project;
 c.clearRect(0,0,W,H);
 const bg=c.createRadialGradient(W*.4,H*.3,1,W*.5,H*.5,Math.max(W,H)*.7);
 const themes=[['#e7efce','#c3d6a2'],['#e3ecd5','#b5caa4'],['#e7ead4','#b6c9ac'],['#deecdb','#adcbab'],['#f1e9ca','#d0d5a6']];bg.addColorStop(0,themes[s.index][0]);bg.addColorStop(1,themes[s.index][1]);c.fillStyle=bg;c.fillRect(0,0,W,H);
 c.save();c.shadowColor='#071e2877';c.shadowBlur=18;c.shadowOffsetY=7;c.fillStyle='#526044';c.beginPath();c.roundRect(view.left-3,view.top-3,l.map[0].length*d+6,l.map.length*d+6,12);c.fill();c.restore();
 this.terrain(view,l,s.index);
 // All cells are axis aligned. Decorations stay inside their own cells.
 for(let y=0;y<l.map.length;y++)for(let x=0;x<l.map[y].length;x++){
 const ch=l.map[y][x],[a,b]=point(x,y),seed=(x*17+y*31)%11,water=ch==='~'||ch==='=';
 const ground=c.createLinearGradient(a-d/2,b-d/2,a+d/2,b+d/2);
 ground.addColorStop(0,water?'#74bdc0':['#a0c97c','#94be70','#a5cb82'][seed%3]);ground.addColorStop(1,water?'#428d9d':['#7eaa5e','#83af62','#86b266'][seed%3]);
 if(water){c.fillStyle=ground;c.fillRect(a-d/2,b-d/2,d+.5,d+.5);}
 
 if(water){for(let k=0;k<3;k++){const q=Math.sin(t*2+x+k)*d*.06;this.line(a-d*.32+q,b-d*.3+k*d*.3,a+d*.2+q,b-d*.3+k*d*.3,'#d4f2e17a',1.3);}if(ch==='='){c.fillStyle='#775a39';c.fillRect(a-d*.34,b-d*.5,d*.68,d);for(let k=0;k<6;k++){c.fillStyle=k%2?'#d5b476':'#bb945d';c.fillRect(a-d*.31,b-d*.5+k*d/6+1,d*.62,d/6-2);}this.line(a-d*.34,b-d*.5,a-d*.34,b+d*.5,'#f1d49c',2);this.line(a+d*.34,b-d*.5,a+d*.34,b+d*.5,'#f1d49c',2);}}
 else{for(let k=0;k<3;k++){const u=a+Math.sin(seed+k*8)*d*.36,v=b+Math.cos(seed+k*5)*d*.34;this.line(u,v,u+d*.025,v-d*.055,'#4e8b453d',1);}if(ch!== '#')this.oval(a,b,d*.29,d*.26,'#ded19a19');}
if(ch==='#'){if((x===0||y===0)&&seed%3===0)this.tree(a,b+d*.24,d*.26,seed);else this.stone(a,b+d*.2,d*.55,seed);}
 if(ch==='C'&&s.remaining.includes(`${x},${y}`))this.carrot(a,b+d*.12,d*.65,t);
 if(ch==='A'||ch==='B'){const active=s.gates&(ch==='A'?1:2);c.fillStyle=active?'#7bd7b0':ch==='A'?'#edc069':'#80c7dc';c.beginPath();c.roundRect(a-d*.31,b-d*.31,d*.62,d*.62,d*.12);c.fill();c.strokeStyle='#f9efc4';c.stroke();c.fillStyle='#3e6451';c.font=`bold ${d*.25}px system-ui`;c.textAlign='center';c.textBaseline='middle';c.fillText(ch,a,b);}
 if((ch==='a'||ch==='b')&&this.art.ready){const open=s.gates&(ch==='a'?1:2);this.art.draw(open?9:8,c,a,b,d*.92,d*.91);}else if(ch==='a'||ch==='b'){const open=s.gates&(ch==='a'?1:2);this.line(a-d*.37,b+d*.26,a-d*.37,b-d*.3,'#bfa475',d*.09);this.line(a+d*.37,b+d*.26,a+d*.37,b-d*.3,'#bfa475',d*.09);const opening=open&&g.animation?.event==='gate'?Math.max(0,1-(now-g.animation.start)/450):0;if(!open||opening>0){c.save();c.globalAlpha=open?opening:1;for(let k=-2;k<=2;k++)this.line(a+k*d*.13,b+d*.2,a+k*d*.13,b-d*.25,'#9d6e41',d*.08);this.line(a-d*.32,b+d*.1,a+d*.32,b-d*.17,'#e3bc79',d*.05);c.restore();}c.fillStyle=ch==='a'?'#f5ce7a':'#8ed7e7';this.oval(a-d*.37,b-d*.31,d*.06,d*.06,c.fillStyle);}
 if(ch==='S'&&this.art.ready){this.art.draw(11,c,a,b+d*.02,d*.88,d*.82);}else if(ch==='S'){this.oval(a,b+d*.08,d*.36,d*.22,'#59614b');for(let k=-1;k<=1;k++)this.poly([[a+k*d*.21-d*.09,b+d*.2],[a+k*d*.21,b-d*.28],[a+k*d*.21+d*.09,b+d*.2]],'#d4dbd0','#f8f1d6');}
 if(ch==='K'&&this.art.ready){this.art.draw(10,c,a,b,d*.88,d*.91);}else if(ch==='K'){this.line(a-d*.1,b+d*.29,a-d*.1,b-d*.35,'#ddc795',d*.04);this.poly([[a-d*.1,b-d*.35],[a+d*.27,b-d*.24+Math.sin(t*4)*d*.02],[a-d*.1,b-d*.08]],'#ee9b54','#ffe0a0');this.oval(a,b+d*.31,d*.23,d*.07,'#eed9a855');}
 if(ch==='E'&&this.art.ready){const ready=!s.remaining.length;if(ready){const glow=c.createRadialGradient(a,b,1,a,b,d*.6);glow.addColorStop(0,'#fff2b599');glow.addColorStop(1,'#ffdc6100');c.fillStyle=glow;c.fillRect(a-d*.6,b-d*.6,d*1.2,d*1.2);}this.art.draw(ready?9:8,c,a,b,d*.95,d*.95);}else if(ch==='E'){const ready=!s.remaining.length;this.oval(a,b+d*.25,d*.34,d*.12,ready?'#f5d67577':'#7db9a255');for(const k of [-1,1])this.line(a+k*d*.27,b+d*.25,a+k*d*.27,b-d*.22,'#e2c77f',d*.09);c.beginPath();c.ellipse(a,b-d*.21,d*.27,d*.18,0,Math.PI,Math.PI*2);c.strokeStyle='#f4d993';c.lineWidth=d*.09;c.stroke();this.oval(a,b-d*.01,d*.2,d*.29,this.grad(a,b,d*.4,ready?'#fff6aa':'#add7bb',ready?'#d9a64b':'#488f78'));}
 if(ch==='.'&&(seed===2||seed===5))this.flower(a+d*.33,b+d*.35,d*.6,seed);
if(ch==='#'&&seed===4)this.flower(a+d*.32,b+d*.32,d*.6,seed);

 }
 const v=visualPosition(g,now),[a,b]=point(v.x,v.y);
 // Upright character fits inside one straight cell, including ears.
 this.bunny(a,b+d*.32,z,v.hop,t,s.won,g.animation?.event==='trap'&&now-g.animation.start<450);
 if(g.animation?.event==='carrot'&&now-g.animation.start<500){const q=(now-g.animation.start)/500;for(let k=0;k<6;k++)this.oval(a+Math.cos(k*1.047)*d*.4*q,b+Math.sin(k*1.047)*d*.4*q,2*(1-q)+.1,2*(1-q)+.1,'#ffe78b');}
 if(s.won)for(let i=0;i<65;i++){c.fillStyle=['#ffe180','#f0b9a7','#cbe69a'][i%3];c.fillRect((i*97+t*22)%W,(i*71+t*(25+i%7))%H,3,6);}
 }
 start(){const tick=n=>{if(n-this.last>=30){this.draw(n);this.last=n;}requestAnimationFrame(tick);};requestAnimationFrame(tick);}
}
