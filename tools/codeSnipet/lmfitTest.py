import numpy as np
from scipy.integrate import odeint
import pandas as pd
import lmfit
from lmfit.lineshapes import gaussian, lorentzian
import matplotlib.pyplot as plt

np.random.seed(42)
x = np.linspace(0, 20.0, 1001)
data = (gaussian(x, 21, 6.1, 1.2) + np.random.normal(scale=0.1, size=x.size))
#plt.plot(x, data)

def f(x, a, b, c):
    return gaussian(x, a, b, c)

mod = lmfit.Model(f)

mod.set_param_hint("a", value=10.0, vary=True)
mod.set_param_hint("b", value=10.0, vary=True)
mod.set_param_hint("c", value=10.0, vary=True)

params = mod.make_params()
result = mod.fit(data, params, method="leastsq", x=x)  # fitting
result.plot_fit(datafmt="-")
plt.show()
result.best_values