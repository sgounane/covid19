!function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){const i=a(1);let o={},d=(new Date).getTime(),s=[],l="Morocco",c="Logistic";const u=document.getElementsByClassName("algo");console.log(u);const p=document.getElementById("spinner");Array.from(u).forEach(t=>t.addEventListener("click",O));const h=document.getElementById("countries");h.addEventListener("change",(function(t){let e=t.target.options,a=t.target.selectedIndex,n=e[a].value;l=e[a].innerHTML;let i=s.filter(t=>t.ISO2==n)[0];w=Number.parseInt(i.Population),i.Provinces&&(provinces=i.Provinces,provinces.forEach(t=>{let e=document.createElement("option");e.setAttribute("value",t),e.textContent=t,provincesCombo.appendChild(e)}));D.open("GET","/dayone/country/"+n),D.onreadystatechange=()=>{if(4==D.readyState&&200==D.status){let t=JSON.parse(D.response);t=t.filter(t=>"false"==t.Province||""==t.Province),S=t.length,o=function(t){I.value=w;const e=t.map(t=>`${new Date(t.Date).getDate()}/${new Date(t.Date).getMonth()+1}`),a=t.map(t=>w-t.Recovered-t.Deaths-t.Active),n=t.map(t=>t.Active),i=t.map(t=>t.Recovered),o=t.map(t=>t.Deaths),r=t.map(t=>t.Confirmed);return{lbl:e,acc:r,confirmed:a,active:n,recovered:i,deaths:o,population:w}}(t),F(M,l,o,0)}},D.send()}));const m=document.getElementById("modele");m.addEventListener("change",(function(t){let e=t.target.options,a=t.target.selectedIndex;x=e[a].value}));const g=document.getElementById("sirParams"),v=document.getElementById("gamaSlider"),b=document.getElementById("betaSlider"),y=document.getElementById("sigmaSlider"),f=document.getElementById("r0Label"),E=document.getElementById("forcastTbody"),L=document.getElementById("gama"),C=document.getElementById("beta"),_=document.getElementById("sigma"),I=document.getElementById("population");I.addEventListener("input",A);document.getElementById("help").addEventListener("click",t=>{"Logistic"==c?window.open("/doc/logistic","_blank"):"SIR"==c&&window.open("/doc/sir","_blank")});document.getElementById("trainButton").addEventListener("click",(function(){var t=new Headers;g.style.display="none",p.style.display="inline-block",t.append("Content-Type","application/json"),console.log("Training ...."),e={data:o,model:x,initVals:{gamma:Number.parseFloat(L.value),beta:Number.parseFloat(C.value),sigma:Number.parseFloat(_.value)}};var e=JSON.stringify(e);fetch("/train",{method:"POST",headers:t,body:e,redirect:"follow"}).then(t=>t.text()).then(t=>{r=JSON.parse(t),n=o.lbl.length;E.innerHTML="";let e="";for(let t=n;t<n+10;t++){let a=Math.ceil(r.y.acc[t]),i=Math.ceil(r.y.acc[t-1]),o=a>i?a-i:0,s=d+864e5*(t-n),l=new Date(s);e+=`<tr><th scope="row">${(l.getDate()<10?"0":"")+l.getDate()+"/"+(l.getMonth()<9?"0":"")+(l.getMonth()+1)}</th>\n                            <td>${a}</td>\n                            <td>${o}</td>\n                        </tr>`}E.innerHTML=e,params=r.params,"SIR"==x||"SIRP"==x?F(M,l,r.y,1):"Logistic"!=x&&"BiLogistic"!=x&&"BiLogisticG"!=x||F(M,"Logistic",r.y,2),p.style.display="none"}).catch(t=>console.log("error",t))})),L.value=v.value,C.value=b.value,_.value=y.value;let w=I.value,S=100;const N=document.getElementById("myCanvas");v.addEventListener("input",A),b.addEventListener("input",A),y.addEventListener("input",A),L.addEventListener("input",A),C.addEventListener("input",A),_.addEventListener("input",A);let M=function(t){return new Chart(t.getContext("2d"),{type:"line",data:{labels:[],datasets:[{label:"Confirmed",data:[],showLine:!1,pointRadius:1,borderColor:"rgba(0, 0, 200, 1)"},{label:"Active",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 200, 0, 1)"},{label:"Géris",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(0, 200, 0, 1)"},{label:"Décés",data:[],pointRadius:1,showLine:!1,borderColor:"rgba(200, 0, 0, 1)"},{label:"C",borderWidth:1,data:[],pointRadius:0,borderColor:"rgba(0, 0, 200, 1)"},{label:"I",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 200, 0, 1)"},{label:"R",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(0, 200, 0, 1)"},{label:"D",data:[],pointRadius:0,borderWidth:1,borderColor:"rgba(200, 0, 0, 1)"}]},options:{responsive:!0,legend:{position:"top"},maintainAspectRatio:!1,title:{display:!0,text:""}}})}(N),R=Number.parseFloat(v.value),k=Number.parseFloat(b.value),B=Number.parseFloat(y.value),T=Math.floor(1e3*k/(R+B))/1e3;console.log(T),f.innerHTML=T;let x="Logistic";function O(t){m.innerHTML="";let e=Array.from(u);if(e=e.filter(t=>t.classList.contains("active")),e.forEach(t=>t.classList.remove("active")),c=t.target.innerText,t.target.classList.add("active"),"SIR"==c){g.style.display="block",x="SIR";let t=document.createElement("option");t.appendChild(document.createTextNode("SIR")),t.value="SIR",m.appendChild(t),t=document.createElement("option"),t.appendChild(document.createTextNode("Modified SIR1")),t.value="SIRP",m.appendChild(t),t=document.createElement("option"),t.appendChild(document.createTextNode("Modified SIR2")),t.value="FFix",m.appendChild(t)}else if("Logistic"==c){g.style.display="none",x="Logistic";var a=document.createElement("option");a.appendChild(document.createTextNode("Logistic")),a.value="Logistic",m.appendChild(a),(a=document.createElement("option")).appendChild(document.createTextNode("Bi-Logistic")),a.value="BiLogistic",m.appendChild(a),(a=document.createElement("option")).appendChild(document.createTextNode("Modified bi-Logistic")),a.value="BiLogisticG",m.appendChild(a)}else"NN"==c&&(g.style.display="none")}function A(t){function e(t){return Object.assign({},t)}"gamaSlider"===t.target.getAttribute("id")?(R=Number.parseFloat(t.target.value),L.value=R):"betaSlider"===t.target.getAttribute("id")?(k=Number.parseFloat(t.target.value),C.value=k):"sigmaSlider"===t.target.getAttribute("id")?(B=Number.parseFloat(t.target.value),_.value=B):"gama"===t.target.getAttribute("id")?(R=Number.parseFloat(t.target.value),v.value=R):"beta"===t.target.getAttribute("id")?(k=Number.parseFloat(t.target.value),b.value=k):"sigma"===t.target.getAttribute("id")&&(B=Number.parseFloat(t.target.value),y.value=B),w=Number.parseInt(I.value),T=Math.floor(1e3*k/(R+B))/1e3,f.innerHTML=T;var a=function(t,a,n,o,r){var d=i(n,t,a,o),s=a,l=n,c=[],u=[];for(c.push(a),u.push(e(l));!((s+=o)>r);)d=d.step(),u.push(e(d.y)),c.push(s);return{t:c,y:u}}((function(t,e,a){t[0]=-k*e[0]*e[1]/w,t[1]=k*e[0]*e[1]/w-R*e[1]-B*e[1],t[2]=R*e[1],t[3]=B*e[1]}),0,[w-1,1,0,0],1,S);let n=a.t,o=a.y.map(t=>t[1]),r=a.y.map(t=>t[2]),d=a.y.map(t=>t[0]),s=a.y.map(t=>t[3]);F(M,"simulation SIR",{lbl:n,confirmed:d,active:o,recovered:r,deaths:s},1)}let D=new XMLHttpRequest;function F(t,e,a,n){switch(t.data.labels=o.lbl,n){case 0:t.data.datasets[0].data=o.acc,t.data.datasets[1].data=o.active,t.data.datasets[2].data=o.recovered,t.data.datasets[3].data=o.deaths,t.data.datasets[4].data=[],t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[];break;case 1:t.data.datasets[0].data=o.acc,t.data.datasets[1].data=o.active,t.data.datasets[2].data=o.recovered,t.data.datasets[3].data=o.deaths,t.data.datasets[4].data=a.acc,t.data.datasets[5].data=a.active,t.data.datasets[6].data=a.recovered,t.data.datasets[7].data=a.deaths;break;case 2:t.data.datasets[4].data=a.acc,t.data.datasets[5].data=[],t.data.datasets[6].data=[],t.data.datasets[7].data=[],t.data.datasets[1].data=[],t.data.datasets[2].data=[],t.data.datasets[3].data=[]}t.options.title.text=e,t.update()}D.open("GET","/countries",!0),D.onreadystatechange=function(){if(D.readyState==XMLHttpRequest.DONE&&200==D.status){let t=JSON.parse(D.response);h.innerHTML="",t.sort((t,e)=>t.Country>e.Country?1:-1),t.forEach(t=>{if("EH"!=t.ISO2){s.push(t);let e=document.createElement("option");e.setAttribute("value",t.ISO2),e.textContent=t.Country,h.appendChild(e)}}),h.value="MA";let e=document.createEvent("Event");e.initEvent("change",!0,!0),h.dispatchEvent(e)}},D.send()},function(t,e,a){"use strict";t.exports=function(t,e,a,i){return new n(t,e,a,i)};var n=function(t,e,a,n){this.deriv=e,this.y=t,this.n=this.y.length,this.dt=n,this.t=a,this._ctor=this.y.constructor,this._w=new this._ctor(this.n),this._k1=new this._ctor(this.n),this._k2=new this._ctor(this.n),this._k3=new this._ctor(this.n),this._k4=new this._ctor(this.n)};n.prototype.step=function(){this.deriv(this._k1,this.y,this.t);for(var t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k1[t]*this.dt*.5;this.deriv(this._k2,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k2[t]*this.dt*.5;this.deriv(this._k3,this._w,this.t+.5*this.dt);for(t=0;t<this.n;t++)this._w[t]=this.y[t]+this._k3[t]*this.dt;this.deriv(this._k4,this._w,this.t+this.dt);var e=this.dt/6;for(t=0;t<this.n;t++)this.y[t]+=e*(this._k1[t]+2*this._k2[t]+2*this._k3[t]+this._k4[t]);return this.t+=this.dt,this},n.prototype.steps=function(t){for(var e=0;e<t;e++)this.step();return this}}]);