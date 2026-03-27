{
    "type": "TPStatement",
    "reference": "tp3-python"
}
---
# Résolution numérique d’équation différentielle

## La méthode de Nyström

Dans cette partie, on suppose que les modules suivants sont importés :

```python
from numpy import *
from matplotlib.pyplot import *
```

Les équations différentielles (ED) apparaissent très souvent dans la modélisation de la physique et des sciences de l'ingénieur. Trouver la solution d'une ED ou d'un système d'ED est ainsi un problème courant, souvent difficile ou impossible à résoudre de façon analytique. Il est alors nécessaire de recourir à des méthodes numériques pour les résoudre.

Le problème de Cauchy consiste à trouver une fonction y(t) définie sur l'intervalle [a, b] telle que :

\[
\begin{cases}
y' = f(y(t), t) & ; \quad \forall t \in [a, b] \\
y(a) = y_0
\end{cases}
\]

Pour obtenir une approximation numérique de la solution y(t) sur l’intervalle [a, b], nous allons estimer la valeur de cette fonction en un nombre fini de points t_i, pour i = 0, 1, …, n, constituants les nœuds du maillage. La solution numérique obtenue aux points t_i est notée y_i = y(t_i). L’écart entre deux abscisses, noté h, est appelé : le pas de discrétisation.

Les principales méthodes de résolution numérique des ED sont séparées en deux grandes catégories :

- les méthodes à un pas : Le calcul de la valeur y_{n+1} au nœud t_{n+1} fait intervenir la valeur y_n obtenue à l'abscisse précédente. Les principales méthodes sont celles de : Euler, Runge-Kutta, Crank-Nicholson …

- les méthodes à multiples pas : Le calcul de la valeur y_{n+1} au nœud t_{n+1} fait intervenir plusieurs valeurs y_n, y_{n-1}, y_{n-2}, … obtenues aux abscisses précédentes. Les principales méthodes sont celles de : Nyström, Adams-Bashforth, Adams-Moulton, Gear …

## La méthode de Nyström

La méthode de Nyström est une méthode à deux pas, son algorithme est :

\[
\begin{align*}
y_0 &\text{ donné;} \\
y_1 &\text{ calculé par la méthode Euler;} \\
y_{n+1} &= y_{n-1} + 2 \cdot h \cdot f(y_n, t_n)
\end{align*}
\]

Géométriquement : on considère la droite de pente f(y_n, t_n) passant par le point (y_n, t_n) parallèle à …

### Question 1

Écrire une fonction : `nystrom(f, a, b, y0, h)`, qui reçoit en paramètres :
- `f` est la fonction qui représente une équation différentielle du premier ordre ;
- `a` et `b` sont les deux bornes de l’intervalle d’intégration ;
- `y0` est la valeur de la condition initiale à l’instant a (y(a) = y0) ;
- `h` est le pas de discrétisation.

En utilisant le schéma de Nyström, la fonction renvoie `T` et `Y`, qui peuvent être des listes ou des tableaux :
- `T` contient la subdivision de l’intervalle [a, b], en valeurs régulièrement espacée, utilisant le pas de discrétisation h ;
- `Y` contient les approximations des valeurs y(t_i), à chaque instant t_i de T.

## Application au pendule simple

![Pendule simple](/media/penduletd3.png)

On considère une masse m suspendue par une tige rigide de longueur L et de masse négligeable. On désigne par θ l’angle entre la verticale passant par le point de suspension et la direction de la tige. On considère que le pendule est également soumis à un frottement fluide de coefficient k.

Si l’objet m est écarté de façon à ce que l’angle entre la verticale et la tige soit θ_p, et ensuite relâché sans vitesse initiale, alors l’objet m effectue un mouvement harmonique amorti.

La forme générale de l’équation différentielle modélisant ce mouvement harmonique est :

\[
(E) \quad L \cdot \ddot{\theta}(t) + \frac{k}{m \cdot L} \cdot \dot{\theta}(t) + g \cdot \sin(\theta(t)) = 0
\]

Les paramètres de cette équation différentielle sont :
- k : le coefficient du frottement fluide ;
- g : la pesanteur ;
- L : la longueur de la tige ;
- m : la masse de l’objet suspendu.

NB : Cette équation n'a pas de solution analytique, sa solution est numérique.

### Question 2

On suppose que les valeurs des paramètres de l'équation différentielle (E) sont : m = 1 kg ; g = 9.81 m/s² ; L = 0.50 m et k = 0.1 kg/s.

Écrire l'équation différentielle (E) sous la forme z' = F(z, t), avec F(z, t) une fonction à deux variables (z, t) dont z est un tableau de longueur 2.

### Question 3

On suppose avoir écarté l’objet, de façon à ce que l’angle entre la verticale et la tige, soit de π/3, avant de le relâcher sans vitesse initiale.

#### 3.a
En utilisant la fonction de Nyström, écrire le code python qui permet de tracer le graphe ci-dessous, qui représente la valeur de l’angle θ, toutes les 10⁻³ secondes.

![Figure 2](/media/temps.png)

#### 3.b
Écrire le code python permettant de tracer la courbe ci-dessous, qui représente le portrait de phase du pendule : les valeurs de θ̇ (axe des ordonnées) en fonction des valeurs de θ (axe des abscisses).
![Figure 3](/media/phase.png)


# Proposition de correction du TD3

## Q1
```python
def nystrom(f, a, b, y0, h):
    N = int((b - a) / h)
    T = [a + i*h for i in range(N+1)]
    y1 = y0 + h*f(a, y0)  # y1 est calculé à base du schéma d'Euler
    Y = [y0, y1]
    for i in range(1, N):
        Y.append(Y[i-1] + 2*h*f(T[i], Y[i]))
    return T, Y
````

## Q2

(E)
y''(t) = -(k*m/L) y'(t) - (g/L) sin(y(t))

On pose :
z(t) = [y(t), y'(t)]
⇒ z'(t) = F(t, z(t)) = [y'(t), y''(t)]

Ainsi :
F : (t, X) ↦ [X[1], -(k*m/L)*X[1] - (g/L)*sin(X[0])]

NB : X = [X[0], X[1]]

## Q3

### 3.a

```python
import numpy as np
import matplotlib.pyplot as pt

m = 1
g = 9.81
L = 0.50
k = 0.1

F = lambda t, X: np.array([
    X[1],
    -(k*m/L**2)*X[1] - (g/L)*np.sin(X[0])
])

T, Y = nystrom(F, 0, 10, np.array([np.pi/3, 0]), 10**-3)

Y_ = [Y[i][0] for i in range(len(Y))]

pt.plot(T, Y_)
```

```
[<matplotlib.lines.Line2D at 0x2b94b56be80>]
```
![Figure 4](/media/tempstp_sol.png)

### 3.b
```python
Y__ = [Y[i][1] for i in range(len(Y))]
pt.plot(Y_, Y__)
```

![Figure 5](/media/phasetp_sol.png)