!function(t){var e={};function a(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){const n=a(1);let i={},o=[];const s=document.getElementById("countries"),d=document.getElementById("spinner");s.addEventListener("change",k);const l=document.getElementById("provinces");l.addEventListener("change",k);const u=document.getElementById("gamaSlider"),c=document.getElementById("betaSlider"),p=document.getElementById("sigmaSlider"),h=document.getElementById("r0Label"),v=document.getElementById("gama"),m=document.getElementById("beta"),b=document.getElementById("sigma"),g=document.getElementById("population");g.addEventListener("input",L);document.getElementById("trainButton").addEventListener("click",(function(){var t=new Headers;d.style.display="inline-block",t.append("Content-Type","application/json"),initVals=e={data:i,initVals:{gamma:Number.parseFloat(v.value),beta:Number.parseFloat(m.value),sigma:Number.parseFloat(b.value)}};var e=JSON.stringify(e);fetch("/train",{method:"POST",headers:t,body:e,redirect:"follow"}).then(t=>t.text()).then(t=>{console.log(t),r=JSON.parse(t),params=r.params,O(_,"Morocco",r.y,1),d.style.display="none"}).catch(t=>console.log("error",t))})),v.value=u.value,m.value=c.value,b.value=p.value;let f=g.value,y=100;const E=document.getElementById("myCanvas");u.addEventListener("input",L),c.addEventListener("input",L),p.addEventListener("input",L),v.addEventListener("input",L),m.addEventListener("input",L),b.addEventListener("input",L);let _=function(t){return new Chart(t.getContext("2d"),{type:"line",data:{labels:[],datasets:[{label:"Confirmed",data:[],showLine:!1,pointRadius:1,borderColor:"rgba(0, 0, 200, 1)"},{label:"Active",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 200, 0, 1)"},{label:"Géris",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(0, 200, 0, 1)"},{label:"Décés",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 0, 0, 1)"},{label:"C",borderWidth:1,data:[],pointRadius:0,borderColor:"rgba(0, 0, 200, 1)"},{label:"I",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 200, 0, 1)"},{label:"R",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(0, 200, 0, 1)"},{label:"D",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 0, 0, 1)"}]},options:{responsive:!0,legend:{position:"top"},maintainAspectRatio:!1,title:{display:!0,text:""}}})}(E),w=Number.parseFloat(u.value),C=Number.parseFloat(c.value),S=Number.parseFloat(p.value),I=Math.floor(1e3*C/(w+S))/1e3;function L(t){function e(t){return Object.assign({},t)}"gamaSlider"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),v.value=w):"betaSlider"===t.target.getAttribute("id")?(C=Number.parseFloat(t.target.value),m.value=C):"sigmaSlider"===t.target.getAttribute("id")?(S=Number.parseFloat(t.target.value),b.value=S):"gama"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),u.value=w):"beta"===t.target.getAttribute("id")?(C=Number.parseFloat(t.target.value),c.value=C):"sigma"===t.target.getAttribute("id")&&(S=Number.parseFloat(t.target.value),p.value=S),f=Number.parseInt(g.value),I=Math.floor(1e3*C/(w+S))/1e3,console.log(I),h.innerHTML=I;var a=function(t,a,r,i,o){var s=n(r,t,a,i),d=a,l=r,u=[],c=[];for(u.push(a),c.push(e(l));!((d+=i)>o);)s=s.step(),c.push(e(s.y)),u.push(d);return{t:u,y:c}}((function(t,e,a){t[0]=-C*e[0]*e[1]/f,t[1]=C*e[0]*e[1]/f-w*e[1]-S*e[1],t[2]=w*e[1],t[3]=S*e[1]}),0,[f-1,1,0,0],1,y);let r=a.t,i=a.y.map(t=>t[1]),o=a.y.map(t=>t[2]),s=a.y.map(t=>t[0]),d=a.y.map(t=>t[3]);O(_,"simulation SIR",{lbl:r,confirmed:s,active:i,recovered:o,deaths:d},1)}console.log(I),h.innerHTML=I;let N=new XMLHttpRequest;function k(t){let e=t.target.options,a=t.target.selectedIndex,n=e[a].value,r=e[a].innerHTML,s=o.filter(t=>t.ISO2==n)[0];f=Number.parseInt(s.Population),s.Provinces&&(provinces=s.Provinces,provinces.forEach(t=>{let e=document.createElement("option");e.setAttribute("value",t),e.textContent=t,l.appendChild(e)})),console.log(provinces[1]),N.open("GET","/dayone/country/"+n),N.onreadystatechange=()=>{if(4==N.readyState&&200==N.status){let t=JSON.parse(N.response);console.log("response00: ",t),y=t.length,console.log("response1: ",t),i=function(t){g.value=f;const e=t.map(t=>`${new Date(t.Date).getDate()}/${new Date(t.Date).getMonth()+1}`),a=t.map(t=>f-t.Recovered-t.Deaths-t.Active),n=t.map(t=>t.Active),r=t.map(t=>t.Recovered),i=t.map(t=>t.Deaths),o=t.map(t=>t.Confirmed);return{lbl:e,acc:o,confirmed:a,active:n,recovered:r,deaths:i,population:f}}(t),console.log("response2: ",t),O(_,r,i,0)}},N.send()}function O(t,e,a,n){switch(t.data.labels=a.lbl,n){case 0:t.data.datasets[0].data=a.acc,t.data.datasets[1].data=a.active,t.data.datasets[2].data=a.recovered,t.data.datasets[3].data=a.deaths,t.data.datasets[4].data=[],t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[];break;case 1:t.data.datasets[4].data=a.acc,t.data.datasets[5].data=a.active,t.data.datasets[6].data=a.recovered,t.data.datasets[7].data=a.deaths}t.options.title.text=e,t.update()}N.open("GET","/countries",!0),N.onreadystatechange=function(){if(N.readyState==XMLHttpRequest.DONE&&200==N.status){let t=JSON.parse(N.response);s.innerHTML="",t.sort((t,e)=>t.Country>e.Country?1:-1),t.forEach(t=>{if("EH"!=t.ISO2){o.push(t);let e=document.createElement("option");e.setAttribute("value",t.ISO2),e.textContent=t.Country,s.appendChild(e)}}),s.value="MA";let e=document.createEvent("Event");e.initEvent("change",!0,!0),s.dispatchEvent(e)}},N.send()},function(t,e,a){"use strict";t.exports=function(t,e,a,r){return new n(t,e,a,r)};var n=function(t,e,a,n){this.deriv=e,this.y=t,this.n=this.y.length,this.dt=n,this.t=a,this._ctor=this.y.constructor,this._w=new this._ctor(this.n),this._k1=new this._ctor(this.n),this._k2=new this._ctor(this.n),this._k3=new this._ctor(this.n),this._k4=new this._ctor(this.n)};n.prototype.step=function(){this.deriv(this._k1,this.y,this.t);for(var t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k1[t]*this.dt*.5;this.deriv(this._k2,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k2[t]*this.dt*.5;this.deriv(this._k3,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k3[t]*this.dt;this.deriv(this._k4,this._w,this.t+this.dt);var e=this.dt/6;for(t=0;t<this.n;t++)this.y[t]+=e*(this._k1[t]+2*this._k2[t]+2*this._k3[t]+this._k4[t]);return this.t+=this.dt,this},n.prototype.steps=function(t){for(var e=0;e<t;e++)this.step();return this}}]);