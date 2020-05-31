from flask import Flask, render_template, url_for, flash, redirect, request
from matplotlib import pyplot as plt
from flask_cors import CORS

import requests
import numpy as np
from scipy.integrate import odeint
import pandas as pd
import lmfit
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

def mdl(x,N,beta,gamma,sigma):
    # Initial number of infected and recovered individuals, I0 and R0.
    I0, R0, D0 = 1, 0, 0
    # Everyone else, S0, is susceptible to infection initially.
    S0 = N - I0 - R0 - D0
    y0 = S0, I0, R0, D0
    # Integrate the SIR equations over the time grid, t.
    ret = odeint(deriv, y0, x, args=(N,beta, gamma, sigma))
    S, I, R, D = ret.T
    return  S, I#S, I, R, D

# Initial conditions vector


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/train",methods=["GET","POST"])
def train():
    body = request.json
    df=pd.DataFrame(body)
    N=body["init"].N
    #data=np.array([body["confirmed"],body["active"],body["recovered"],body["deaths"]])
    data=np.array([body["confirmed"],body["active"]])
    x =df.index
    # plt.plot(x,data[1])
    # plt.show()
    print(len(data.T),len(x))
    mod = lmfit.Model(mdl)
    mod.set_param_hint("beta",  value=body["init"].beta, vary=True,min=0, max=6)
    mod.set_param_hint("gamma", value=body["init"].gamma, vary=True,min=0, max=4,)
    mod.set_param_hint("sigma", value=body["init"].sigma, vary=True,min=0, max=4)
    mod.set_param_hint("N", value=N, vary=False)
    params = mod.make_params()

    result = mod.fit(data, params, method="leastsq", x=x) 
    #result.plot_fit(datafmt="-")
    #plt.show()
    print(result.fit_report())
 

    # a=requests.get(apiUrl+"dayone/country/"+body["country"])
    # print(a.content)
    return dict(result.params.valuesdict())

if __name__== "__main__":
    app.run(debug=True,port=5000)
    #app.run(debug=True,port=3000, host='0.0.0.0')body["confirmed"]