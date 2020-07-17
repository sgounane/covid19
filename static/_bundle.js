!function(t){var e={};function a(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){const n=a(1);let s={},i=[],o="Morocco";const d=document.getElementsByClassName("algo");console.log(d);const l=document.getElementById("countries"),u=document.getElementById("spinner");l.addEventListener("change",O);const c=document.getElementById("provinces");c.addEventListener("change",O);document.getElementById("modele").addEventListener("change",(function(t){let e=t.target.options,a=t.target.selectedIndex;k=e[a].value}));const h=document.getElementById("gamaSlider"),p=document.getElementById("betaSlider"),v=document.getElementById("sigmaSlider"),m=document.getElementById("r0Label"),g=document.getElementById("gama"),b=document.getElementById("beta"),f=document.getElementById("sigma"),y=document.getElementById("population");y.addEventListener("input",B);document.getElementById("trainButton").addEventListener("click",(function(){var t=new Headers;u.style.display="inline-block",t.append("Content-Type","application/json"),console.log("Training ...."),e={data:s,model:k,initVals:{gamma:Number.parseFloat(g.value),beta:Number.parseFloat(b.value),sigma:Number.parseFloat(f.value)}};var e=JSON.stringify(e);fetch("/train",{method:"POST",headers:t,body:e,redirect:"follow"}).then(t=>t.text()).then(t=>{r=JSON.parse(t),console.log(r),params=r.params,"SIR"==k||"SIRP"==k?M(L,o,r.y,1):"Logistic"!=k&&"BiLogistic"!=k&&"BiLogisticG"!=k||M(L,"Logistic",r.y,2),u.style.display="none"}).catch(t=>console.log("error",t))})),g.value=h.value,b.value=p.value,f.value=v.value;let E=y.value,_=100;const I=document.getElementById("myCanvas");h.addEventListener("input",B),p.addEventListener("input",B),v.addEventListener("input",B),g.addEventListener("input",B),b.addEventListener("input",B),f.addEventListener("input",B);let L=function(t){return new Chart(t.getContext("2d"),{type:"line",data:{labels:[],datasets:[{label:"Confirmed",data:[],showLine:!1,pointRadius:1,borderColor:"rgba(0, 0, 200, 1)"},{label:"Active",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 200, 0, 1)"},{label:"Géris",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(0, 200, 0, 1)"},{label:"Décés",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 0, 0, 1)"},{label:"C",borderWidth:1,data:[],pointRadius:0,borderColor:"rgba(0, 0, 200, 1)"},{label:"I",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 200, 0, 1)"},{label:"R",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(0, 200, 0, 1)"},{label:"D",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 0, 0, 1)"}]},options:{responsive:!0,legend:{position:"top"},maintainAspectRatio:!1,title:{display:!0,text:""}}})}(I),w=Number.parseFloat(h.value),S=Number.parseFloat(p.value),C=Number.parseFloat(v.value),N=Math.floor(1e3*S/(w+C))/1e3;console.log(N),m.innerHTML=N;let k="SIR";function B(t){function e(t){return Object.assign({},t)}"gamaSlider"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),g.value=w):"betaSlider"===t.target.getAttribute("id")?(S=Number.parseFloat(t.target.value),b.value=S):"sigmaSlider"===t.target.getAttribute("id")?(C=Number.parseFloat(t.target.value),f.value=C):"gama"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),h.value=w):"beta"===t.target.getAttribute("id")?(S=Number.parseFloat(t.target.value),p.value=S):"sigma"===t.target.getAttribute("id")&&(C=Number.parseFloat(t.target.value),v.value=C),E=Number.parseInt(y.value),N=Math.floor(1e3*S/(w+C))/1e3,m.innerHTML=N;var a=function(t,a,r,s,i){var o=n(r,t,a,s),d=a,l=r,u=[],c=[];for(u.push(a),c.push(e(l));!((d+=s)>i);)o=o.step(),c.push(e(o.y)),u.push(d);return{t:u,y:c}}((function(t,e,a){t[0]=-S*e[0]*e[1]/E,t[1]=S*e[0]*e[1]/E-w*e[1]-C*e[1],t[2]=w*e[1],t[3]=C*e[1]}),0,[E-1,1,0,0],1,_);let r=a.t,s=a.y.map(t=>t[1]),i=a.y.map(t=>t[2]),o=a.y.map(t=>t[0]),d=a.y.map(t=>t[3]);M(L,"simulation SIR",{lbl:r,confirmed:o,active:s,recovered:i,deaths:d},1)}let R=new XMLHttpRequest;function O(t){let e=t.target.options,a=t.target.selectedIndex,n=e[a].value;o=e[a].innerHTML;let r=i.filter(t=>t.ISO2==n)[0];E=Number.parseInt(r.Population),r.Provinces&&(provinces=r.Provinces,provinces.forEach(t=>{let e=document.createElement("option");e.setAttribute("value",t),e.textContent=t,c.appendChild(e)})),R.open("GET","/dayone/country/"+n),R.onreadystatechange=()=>{if(4==R.readyState&&200==R.status){let t=JSON.parse(R.response);t=t.filter(t=>"false"==t.Province||""==t.Province),_=t.length,s=function(t){y.value=E;const e=t.map(t=>`${new Date(t.Date).getDate()}/${new Date(t.Date).getMonth()+1}`),a=t.map(t=>E-t.Recovered-t.Deaths-t.Active),n=t.map(t=>t.Active),r=t.map(t=>t.Recovered),s=t.map(t=>t.Deaths),i=t.map(t=>t.Confirmed);return{lbl:e,acc:i,confirmed:a,active:n,recovered:r,deaths:s,population:E}}(t),M(L,o,s,0)}},R.send()}function M(t,e,a,n){switch(t.data.labels=s.lbl,n){case 0:t.data.datasets[0].data=s.acc,t.data.datasets[1].data=s.active,t.data.datasets[2].data=s.recovered,t.data.datasets[3].data=s.deaths,t.data.datasets[4].data=[],t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[];break;case 1:t.data.datasets[0].data=s.acc,t.data.datasets[1].data=s.active,t.data.datasets[2].data=s.recovered,t.data.datasets[3].data=s.deaths,t.data.datasets[4].data=a.acc,t.data.datasets[5].data=a.active,t.data.datasets[6].data=a.recovered,t.data.datasets[7].data=a.deaths;break;case 2:t.data.datasets[4].data=a.acc,t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[],t.data.datasets[1].data=[],t.data.datasets[2].data=[],t.data.datasets[3].data=[]}t.options.title.text=e,t.update()}R.open("GET","/countries",!0),R.onreadystatechange=function(){if(R.readyState==XMLHttpRequest.DONE&&200==R.status){let t=JSON.parse(R.response);l.innerHTML="",t.sort((t,e)=>t.Country>e.Country?1:-1),t.forEach(t=>{if("EH"!=t.ISO2){i.push(t);let e=document.createElement("option");e.setAttribute("value",t.ISO2),e.textContent=t.Country,l.appendChild(e)}}),l.value="MA";let e=document.createEvent("Event");e.initEvent("change",!0,!0),l.dispatchEvent(e)}},R.send()},function(t,e,a){"use strict";t.exports=function(t,e,a,r){return new n(t,e,a,r)};var n=function(t,e,a,n){this.deriv=e,this.y=t,this.n=this.y.length,this.dt=n,this.t=a,this._ctor=this.y.constructor,this._w=new this._ctor(this.n),this._k1=new this._ctor(this.n),this._k2=new this._ctor(this.n),this._k3=new this._ctor(this.n),this._k4=new this._ctor(this.n)};n.prototype.step=function(){this.deriv(this._k1,this.y,this.t);for(var t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k1[t]*this.dt*.5;this.deriv(this._k2,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k2[t]*this.dt*.5;this.deriv(this._k3,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k3[t]*this.dt;this.deriv(this._k4,this._w,this.t+this.dt);var e=this.dt/6;for(t=0;t<this.n;t++)this.y[t]+=e*(this._k1[t]+2*this._k2[t]+2*this._k3[t]+this._k4[t]);return this.t+=this.dt,this},n.prototype.steps=function(t){for(var e=0;e<t;e++)this.step();return this}}]);