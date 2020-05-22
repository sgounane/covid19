//https://api.covid19api.com/dayone/country/morocco
const rk4 = require("ode-rk4");

const sideDiv=document.getElementById("liste")
const content=document.getElementById("content");
const gamaSlider=document.getElementById("gamaSlider");
const betaSlider=document.getElementById("betaSlider");
const sigmaSlider=document.getElementById("sigmaSlider");

gamaSlider.addEventListener("change",runSim)
betaSlider.addEventListener("change",runSim)
sigmaSlider.addEventListener("change",runSim)
let g=gamaSlider.value/100
let b=betaSlider.value/100
let s=sigmaSlider.value/100
//runSim()
function runSim(e){
    if(e.target.getAttribute("id")==="gamaSlider")
        g=e.target.value/100
    else if(e.target.getAttribute("id")==="betaSlider")
        b=e.target.value/100
    else
        s=e.target.value/100
    
    console.log(g,b,s)
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
        dydt[0] = -b*y[0]*y[1]; // sucseptible
        dydt[1] = b*y[0]*y[1] - g*y[1]- s*y[1];  //infected
        dydt[2] = g*y[1]; //recovred
        dydt[3] = s*y[1]; //Deaths
    }


    const I0=0.00001;
    const step=1;
    const tmax=100.0;
    var sir_sol = simulate(sir,0,[1.0-I0,I0,0.0,0.0],step,tmax)
    let active= sir_sol.y.map(e=>e[1])
    let recovered= sir_sol.y.map(e=>e[2])
    let confirmed= sir_sol.y.map(e=>e[0])
    let deaths= sir_sol.y.map(e=>e[3])
    creatChart(content,title="",sir_sol.t,confirmed,active, recovered,deaths)
}

let httpReq=new XMLHttpRequest();
httpReq.open("GET","https://api.covid19api.com/countries",true);
httpReq.onreadystatechange= function(){
    if(httpReq.readyState==XMLHttpRequest.DONE && httpReq.status==200){
        let resp=JSON.parse(httpReq.response);
        sideDiv.innerHTML=""
        resp.forEach(element => {
            let d=document.createElement('div')
            d.classList.add("listItem")
            d.setAttribute('id',element.ISO2)
            d.textContent=element.Country;
            d.addEventListener('click',getStatistics)
            sideDiv.appendChild(d)
        });
    }
}
httpReq.send();
function getStatistics(e){
    let code=e.target.getAttribute("id")
    httpReq.open("GET",`https://api.covid19api.com/dayone/country/${code}`)
    httpReq.onreadystatechange=()=>{
        if(httpReq.readyState==4 && httpReq.status==200){
            let resp=JSON.parse(httpReq.response)
            const confirmed=resp.map(e=> e.Confirmed)
            const recovered=resp.map(e=> e.Recovered)
            const deaths=resp.map(e=> e.Deaths)
            const active=resp.map(e=> e.Active)
           // let a=new Date().getDate
            const lbl=resp.map(e=>`${new Date(e.Date).getDate()}/${new Date(e.Date).getMonth()+1}`)
            console.log(confirmed)
            creatChart(content,e.target.textContent,lbl,confirmed,active, recovered,deaths)
            
        }
    }
    httpReq.send()
}

function creatChart(container,title="",lbl=[],confirmed=[],active=[], recovered=[],deaths=[]){
    let myCanvas=document.createElement('canvas');
    myCanvas.setAttribute("id","canvas");
    container.innerHTML="";
    container.appendChild(myCanvas);

    let myLineChart = new Chart(myCanvas.getContext('2d'), {
        type: 'line',
        
        data: {
            labels: lbl,
            datasets:[
                {
                    label: "Confirmés",
                    data: confirmed,
                    backgroundColor: 'rgba(0, 0, 200, 0.2)',
                    borderColor: 'rgba(0, 0, 200, 1)'
                },
                {
                    label: "Géris",
                    data: recovered,
                    backgroundColor: 'rgba(0, 200, 0, 0.2)',
                    borderColor: 'rgba(0, 200, 0, 1)'
                },
                {
                    label: "Décés",
                    data: deaths,
                    backgroundColor: 'rgba(200, 0, 0,  0.2)',
                    borderColor: 'rgba(200, 0, 0, 1)'
                },
                {
                    label: "Active",
                    data: active,
                    backgroundColor: 'rgba(200, 200, 0,  0.2)',
                    borderColor: 'rgba(200, 200, 0, 1)'
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
                text: title
            }
        }

    });
}
