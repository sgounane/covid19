import sys 
import os
import pymongo
import requests
from flask import jsonify
from bson.json_util import dumps
from bson.json_util import loads
from fitting import *
#sys.path.append(os.path.abspath("./tools/sir"))
dbname="coviddb"
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient[dbname]
dataCl = mydb["data"]
countryCl = mydb["country"]


from flask import Flask, render_template, jsonify, url_for, flash, redirect, request
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

@app.route("/countries")
def getCountries():
    myquery = {}
    mydoc = countryCl.find(myquery)
    return dumps(mydoc)

@app.route("/dayone/country/<code>")
def getCountry(code):
    myquery = { "CountryCode": code }
    mydoc = dataCl.find(myquery)
    return dumps(mydoc)

@app.route("/country/<code>/<province>")
def getProvince(code,province):
    myquery = {"$and":[{"CountryCode":code},{"Province":province}]}
    mydoc = dataCl.find(myquery)
    return dumps(mydoc)

@app.route("/reload/country")
def reloadCountry():
    r = requests.get('https://api.covid19api.com/countries').json()#https://api.covid19api.com/all')
    for a in r:
        countryCl.insert_one(a)
    return r

@app.route("/reload/data")
def reloadData():
    countries = requests.get('https://api.covid19api.com/countries').json()
    #print(countries[0])
    for country in countries:
        r = requests.get("https://api.covid19api.com/dayone/country/"+country["ISO2"]).json()#https://api.covid19api.com/all')
        for a in r:
           dataCl.insert_one(a)
    return "countries"

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
    data=[rowData["confirmed"]]
    data.append(rowData["active"])
    data.append(rowData["recovered"])
    data.append(rowData["deaths"])
    data=np.array(data)
    N=int(rowData["population"])
    I=np.array(rowData["acc"])
    #print(I)
    y0=[N-1,1,0,0]
    tc=20
    eps=8
    model=body["model"]
    if model=="SIR":
        print("==========SIR===========")
        resp=sir(data,y0,N,tc,eps)
    elif model=="SIRP":
        print("==========SIRP===========")
        resp=sirp(data,y0,N,tc,eps)
    elif model=="Logistic":
        print("==========Logistic===========")
        resp=logistic(I,N)
    elif model=="BiLogistic":
        print("==========BiLogistic===========")
        resp=bilogistic(I,N)
    elif model=="BiLogisticG":
        print("==========BiLogisticG===========")
        resp=bilogisticgama(I,N)
    
    return resp 

if __name__== "__main__":
    app.run(debug=True,port=5000)
    #app.run(debug=True,port=3000, host='0.0.0.0')body["confirmed"]