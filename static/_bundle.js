!function(t){var e={};function a(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){const n=a(1);let i={},s=[],o="Morocco";const d=document.getElementById("countries"),l=document.getElementById("spinner");d.addEventListener("change",B);const u=document.getElementById("provinces");u.addEventListener("change",B);document.getElementById("modele").addEventListener("change",(function(t){let e=t.target.options,a=t.target.selectedIndex;k=e[a].value}));const c=document.getElementById("gamaSlider"),h=document.getElementById("betaSlider"),p=document.getElementById("sigmaSlider"),v=document.getElementById("r0Label"),m=document.getElementById("gama"),g=document.getElementById("beta"),b=document.getElementById("sigma"),f=document.getElementById("population");f.addEventListener("input",N);document.getElementById("trainButton").addEventListener("click",(function(){var t=new Headers;l.style.display="inline-block",t.append("Content-Type","application/json"),console.log("Training ...."),e={data:i,model:k,initVals:{gamma:Number.parseFloat(m.value),beta:Number.parseFloat(g.value),sigma:Number.parseFloat(b.value)}};var e=JSON.stringify(e);fetch("/train",{method:"POST",headers:t,body:e,redirect:"follow"}).then(t=>t.text()).then(t=>{r=JSON.parse(t),console.log(r),params=r.params,"SIR"==k||"SIRP"==k?O(I,o,r.y,1):"Logistic"!=k&&"BiLogistic"!=k&&"BiLogisticG"!=k||O(I,"Logistic",r.y,2),l.style.display="none"}).catch(t=>console.log("error",t))})),m.value=c.value,g.value=h.value,b.value=p.value;let y=f.value,E=100;const _=document.getElementById("myCanvas");c.addEventListener("input",N),h.addEventListener("input",N),p.addEventListener("input",N),m.addEventListener("input",N),g.addEventListener("input",N),b.addEventListener("input",N);let I=function(t){return new Chart(t.getContext("2d"),{type:"line",data:{labels:[],datasets:[{label:"Confirmed",data:[],showLine:!1,pointRadius:1,borderColor:"rgba(0, 0, 200, 1)"},{label:"Active",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 200, 0, 1)"},{label:"Géris",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(0, 200, 0, 1)"},{label:"Décés",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 0, 0, 1)"},{label:"C",borderWidth:1,data:[],pointRadius:0,borderColor:"rgba(0, 0, 200, 1)"},{label:"I",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 200, 0, 1)"},{label:"R",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(0, 200, 0, 1)"},{label:"D",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 0, 0, 1)"}]},options:{responsive:!0,legend:{position:"top"},maintainAspectRatio:!1,title:{display:!0,text:""}}})}(_),L=Number.parseFloat(c.value),w=Number.parseFloat(h.value),S=Number.parseFloat(p.value),C=Math.floor(1e3*w/(L+S))/1e3;console.log(C),v.innerHTML=C;let k="SIR";function N(t){function e(t){return Object.assign({},t)}"gamaSlider"===t.target.getAttribute("id")?(L=Number.parseFloat(t.target.value),m.value=L):"betaSlider"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),g.value=w):"sigmaSlider"===t.target.getAttribute("id")?(S=Number.parseFloat(t.target.value),b.value=S):"gama"===t.target.getAttribute("id")?(L=Number.parseFloat(t.target.value),c.value=L):"beta"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),h.value=w):"sigma"===t.target.getAttribute("id")&&(S=Number.parseFloat(t.target.value),p.value=S),y=Number.parseInt(f.value),C=Math.floor(1e3*w/(L+S))/1e3,v.innerHTML=C;var a=function(t,a,r,i,s){var o=n(r,t,a,i),d=a,l=r,u=[],c=[];for(u.push(a),c.push(e(l));!((d+=i)>s);)o=o.step(),c.push(e(o.y)),u.push(d);return{t:u,y:c}}((function(t,e,a){t[0]=-w*e[0]*e[1]/y,t[1]=w*e[0]*e[1]/y-L*e[1]-S*e[1],t[2]=L*e[1],t[3]=S*e[1]}),0,[y-1,1,0,0],1,E);let r=a.t,i=a.y.map(t=>t[1]),s=a.y.map(t=>t[2]),o=a.y.map(t=>t[0]),d=a.y.map(t=>t[3]);O(I,"simulation SIR",{lbl:r,confirmed:o,active:i,recovered:s,deaths:d},1)}let R=new XMLHttpRequest;function B(t){let e=t.target.options,a=t.target.selectedIndex,n=e[a].value;o=e[a].innerHTML;let r=s.filter(t=>t.ISO2==n)[0];y=Number.parseInt(r.Population),r.Provinces&&(provinces=r.Provinces,provinces.forEach(t=>{let e=document.createElement("option");e.setAttribute("value",t),e.textContent=t,u.appendChild(e)})),R.open("GET","/dayone/country/"+n),R.onreadystatechange=()=>{if(4==R.readyState&&200==R.status){let t=JSON.parse(R.response);t=t.filter(t=>"false"==t.Province||""==t.Province),E=t.length,i=function(t){f.value=y;const e=t.map(t=>`${new Date(t.Date).getDate()}/${new Date(t.Date).getMonth()+1}`),a=t.map(t=>y-t.Recovered-t.Deaths-t.Active),n=t.map(t=>t.Active),r=t.map(t=>t.Recovered),i=t.map(t=>t.Deaths),s=t.map(t=>t.Confirmed);return{lbl:e,acc:s,confirmed:a,active:n,recovered:r,deaths:i,population:y}}(t),O(I,o,i,0)}},R.send()}function O(t,e,a,n){switch(t.data.labels=i.lbl,n){case 0:t.data.datasets[0].data=i.acc,t.data.datasets[1].data=i.active,t.data.datasets[2].data=i.recovered,t.data.datasets[3].data=i.deaths,t.data.datasets[4].data=[],t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[];break;case 1:t.data.datasets[0].data=i.acc,t.data.datasets[1].data=i.active,t.data.datasets[2].data=i.recovered,t.data.datasets[3].data=i.deaths,t.data.datasets[4].data=a.acc,t.data.datasets[5].data=a.active,t.data.datasets[6].data=a.recovered,t.data.datasets[7].data=a.deaths;break;case 2:t.data.datasets[4].data=a.acc,t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[],t.data.datasets[1].data=[],t.data.datasets[2].data=[],t.data.datasets[3].data=[]}t.options.title.text=e,t.update()}R.open("GET","/countries",!0),R.onreadystatechange=function(){if(R.readyState==XMLHttpRequest.DONE&&200==R.status){let t=JSON.parse(R.response);d.innerHTML="",t.sort((t,e)=>t.Country>e.Country?1:-1),t.forEach(t=>{if("EH"!=t.ISO2){s.push(t);let e=document.createElement("option");e.setAttribute("value",t.ISO2),e.textContent=t.Country,d.appendChild(e)}}),d.value="MA";let e=document.createEvent("Event");e.initEvent("change",!0,!0),d.dispatchEvent(e)}},R.send()},function(t,e,a){"use strict";t.exports=function(t,e,a,r){return new n(t,e,a,r)};var n=function(t,e,a,n){this.deriv=e,this.y=t,this.n=this.y.length,this.dt=n,this.t=a,this._ctor=this.y.constructor,this._w=new this._ctor(this.n),this._k1=new this._ctor(this.n),this._k2=new this._ctor(this.n),this._k3=new this._ctor(this.n),this._k4=new this._ctor(this.n)};n.prototype.step=function(){this.deriv(this._k1,this.y,this.t);for(var t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k1[t]*this.dt*.5;this.deriv(this._k2,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k2[t]*this.dt*.5;this.deriv(this._k3,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k3[t]*this.dt;this.deriv(this._k4,this._w,this.t+this.dt);var e=this.dt/6;for(t=0;t<this.n;t++)this.y[t]+=e*(this._k1[t]+2*this._k2[t]+2*this._k3[t]+this._k4[t]);return this.t+=this.dt,this},n.prototype.steps=function(t){for(var e=0;e<t;e++)this.step();return this}}]);