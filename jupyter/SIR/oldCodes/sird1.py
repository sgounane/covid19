#!/usr/bin/env python
# coding: utf-8

# In[1]:


from matplotlib import pyplot as plt
import numpy as np
from scipy.integrate import odeint
import pandas as pd
from lmfit import Parameters, minimize, report_fit
import requests


# In[2]:


r = requests.get('https://api.covid19api.com/dayone/country/morocco')
res=r.json()
df=pd.DataFrame(res)
df.to_csv('ma.csv',index=False)
c=np.array(df['Confirmed'])
a=np.array(df['Active'])
r=np.array(df['Recovered'])
d=np.array(df['Deaths'])
N=np.max(c)
s=N-a-r-d
print(np.max(s))
print(N,a.shape[0])


# In[3]:


# SIRD Model
## Input:
### y: valeur actuel de S I R et D
### t: L'instant temps
### N: Population total
### beta:
### gamma: 
### sigma:
## Output
### la variation de S I R et D

def deriv(y, x, N, beta, gamma, sigma):
    S, I, R , D = y
    dSdt = -beta * S * I / N
    dIdt = beta * S * I / N - gamma * I- sigma * I
    dRdt = gamma * I
    dDdt = sigma * I
    return dSdt, dIdt, dRdt , dDdt

#Test de la fonction deriv
deriv([10, 1, 0, 0],1,N, 1, 0.2, 0.1)


# In[4]:


#Integration du model sur tous les points x=[x1,....,xn] avec condition initial y0
#y0 = S0, I0, R0, D0
#S0 = N - I0 - R0 - D0
def f(params,x,y0):
    N= params["N"]
    # Integrate the SIR equations over the time grid, t.
    beta= params["beta"].value
    gamma= params["gamma"].value
    sigma= params["sigma"].value
    return odeint(deriv, y0, x, args=(N,beta, gamma, sigma)).T


# In[19]:


#Algorithm de l'article de Mr Karami
def fahd(params,x,y0):
    n=a.shape[0]
    N= 1e4 #params["N"]
    beta= params["beta"].value
    gamma= params["gamma"].value
    sigma= params["sigma"].value
    tau=1
    S=np.empty(n)
    I=np.empty(n)
    R=np.empty(n)
    D=np.empty(n)
    S[0]=y0[0]
    I[0]=y0[1]
    R[0]=y0[2]
    D[0]=y0[3]
    
    for k in range(n-1):
        I[k+1]=(((tau*(gamma+sigma)+1+tau*(beta/N)*(R[k]+D[k]-N))**2+4*tau*(beta/N)*(tau*(gamma+sigma)+1)*I[k])**(-2)-(tau*(gamma+sigma)+1+tau*(beta/N)*(R[k]+D[k]-N)))/(2*tau*(beta/N)*(1+gamma+sigma))
        S[k+1]=S[k]/(1+tau*(beta/N)*I[k+1])
        R[k+1]=R[k]+tau*gamma*I[k+1]
        D[k+1]=D[k]+tau*sigma*I[k+1]
        print(S[k],I[k],R[k],D[k])
    return [S,I,R,D]
        
    


# In[22]:


fit_params = Parameters()
fit_params.add('N', value=N,vary=False)
fit_params.add('beta', value=0.3, min=0, max=4.0)
fit_params.add('gamma', value=0.01, min=0, max=1.0)
fit_params.add('sigma', value=0.03, min=0, max=1.0)

N=fit_params['N'].value
print('N:',N)

#Test de f
x=np.linspace(1,92,91)
y0=[N-1,1,0,0]
y=f(fit_params,x,[N-a[0],1,0,0])
yf=fahd(fit_params,x,y0)

data=np.array([s[1:],a[1:],r[1:],d[1:]])
print(np.max(s))
print(np.max(data[0]))
## Plot real data
#plt.plot(data[0],linestyle='dashed',label="Sr", color='blue')
#plt.plot(data[1],linestyle='dashed',label="Ar", color='red')
#plt.plot(data[2],linestyle='dashed',label="Rr", color='green')
#plt.plot(data[3],linestyle='dashed',label="Dr", color='gray')

#Plot estimated data using odint
#plt.plot(x,y[0], label="Sr",color='blue')
#plt.plot(x,y[1], label="Is",color='red')
#plt.plot(x,y[2],label="Rs", color='green')
#plt.plot(x,y[3],label="Ds", color='gray')

#Plot estimated data using Mr karami's Algorithm
plt.plot(yf[0],linestyle='dashdot', label="Sr",color='blue')
plt.plot(yf[1],linestyle='dashdot', label="Is",color='red')
plt.plot(yf[2],linestyle='dashdot',label="Rs", color='green')
plt.plot(yf[3],linestyle='dashdot',label="Ds", color='gray')

plt.legend()


# In[15]:


def objective(params,f,x,data,y0):
    # Initial number of infected and recovered individuals, I0 and R0.
    ndata, _ = data.shape
    resid = 0.0*data[:]
    ret=f(params,x,y0)
    for i in range(ndata):
        resid[i, :] = data[i, :] - ret[i,:]
    #resid=data[0, :] - ret[0,:]
    return resid.flatten()


# In[16]:


y0=[N-1,1,0,0]
out = minimize(objective, fit_params, args=(f,x,data,y0))
out
report_fit(out.params)
y=f(out.params,x,[N-1,1,0,0])


plt.plot(data[0],linestyle='dashed',label="Sr", color='blue')
plt.plot(data[1],linestyle='dashed',label="Ar", color='red')
plt.plot(data[2],linestyle='dashed',label="Rr", color='green')
plt.plot(data[3],linestyle='dashed',label="Dr", color='gray')

plt.plot(x,y[0], label="Sr", color='blue')
plt.plot(x,y[1], label="Is", color='red')
plt.plot(x,y[2],label="Rs", color='green')
plt.plot(x,y[3],label="Ds", color='gray')


plt.legend()


# In[ ]:





# In[ ]:




