!function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){const n=a(1);let i={},o=[],d="Morocco",s="Logistic";const l=document.getElementsByClassName("algo");console.log(l),Array.from(l).forEach(t=>t.addEventListener("click",k));const c=document.getElementById("countries"),u=document.getElementById("spinner");c.addEventListener("change",O);const p=document.getElementById("provinces");p.addEventListener("change",O);const h=document.getElementById("modele");h.addEventListener("change",(function(t){let e=t.target.options,a=t.target.selectedIndex;B=e[a].value}));const m=document.getElementById("gamaSlider"),v=document.getElementById("betaSlider"),g=document.getElementById("sigmaSlider"),b=document.getElementById("r0Label"),f=document.getElementById("gama"),y=document.getElementById("beta"),E=document.getElementById("sigma"),L=document.getElementById("population");L.addEventListener("input",M);document.getElementById("trainButton").addEventListener("click",(function(){var t=new Headers;u.style.display="inline-block",t.append("Content-Type","application/json"),console.log("Training ...."),e={data:i,model:B,initVals:{gamma:Number.parseFloat(f.value),beta:Number.parseFloat(y.value),sigma:Number.parseFloat(E.value)}};var e=JSON.stringify(e);fetch("/train",{method:"POST",headers:t,body:e,redirect:"follow"}).then(t=>t.text()).then(t=>{r=JSON.parse(t),console.log(r),params=r.params,"SIR"==B||"SIRP"==B?A(S,d,r.y,1):"Logistic"!=B&&"BiLogistic"!=B&&"BiLogisticG"!=B||A(S,"Logistic",r.y,2),u.style.display="none"}).catch(t=>console.log("error",t))})),f.value=m.value,y.value=v.value,E.value=g.value;let C=L.value,_=100;const I=document.getElementById("myCanvas");m.addEventListener("input",M),v.addEventListener("input",M),g.addEventListener("input",M),f.addEventListener("input",M),y.addEventListener("input",M),E.addEventListener("input",M);let S=function(t){return new Chart(t.getContext("2d"),{type:"line",data:{labels:[],datasets:[{label:"Confirmed",data:[],showLine:!1,pointRadius:1,borderColor:"rgba(0, 0, 200, 1)"},{label:"Active",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 200, 0, 1)"},{label:"Géris",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(0, 200, 0, 1)"},{label:"Décés",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 0, 0, 1)"},{label:"C",borderWidth:1,data:[],pointRadius:0,borderColor:"rgba(0, 0, 200, 1)"},{label:"I",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 200, 0, 1)"},{label:"R",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(0, 200, 0, 1)"},{label:"D",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 0, 0, 1)"}]},options:{responsive:!0,legend:{position:"top"},maintainAspectRatio:!1,title:{display:!0,text:""}}})}(I),N=Number.parseFloat(m.value),w=Number.parseFloat(v.value),R=Number.parseFloat(g.value),x=Math.floor(1e3*w/(N+R))/1e3;console.log(x),b.innerHTML=x;let B="Logistic";function k(t){h.innerHTML="";let e=Array.from(l);if(e=e.filter(t=>t.classList.contains("active")),e.forEach(t=>t.classList.remove("active")),s=t.target.innerText,t.target.classList.add("active"),"SIR"==s){B="SIR";let t=document.createElement("option");t.appendChild(document.createTextNode("SIR")),t.value="SIR",h.appendChild(t),t=document.createElement("option"),t.appendChild(document.createTextNode("Modified SIR1")),t.value="SIRP",h.appendChild(t),t=document.createElement("option"),t.appendChild(document.createTextNode("Modified SIR2")),t.value="FFix",h.appendChild(t)}else if("Logistic"==s){B="Logistic";var a=document.createElement("option");a.appendChild(document.createTextNode("Logistic")),a.value="Logistic",h.appendChild(a),(a=document.createElement("option")).appendChild(document.createTextNode("Bi-Logistic")),a.value="BiLogistic",h.appendChild(a),(a=document.createElement("option")).appendChild(document.createTextNode("Modified bi-Logistic")),a.value="BiLogisticG",h.appendChild(a)}}function M(t){function e(t){return Object.assign({},t)}"gamaSlider"===t.target.getAttribute("id")?(N=Number.parseFloat(t.target.value),f.value=N):"betaSlider"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),y.value=w):"sigmaSlider"===t.target.getAttribute("id")?(R=Number.parseFloat(t.target.value),E.value=R):"gama"===t.target.getAttribute("id")?(N=Number.parseFloat(t.target.value),m.value=N):"beta"===t.target.getAttribute("id")?(w=Number.parseFloat(t.target.value),v.value=w):"sigma"===t.target.getAttribute("id")&&(R=Number.parseFloat(t.target.value),g.value=R),C=Number.parseInt(L.value),x=Math.floor(1e3*w/(N+R))/1e3,b.innerHTML=x;var a=function(t,a,i,r,o){var d=n(i,t,a,r),s=a,l=i,c=[],u=[];for(c.push(a),u.push(e(l));!((s+=r)>o);)d=d.step(),u.push(e(d.y)),c.push(s);return{t:c,y:u}}((function(t,e,a){t[0]=-w*e[0]*e[1]/C,t[1]=w*e[0]*e[1]/C-N*e[1]-R*e[1],t[2]=N*e[1],t[3]=R*e[1]}),0,[C-1,1,0,0],1,_);let i=a.t,r=a.y.map(t=>t[1]),o=a.y.map(t=>t[2]),d=a.y.map(t=>t[0]),s=a.y.map(t=>t[3]);A(S,"simulation SIR",{lbl:i,confirmed:d,active:r,recovered:o,deaths:s},1)}let T=new XMLHttpRequest;function O(t){let e=t.target.options,a=t.target.selectedIndex,n=e[a].value;d=e[a].innerHTML;let r=o.filter(t=>t.ISO2==n)[0];C=Number.parseInt(r.Population),r.Provinces&&(provinces=r.Provinces,provinces.forEach(t=>{let e=document.createElement("option");e.setAttribute("value",t),e.textContent=t,p.appendChild(e)})),T.open("GET","/dayone/country/"+n),T.onreadystatechange=()=>{if(4==T.readyState&&200==T.status){let t=JSON.parse(T.response);t=t.filter(t=>"false"==t.Province||""==t.Province),_=t.length,i=function(t){L.value=C;const e=t.map(t=>`${new Date(t.Date).getDate()}/${new Date(t.Date).getMonth()+1}`),a=t.map(t=>C-t.Recovered-t.Deaths-t.Active),n=t.map(t=>t.Active),i=t.map(t=>t.Recovered),r=t.map(t=>t.Deaths),o=t.map(t=>t.Confirmed);return{lbl:e,acc:o,confirmed:a,active:n,recovered:i,deaths:r,population:C}}(t),A(S,d,i,0)}},T.send()}function A(t,e,a,n){switch(t.data.labels=i.lbl,n){case 0:t.data.datasets[0].data=i.acc,t.data.datasets[1].data=i.active,t.data.datasets[2].data=i.recovered,t.data.datasets[3].data=i.deaths,t.data.datasets[4].data=[],t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[];break;case 1:t.data.datasets[0].data=i.acc,t.data.datasets[1].data=i.active,t.data.datasets[2].data=i.recovered,t.data.datasets[3].data=i.deaths,t.data.datasets[4].data=a.acc,t.data.datasets[5].data=a.active,t.data.datasets[6].data=a.recovered,t.data.datasets[7].data=a.deaths;break;case 2:t.data.datasets[4].data=a.acc,t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[],t.data.datasets[1].data=[],t.data.datasets[2].data=[],t.data.datasets[3].data=[]}t.options.title.text=e,t.update()}T.open("GET","/countries",!0),T.onreadystatechange=function(){if(T.readyState==XMLHttpRequest.DONE&&200==T.status){let t=JSON.parse(T.response);c.innerHTML="",t.sort((t,e)=>t.Country>e.Country?1:-1),t.forEach(t=>{if("EH"!=t.ISO2){o.push(t);let e=document.createElement("option");e.setAttribute("value",t.ISO2),e.textContent=t.Country,c.appendChild(e)}}),c.value="MA";let e=document.createEvent("Event");e.initEvent("change",!0,!0),c.dispatchEvent(e)}},T.send()},function(t,e,a){"use strict";t.exports=function(t,e,a,i){return new n(t,e,a,i)};var n=function(t,e,a,n){this.deriv=e,this.y=t,this.n=this.y.length,this.dt=n,this.t=a,this._ctor=this.y.constructor,this._w=new this._ctor(this.n),this._k1=new this._ctor(this.n),this._k2=new this._ctor(this.n),this._k3=new this._ctor(this.n),this._k4=new this._ctor(this.n)};n.prototype.step=function(){this.deriv(this._k1,this.y,this.t);for(var t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k1[t]*this.dt*.5;this.deriv(this._k2,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k2[t]*this.dt*.5;this.deriv(this._k3,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k3[t]*this.dt;this.deriv(this._k4,this._w,this.t+this.dt);var e=this.dt/6;for(t=0;t<this.n;t++)this.y[t]+=e*(this._k1[t]+2*this._k2[t]+2*this._k3[t]+this._k4[t]);return this.t+=this.dt,this},n.prototype.steps=function(t){for(var e=0;e<t;e++)this.step();return this}}]);