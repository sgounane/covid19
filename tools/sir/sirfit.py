
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

