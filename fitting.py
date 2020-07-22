from scipy.integrate import odeint
import scipy.optimize as optim
from lmfit import Parameters, minimize, report_fit
import pandas as pd
import numpy as np
def deriv(y, x, N, beta, gamma, sigma,p):
    S, I, R , D = y
    dSdt = -beta * I *(S/ N)**p
    dIdt = beta * I * (S/ N)**p - (gamma +sigma) * I
    dRdt = gamma * I
    dDdt = sigma * I
    return dSdt, dIdt, dRdt , dDdt

def f(params,x,y0):
    N= params["N"]
    p= params["p"].value
    # Integrate the SIR equations over the time grid, t.
    beta= params["beta"].value
    gamma= params["gamma"].value
    sigma= params["sigma"].value
    return odeint(deriv, y0, x, args=(N,beta, gamma, sigma,p)).T

def getParams(N,p,beta,gamma,sigma,tc,eps):
    fit_params = Parameters()
    fit_params.add('N', value=N,vary=False)
    fit_params.add('p', value=p,min=1, max=1e6)
    fit_params.add('beta', value=beta, min=0, max=10) #0.2
    fit_params.add('gamma', value=gamma, min=0, max=1.0)#0.02
    fit_params.add('sigma', value=sigma, min=0, max=1.0)#0.01
    fit_params.add('tc', value=tc,vary=False)#20
    fit_params.add('eps', value=eps, vary=False)#8
    return fit_params

def fahdFix(params,x,y0):
    print("fahdfix")
    n=x.size
    N= params["N"]
    pp= params["p"].value
    beta= params["beta"].value
    gamma= params["gamma"].value
    sigma= params["sigma"].value
    tc= params["tc"].value
    eps= params["eps"].value
    tau=x[1]-x[0]
    S=np.empty(n+1)
    I=np.empty(n+1)
    R=np.empty(n+1)
    D=np.empty(n+1)
    P=np.ones(n+1)
    for i in range(tc,tc+eps+1):
      P[i]=1+(pp-1)*(i-tc)/eps 
      #
    for i in range(tc+eps+1,n+1):
      P[i]=pp 
    S[0]=y0[0]
    I[0]=y0[1]
    R[0]=y0[2]
    D[0]=y0[3]
    theta=(S[0]/N)**(P[0]-1)
    #theta=
    for k in range(n):
        Err=1
        II=I[k]
        theta=(S[k]/N)**(P[k]-1)
        #theta=
        while Err>1e-10:
            root=np.sqrt((tau*(gamma+sigma)+1.-tau*(beta/N)*(S[k]+I[k])*theta)**2+(4*tau*(beta/N)*(tau*(gamma+sigma)+1)*theta*I[k]))
            rest=(tau*(gamma+sigma)+1)-tau*(beta/N)*(S[k]+I[k])*theta
            den=2*tau*(beta/N)*(1.+tau*(gamma+sigma))*theta
            III=(root-rest)/den
            SS=S[k]/(1.+(tau*(beta/N)*III*theta))
            RR=R[k]+tau*gamma*III
            DD=D[k]+tau*sigma*III
            theta1=(SS/N)**(P[k+1]-1)
            #theta1
            #Err=abs(II-III)
            Err=abs(theta-theta1)
            II=III
            theta=theta1
            #print(Err)
        S[k+1],I[k+1],R[k+1],D[k+1]=SS,II,RR,DD
        #print("===========================================================================")
    S=S[1:].tolist()
    I=I[1:].tolist()
    R=R[1:].tolist()
    D=D[1:].tolist()

    return np.array([S,I,R,D])

def objective(params,f,x,data,y0):
    # Initial number of infected and recovered individuals, I0 and R0.
    ndata, _ = data.shape
    resid = 0.0*data[:]
    ret=f(params,x,y0)
    
    for i in range(ndata):
        resid[i, :] =data[i, :] - ret[i,:]#/(1e-5+data[i, :])
    return resid.flatten()

def sir(data,y0,N,tc,eps,T):
  fit_params=getParams(N,1,0.2,0.02,0.01,tc,eps)  
  n=data.shape[1]
  x=np.linspace(1,n,n)
  print(n)
  fit_params["eps"].value=eps
  fit_params["p"].value=1
  fit_params["p"].vary=False
  out = minimize(objective, fit_params, nan_policy='omit', args=(f,x,data,y0))
  x=np.linspace(1,n+T,n+T)
  y=f(out.params,x,y0)
  resp={"params":dict(out.params.valuesdict()), "y":{"lbl":x.tolist(),"acc":(y[1]+y[2]+y[3]).tolist(),"active":y[1].tolist(),"recovered":y[2].tolist(),"deaths":y[3].tolist()}}
  return resp

def sirp(data,y0,N,tc,eps,T):
  fit_params=getParams(N,1,0.2,0.02,0.01,tc,eps)  
  n=data.shape[1]
  x=np.linspace(1,n,n)
  print(n)
  fit_params["eps"].value=eps
  fit_params["p"].value=1
  fit_params["p"].vary=True
  if(tc==0):
    out = minimize(objective, fit_params, nan_policy='omit', args=(f,x,data,y0))
    x=np.linspace(1,n+T,n+T)
    y=f(out.params,x,y0)
  else:
    out = minimize(objective, fit_params, nan_policy='omit', args=(fahdFix,x,data,y0))
    x=np.linspace(1,n+T,n+T)
    y=fahdFix(out.params,x,y0)
  resp={"params":dict(out.params.valuesdict()), "y":{"lbl":x.tolist(),"acc":(y[1]+y[2]+y[3]).tolist(),"active":y[1].tolist(),"recovered":y[2].tolist(),"deaths":y[3].tolist()}}
  return resp

def logisticModel(t,a,b,c):
    return c/(1+np.exp(-b*(t-a)))

def logistic(I,N,T):
    print(I)
    n=I.size
    x=np.linspace(0,n-1,n)
    bounds=(0,[1e6,10,N])
    p0=np.random.exponential(size=3)
    (a,b,c),cov=optim.curve_fit(logisticModel,x,I,bounds=bounds,p0=p0)
    x=np.linspace(0,n-1+T,n+T)
    Y=logisticModel(x,a,b,c)
    resp={"params":{"a":a,"b":b,"c":c}, "y":{"lbl":x.tolist(),"acc":Y.tolist()}}
    return resp

def bilogisticModel(t,a1,b1,c1,a2,b2,c2):
    return (c1/(1+np.exp(-b1*(t-a1))))+(c2/(1+np.exp(-b2*(t-a2))))

def bilogistic(I,N,T):
    n=I.size
    x=np.linspace(0,n-1,n)
    bounds=(0,[1e6,10,N,1e6,10,N])
    p0=np.random.exponential(size=6)
    (a1,b1,c1,a2,b2,c2),cov=optim.curve_fit(bilogisticModel,x,I,bounds=bounds,p0=p0)
    x=np.linspace(0,n-1+T,n+T)
    Y=bilogisticModel(x,a1,b1,c1,a2,b2,c2)
    resp={"params":{"a1":a1,"b1":b1,"c1":c1,"a2":a2,"b2":b2,"c2":c2}, "y":{"lbl":x.tolist(),"acc":Y.tolist()}}
    return resp

def bilogisticgamaModel(t,a1,b1,c1,gama1,a2,b2,c2,gama2):
    return (c1/(1+np.exp(-b1*gama1*(t-a1))**(1/gama1)))+(c2/(1+np.exp(-b2*gama2*(t-a2)))**(1/gama2))

def bilogisticgama(I,N,T):
    n=I.size
    x=np.linspace(0,n-1+T,nT)
    bounds=(0,[1e6,10,N,5,1e6,10,N,5])
    p0=np.random.exponential(size=8)
    (a1,b1,c1,gama1,a2,b2,c2,gama2),cov=optim.curve_fit(bilogisticgamaModel,x,I,bounds=bounds,p0=p0)
    x=np.linspace(0,n-1+T,n+T)
    Y=bilogisticgamaModel(x,a1,b1,c1,gama1,a2,b2,c2,gama2)
    resp={"params":{"a1":a1,"b1":b1,"c1":c1,"gama1":gama1,"a2":a2,"b2":b2,"c2":c2,"gama2":gama2}, "y":{"lbl":x.tolist(),"acc":Y.tolist()}}
    return resp