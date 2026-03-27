{
    "type": "TPStatement",
    "reference": "tp2-python"
}
---
# TD 2

## Modélisation de la propagation d’un virus

### Le modèle ‘SEIR’

![SEIR](/media/moduleSEIR.png)

La crise sanitaire mondiale du Coronavirus Covid-19 a démontré le rôle des modélisations mathématiques dans la prise de décisions politiques et sanitaires.

Les modèles à compartiments font partie des premiers modèles mathématiques à avoir été utilisés en épidémiologie. L’idée est de diviser une population en plusieurs compartiments (groupes d’individus), et définir les règles d’échanges entre ces compartiments.

### Le modèle SEIR

Dans ce modèle, les individus sont répartis en 4 compartiments :

- **S** : individus sains et susceptibles d’être infectés ;
- **E** : individus infectés qui ne sont pas contagieux ;
- **I** : individus infectés qui sont contagieux ;
- **R** : individus retirés du modèle, non susceptibles d’être infectés, car guéris et immunisés.

Le modèle SEIR décrit l’évolution dans le temps du nombre d’individus dans chaque compartiment, et part du schéma suivant :

> *(schéma à insérer ici)*

- **p** : taux de natalité ;
- **a** : taux de transmission de la maladie d’un individu infecté à un individu sain ;
- **b** : taux d’incubation de la maladie ;
- **c** : taux de guérison ;
- **k** : taux de mortalité.

Il paraît plus naturel de travailler avec le nombre de personnes dans chaque catégorie, mais certains calculs seront plus simples si on utilise plutôt la proportion de personnes dans chaque catégorie, ce qui permet de connaître tout aussi bien la progression de l’épidémie.

On note donc : \(S(t)\), \(E(t)\), \(I(t)\) et \(R(t)\) les proportions des individus dans chaque catégorie à l’instant \(t\).

L'évolution des 4 catégories de population peut alors être décrite par le système d'équations différentielles suivant :

\[
\begin{cases}
S'(t) = -a \cdot S(t) \cdot I(t) + p \cdot N(t) - k \cdot S(t) \quad \text{avec : } N(t) = S(t) + E(t) + I(t) + R(t) \\
E'(t) = a \cdot S(t) \cdot I(t) - (b + k) \cdot E(t) \\
I'(t) = b \cdot E(t) - (c + k) \cdot I(t) \\
R'(t) = c \cdot I(t) - k \cdot R(t)
\end{cases}
\]

Les dérivées permettent de connaître la variation (c'est-à-dire si c'est croissant ou décroissant) des fonctions \(S(t)\), \(E(t)\), \(I(t)\) et \(R(t)\) en fonction du temps \(t\), afin d'en décrire l'évolution au cours du temps.

On suppose que les modules `numpy` et `matplotlib.pyplot` sont importés :

```python
import numpy as np
import matplotlib.pyplot as plt
```

## Méthodes de Runge-Kutta

Dans cette partie, nous allons nous intéresser à une méthode d’ordre 4, appelée **Runge-Kutta 4 (RK4)**, permettant de résoudre numériquement les équations différentielles du premier ordre, avec une condition initiale, sous la forme :

\[
\begin{cases}
y' = f(t, y(t)) & \forall t \in [t_0, t_0 + T] \\
y(t_0) = y_0
\end{cases}
\]

On note \(I = [t_0, t_0 + T]\) l'intervalle de résolution. Pour un nombre de nœuds \(N\) donné, soit \(t_n = t_0 + n \cdot h\), avec \(n = 0, 1, 2, \dots, N\), une suite de nœuds de \(I\) induisant une discrétisation de \(I\) en sous-intervalles \(I_n = [t_n, t_{n+1}]\). La longueur \(h\) de ces sous-intervalles est appelée pas de discrétisation. Le pas de discrétisation \(h\) est donné par :

\[
h = \frac{T}{N}
\]

Soit \(y_n\) l'approximation de la solution exacte \(y(t_n)\) au nœud \(t_n\). Le schéma de la méthode RK4 est donné par :

> \(y_0\) donné

\[
y_{n+1} = y_n + \frac{h}{6} \cdot (k_1 + 2(k_2 + k_3) + k_4)
\]

Avec :

\[
\begin{aligned}
k_1 &= f(t_n, y_n) \\
k_2 &= f\left(t_n + \frac{h}{2}, y_n + k_1 \cdot \frac{h}{2}\right) \\
k_3 &= f\left(t_n + \frac{h}{2}, y_n + k_2 \cdot \frac{h}{2}\right) \\
k_4 &= f\left(t_n + h, y_n + k_3 \cdot h\right)
\end{aligned}
\]

---

## Questions

### 1. Écrire une fonction `def rk4(f, t0, y0, T, N):` qui prend en paramètres la fonction \(f : (t, y) \to f(t, y)\), la condition initiale \(t_0\), \(y_0\), le nombre de nœuds \(N\) et la valeur finale du temps \(T\) et qui retourne deux listes `tt = [t_0, t_1, ..., t_N]` et `yy = [y_0, y_1, ..., y_N]` donnés par le schéma RK4.

**Q.2-** Le but de cette question est d'utiliser la fonction précédente RK4, pour résoudre numériquement le système d'équations différentielles (1).

**Q.2.a-** En posant Y(t) = [ S(t), E(t), I(t), R(t)], montrer que le système d'équations différentielles (1) peut s'écrire sous la forme Y'(t) = F(t, Y(t)) avec:

F: I × ℝ⁴ → ℝ⁴
(t, X = [X[0], X[1], X[2], X[3]]) ↦ [ Z₀, Z₁, Z₂, Z₃ ]

Z₀, Z₁, Z₂ et Z₃ sont à préciser en fonction de X[0], X[1], X[2] et X[3].

---

**Q.2.b-** On suppose que p, a, b, c et k sont des variables globales initialisées par les valeurs suivantes:
p = 0.004 ; a = 0.8 ; b = 0.5 ; c = 0.09 ; k = 0.005

Écrire, en langage Python, la fonction def F(t, X): qui reçoit en paramètres un réel t, et un tableau np.array X de dimension 1 ligne et 4 colonnes. La fonction retourne le tableau np.array de même dimension, image de (t, X) par la fonction F.

---

**Q.3-** En utilisant la fonction précédente RK4, écrire un script python qui permet de tracer la représentation graphique ci-dessous (Figure 1), des fonctions S(t), E(t), I(t), R(t) et N(t). Le nombre de points générés dans chaque courbe est N = 10³.

![Figure 1](/media/RK4.png)

# Correction du TP 2

## Import des bibliothèques

```python
import numpy as np
import matplotlib.pyplot as pl
```

## Question 1 - Méthode de Runge-Kutta d'ordre 4

```python
def RK4(f, t0, T, y0, N):
    """
    Méthode de Runge-Kutta d'ordre 4 pour résoudre une EDO
    
    Paramètres:
    f : fonction du second membre f(t,y)
    t0 : temps initial
    T : temps final
    y0 : condition initiale
    N : nombre de pas
    
    Retourne:
    tt : liste des temps
    Y : liste des solutions
    """
    h = (T - t0) / N
    tt = [t0 + i * h for i in range(N + 1)]
    Y = [y0]
    
    for i in range(N):
        k1 = f(tt[i], Y[i])
        k2 = f(tt[i] + h/2, Y[i] + k1 * h/2)
        k3 = f(tt[i] + h/2, Y[i] + k2 * h/2)
        k4 = f(tt[i] + h, Y[i] + k3 * h)
        Y.append(Y[i] + h/6 * (k1 + 2*(k2 + k3) + k4))
    
    return tt, Y
```

## Question 2.b - Modèle SEIR

### Définition du système d'équations

On pose $Y(t) = [S(t), E(t), I(t), R(t)]$, alors $Y'(t) = F(t, Y(t))$ avec :

```python
p = 0.004
a = 0.8
b = 0.5
c = 0.09
k = 0.005

F = lambda t, X: np.array([
    -a * X[0] * X[2] + p * (X[0] + X[1] + X[2] + X[3]),  # S'(t)
    a * X[0] * X[2] - (b + k) * X[1],                     # E'(t)
    b * X[1] - (c + k) * X[2],                            # I'(t)
    c * X[2] - k * X[3]                                   # R'(t)
])
```

### Résolution et visualisation

```python
# Conditions initiales
s0, e0, i0, r0 = 6, 1, 3, 0
t0, T = 0, 80
N = 10**3

# Résolution
tt, Y = RK4(F, t0, T, np.array([s0, e0, i0, r0]), N)

# Calcul de la population totale
Yn = [sum(Y[i]) for i in range(len(Y))]

# Tracé des résultats
pl.plot(tt, Y)
pl.plot(tt, Yn)
pl.xlabel('Temps')
pl.ylabel('Population')
pl.legend(['S', 'E', 'I', 'R', 'Total'])
pl.title('Modèle SEIR - Méthode RK4')
pl.grid(True)
pl.show()
```


