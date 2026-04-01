{
  "type": "CourseIntro",
  "reference": "python-intro"
}
---


# Programmation en langage Python - Les bases

## Masters ISI & GLCC - 25/26

---

## Introduction à Python

Le langage Python est créé en 1991 par Guido van Rossum (chez Google maintenant).

**Largement utilisé par :**
- Google
- Yahoo
- Youtube
- ...

**Utilisé dans différentes disciplines, en particulier :**
- Big Data
- Science de données
- ...

---

## Caractéristiques de Python

- Typage dynamique
- Langage de script et orienté objet
- Code moins volumineux : 5 à 10 fois moins de ligne de code que C/C++/Java/...
- Gestion automatique de la mémoire (ramasse-miettes)
- Multiplateformes
- Vitesse de développement
- Erreurs facilement repérables
- Open Source ⇒ Grande communauté
- Riche en terme de bibliothèque spécialisées
- Facile à appréhender

---

## Environnement de travail

**L'ensemble minimal nécessaire :**
- Un interpréteur Python (deux versions à ce jour sont 3.5 et 2.7)
- Un éditeur, pour écrire des programmes qui seront exécutés par l'interpréteur (Idle, Pyzo, Spyder, Jupyter, etc)

On travaille en général avec devant soi deux fenêtres principales : l'interpréteur et l'éditeur.

---

## Installation d'Anaconda

Anaconda est la principale plate-forme ouverte de données scientifiques alimentée par Python.

**Installation :**
- Télécharger sur : https://www.anaconda.com/products/distribution
- Lancer l'installeur et suivre les étapes.
- Lancer Jupyter / Spyder.

---

## Types de données

| Type | Exemple |
|------|--------|
| Entier (int) | `>>> n = 1` |
| Réel (float) | `>>> x = 1.23` |
| Complexe (complex) | `>>> x = 1 + 2j` |
| Chaîne de caractères (str) | `>>> s = 'bonjour'`<br>`>>> s = "Bonjour"` |
| Liste (list) | `>>> l = [2, 3, 4]` |
| Tuple (tuple) | `>>> t = (1, 2, 3)` |
| Ensemble (set) | `>>> e = {3, 6, 4}` |
| Dictionnaire (dict) | `>>> d = {'jour': 'day', 'petit': 'small'}` |

**Fonctions utiles :**
- `type()` : Affiche le type d'une variable
- `int()`, `float()` : Conversion nombre/chaîne → nombre
- `str()` : Conversion nombre → chaîne

---

## Opérateurs

### Opérateurs arithmétiques

| Opérateur | Opération |
|-----------|----------|
| `+` | Addition |
| `-` | Soustraction |
| `*` | Multiplication |
| `/` | Division |
| `**` | Puissance |
| `//` | Division entière |
| `%` | Reste de la division entière |
| `+=` | `a += b` ⇒ `a = a + b` |
| `-=` | `a -= b` ⇒ `a = a - b` |
| `*=` | `a *= b` ⇒ `a = a * b` |
| `/=` | `a /= b` ⇒ `a = a / b` |

### Opérateurs de comparaison et logiques

| Opérateur | Opération |
|-----------|----------|
| `==` | Comparaison |
| `>` | Supérieur strictement |
| `<` | Inférieur strictement |
| `>=` | Supérieur ou égal |
| `<=` | Inférieur ou égal |
| `!=` | Différent |
| `and` | Et logique |
| `or` | Ou logique |
| `not` | Négation logique |
| `=` | Affectation |

---

## Exemples d'opérateurs

```python
In [29]: 2+3
Out[29]: 5

In [30]: "ABC"+"DEF"
Out[30]: 'ABCDEF'

In [31]: 2*3
Out[31]: 6

In [32]: 3*'ABC'
Out[32]: 'ABCABCABC'

In [33]: 2**3
Out[33]: 8

In [34]: 10/3
Out[34]: 3.33333333333333335

In [9]: 10//3
Out[9]: 3

In [10]: 10%3
Out[10]: 1

In [11]: round(10/3,2)
Out[11]: 3.33

In [12]: round(10/3)
Out[12]: 3

In [13]: round(2/3)
Out[13]: 1

In [14]: round(1/3)
Out[14]: 0

In [30]: a,b=5,6

In [31]: a==b
Out[31]: False

In [32]: a,b
Out[32]: (5, 6)

In [33]: a=b

In [34]: a,b
Out[34]: (6, 6)
```

---

## Instructions élémentaires

Les instructions élémentaires qui figurent le plus souvent dans tous les algorithmes sont au nombre de trois :
- L'affectation
- Les instructions d'entrée des données
- Les instructions de sortie des données

### L'affectation

L'opération d'affectation permet d'assigner la valeur d'une expression à un objet.

**Syntaxe :**
```python
objet = expression
```

**Exemples :**
```python
a = 5
b = 6
a, b = 5, 6
a = a + b
```

**Exercice :**
Soient x et y deux variables telles que x = 5 et y = 6. Donner le script permettant d'échanger leurs contenues.

---

### Écriture de données (print)

L'écriture de données permet d'afficher une valeur, une expression ou un message sur l'écran.

**Syntaxe :**
```python
print("texte")
print(expression)
print("texte", expression, "texte", ...)
```

**Exemple :**
```python
age, nom = 25, "Python"
print("Bonjour")
print("Je m'appelle ", nom)
print('J\'ai ', age, ' ans')
```

---

### Lecture de données (input)

La lecture des données permet d'affecter aux variables les valeurs lues au clavier. Cette instruction interrompt le programme et attend que l'utilisateur saisisse ce qu'il veut puis appuie sur la touche Entrée.

**Syntaxe :**
```python
variable = input()
variable = input("Message")
```

**Attention :** Les valeurs retournées par la fonction `input()` sont toujours de type chaîne de caractères (texte). Pour convertir une variable vers un autre type, il faut utiliser le nom du type comme une fonction.

**Exemple 1 :**
```python
x = input("Entrer le premier nombre :")
y = input("Entrer le deuxième nombre :")
s = x + y
print("La somme est :", s)
```

**Exemple 2 :**
```python
x = int(input("Entrer le premier nombre :"))
y = int(input("Entrer le deuxième nombre :"))
s = x + y
print("La somme est :", s)
```

**Remarque :** La fonction `int()` est remplacée par `float()` dans le cas où le nombre est réel.

---

## Instructions conditionnelles

### L'instruction `if ... : ...`

**Exemple :** Script qui calcule et affiche la valeur absolue d'un entier.
```python
x = float(input("Entrer un nombre :"))
if x < 0:
    x = -x
print(x)
```

---

### L'instruction `if … : … else : …`

**Syntaxe :**
```python
if condition:
    Bloc_instructions_1
else:
    Bloc_instruction_2
```

Si la condition est vérifiée, c'est le `Bloc_instructions_1` qui sera exécuté, sinon c'est le `Bloc_instructions_2`.

**Exemple :**
```python
note = float(input())
if note < 10:
    print("Non admis")
else:
    print("Admis")
```

**Exercice :**
Écrire un script qui demande un nombre réel, et qui vérifie si ce nombre est strictement négatif, strictement positif ou nul.

---

### L'instruction `if ... : ... elif ... : ... elif ... : ... else : ...`

**Syntaxe :**
```python
if condition_1:
    Bloc_instructions_1
elif condition_2:
    Bloc_instruction_2
...
elif condition_n:
    Bloc_instruction_n
else:
    Bloc_instruction_n+1
```

**Exemple :**
```python
x = float(input())
if x < 0:
    print(x, "est négatif")
elif x > 0:
    print(x, "est positif")
else:
    print(x, "est nul")
```

---

### Exercices sur les conditions

**Exercice 1 :**
Soit x un nombre entier lu au clavier. Écrire un script qui vérifie si x est un nombre pair ou impair.

**Exercice 2 :**
Écrire un script qui lit les coefficients d'une équation `ax + b = 0` et qui affiche les solutions possibles (selon les cas : (1) `-b/a`, (2) aucune solution ou (3) tout `x ∈ ℝ` est une solution)

**Exercice 3 :**
Écrire un script de résolution d'une équation du deuxième degré `ax² + bx + c = 0`.

---

## Instructions répétitives

### La boucle `while`

**Exercices :**

1. Comme le nombre de tentatives autorisées dans ce cas est illimité, proposer une deuxième version où ce nombre sera limité à trois tentatives.

2. Donner un script qui demande la valeur de n (un entier) et qui calcule la valeur de la série : `1 + 2 + ... + n`

3. Donner un script qui demande la valeur de n (un entier) et qui calcule `n! = n × (n-1) × ... × 1`

---

### La boucle `for`

**Syntaxe :**
```python
for element in sequence:
    Bloc_instructions
```

**Exemple 1 :**
```python
for k in [2, 5, 8, 3.4]:
    print(k)
```

**Exemple 2 :**
```python
for k in "BONJOUR":
    print(k)
```

---

### La fonction `range()`

La fonction `range()` permet de générer une séquence de nombres entiers.

**Exemples :**
- `range(10)` ⇒ `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
- `range(5,10)` ⇒ `5, 6, 7, 8, 9`
- `range(4,13,2)` ⇒ `4, 6, 8, 10, 12`
- `range(10,5)` ⇒ séquence vide
- `range(10,5,-1)` ⇒ `10, 9, 8, 7, 6`

**Exemple :**
En utilisant la boucle `for`, écrire un script permettant de calculer la somme `1 + 2 + … + n`, avec n un entier quelconque à demander.

---

### Exercices sur les boucles

**Exercice 1 :** Test de nombres parfaits
Un nombre est dit parfait s'il est égal à la somme de ses diviseurs, 1 compris.
- Exemple : 6 = 1 + 2 + 3, est un nombre parfait.
- Exemple : 28 = 14 + 7 + 4 + 2 + 1, est un nombre parfait.

Écrire un script qui permet de lire un entier au clavier, et de vérifier s'il est parfait ou pas.

**Exercice 2 :**
Écrire un script qui vérifie si un nombre lu au clavier est un nombre premier ou non.

**Exercice 3 :**
Écrire un script qui détermine la n-ième valeur `u_n` (n étant fourni en donnée) de la suite définie comme suit :
```
u₀ = 2
uₙ₊₁ = uₙ + 3 si n ≥ 0
```

**Exercice 4 :** Suite de Fibonacci
```
f₀ = 0
f₁ = 1
fₙ = fₙ₋₁ + fₙ₋₂ si n ≥ 2
```
Écrire un script calculant le n-ième terme (lu au clavier) de cette suite.

**Exercice 5 :**
Écrire un script permettant de calculer la valeur approchée de π en utilisant le développement suivant :
```
π = 4 × Σₖ₌₀^(+∞) [(-1)ᵏ / (2k+1)]
```
et en s'arrêtant lorsque le terme `1/(k+1)` du développement soit plus petit qu'un réel ε (de votre choix).

---

## Fonctions

Les fonctions permettent de regrouper plusieurs instructions dans un bloc qui sera appelé grâce à un nom. Cette programmation dite "modulaire" se justifie pour de multiples raisons :
- Un programme écrit dans un seul bloc devient difficile à comprendre dès qu'il dépasse une ou deux pages de code.
- La programmation modulaire permet d'éviter des séquences d'instructions répétitives.

### Définition d'une fonction

```python
def nom_de_la_fonction(paramètres):
    Bloc_instructions
```

**Éléments de la définition :**
- `def` : mot-clé qui est l'abréviation de 'define' (définir)
- Le nom de la fonction : qui se nomme exactement comme une variable
- La liste des paramètres ou arguments : qui seront fournis lors de l'appel de la fonction
- Les deux points : qui clôturent la ligne

---

### L'instruction `return`

L'instruction `return` précise la valeur que fournira la fonction à la fin de son travail. Elle a pour effet d'interrompre le déroulement de la fonction.

**Exemple :** Fonction qui vérifie si un nombre est pair ou impair

```python
def parite(x):
    if x % 2 == 0:
        return True
    else:
        return False
```

Ou plus simplement :

```python
def parite(x):
    if x % 2 == 0:
        return True
    return False
```

---

### Exemple : Fonction de test de primalité

```python
def premier(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True
```

Si un entier i divise n, la valeur `False` sera retournée ce qui interrompra ainsi la fonction. Sinon c'est la valeur `True` qui est retournée.

---

### Importance du `return`

**Exemple 1 :**
```python
def carre(x):
    return x * x
```

**Exécution :**
```python
a = carre(5)
print(a)    # 25
m = a + 4
print(m)    # 29
```

**Exemple 2 :** (sans return)
```python
def carre(x):
    print(x * x)
```

**Exécution :**
```python
a = carre(5)    # affiche 25
print(a)        # None
m = a + 4       # Erreur !
```

---

### Portée des variables

Les noms des objets sont créés lors de leur première affectation, mais ne sont visibles que dans certaines régions de la mémoire.
- **Variables globales** : portée qui s'étend sur l'ensemble du programme
- **Variables locales** : portée qui se limite au corps de la fonction où ils sont définis

**Exemple 1 :**
```python
x = 5
def f():
    x = 7
    print("x de f =", x)
def g():
    x = 8
    print("x de g =", x)
f()
g()
print("x global =", x)
```
**Résultat :**
```
x de f = 7
x de g = 8
x global = 5
```

**Exemple 2 :**
```python
x = 5
def f():
    x = 7
f()
print("x =", x)   # x = 5
```

**Exemple 3 :** (Erreur)
```python
x = 5
def f():
    x = x + 3    # Erreur : x est appelé avant affectation
f()
print(x)
```

---

### Utilisation de `global`

```python
x = 5
def f():
    global x
    x = 7
f()
print("x =", x)   # x = 7
```

**Exemple :** Afficher le nombre d'appels d'une fonction

```python
def f():
    n = 1
    print('appel', n)
    n += 1
f()
f()
f()
```
**Résultat :** appel1 appel1 appel1 (chaque appel réinitialise n)

**Avec global :**
```python
n = 1
def f():
    global n
    print('appel', n)
    n += 1
f()
f()
f()
```
**Résultat :** appel1 appel2 appel3

---

## Fonctions récursives

Une fonction est dite récursive si elle est définie par une relation de récurrence, c'est-à-dire qu'elle fait appel à elle-même.

### Exemple : La fonction factorielle

**Définition itérative :**
```
fact(n) = ∏_{k=1}^{n} k
```

**Définition récursive :**
```
fact(n) = 1 si n = 0
fact(n) = n × fact(n-1) sinon
```

**Implémentation itérative :**
```python
def fact(n):
    p = 1
    for k in range(1, n + 1):
        p = p * k
    return p
```

**Implémentation récursive :**
```python
def fact(n):
    if n == 0:
        return 1
    return n * fact(n - 1)
```

**Attention :** Les fonctions récursives sont très coûteuses en terme d'espace mémoire. Chaque appel de `fact` entraîne une allocation d'espace pour les variables et les paramètres de la fonction.

---

### Exercices sur les fonctions

**Exercice 1 :** Écrire une fonction puissance d'un nombre
Sans utiliser l'opérateur `**`, écrire une fonction qui reçoit en arguments un nombre réel et un entier, et qui renvoie le premier à la puissance du deuxième.
1. En utilisant une fonction itérative
2. En utilisant une fonction récursive

**Exercice 2 :** Écrire une fonction qui vérifie si un entier passé en argument est un nombre premier ou non (return `True` si oui et `False` sinon).

**Exercice 3 :** En utilisant la fonction définie dans l'exercice précédent, écrire une deuxième fonction qui affiche tous les nombres premiers compris entre deux nombres entiers fournis en argument.

---

## Listes

C'est une suite de valeurs où chaque élément est repéré par un "indice" précisant sa position au sein de l'ensemble.

### Création de listes

```python
L = []                      # Liste vide
L = list()                  # Liste vide
L = [1, 4, 3, 7]            # Liste d'entiers
L = [4, 'ABC', [4, 7, 5]]   # Liste hétérogène
L = list(range(2, 10))      # [2, 3, 4, 5, 6, 7, 8, 9]
L = list((4, 5, 6))         # [4, 5, 6]
L = [2 * x for x in range(5)]  # [0, 2, 4, 6, 8]
L = [c for c in 'ABCDE']    # ['A', 'B', 'C', 'D', 'E']
L = [f(x) for x in [4, 9, 7]]
L = 5 * [0]                 # [0, 0, 0, 0, 0]
L = 3 * [3, 4]              # [3, 4, 3, 4, 3, 4]
L = [3, 4, 5] + [70, 80, 90]  # [3, 4, 5, 70, 80, 90]
L = [int(input()) for i in range(5)]
```

---

### Copie de listes

```python
L = [1, 2, 3]
T = L
T[0] = 5
print(L)    # [5, 2, 3]
print(T)    # [5, 2, 3]
```

Pour une copie indépendante :
```python
L = [1, 2, 3]
T = L[:]        # Copie par slicing
T[0] = 5
print(L)        # [1, 2, 3]
print(T)        # [5, 2, 3]
```

```python
L = [1, 2, 3]
T = L.copy()    # Copie avec la méthode copy()
T[0] = 5
print(L)        # [1, 2, 3]
print(T)        # [5, 2, 3]
```

---

### Parcours de listes

**Par indice :**
```python
def somme(L):
    s = 0
    for i in range(0, len(L)):
        s = s + L[i]
    return s
```

**Par élément :**
```python
def somme(L):
    s = 0
    for i in L:
        s = s + i
    return s
```

**Parcours inversé :**
```python
L = [10, 20, 30, 40]
for i in reversed(L):
    print(i)    # 40, 30, 20, 10
```

---

### Méthodes sur les listes

| Méthode | Description |
|---------|-------------|
| `x in L` / `x not in L` | True si x est élément de L et False sinon |
| `L.count(x)` | Nombre d'occurrences de x |
| `L.index(x)` | Indice de la première occurrence de x (erreur si x n'est pas dans L) |
| `L.insert(i, x)` | Insère l'élément x en position i dans la liste |
| `L.remove(x)` | Supprime la première occurrence de x (erreur si x n'est pas dans L) |
| `L.pop(i)` | Retourne et supprime l'élément L[i] de la liste L ou le dernier si aucun indice n'est fourni |
| `L.append(x)` | Ajoute x à la fin de la liste |
| `L.sort(reverse=True)` | Trie la liste par ordre croissant (par défaut) |

---

### Exercices sur les listes

**Exercice 1 :** Écrire la fonction `binaire(n)` permettant de retourner la représentation binaire, sous forme d'une liste, correspondant au nombre n passé en arguments.
- Donner une version itérative
- Donner une version récursive

**Exercice 2 :** Sans utiliser la fonction prédéfinie `max`, définir la fonction `maximum(l)` permettant de calculer le maximum d'une liste l.
- Donner une version itérative
- Donner une version récursive

---

## Matrices (listes de listes)

On peut choisir de représenter une matrice de dimensions (n, p) par une liste de taille n, dont les éléments sont des listes de taille p.

**Exemple :** Matrice
```
⎛ 0  1  2 ⎞
⎝ 3  4  5 ⎠
```
peut être définie en Python par :
```python
M = [[0, 1, 2], [3, 4, 5]]
```
La valeur de l'élément `m_ij` est obtenue avec l'expression `M[i][j]`.

### Création de matrices

```python
M = [[1, 2, 3] for i in range(3)]  # [[1,2,3],[1,2,3],[1,2,3]]
M[0][0] = 4                         # [[4,2,3],[1,2,3],[1,2,3]]
```

```python
M = [[i + j for i in range(1, 4)] for j in range(1, 4)]
# [[2, 3, 4], [3, 4, 5], [4, 5, 6]]
```

---

### Exercices sur les matrices

**Exercice 1 :** La trace d'une matrice carrée est la somme des valeurs situées dans la diagonale. Écrire la fonction `trace(A)` qui calcule la trace de la matrice A passée en paramètres.

**Exercice 2 :** Une matrice A = (a_ij) est dite symétrique si ∀i, j a_ij = a_ji. Écrire la fonction `symetrie(A)` qui retourne `True` si la matrice carrée A passée en arguments est une matrice symétrique et `False` sinon.

**Exercice 3 :**
1. Écrire une fonction qui calcule et retourne la somme de deux matrices passées en paramètres.
2. Tester votre fonction sur des exemples de votre choix.

**Exercice 4 :**
1. Écrire une fonction qui calcule et retourne la transposée d'une matrice passée en paramètres.
2. Tester votre fonction sur une matrice de votre choix.

---

## Tuples

Un tuple est une séquence **non modifiable** de valeurs. C'est une séquence comme les listes, la seule différence est qu'il n'est pas modifiable.

### Création de tuples

```python
tuple1 = ('E1234', 'Naciri Karim', 18)
tuple2 = ('Rabat', 'Casablanca')
tuple3 = (1, 2, 3, 4, 6, 50)
tuple4 = (12,)      # n'oubliez pas la virgule après la valeur
tuple5 = ()         # tuple vide
```

### Accès aux éléments

```python
T = ('E1234', 'Naciri Karim', 18)
print(T[0])     # E1234
print(T[1])     # Naciri Karim
print(T[2])     # 18
```

---

### Opérations sur les tuples

```python
len((1, 2, 3))                      # 3
(1, 2, 3) + (4, 5, 6)               # (1, 2, 3, 4, 5, 6)
3 * (1, 2)                          # (1, 2, 1, 2, 1, 2)
'Rabat' in ('Rabat', 'Agadir', 'Marrakech')  # True

for x in ('Rabat', 'Agadir', 'Marrakech'):
    print(x)
# Rabat
# Agadir
# Marrakech
```

---

## Ensembles (set)

### Création d'ensembles

```python
E1 = {5, 3, -8, 2}
E2 = {'o', 'e', 'y', 'u', 'a', 'i'}
E3 = {5, 'CPGE', (3, -2), 7.4}
E4 = set()          # Ensemble vide (Attention : {} crée un dictionnaire)
```

### Exemples

```python
E = {5, 2, 3, 1}
print(E)            # {1, 2, 3, 5}

{x * x for x in range(20) if x % 3 == 0}
# {0, 9, 36, 81, 144, 225, 324}

set('fabfcdcfg')    # {'a', 'b', 'c', 'd', 'e', 'f', 'g'}
set([5, 2, 5, 6, 2])  # {2, 5, 6}
```

**Remarque :** Les éléments d'un ensemble ne sont pas numérotés. Il est impossible d'utiliser une notation comme `e[i]` puisque parler de l'élément numéro i n'a pas de sens.

---

## Dictionnaires

Un dictionnaire, appelé aussi "tableau associatif", est une séquence de paires "clé : valeur" séparées par virgules et mises entre accolades.

### Création de dictionnaires

```python
dict1 = {'C451236': 'Anabih issa', 'E983477': 'Amal Abbassi'}
dict2 = {'a': 1, 'b': 2, 'c': 3, 'd': 4}
dict3 = {'name': 'Ansari Imad'}
dict4 = {}          # dictionnaire vide
```

### Accès aux valeurs

```python
etudiant = {'CNE': 'E1234', 'Nom': 'Naciri Karim', 'Age': 18}
print(etudiant['CNE'])      # 'E1234'
print(etudiant['Nom'])      # 'Naciri Karim'
print(etudiant['Age'])      # 18
```

**NB :** Une erreur `KeyError` est générée si on fournit une clé qui n'existe pas dans le dictionnaire.

---

### Modification de dictionnaires

Les dictionnaires sont modifiables (mutables).

**Modification de valeurs :**
```python
etudiant = {'CNE': 'E1234', 'Nom': 'Naciri Karim', 'Age': 18}
etudiant['Age'] = 22        # La valeur de la clé Age est modifiée en 22
```

**Suppression de valeurs :**
```python
del etudiant['Age']         # supprimer la paire de clé Age
etudiant.clear()            # vider le dictionnaire
del etudiant                # supprimer le dictionnaire tout entier
```

---

### Méthodes sur les dictionnaires

| Méthode | Description |
|---------|-------------|
| `D.get(key, default)` | Retourne la valeur de la clé key si elle existe, sinon retourne default |
| `D.items()` | Retourne la séquence de paires (clé, valeur) |
| `D.keys()` | Retourne la liste des clés du dictionnaire |
| `D.values()` | Retourne la liste des valeurs stockées dans le dictionnaire |

---

### Exercices sur les dictionnaires

**Exercice 1 :** Écrire la fonction `toListe(D)` qui reçoit un dictionnaire en paramètres et qui permet de le convertir en liste de listes dont la première colonne sont les clés et la deuxième colonne les valeurs.

**Exercice 2 :** Écrire la fonction `frequency(L)` qui reçoit une liste de nombres en paramètres et qui retourne un dictionnaire dont les clés sont les différents nombres de la liste et les valeurs la fréquence de chaque nombre.

---

## Chaînes de caractères

Une chaîne de caractères est une suite quelconque de caractères délimitée soit par des apostrophes (simple quote), soit par des guillemets (double quote), soit par triples guillemets ou triples apostrophes dans le cas où la chaîne de caractères est sur plusieurs lignes.

### Exemples

```python
ch1 = ""                    # chaîne vide
ch2 = 'Je suis en classe MPSI3'
ch3 = "J'ai une bonne note en informatique"
ch4 = """Python est un langage de programmation"""
ch5 = """Trois principales types de séquences existent en Python:
- Les listes,
- Les tuples,
- Les chaînes"""
```

---

### Propriétés des chaînes

Les chaînes de caractères ont beaucoup de points communs avec les listes : longueur avec `len()`, accès aux éléments, concaténation, slicing, parcours, etc.

```python
s = 'bonjour'
len(s)          # 7
s[1]            # 'o' (les indices commencent à zéro)
s + ' UM6P'     # 'bonjour UM6P'
s[1:4]          # 'onj' (sous-chaîne entre caractère 1 et 4 exclu)
```

**Différence importante :** les chaînes de caractères sont **non modifiables**.

```python
ch = 'BONJOUR'
ch[0] = 'D'     # TypeError: 'str' object does not support item assignment
```

---

### Caractères spéciaux

| Séquence | Signification |
|----------|---------------|
| `\n` | Saut de ligne |
| `\'` | Apostrophe dans une chaîne délimitée par des apostrophes |
| `\"` | Guillemets dans une chaîne délimitée par des guillemets |
| `\\` | Antislash |

---

### Codage des caractères

On attribue à chaque caractère un nombre appelé code. La norme d'encodage utilisée est UTF-8.

**Fonction `ord()`** : obtient le code correspondant à un caractère.
```python
ord('A')    # 65
ord('a')    # 97
ord('#')    # 35
```

**Fonction `chr()`** : récupère le caractère correspondant à un code.
```python
chr(65)     # 'A'
chr(97)     # 'a'
chr(35)     # '#'
```

---

### Méthodes sur les chaînes

| Méthode | Description |
|---------|-------------|
| `count(c)` | Compte l'occurrence d'un caractère |
| `isupper()` | Vérifie si la chaîne est en majuscule |
| `upper()` | Convertit en majuscule |
| `islower()` | Vérifie si la chaîne est en minuscule |
| `lower()` | Convertit en minuscule |
| `split(sep)` | Transforme la chaîne en liste (sépare selon sep) |

**Exemples :**
```python
s = 'Bonjour python'
s.count('o')            # 3

s = "J'AI 20 ANS"
s.isupper()             # True

s = "J'ai 20 ANS"
s.upper()               # "J'AI 20 ANS"

s = "Je suis en prepas"
s.split()               # ['Je', 'suis', 'en', 'prepas']

s = "Je:suis:en:prepas"
s.split(':')            # ['Je', 'suis', 'en', 'prepas']
```

---

### Exercices sur les chaînes

**Exercice 1 :** Une chaîne de caractères est dite palindrome si elle se lit de la même façon dans les deux sens (Exemple : 'laval', 'ELLE', 'ressasser').

Définir la fonction `palindrome` permettant de vérifier si la chaîne passée en argument est un palindrome (Retourne `True` si oui et `False` sinon).

```python
>>> s = 'ELLE'
>>> palindrome(s)
True
>>> s = "J'ai 20 ANS"
>>> palindrome(s)
False
```

**Exercice 2 :** En utilisant la fonction `chr`, écrire une fonction `ascii` recevant deux entiers en paramètres et retournant la table des caractères dont leurs codes ascii est entre les deux entiers passés en paramètres.

```python
>>> ascii(66,70)
B 66
C 67
D 68
E 69
F 70
```

---

## Fichiers

Un fichier texte est un fichier qui contient des caractères et des espaces organisés en lignes successives, séparées par un caractère spécial non imprimable appelé "marqueur de fin de ligne".

### Ouverture et fermeture

```python
f = open('Monfichier.txt', 'w')   # ouverture en écriture
# ... opérations ...
f.close()                         # fermeture
```

**Modes d'ouverture :**
- `'r'` : lecture
- `'w'` : écriture (écrase le contenu existant)
- `'a'` : ajout (append)

---

### Écriture dans un fichier

La méthode `write()` réalise l'écriture dans un fichier texte.

```python
f = open('Monfichier.txt', 'a')
f.write('Bonjour, fichier !')
f.write("Quel beau temps, aujourd'hui !")
```

**Remarques :**
- La fonction `write()` reçoit exactement un unique argument qui doit obligatoirement être une chaîne de caractère.
- La fonction `write()` ne peut être appelée que si le fichier est ouvert en mode `'w'` ou `'a'`.

---

### Lecture d'un fichier

- La méthode `read()` permet de lire d'un fichier.
- Sans argument, la totalité du fichier est transférée.
- Avec un argument, indique le nombre de caractères à lire.

```python
f = open('Monfichier.txt', 'r')
contenu = f.read()          # lit tout le fichier
# ou
contenu_partiel = f.read(100)   # lit 100 caractères
```

**Remarques :**
- La fonction `read()` ne peut être appelée que si le fichier est ouvert en mode `'r'`.
- S'il ne reste pas assez de caractères, la lecture s'arrête à la fin du fichier.
- Si la fin du fichier est déjà atteinte, la fonction renvoie une chaîne vide.

---

### Autres méthodes de lecture

| Méthode | Description |
|---------|-------------|
| `readline()` | Lit une ligne du fichier |
| `readlines()` | Lit toutes les lignes restantes et les retourne dans une liste |
| `seek(position)` | Place le curseur à une position donnée |

**Remarque :** Une fois arrivé à la fin du fichier, `readline()` renvoie une chaîne vide, tandis que `readlines()` renvoie une liste vide.

---

### Exercices sur les fichiers

**Exercice 1 :**
Écrire la fonction `copier` qui reçoit en paramètres les noms de deux fichiers, dont le premier est supposé existant et le deuxième est à créer en y copiant le contenu du premier tout en remplaçant les espaces par le caractère "‡".

**Exercice 2 :**
Écrire une version modifiée `copier_2` de la fonction `copier` de l'exercice précédent permettant de copier le contenu du premier dans le deuxième, en omettant toutes les lignes qui commencent par le caractère "#".

**Exercice 3 :**
Écrire la fonction permettant de compter le nombre de caractères d'un fichier tout en omettant les espaces et les retours à la ligne (`\n`).

---

## Classes et Programmation Orientée Objet

### Exemple : Classe Complexe

```python
class Complexe:
    """Classe définissant un nombre complexe par sa partie réelle et sa partie imaginaire"""
    
    # Constructeur
    def __init__(self, x, y):
        self.reel = x
        self.imag = y
    
    # Afficheur
    def __repr__(self):
        return f"Complexe({self.reel}, {self.imag})"
    
    # Conversion en chaîne de caractères
    def __str__(self):
        return f"{self.reel} + {self.imag}i"
```

---

### Exercice : Compléter la classe Complexe

Implémenter les méthodes suivantes pour la classe Complexe :

a) `addition` : permet de calculer et de retourner la somme du complexe lui-même et d'un autre complexe

b) `oppose` : renvoie le complexe opposé du complexe lui-même

c) `conjugue` : renvoie le complexe conjugué du complexe lui-même

d) `inverse` : renvoie le complexe inverse du complexe lui-même

e) `produit` : renvoie le complexe produit du complexe lui-même et d'un autre complexe

f) `difference` : renvoie le complexe différence du complexe lui-même et d'un autre complexe

g) `distance` : renvoie la distance entre deux complexes `√((x₁ - x₂)² + (y₁ - y₂)²)`

---

<embed src="/media/pdf/Python.pdf" type="application/pdf" width="100%" height="600px" />