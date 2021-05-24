import pymongo
import requests
from flask import jsonify
from regionsForm import RegionsData
from bson.json_util import dumps
from bson.json_util import loads
from fitting import *
import datetime



dbname="coviddb"
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient[dbname]
dataCl = mydb["data"]
regionsCl = mydb["regions"]
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
app.config['SECRET_KEY']="GOUNANE"
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
        print(r)
        for a in r:
           dataCl.insert_one(a)
    return "countries"

@app.route("/")
@app.route("/home")
def home():
    regionsRecord=regionsCl.find().sort("Date",pymongo.DESCENDING)[0]
    return render_template("home.html",regionsData=regionsRecord)

@app.route("/simulator")
def simulateur():
    return render_template("simulator.html")

@app.route("/doc/sir")
def sirDoc():
    return render_template("sirDoc.html")


@app.route("/doc/logistic")
def logisticDoc():
    return render_template("logisticDoc.html")

@app.route("/team")
def equipe():
    return render_template("team.html")

@app.route("/api")
def api():
    return render_template("api.html")

@app.route("/publications")
def publications():
    return render_template("publications.html")

@app.route("/barkouch",methods=["GET","POST"])
def updateRegions():
    regionData=RegionsData()
    if regionData.validate_on_submit():
        day=regionData.data["day"]
        day=datetime.datetime(year=day.year,  month=day.month, day=day.day)
        day=day.strftime('%Y-%m-%dT%H:%M:%SZ')
        regionsRecord=regionsCl.find({"Date":day})
        if regionsRecord.count()==0:  
            deces=int(regionData.data["deces"])
            gueries=int(regionData.data["gueries"])
            chr=int(regionData.data["chr"])
            tth=int(regionData.data["tth"])
            fmk=int(regionData.data["fmk"])
            rsk=int(regionData.data["rsk"])
            bmk=int(regionData.data["bmk"])
            cst=int(regionData.data["cst"])
            msf=int(regionData.data["msf"])
            dtf=int(regionData.data["dtf"])
            sms=int(regionData.data["sms"])
            gon=int(regionData.data["gon"])
            lsh=int(regionData.data["lsh"])
            dod=int(regionData.data["dod"])
            total=int(regionData.data["total"])
            confirmes=chr+tth+fmk+rsk+bmk+cst+msf+dtf+sms+gon+lsh+dod
            regionsRecord={
            "Date":day,
            "total" : int(confirmes),
            "tth" : int(tth),
            "chr" : int(chr),
            "fmk" : int(fmk),
            "rsk" : int(rsk),
            "bmk" : int(bmk),
            "cst" : int(cst),
            "msf" : int(msf),
            "dtf" : int(dtf),
            "sms" : int(sms),
            "gon" : int(gon),
            "lsh" : int(lsh),
            "dod" : int(dod),
            }
            regionsCl.insert_one(regionsRecord)
            
            contryRecord={        
                "Country":"Morocco",
                "CountryCode":"MA",
                "Province":"",
                "City":"",
                "CityCode":"",
                "Lat":"31.79",
                "Lon":"-7.09",
                "Confirmed":int(total),
                "Deaths":int(deces),
                "Recovered":int(gueries),
                "Active":int(confirmes),
                "Date":day
            }
            dataCl.insert_one(contryRecord)
            return redirect('/')
    return render_template("regionsForm.html",regionData=regionData)
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
    T=10
    if model=="SIR":
        print("==========SIR===========")
        resp=sir(data,y0,N,tc,eps,T)
    elif model=="SIRP":
        print("==========SIRP===========")
        resp=sirp(data,y0,N,0,eps,T)
    elif model=="FFix":
        resp=sirp(data,y0,N,tc,eps,T)
    elif model=="Logistic":
        print("==========Logistic===========")
        resp=logistic(I,N,T)
    elif model=="BiLogistic":
        print("==========BiLogistic===========")
        resp=bilogistic(I,N,T)
    elif model=="BiLogisticG":
        print("==========BiLogisticG===========")
        resp=bilogisticgama(I,N,T)
    return resp 

if __name__== "__main__":
    #app.run(debug=True,port=5000)
    app.run(debug=True,port=5000, host='0.0.0.0')
