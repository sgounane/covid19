//https://api.covid19api.com/dayone/country/morocco
const rk4 = require("ode-rk4");

//const serverUrl="localhost:5000"
const serverUrl="gounane.ovh:3000"
let data={}

//const sideDiv=document.getElementById("liste")
//const content=document.getElementById("content");
const countriesCombo=document.getElementById("countries");
countriesCombo.addEventListener('change',getStatistics);
const gamaSlider=document.getElementById("gamaSlider");
const betaSlider=document.getElementById("betaSlider");
const sigmaSlider=document.getElementById("sigmaSlider");

const gamaInput=document.getElementById("gama");
const betaInput=document.getElementById("beta");
const sigmaInput=document.getElementById("sigma");
const populationInput=document.getElementById("population");
populationInput.addEventListener("input",runSim)

const trainBtn=document.getElementById("trainButton");
trainBtn.addEventListener("click",postTrainData)
gamaInput.value=gamaSlider.value
betaInput.value=betaSlider.value
sigmaInput.value=sigmaSlider.value
let N=populationInput.value
let tmax=100 //number of simulation days


const myCanvas=document.getElementById("myCanvas");

//console.log()
gamaSlider.addEventListener("input",runSim)
betaSlider.addEventListener("input",runSim)
sigmaSlider.addEventListener("input",runSim)
gamaInput.addEventListener("input",runSim)
betaInput.addEventListener("input",runSim)
sigmaInput.addEventListener("input",runSim)

let myChart=creatChart(myCanvas)

let g=gamaSlider.value
let b=betaSlider.value
let s=sigmaSlider.value

//runSim()
function runSim(e){
    if(e.target.getAttribute("id")==="gamaSlider"){
        g=e.target.value
        gamaInput.value=g
    }
        
    else if(e.target.getAttribute("id")==="betaSlider"){
        b=e.target.value
        betaInput.value=b
    }
    else if(e.target.getAttribute("id")==="sigmaSlider"){
        s=e.target.value
        sigmaInput.value=s
    }else if(e.target.getAttribute("id")==="gama"){
        g=e.target.value
        gamaSlider.value=g
    }
        
    else if(e.target.getAttribute("id")==="beta"){
        b=e.target.value
        betaSlider.value=b
    }
    else if(e.target.getAttribute("id")==="sigma"){
        s=e.target.value
        sigmaSlider.value=s
    }
    N=populationInput.value
    //console.log(b,g,s)
    function copy(x) {
        return Object.assign({},x)
    }

    function simulate(f,t0,y0,step,tmax) {
        var integrator = rk4(y0, f, t0, step)
        var t = t0
        var y = y0
        var ta = []
        var ya = []
        ta.push(t0)
        ya.push(copy(y))
        while(true){
            t = t+step
            if(t>tmax) break
            integrator=integrator.step()
            ya.push(copy(integrator.y))
            ta.push(t)
        }
        return {t:ta,y:ya};
    }

    function sir(dydt, y, t) {
        dydt[0] = -b*y[0]*y[1]/N; // ds/dt= -beta*S*I  sucseptible
        dydt[1] = b*y[0]*y[1]/N - g*y[1]- s*y[1];  // dI/dt=  infected
        dydt[2] = g*y[1]; //recovred
        dydt[3] = s*y[1]; //Deaths
    }

    const I0=1;
    const step=1;

    var sir_sol = simulate(sir,0,[N-I0,I0,0.0,0.0],step,tmax)
    let lbl=sir_sol.t;
    let active= sir_sol.y.map(e=>e[1])
    let recovered= sir_sol.y.map(e=>e[2])
    let confirmed= sir_sol.y.map(e=>e[0])
    let deaths= sir_sol.y.map(e=>e[3])
    updateChart(myChart,"simulation SIR", {lbl,confirmed,active,recovered,deaths},1)
}

let httpReq=new XMLHttpRequest();
httpReq.open("GET","https://api.covid19api.com/countries",true);
httpReq.onreadystatechange= function(){
    if(httpReq.readyState==XMLHttpRequest.DONE && httpReq.status==200){
        let resp=JSON.parse(httpReq.response);
        countriesCombo.innerHTML=""
        resp.sort((a,b)=>a.Country>b.Country?1:-1);
        resp.forEach(element => {
            if(element.ISO2!="EH"){
                let d=document.createElement('option')
                //d.classList.add("listItem")
                d.setAttribute('value',element.ISO2)
                d.textContent=element.Country;
                //d.addEventListener('select',getStatistics)
                countriesCombo.appendChild(d)
            }
        });
        countriesCombo.value="MA";
        let event = document.createEvent('Event');
        event.initEvent('change', true, true);
        countriesCombo.dispatchEvent(event);

    }
}
httpReq.send();
function getStatistics(e){
    let elm=e.target.options;
    let idx=e.target.selectedIndex
    let code=elm[idx].value
    let title=elm[idx].innerHTML
    httpReq.open("GET",`https://api.covid19api.com/dayone/country/${code}`)
    httpReq.onreadystatechange=()=>{
        if(httpReq.readyState==4 && httpReq.status==200){
            let resp=JSON.parse(httpReq.response)
            tmax=resp.length
            data=respToDataSets(resp)
           // let a=new Date().getDate

           updateChart(myChart,title,data,0) 
        }
    }
    httpReq.send()
}

function respToDataSets(resp){
    N=Math.max.apply(Math, resp.map(function(o) { return o.Confirmed; }))*2
    populationInput.value=N
    const lbl=resp.map(e=>`${new Date(e.Date).getDate()}/${new Date(e.Date).getMonth()+1}`)
    const confirmed=resp.map(e=> N-e.Recovered-e.Deaths-e.Active)
    const active=resp.map(e=> e.Active)
    const recovered=resp.map(e=> e.Recovered)
    const deaths=resp.map(e=> e.Deaths)
    return {lbl,confirmed,active,recovered,deaths,population:N}
}

function updateChart(chart,title,data,sim){
    chart.data.labels=data.lbl;
    switch(sim){
        case 0:  chart.data.datasets[0].data=data.confirmed;
            chart.data.datasets[1].data=data.active;
            chart.data.datasets[2].data=data.recovered;
            chart.data.datasets[3].data=data.deaths;
            break;
        case 1:
            chart.data.datasets[4].data=data.confirmed;
            chart.data.datasets[5].data=data.active;
            chart.data.datasets[6].data=data.recovered;
            chart.data.datasets[7].data=data.deaths;
            break;
    }
   
    chart.options.title.text=title
    chart.update()
}

function creatChart(myCanvas){
    let chart=new Chart(myCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets:[
                {
                    label: "sucseptible",
                    data: [],
                    showLine:false,
                    pointRadius: 1,
                    //backgroundColor: 'rgba(0, 0, 200, 0.2)',
                    borderColor: 'rgba(0, 0, 200, 1)'
                },
                {
                    label: "Active",
                    data: [],
                    pointRadius: 1,
                    showLine:false,
                    //backgroundColor: 'rgba(200, 200, 0,  0.2)',
                    borderColor: 'rgba(200, 200, 0, 1)'
                },
                {
                    label: "Géris",
                    data: [],
                    pointRadius: 1,
                    showLine:false,
                    //backgroundColor: 'rgba(0, 200, 0, 0.2)',
                    borderColor: 'rgba(0, 200, 0, 1)'
                },
                {
                    label: "Décés",
                    data: [],
                    pointRadius: 1,
                    showLine:false,
                    //backgroundColor: 'rgba(200, 0, 0,  0.2)',
                    borderColor: 'rgba(200, 0, 0, 1)'
                },
                {
                    label: "Ssucseptible",
                    borderWidth: 1,
                    data: [],
                    pointRadius: 0,
                    //backgroundColor: 'rgba(0, 0, 120, 0.2)',
                    borderColor: 'rgba(0, 0, 200, 1)'
                },
                {
                    label: "SActive",
                    data: [],
                    pointRadius: 0,
                    borderWidth: 1,
                    //backgroundColor: 'rgba(200, 120, 0,  0.2)',
                    borderColor: 'rgba(200, 200, 0, 1)'
                },
                {
                    label: "SGéris",
                    data: [],
                    pointRadius: 0,
                    borderWidth: 1,
                    //backgroundColor: 'rgba(0, 120, 0, 0.2)',
                    borderColor: 'rgba(0, 200, 0, 1)'
                },
                {
                    label: "SDécés",
                    data: [],
                    pointRadius: 0,
                    borderWidth: 1,
                    //backgroundColor: 'rgba(120, 0, 0,  0.2)',
                    borderColor: 'rgba(200, 0, 0, 1)'
                }
                
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ""
            }
        },
        

    });
    return chart;
}

function postTrainData(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    initVals=
    raw={
        data,
        initVals:{
            gamma:Number.parseFloat(gamaInput.value),
            beta:Number.parseFloat(betaInput.value),
            sigma:Number.parseFloat(sigmaInput.value)
        }
    }
    var raw = JSON.stringify(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/train", requestOptions)
    .then(response =>response.text())
    .then(result => {
        console.log(result)
        params=JSON.parse(result)
        betaInput.value= params.beta
        gamaInput.value= params.gamma
        sigmaInput.value= params.sigma
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        betaInput.dispatchEvent(event);
        gamaInput.dispatchEvent(event);
        sigmaInput.dispatchEvent(event);
    })
    .catch(error => console.log('error', error));
}