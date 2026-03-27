{
  "type": "TPStatement",
  "reference": "tp1-python"
}
---
# TD1

Nous allons nous intéresser dans ce problème, à quelques méthodes permettant de résoudre numériquement les équations différentielles du premier ordre, avec une condition initiale, sous la forme :

\[
\begin{cases}
y'(t) = f(t,y(t)) \\
y(t_0) = y_0
\end{cases}
\]

On note \(\mathbf{I} = ]t_0,t_0 + \mathbf{T}[\) l'intervalle de résolution. Pour un nombre de nœuds \(N\) donné, soit \(t_n = t_0 + nh\) avec \(n = 0,1,2,\dots ,N\), une suite de nœuds de \(\mathbf{I}\) induisant une discrétisation de \(\mathbf{I}\) en sous-intervalles \(I_{n} = [t_{n},t_{n + 1}]\). La longueur \(h\) de ces sous-intervalles est appelée pas de discrétisation, le pas \(h\) de discrétisation est donné par \(h = \frac{\mathbf{T}}{N}\). Soit \(y_{j}\) l'approximation au nœud \(t_{j}\) de la solution exacte \(y(t_{j})\). Les méthodes de résolution numériques, étudiées dans ce problème, s'écrivent sous la forme :

\[
\begin{cases}
y_{n + 1} = y_{n} + h\Phi (t_{n},y_{n},h) \\
t_{n + 1} = t_{n} + h
\end{cases}
\]

Avec

\[
\Phi (t,y,h) = \alpha f(t,y) + \beta f(t + h,y + hf(t,y));
\]

où \(\alpha ,\beta\) sont des constantes comprises entre 0 et 1.

## Question 1

Pour quelles valeurs du couple \((\alpha ,\beta)\) retrouve-t-on la méthode d'Euler ?

Dans la suite on considère une deuxième méthode dite de Heun, cette méthode correspond aux valeurs du couple \((\alpha ,\beta) = \left(\frac{1}{2},\frac{1}{2}\right)\).

## Question 2

Écrire une fonction de prototype `def Heun(f, t0, y0, T, N):` qui prend en paramètres la fonction \(f:(t,y)\to f(t,y)\), la condition initiale \(t_0\), \(y_0\), le nombre de nœuds \(N\) et la valeur finale du temps \(T\) et qui retourne deux listes \(tt = [t_0,t_1,\dots ,t_N]\) et \(yy = [y_{0},y_{1},\dots ,y_{N}]\) donné par le schéma :

\[
y_{n+1} = y_n + h \Phi(t_n, y_n, h)
\]

Avec

\[
\Phi (t,y,h) = \frac{1}{2} f(t,y) + \frac{1}{2} f(t + h,y + hf(t,y));
\]

Le pas de discrétisation \(h\) est donné par \(h = \frac{T}{N}\).

**Remarque :** La valeur retournée par la fonction Heun pourra être un couple constitué de deux listes, un tableau constitué de deux listes (par exemple un type `array` du module `numpy`) ou tout autre structure de données constituée de deux listes.

---

## Application au circuit RLC

![circuit RLC](/media/RLCTP1PYFIGURE1.png)

On souhaite travailler sur un circuit RLC en série qui sera constitué des éléments suivants : une résistance \(R\) (\(\Omega\)), une inductance \(L\) (\(H\)), une capacité \(C\) (\(F\)) et un générateur qui délivrera une source de tension sinusoïdale \(V(t) = \cos(2\pi t)\).

On s'intéresse à la tension \(U_1\) aux bornes de la bobine qui satisfait l'équation différentielle :

\[
\ddot{U}_1 + \dot{U}_1 + U_1 = -4\pi^2 \cos(2\pi t) \qquad (I)
\]

## Question 3

Écrire une fonction de prototype `def Euler(f, t0, T, y0, N):` qui prend en paramètres la fonction \(f : (t, y) \to f(t, y)\), la condition initiale \(t_0\), la valeur de \(f\) en \(t_0\), le nombre de nœuds \(N\) et la valeur finale du temps \(T\) et qui retourne deux listes \(tt = [t_0, t_1, ..., t_N]\) et \(yy = [y_0, y_1, ..., y_N]\) donné par le schéma d'Euler permettant de résoudre des équations différentielles du premier ordre.

## Question 4

Donner la complexité de la fonction d'Euler en expliquant le descriptif du calcul.

On considère les valeurs suivantes : \(y(t) = U_1(t)\) et \(z(t) = \dot{U}_1(t)\). L'équation différentielle (I) est du second ordre.

## Question 5

Définissez un système de deux équations différentielles du premier ordre qui puisse satisfaire l'équation (I).

## Question 6

En posant \(Y(t) = [U_1(t), \dot{U}_1(t)]\), montrez que l’équation (I) peut s’écrire sous la forme :

\[
Y'(t) = F(t, Y(t)) \qquad (II)
\]

avec \(F : (t, X) \to F(t, X)\) une fonction à préciser (\(X = [X[0], X[1]]\)).

---

## Question 7

Implémenter en Python l'équation différentielle (II) en utilisant la fonction `odeint()` du module `scipy.integrate`, la méthode d'Euler et celle de Heun. On affichera dans une même fenêtre le résultat de ces trois méthodes avec les valeurs suivantes : \(N = 1000\), \(t_0 = 0\), \(T = 3\), \(U_1(0) = 0\) et \(\dot{U}_1(0) = 0\). Voir les résultats sur la figure 1 se trouvant dans l'annexe du document. On ajoutera quatre types d'informations :

- le titre de la figure : **'circuit RLC, tension bobine'**
- un label associé à l'axe des abscisses : **'temps (s)'**
- un label associé à l'axe des ordonnées : **'tension (mV)'**
- une légende associée au graphique : **'Odeint'** associé à la méthode d'odeint
- une légende associée au graphique : **'Euler'** associé à la méthode d'Euler
- une légende associée au graphique : **'Heun'** associé à la méthode d'Heun

# Correction des questions


## Q1
```python
# α = 1 et β = 0
````

---

## Q2

```python
def Heun(f,t0,y0,T,N):
    h=T/N
    tt=[t0+i*h   for i in range(N+1)]
    yh=[y0]
    for i in range(N):
        yh.append(yh[i]+h*(0.5*f(tt[i],yh[i])+
                           0.5*f(tt[i]+h,yh[i]+h*f(tt[i],yh[i]))))
    return tt,yh
```

---

## Q3

```python
def Euler(f,t0,y0,T,N):
    h=T/N
    tt=[t0+i*h   for i in range(N+1)]
    yh=[y0]
    for i in range(N):
        yh.append(yh[i]+h*f(tt[i],yh[i]))
    return tt,yh
```

---

## Q4

```python
# C(N) = O(N) + N*Cf.
# En supposant que la complexité de la fonction f(y, t) est O(1)
# alors C(N) = O(N).
```

---

## Q5

```python
# On pose : x(t) = y(t) et z(t) = y'(t) 
# d'où le système :
# x'(t) = z(t) 
# z'(t) = -z(t) - x(t) - 4π² cos(2πt)
```

---

## Q6

```python
import numpy as np

# On pose Y(t) = [x(t), z(t)] 
# alors :
# Y'(t) = [x'(t), z'(t)] = [Y[1], -Y[1] - Y[0] - 4π² cos(2πt)]

F = lambda t, X: np.array([
    X[1],
    -4*np.pi**2*np.cos(2*np.pi*t) - X[1] - X[0]
])

# Version pour odeint
F1 = lambda X, t: np.array([
    X[1],
    -4*np.pi**2*np.cos(2*np.pi*t) - X[1] - X[0]
])
```

---

## Q7

```python
t0, T, u0, v0, N = 0, 3, 0, 0, 100

Te, Ye = Euler(F, t0, np.array([u0, v0]), T, N)
Th, Yh = Heun(F, t0, np.array([u0, v0]), T, N)

Ye_ = [Ye[i][0] for i in range(len(Ye))]
Yh_ = [Yh[i][0] for i in range(len(Yh))]
```

---

## Solution avec odeint

```python
from scipy.integrate import odeint

Yo = odeint(F1, np.array([0, 0]), Te)
Yo_ = [Yo[i][0] for i in range(len(Yo))]
```

---

## Visualisation

```python
from matplotlib.pyplot import *

title("Circuit RLC, tension Bobine")
xlabel("temps(s)")
ylabel("tension(mV)")

plot(Te, Yo_, label='odeint')
plot(Th, Yh_, label='Heun')
plot(Te, Ye_, label='Euler')

legend()
show()
```