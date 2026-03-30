{
  "type": "ExamStatement",
  "reference": "exam-python-2025"
}
---

# Faculté des Sciences  
## Masters ISI & GLCC  
### 2025/2026  

**Module : Python pour Data Science**  
**Examen de fin de module**

---

## Partie I : Interpolation de Lagrange

Dans cette partie, on suppose que les modules numpy et matplotlib.pyplot sont importés

```python
import numpy as np
import matplotlib.pyplot as plt
````

En analyse numérique, les polynômes de Lagrange, du nom de Joseph-Louis Lagrange, permettent d'interpoler une série de points par un polynôme qui passe exactement par ces points.

Étant donnés n points dans le plan (x0, y0), (x1, y1), ..., (xi, yi), ..., (xn-1, yn-1), avec les xi distincts deux à deux, l'interpolation de Lagrange permet de construire un polynôme L de degré au plus n−1, et qui passe par ces points : L(xi) = yi

La formule du polynôme L est la suivante :

[
L(x) = \sum_{j=0}^{n-1} \left( y_j \cdot \left( \prod_{i=0 \ et \ i \ne j}^{n-1} \frac{x - x_i}{x_j - x_i} \right) \right)
]

---

### Q.1

Écrire la fonction **decoupe(P)** qui reçoit en paramètre une liste P de tuples qui représentent les points à interpoler. La fonction retourne deux vecteurs X et Y qui contiennent respectivement les abscisses et les ordonnées des points de P.

Les éléments xi dans X et yi dans Y sont l’abscisse et l’ordonnée du point pi dans P.

**Exemple :**

P = [(-1, 2), (0, 1), (5, 4), (1, 3), (-2, 8), (-7, 3), (3, -3)]

La fonction decoupe(P) retourne les deux vecteurs X et Y :

X = [-1, 0, 5, 1, -2, -7, 3]
Y = [2, 1, 4, 3, 8, 3, -3]

---

### Q.2

Écrire la fonction **produit(x, X, j)** qui reçoit en paramètres un réel x, le vecteur X contenant les abscisses des points à interpoler et un entier j qui représente un indice dans X. La fonction calcule et retourne la valeur du produit suivant :

[
\prod_{i=0 \ et \ i \ne j}^{n-1} \left( \frac{x - x_i}{x_j - x_i} \right)
]

---

### Q.3

Écrire la fonction **L(x, P)** qui reçoit en paramètres un réel x et la liste P de tuples qui représentent les points à interpoler. La fonction retourne la valeur de l’expression suivante :

[
\sum_{j=0}^{n-1} \left( y_j \cdot \left( \prod_{i=0 \ et \ i \ne j}^{n-1} \frac{x - x_j}{x_i - x_j} \right) \right)
]

---

### Q.4

Écrire la fonction **courbe(P)** qui reçoit en paramètre la liste P de tuples qui représentent les points à interpoler. La fonction trace la représentation graphique du polynôme interpolateur qui passe par tous les points de P.

Le nombre de points générés dans la courbe est : 500

**Exemple :**

P = [(-1, 2), (0, 1), (5, 4), (1, 3), (-2, 8), (-7, 3), (3, -3)]

Après l’appel de la fonction courbe(P), on obtient la représentation graphique du polynôme interpolateur qui passe par tous les points de P.

---

## Partie II : Résolution numérique d’équation différentielle

### Les méthodes d'Adams-Bashforth et d’Adams-Moulton

Dans cette partie, on suppose que les modules suivants sont importés :

```python
from numpy import *
from matplotlib.pyplot import *
```

Les équations différentielles (ED) apparaissent très souvent dans la modélisation de la physique et des sciences de l’ingénieur. Trouver la solution d’une ED ou d’un système d’ED est ainsi un problème courant, souvent difficile ou impossible à résoudre de façon analytique. Il est alors nécessaire de recourir à des méthodes numériques pour les résoudre.

Le problème de Cauchy consiste à trouver une fonction y(t) définie sur l’intervalle [a, b] telle que :

[
\begin{cases}
y' = f(t, y(t)) \quad ; \quad \forall t \in [a, b] \
y(a) = y_0
\end{cases}
]

Pour obtenir une approximation numérique de la solution y(t) sur l’intervalle [a, b], nous allons estimer la valeur de cette fonction en un nombre fini de points ti, pour i = 0, 1, ..., n, constituants les nœuds du maillage. La solution numérique obtenue aux points ti est notée yi = y(ti). L’écart entre deux abscisses, noté h, est appelé : le pas de discrétisation.

Les principales méthodes de résolution numérique des ED sont séparées en deux grandes catégories :

* **les méthodes à un pas** : Le calcul de la valeur y_{n+1} au nœud t_{n+1} fait intervenir la valeur y_n obtenue à l’abscisse précédente. Les principales méthodes sont celles de : Euler, Runge-Kutta, Crank-Nicholson …

* **les méthodes à multiples pas** : Le calcul de la valeur y_{n+1} au nœud t_{n+1} fait intervenir plusieurs valeurs y_n, y_{n-1}, y_{n-2}, …, obtenues aux abscisses précédentes. Les principales méthodes sont celles de : Nyström, Adams-Bashforth, Adams-Moulton, Gear …

## Les méthodes à un pas

Le calcul de la valeur \( y_{n+1} \) au nœud \( t_{n+1} \) fait intervenir la valeur \( y_n \), obtenue à l’abscisse précédente.  

Les principales méthodes sont celles de : **Euler, Runge-Kutta, Crank-Nicholson**.

---

## Les méthodes à multiples pas

Le calcul de la valeur \( y_{n+1} \) au nœud \( t_{n+1} \) fait intervenir plusieurs valeurs \( y_n, y_{n-1}, y_{n-2}, \dots \), obtenues aux abscisses précédentes.  

Les principales méthodes sont celles de : **Nyström, Adams-Bashforth, Adams-Moulton, Gear**.

---

## Les méthodes d’Adams-Bashforth et d’Adams-Moulton

Ce sont des méthodes basées sur des techniques d’intégration numérique, qui utilisent les polynômes interpolateurs de Lagrange.  

La formulation générale de ces méthodes est :

\[
y_{n+1} = y_n + h \sum_{j=-1 \ \text{ou} \ 0}^{p} b_j \cdot f(t_{n-j}, y_{n-j})
\]

---

### Schéma d’Adams-Bashforth à deux pas (explicite, ordre 2)

- \( y_0 \) donné ;
- \( y_1 \) calculé par la méthode d’Euler ;

\[
y_{n+1} = y_n + \frac{h}{2} \left( 3 f(t_n, y_n) - f(t_{n-1}, y_{n-1}) \right)
\]

---

### Schéma d’Adams-Moulton à un pas (implicite, ordre 2)

\[
y_{n+1} = y_n + \frac{h}{2} \left( f(t_n, y_n) + f(t_{n+1}, y_{n+1}) \right)
\]

---

### Schéma prédicteur-correcteur (ordre 2)

\[
y_{n+1} = y_n + \frac{h}{2} \left( f(t_n, y_n) + f(t_{n+1}, k) \right)
\]

avec :

\[
k = y_n + \frac{h}{2} \left( 3 f(t_n, y_n) - f(t_{n-1}, y_{n-1}) \right)
\]

---

## Q.1

Écrire une fonction `ABM2(f, a, b, y0, h)` :

- `f` : équation différentielle du premier ordre  
- `a, b` : bornes  
- `y0` : condition initiale  
- `h` : pas  

Retourne :

- `T` : subdivision de \([a,b]\)  
- `Y` : approximations de \( y(t_i) \)

---

## Application : Oscillateur harmonique

\[
m y''(t) + b y'(t) + k y(t) = F(t)
\]

- `b` : amortissement  
- `k` : ressort  
- `m` : masse  
- `F(t)` : force  

Cas :

- \( b=0, F=0 \) → simple  
- \( b \neq 0 \) → amorti  
- \( F \neq 0 \) → forcé  

---

## Q.2

\[
b = 1,\quad k = 12.5,\quad m = 1.5,\quad F(t)=0
\]

Mettre sous forme :

\[
z' = G(t,z)
\]

---

## Q.3

Coder en Python la méthode ABM2 pour tracer \( y(t) \) avec pas \( 10^{-3} \).

---

## Q.4

Fonction `racines(P)` :

Trouver \( t \) tels que :

\[
y(t) = 0 \quad \text{ou} \quad \approx 0 \ (10^{-3})
\]

Exemple :

```number
0.589 , 1.684 , 2.78 , 3.875 , 4.971 , 6.067 , 7.162
```
