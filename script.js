(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var c=document.getElementById('sky'),x=c.getContext('2d'),L=[],W,H,sh=null,sy=0;
function init(){W=c.width=innerWidth;H=c.height=innerHeight;L=[];
 [[.00022,.3,.9,.012],[.00012,.7,1.4,.03],[.00005,1.2,2,.06]].forEach(function(d,i){var a=[],n=Math.round(W*H*d[0]*6);for(var k=0;k<n;k++)a.push({x:Math.random()*W,y:Math.random()*H*2,r:d[1]+Math.random()*d[2]*.5,p:Math.random()*6.28,t:Math.random()});L.push({a:a,f:d[3]});});}
function draw(t){x.clearRect(0,0,W,H);
 L.forEach(function(l,i){l.a.forEach(function(s){var y=((s.y-sy*l.f*H*.05)%(H*2)+H*2)%(H*2)-H*.5;if(y<-5||y>H+5)return;
  var o=reduce?.8:.4+.6*Math.abs(Math.sin(s.p+t*.0007*(i+1)));x.fillStyle=(s.t>.82?'rgba(199,176,255,':s.t>.7?'rgba(255,241,207,':'rgba(255,255,255,')+o+')';
  x.beginPath();x.arc(s.x,y,s.r,0,6.28);x.fill();});});
 if(sh){sh.l-=sh.v;sh.x+=sh.v;sh.y+=sh.v*.45;var g=x.createLinearGradient(sh.x,sh.y,sh.x-90,sh.y-40);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');x.strokeStyle=g;x.lineWidth=1.6;x.beginPath();x.moveTo(sh.x,sh.y);x.lineTo(sh.x-90,sh.y-40);x.stroke();if(sh.l<0)sh=null;}}
init();addEventListener('resize',function(){init()});
addEventListener('scroll',function(){sy=scrollY},{passive:true});
if(reduce)draw(0);else{(function f(t){draw(t);requestAnimationFrame(f)})(0);
 setInterval(function(){if(!sh)sh={x:Math.random()*W*.6,y:Math.random()*H*.4,v:9,l:70}},6500);}

var g=window.gsap;
if(g&&window.ScrollTrigger&&!reduce){
 g.registerPlugin(ScrollTrigger);
 g.from('.hero h1 i, .hero h1 span:last-child',{yPercent:115,duration:1.2,ease:'power4.out',stagger:.15});
 g.from('.sub,.hint',{opacity:0,y:14,duration:1,delay:.9,stagger:.25});
 g.to('.n1',{y:200,x:60,scrollTrigger:{scrub:1.5}});g.to('.n2',{y:-240,x:-60,scrollTrigger:{scrub:1.5}});
 var o={v:0},el=document.getElementById('c1');
 ScrollTrigger.create({trigger:el,start:'top 85%',once:true,onEnter:function(){g.to(o,{v:6000,duration:2.4,ease:'power2.out',onUpdate:function(){el.textContent=Math.round(o.v).toLocaleString('es-CL')},onComplete:function(){el.textContent='6.000+'}})}});
 var p=document.getElementById('fermi');p.innerHTML=p.textContent.split(' ').map(function(w){return '<span>'+w+' </span>'}).join('');
 g.to('#fermi span',{opacity:1,stagger:.1,scrollTrigger:{trigger:p,start:'top 80%',end:'bottom 45%',scrub:true}});
 g.fromTo('#gal',{scale:.6,opacity:0,rotate:-30},{scale:1,opacity:1,rotate:0,duration:1.6,ease:'power3.out',scrollTrigger:{trigger:'#gal',start:'top 85%'}});
 g.fromTo('#ring',{scale:1,opacity:.9},{scale:7,opacity:0,duration:2.2,repeat:-1,ease:'power1.out',repeatDelay:.6});
 g.from('.pista',{x:-30,opacity:0,duration:.9,stagger:.2,scrollTrigger:{trigger:'.pista',start:'top 85%'}});
}else{var e=document.getElementById('c1');e.textContent='6.000+';var f=document.getElementById('fermi');f.querySelectorAll&&0;document.querySelectorAll('.pulse span').forEach(function(s){s.style.opacity=1});}

var V=[['Estrellas que nacen por año',.1,10,1],['Fracción con planetas',0,1,.2],['Planetas habitables por sistema',0,5,.1],['Fracción donde surge vida',0,1,.001],['Fracción que desarrolla inteligencia',0,1,.001],['Fracción que emite señales',0,1,.01],['Años que dura una civilización',100,10000,100]];
var box=document.getElementById('drake'),res=document.getElementById('res'),I=[];
V.forEach(function(v){var l=document.createElement('label'),s=document.createElement('span'),n=document.createElement('input');
 n.type='range';n.min=v[1];n.max=v[2];n.step=v[2]>10?100:.001;n.value=v[3];l.textContent=v[0];l.appendChild(s);l.appendChild(n);box.insertBefore(l,res);I.push([n,s]);n.addEventListener('input',calc);});
function calc(){var N=1;I.forEach(function(p){var v=parseFloat(p[0].value);p[1].textContent=v.toLocaleString('es-CL');N*=v;});
 var t=N<.01?'casi cero':N<10?N.toLocaleString('es-CL',{maximumFractionDigits:2}):Math.round(N).toLocaleString('es-CL');
 res.innerHTML=t+'<small>civilizaciones que podríamos detectar en la galaxia</small>';}
function set(a){I.forEach(function(p,i){var o={v:parseFloat(p[0].value)};if(g&&!reduce)g.to(o,{v:a[i],duration:.9,onUpdate:function(){p[0].value=o.v;calc()}});else{p[0].value=a[i]}});calc();}
document.getElementById('bp').onclick=function(){set([1,.2,.1,.001,.001,.01,100])};
document.getElementById('bo').onclick=function(){set([3,1,1,.5,.5,.5,10000])};
calc();
})();
