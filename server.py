import sys 
import os
import pymongo
import requests
#sys.path.append(os.path.abspath("./tools/sir"))
dbname="coviddb"
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient[dbname]
mycol = mydb["world"]


from flask import Flask, render_template, url_for, flash, redirect, request
from matplotlib import pyplot as plt
from flask_cors import CORS

#import sirfit

import requests
import numpy as np
from scipy.integrate import odeint
import pandas as pd
from lmfit import Parameters, minimize, report_fit
#from forms import RegistrationForm,  LoginForm
app=Flask(__name__)

CORS(app)
apiUrl = "https://api.covid19api.com/"

# The SIR model differential equations.
def deriv(y, t, N, beta, gamma, sigma):
    S, I, R , D = y
    dSdt = -beta * S * I / N
    dIdt = beta * S * I / N - gamma * I- sigma * I
    dRdt = gamma * I
    dDdt = sigma * I
    return dSdt, dIdt, dRdt , dDdt

def f(params,x):
    N= params["N"]
    I0, R0, D0 = 1, 0, 0
    # Everyone else, S0, is susceptible to infection initially.
    S0 = N - I0 - R0 - D0
    y0 = S0, I0, R0, D0
    # Integrate the SIR equations over the time grid, t.
    beta= params["beta"]
    gamma= params["gamma"]
    sigma= params["sigma"]
    return odeint(deriv, y0, x, args=(N,beta, gamma, sigma)).T

def objective(params,x,data):
    # Initial number of infected and recovered individuals, I0 and R0.
    ndata, _ = data.shape
    resid = 0.0*data[:]
    ret=f(params,x)
    for i in range(ndata):
        resid[i, :] = data[i, :] - ret[i,:]
    return resid.flatten()

@app.route("/country/<code>")
def getCountry(code):
    myquery = { "CountryCode": code }
    mydoc = mycol.find(myquery)
    type(mydoc)
    #for x in mydoc:
        #print(x) 
    return str(mydoc)

@app.route("/reload")
def reload():
    r = requests.get('https://api.covid19api.com/all').json()#https://api.covid19api.com/all')
    for a in r:
        mycol.insert_one(a)
    return r

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/simulateur")
def simulateur():
    return render_template("simulateur.html")

@app.route("/equipe")
def equipe():
    return render_template("equipe.html")

@app.route("/train",methods=["GET","POST"])
def train():
    body = request.json
    rowData=body["data"]
    df=pd.DataFrame(rowData)
    initVals=body["initVals"]
    
    print(initVals)
   
    fit_params = Parameters()
    fit_params.add('N', value=rowData["population"],vary=False)
    fit_params.add('beta', value=initVals["beta"], min=0, max=4.0)
    fit_params.add('gamma', value=initVals["gamma"], min=0, max=1.0)
    fit_params.add('sigma', value=initVals["sigma"], min=0, max=1.0)
    data=[rowData["confirmed"]]
    data.append(rowData["active"])
    data.append(rowData["recovered"])
    data.append(rowData["deaths"])
    data=np.array(data)
    print(data.shape)
    #data=np.array([body["confirmed"],body["active"],body["recovered"],body["deaths"]])
    #data=np.array([body["confirmed"],body["active"]])
    x =df.index
    #x = np.linspace(0, 86, 87)
    # for i in range(4):
    #      y_fit = f(fit_params, x)[i]
    #      plt.plot(x, data[i, :], '.', x, y_fit, '-')
    # plt.show()
    out = minimize(objective, fit_params, args=(x, data))
    report_fit(out.params)
    #Plot the data sets and fits
    #plt.figure()
    # for i in range(4):
    #      y_fit = f(out.params, x)[i]
    #      plt.plot(x, data[i, :], '.', x, y_fit, '-')
    # plt.show()
    #print(dict(out.params.valuesdict()))

    # a=requests.get(apiUrl+"dayone/country/"+body["country"])
    # print(a.content)
    return dict(out.params.valuesdict())

if __name__== "__main__":
    app.run(debug=True,port=5000)
    #app.run(debug=True,port=3000, host='0.0.0.0')body["confirmed"]