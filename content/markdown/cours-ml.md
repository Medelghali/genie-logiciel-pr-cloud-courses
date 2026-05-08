{
    "type": "CourseIntro",
    "reference": "machine-learning-intro"
}
---

# Cours : Fondamentaux du Machine Learning et Analyse de Régression

## Module 1 : Le paysage du Machine Learning

Le Machine Learning (ML) est un sous-domaine de l'intelligence artificielle qui se concentre sur la création de systèmes capables d'apprendre à partir de données, d'identifier des modèles et de prendre des décisions avec un minimum d'intervention humaine. Au lieu d'écrire des règles explicites pour un programme, nous fournissons au programme des données et un algorithme pour qu'il *apprenne* lui-même les règles.

Avant de plonger dans les mathématiques, nous devons catégoriser les différents paradigmes d'apprentissage des machines.

### 1.1 Apprentissage Supervisé (Supervised Learning)

Dans l'**apprentissage supervisé**, l'algorithme est entraîné sur un jeu de données "étiqueté" (labeled). Cela signifie que chaque exemple dans les données d'entraînement est accompagné de la bonne réponse (l'étiquette). L'objectif est que le modèle apprenne la correspondance entre les entrées (caractéristiques ou *features*) et la sortie (étiquette) afin de pouvoir généraliser sur de nouvelles données.

* **Classification :** La variable de sortie est une catégorie ou une valeur discrète.
  * *Exemple :* Identifier si un email est "Spam" ou "Non Spam", ou diagnostiquer une tumeur comme "Maligne" ou "Bénigne".

* **Régression :** La variable de sortie est une valeur numérique continue.
  * *Exemple :* Prédire le prix futur d'une action, la température de demain, ou estimer le prix d'une maison en fonction de sa superficie.

### 1.2 Apprentissage Non Supervisé (Unsupervised Learning)

Dans l'**apprentissage non supervisé**, l'algorithme reçoit des données sans aucune étiquette explicite. Le système essaie d'apprendre la structure ou la distribution sous-jacente dans les données sans intervention humaine.

* **Clustering (Regroupement) :** Regrouper des données non triées en fonction de leurs similitudes.
  * *Exemple :* Segmentation de la clientèle (regrouper les clients par comportement d'achat sans catégories prédéfinies).
* **Réduction de dimensionnalité :** Réduire le nombre de variables aléatoires prises en compte en obtenant un ensemble de variables principales. Cela compresse les données tout en maintenant leur intégrité structurelle, ce qui est très utile pour la visualisation et la réduction de la charge de calcul (par ex., ACP - Analyse en Composantes Principales).

### 1.3 Apprentissage par Renforcement (Reinforcement Learning)

Dans l'**apprentissage par renforcement (RL)**, un "agent" apprend à se comporter dans un environnement en effectuant des actions et en observant les résultats. Il est basé sur un système de récompenses. L'agent reçoit un renforcement positif pour les bonnes actions et un renforcement négatif (pénalités) pour les mauvaises.

* *Exemple :* Entraîner une IA à jouer aux échecs, la conduite autonome, ou la navigation robotique. L'algorithme apprend la politique optimale pour maximiser sa récompense cumulée au fil du temps.

### 1.4 Apprentissage par Transfert (Transfer Learning)

L'**apprentissage par transfert** est une technique où un modèle développé pour une tâche spécifique est réutilisé comme point de départ pour un modèle sur une seconde tâche connexe. Au lieu d'entraîner un modèle de zéro (ce qui nécessite des quantités massives de données et de puissance de calcul), nous "transférons" les connaissances (poids et biais) d'un modèle pré-entraîné.

* *Exemple :* Prendre un modèle massif de reconnaissance d'images entraîné par Google et affiner ses dernières couches pour reconnaître des types spécifiques de radiographies médicales.

---

## Module 2 : Régression Linéaire Univariée

Nous allons maintenant zoomer sur l'apprentissage supervisé, plus précisément la **Régression**. Nous commencerons par sa forme la plus simple : la régression linéaire univariée (à une seule variable).

### 2.1 La fonction d'hypothèse (The Hypothesis Function)

La régression est une technique statistique qui estime la relation entre une variable dépendante $y$ (la cible) et une variable indépendante $x$ (la caractéristique). Le but de la régression linéaire est d'ajuster une ligne droite à travers les points de données qui représente le mieux la tendance.

La formulation mathématique (l'Hypothèse) est :
$$y=ax+b$$

* $y$ : La valeur prédite (souvent notée $\hat{y}$).
* $x$ : La caractéristique d'entrée.
* $a$ : La pente (poids ou *weight*) de la ligne. Elle détermine de combien $y$ change pour un changement d'une unité de $x$.
* $b$ : L'ordonnée à l'origine (biais ou *bias*). Elle détermine où la ligne croise l'axe vertical.

### 2.2 La fonction de coût (MSE)

Pour trouver la ligne qui "s'ajuste le mieux", nous avons besoin d'un moyen de mesurer à quel point notre ligne actuelle a *tort*. Nous faisons cela en calculant l'erreur entre les prédictions de notre modèle et les vraies étiquettes réelles de notre jeu de données.

La métrique la plus courante pour la régression est l'**Erreur Quadratique Moyenne (MSE - Mean Squared Error)**.

Si nous avons $m$ exemples d'entraînement, pour chaque exemple $i$, notre modèle prédit $ax^{(i)}+b$, tandis que la vraie valeur est $y^{(i)}$. L'erreur pour cette seule prédiction est $(ax^{(i)}+b-y^{(i)})$.

Nous élevons cette erreur au carré pour deux raisons :

1. Cela garantit que toutes les erreurs sont positives (ainsi une prédiction trop élevée n'annule pas une prédiction trop basse).
2. Cela pénalise lourdement les grandes erreurs, forçant le modèle à se soucier davantage des valeurs aberrantes (outliers).

La fonction de coût totale $J(a,b)$ est la moyenne de ces erreurs au carré :

$$J(a,b)=\frac{1}{2m}\sum_{i=1}^{m}(ax^{(i)}+b-y^{(i)})^2$$

*(Remarque : Nous divisons par $2m$ au lieu de juste $m$ pour rendre les calculs plus propres lorsque nous prendrons la dérivée plus tard. La constante $\frac{1}{2}$ ne change pas l'emplacement du coût minimum).*

---

## Module 3 : Optimisation via la Descente de Gradient

Nous avons notre fonction de coût $J(a,b)$. Notre objectif est de trouver les valeurs spécifiques de $a$ et $b$ qui rendent $J(a,b)$ aussi proche de $0$ que possible.

### 3.1 Intuition

Imaginez que vous êtes au sommet d'une montagne brumeuse et que vous voulez atteindre le village tout au fond de la vallée. À cause du brouillard, vous ne pouvez pas voir le village. Que faites-vous ? Vous sentez la pente du sol sous vos pieds. Vous faites un pas dans la direction qui descend le plus abruptement. Vous répétez cela jusqu'à ce que le sol soit plat.

C'est exactement ainsi que fonctionne la **Descente de Gradient** (Gradient Descent). La "montagne" est la fonction de coût $J(a,b)$. La "pente du sol" est la dérivée (le gradient).

### 3.2 L'Algorithme

1. **Initialiser** les paramètres $a$ et $b$ (souvent à 0 ou à de petits nombres aléatoires).
2. **Répéter** jusqu'à convergence (jusqu'à ce que le coût cesse de diminuer) :
  * Calculer la fonction de coût $J(a,b)$.
  * Calculer les gradients (la pente).
  * Mettre à jour les paramètres simultanément :
    * $$a=a-\alpha\frac{\partial J}{\partial a}$$
    * $$b=b-\alpha\frac{\partial J}{\partial b}$$

**Le taux d'apprentissage ($\alpha$ ou *Learning Rate*) :** Cet hyperparamètre contrôle la taille du "pas" que vous faites pour descendre la montagne.

* Si $\alpha$ est trop petit, la descente de gradient sera incroyablement lente.
* Si $\alpha$ est trop grand, vous risquez d'enjamber complètement la vallée et de vous retrouver plus haut de l'autre côté (divergence).

### 3.3 Dérivation des Gradients (Le calcul)

Pour mettre à jour nos paramètres, nous avons besoin des dérivées partielles de notre fonction de coût par rapport à $a$ et $b$. Nous utiliserons la **règle de dérivation en chaîne** (Chain Rule), exactement comme vous l'avez noté : $(g \circ f)' = g'(f) \cdot f'$.

Soit notre fonction interne l'erreur :
$$f(a,b)=ax^{(i)}+b-y^{(i)}$$
Soit notre fonction externe le carré :
$$g(z)=z^2$$

La dérivée de la fonction externe par rapport à son entrée est $g'(z) = 2z$.
Par conséquent : $g'(f) = 2(ax^{(i)}+b-y^{(i)})$.

Maintenant, nous avons besoin de la dérivée de la fonction interne $f$ par rapport à nos paramètres :

* Par rapport à $a$ : $\frac{\partial f}{\partial a} = x^{(i)}$
* Par rapport à $b$ : $\frac{\partial f}{\partial b} = 1$

**Calcul de $\frac{\partial J}{\partial a}$ :**
Appliquez la règle en chaîne, en vous rappelant de la constante $\frac{1}{2m}$ devant la somme :
$$\frac{\partial J}{\partial a} = \frac{1}{2m} \sum_{i=1}^{m} 2(ax^{(i)}+b-y^{(i)}) \cdot x^{(i)}$$
Le $2$ et le $\frac{1}{2}$ s'annulent :
$$\frac{\partial J}{\partial a} = \frac{1}{m} \sum_{i=1}^{m} (ax^{(i)}+b-y^{(i)}) x^{(i)}$$

**Calcul de $\frac{\partial J}{\partial b}$ :**
En appliquant la même logique :
$$\frac{\partial J}{\partial b} = \frac{1}{2m} \sum_{i=1}^{m} 2(ax^{(i)}+b-y^{(i)}) \cdot 1$$
$$\frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (ax^{(i)}+b-y^{(i)})$$

### 3.4 Implémentation en Python (Univariée)

Voici une implémentation robuste, de style production, de l'algorithme que vous avez décrit, en ajoutant un suivi de l'historique afin que nous puissions observer la baisse du coût au fil du temps.

```python
import numpy as np

def descente_de_gradient(X, y, a=0.0, b=0.0, alpha=0.01, iterations=1000):
    """
    Effectue une descente de gradient pour apprendre a et b.
    
    Paramètres :
    X : array-like, valeurs des caractéristiques
    y : array-like, valeurs cibles
    a, b : poids initiaux (scalaires)
    alpha : taux d'apprentissage
    iterations : nombre d'époques
    
    Retourne :
    a, b : paramètres optimisés
    historique_cout : liste des valeurs de coût au fil du temps
    """
    m = len(y)
    historique_cout = []
    
    for i in range(iterations):
        # 1. Calculer les prédictions (Hypothèse)
        predictions = a * X + b
        
        # 2. Calculer le coût (Suivi de la MSE)
        cout = (1 / (2 * m)) * np.sum((predictions - y) ** 2)
        historique_cout.append(cout)
        
        # 3. Calculer les gradients
        da = (1/m) * np.sum((predictions - y) * X)
        db = (1/m) * np.sum(predictions - y)
        
        # 4. Mettre à jour les paramètres
        a = a - alpha * da
        b = b - alpha * db
        
        # Optionnel : Afficher la progression
        if i % (iterations // 10) == 0:
            print(f"Itération {i:4d} | Coût : {cout:.4f} | a : {a:.4f}, b : {b:.4f}")
            
    return a, b, historique_cout

# Exemple d'utilisation :
# Disons que X est la superficie (en milliers) et y est le prix (en milliers d'euros)
X_train = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y_train = np.array([3.0, 5.0, 7.0, 9.0, 11.0]) # Relation vraie : y = 2x + 1

a_final, b_final, couts = descente_de_gradient(X_train, y_train, a=0, b=0, alpha=0.05, iterations=500)
print(f"Modèle final : y = {a_final:.2f}x + {b_final:.2f}")
```

Pour vraiment comprendre comment le taux d'apprentissage et les itérations affectent la capacité du modèle à s'ajuster aux données, regardons une simulation interactive de ce processus exact.

<div style="background-color: #2e2e2e; padding: 20px; border-radius: 5px; margin-top: 20px;">

![Diagram](/media/mermaid-diagram-ml-cours.png)

</div>

---

## Module 4 : Régression Linéaire Multivariée

Les problèmes du monde réel dépendent rarement d'une seule variable. Le prix d'une maison n'est pas seulement déterminé par sa taille ; il est déterminé par sa taille, le nombre de chambres, son âge et sa distance par rapport au centre-ville.

Lorsqu'on traite plusieurs caractéristiques, notre hypothèse s'étend :

$$y=w_0+w_1x_1+w_2x_2+...+w_nx_n$$

* $w_0$ est le biais (équivalent à $b$ précédemment).
* $w_1, w_2, ..., w_n$ sont les poids pour chaque caractéristique respective.

### 4.1 Vectorisation (Formulation matricielle)
Utiliser des boucles `for` en programmation pour calculer la somme de $n$ caractéristiques sur $m$ points de données est très coûteux en calcul. Nous contournons cela en exprimant nos équations sous forme de matrices d'algèbre linéaire. C'est ce qu'on appelle la **Vectorisation**, et les bibliothèques modernes comme NumPy sont optimisées pour effectuer ces calculs matriciels à une vitesse fulgurante sur le matériel (CPU et GPU).

Définissons nos Matrices :

**1. La Matrice des Caractéristiques ($X$) :**
Nous avons $m$ exemples et $n$ caractéristiques. Nous ajoutons une caractéristique "fictive" $x_0 = 1$ à chaque exemple pour permettre le terme de biais $w_0$.

$$X=\begin{pmatrix} 1 & x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\ 1 & x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 1 & x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)} \end{pmatrix}$$
*(Dimensions de $X$ : $m \times (n+1)$)*

**2. Le Vecteur des Poids ($W$) :**

$$W=\begin{pmatrix} w_0 \\ w_1 \\ w_2 \\ \vdots \\ w_n \end{pmatrix}$$
*(Dimensions de $W$ : $(n+1) \times 1$)*

**3. Le Vecteur Cible ($Y$) :**

$$Y=\begin{pmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{pmatrix}$$
*(Dimensions de $Y$ : $m \times 1$)*

Avec ces matrices, l'ensemble de nos prédictions pour les $m$ exemples se réduit à une seule multiplication matricielle élégante :
$$\hat{Y}=XW$$

### 4.2 Coût multivarié et Descente de Gradient

L'Erreur Quadratique Moyenne (MSE) utilisant notre formulation vectorisée devient :

$$MSE=\frac{1}{2m}||Y-XW||^2=\frac{1}{2m}(XW-Y)^T(XW-Y)$$

Pour mettre à jour nos poids, l'algorithme de descente de gradient sous forme vectorisée est brillamment simple :

$$W=W-\alpha\frac{1}{m}X^T(XW-Y)$$

### 4.3 L'Équation Normale (Solution Analytique)

La descente de gradient est un algorithme itératif. Cependant, pour la régression linéaire, il existe en fait un moyen de résoudre les poids parfaits mathématiquement en une seule étape en fixant la dérivée de la fonction de coût à zéro et en résolvant pour $W$.

C'est ce qu'on appelle l'**Équation Normale** :

$$W=(X^T X)^{-1} X^T Y$$

| Caractéristique | Descente de Gradient | Équation Normale |
| :--- | :--- | :--- |
| **Taux d'apprentissage ($\alpha$)** | Nécessite de choisir un $\alpha$ optimal. | Pas besoin de choisir $\alpha$. |
| **Itérations** | Nécessite de nombreuses itérations pour converger. | Résout en une seule étape mathématique. |
| **Mise à l'échelle des caractéristiques** | Très sensible aux données non mises à l'échelle (nécessite une normalisation). | Ne nécessite pas de mise à l'échelle (*scaling*). |
| **Complexité de calcul** | Rapide même avec des millions de caractéristiques ($O(kn^2)$). | Lent si $n$ (caractéristiques) est très grand ($O(n^3)$ en raison de l'inversion de matrice). |

---

## Module 5 : Régression Polynomiale

La régression linéaire suppose que la relation entre les caractéristiques et l'étiquette est une ligne droite (ou un hyperplan plat dans de multiples dimensions). Mais que se passe-t-il si les données sont courbes ? Que faire si la relation est non linéaire ?

Si vous essayez d'ajuster une ligne droite à des données courbes, vous obtenez un **Sous-ajustement** (Underfitting / Biais élevé). Le modèle est trop simple pour capturer la complexité des données.

Pour corriger cela, nous n'avons pas besoin d'un nouvel algorithme ; nous devons simplement modifier nos caractéristiques (*feature engineering*). La **Régression Polynomiale** est simplement une Régression Linéaire appliquée à des caractéristiques polynomiales créées de toutes pièces.

### 5.1 Polynôme du second degré

Au lieu d'utiliser simplement $x$, nous ajoutons une nouvelle caractéristique à notre jeu de données qui est $x^2$.

$$y=\beta_0+\beta_1x+\beta_2x^2+\epsilon$$
*(Où $\epsilon$ représente l'erreur irréductible).*

Maintenant, nous traitons $x$ comme $x_1$ et $x^2$ comme $x_2$. Nous avons réussi à transformer un problème non linéaire en un problème de régression linéaire multivariée. Nous pouvons utiliser exactement la même descente de gradient ou la même équation normale pour le résoudre !

### 5.2 Polynôme de degré N

Nous pouvons étendre cela au $N$-ième degré pour ajuster des courbes très complexes :

$$y=\beta_0+\beta_1x+\beta_2x^2+...+\beta_nx^n+\epsilon$$

### 5.3 Le danger de la régression polynomiale : le Surajustement (Overfitting)

Bien que l'ajout de degrés supérieurs vous permette d'ajuster des courbes complexes, cela introduit un risque massif : le **Surajustement** (Variance élevée).

Si vous avez 10 points de données et que vous utilisez un polynôme de 9ème degré, votre modèle passera exactement par chaque point. Votre fonction de coût ($MSE$) sera exactement de $0$.
Cependant, la courbe résultante oscillera de manière sauvage. Lorsque vous donnerez à ce modèle de nouvelles données inédites, ses prédictions seront astronomiquement fausses. Le modèle n'a pas appris la *tendance sous-jacente* ; il a simplement mémorisé le bruit dans les données d'entraînement.

Ceci introduit la lutte fondamentale du Machine Learning : **Le compromis Biais-Variance** (Bias-Variance Tradeoff).
* Modèle trop simple = Sous-ajustement (Biais élevé).
* Modèle trop complexe = Surajustement (Variance élevée).

### 5.4 Résumé de l'implémentation pour la régression polynomiale

Si vous vouliez implémenter la régression polynomiale en utilisant l'équation normale, vos étapes en Python/NumPy ressembleraient à ceci :

```python
import numpy as np

# 1. Commencer avec votre caractéristique X
X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
Y = np.array([1, 4, 9, 16, 25]).reshape(-1, 1) # Relation non linéaire (y = x^2)

# 2. Créer des caractéristiques polynomiales (ajouter x^2)
X_poly = np.hstack((X, X**2))

# 3. Ajouter la colonne de biais remplie de 1
X_b = np.c_[np.ones((len(X_poly), 1)), X_poly]

# 4. Utiliser l'Équation Normale : W = (X^T * X)^-1 * X^T * Y
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(Y)

print("Poids (Biais, Beta1, Beta2) :")
print(theta_best)
# La sortie identifiera correctement le biais à ~0, Beta1 à ~0, et Beta2 à 1.
```

### Conclusion

En maîtrisant la fonction d'hypothèse, la fonction de coût, le calcul derrière la descente de gradient et l'algèbre matricielle derrière la vectorisation, vous avez posé des fondations massives. Que vous traitiez d'une seule caractéristique pour prédire le prix des maisons, ou d'une matrice avec des milliers de caractéristiques polynomiales mappées à un phénomène complexe du monde réel, les mécanismes sous-jacents restent identiques : **définir le coût de l'erreur, et descendre mathématiquement la pente jusqu'à trouver la vérité.**

## Implémentations en Python


### 1. Régression Linéaire Univariée (Descente de Gradient)


C'est le modèle de base prédisant une seule caractéristique $x$ pour une cible $y$ en utilisant la formule $y = ax + b$.

```python
import numpy as np

def regression_lineaire_univariee(X, y, alpha=0.01, iterations=1000):
    """
    Entraîne un modèle de régression linéaire univariée en utilisant la descente de gradient.
    
    Paramètres :
    X (numpy.array) : Tableau 1D des valeurs de la caractéristique (feature).
    y (numpy.array) : Tableau 1D des valeurs cibles (target).
    alpha (float) : Taux d'apprentissage (learning rate).
    iterations (int) : Nombre d'époques.
    
    Retourne :
    a (float) : La pente optimisée.
    b (float) : L'ordonnée à l'origine optimisée (biais).
    """
    # Initialiser les paramètres à zéro
    a = 0.0
    b = 0.0
    m = len(y) # Nombre d'exemples d'entraînement
    
    for i in range(iterations):
        # 1. Calculer les prédictions (Hypothèse : y = ax + b)
        y_pred = a * X + b
        
        # 2. Calculer l'erreur
        erreur = y_pred - y
        
        # 3. Calculer les gradients
        # La moyenne de (erreur * X) pour 'a', et la moyenne de (erreur) pour 'b'
        da = (1/m) * np.sum(erreur * X)
        db = (1/m) * np.sum(erreur)
        
        # 4. Mettre à jour les paramètres en descendant la pente
        a -= alpha * da
        b -= alpha * db
        
        # Optionnel : Afficher le coût (MSE) toutes les 100 itérations pour le voir diminuer
        if i % 100 == 0:
            cout = (1 / (2 * m)) * np.sum(erreur ** 2)
            print(f"Itération {i} | Coût : {cout:.4f}")
            
    return a, b

# --- Tester le Code ---
# X = np.array([1, 2, 3, 4, 5])
# y = np.array([3, 5, 7, 9, 11]) # La relation est environ y = 2x + 1
# a, b = regression_lineaire_univariee(X, y, alpha=0.05, iterations=500)
```

---


### 2. Régression Linéaire Multivariée (Descente de Gradient Vectorisée)


Ce modèle gère plusieurs caractéristiques. Il s'appuie fortement sur la multiplication matricielle (`@` en Python) pour éviter les boucles `for` lentes. Il calcule $Y = XW$.

```python
import numpy as np

def regression_lineaire_multivariee(X, y, alpha=0.01, iterations=1000):
    """
    Entraîne un modèle de régression linéaire multivariée.
    
    Paramètres :
    X (numpy.ndarray) : Tableau 2D de forme (m, n) où m=échantillons, n=caractéristiques.
    y (numpy.ndarray) : Tableau 2D de forme (m, 1) représentant les cibles.
    alpha (float) : Taux d'apprentissage.
    iterations (int) : Nombre d'époques.
    
    Retourne :
    W (numpy.ndarray) : La matrice de poids optimisée de forme (n+1, 1).
    """
    m = X.shape[0] # Nombre d'échantillons (lignes)
    
    # 1. Ajouter la colonne de Biais (une colonne de 1) à la matrice X
    # Cela nous permet de calculer l'ordonnée à l'origine (w0) dans les calculs matriciels
    colonne_un = np.ones((m, 1))
    X_b = np.hstack((colonne_un, X))
    
    # 2. Initialiser le vecteur de poids W avec des zéros (Forme : n+1 lignes, 1 colonne)
    # n caractéristiques + 1 terme de biais
    n_caracteristiques = X_b.shape[1]
    W = np.zeros((n_caracteristiques, 1))
    
    for i in range(iterations):
        # 3. Calculer les prédictions : Y_pred = X * W
        y_pred = X_b @ W
        
        # 4. Calculer l'erreur
        erreur = y_pred - y
        
        # 5. Calculer les gradients par vectorisation : X^T * Erreur / m
        gradients = (1/m) * (X_b.T @ erreur)
        
        # 6. Mettre à jour les poids
        W -= alpha * gradients
        
    return W

# --- Tester le Code ---
# X = np.array([[1, 2], [2, 4], [3, 6], [4, 8]]) # 2 Caractéristiques
# y = np.array([[5], [10], [15], [20]])          # Cible
# W = regression_lineaire_multivariee(X, y, alpha=0.01, iterations=1000)
```

---


### 3. Régression Polynomiale (Équation Normale)


Pour diversifier votre code et montrer à votre professeur que vous maîtrisez plusieurs approches mathématiques, voici la régression polynomiale résolue à l'aide de l'**Équation Normale** au lieu de la descente de gradient. Elle calcule les poids parfaits exacts en une seule étape mathématique en utilisant $W = (X^T X)^{-1} X^T Y$.

```python
import numpy as np

def regression_polynomiale_equation_normale(X, y, degre=2):
    """
    Entraîne un modèle de régression polynomiale en utilisant l'équation normale analytique.
    
    Paramètres :
    X (numpy.ndarray) : Tableau 1D ou 2D de la caractéristique de base.
    y (numpy.ndarray) : Tableau 2D de la cible.
    degre (int) : Le degré du polynôme (ex: 2 signifie ajouter X^2).
    
    Retourne :
    W (numpy.ndarray) : Les poids optimaux.
    """
    # S'assurer que X est un vecteur colonne 2D
    if X.ndim == 1:
        X = X.reshape(-1, 1)
        
    m = X.shape[0]
    
    # 1. Feature Engineering : Créer des caractéristiques polynomiales (X, X^2, X^3...)
    X_poly = X.copy()
    for d in range(2, degre + 1):
        nouvelle_caracteristique = X ** d
        X_poly = np.hstack((X_poly, nouvelle_caracteristique))
        
    # 2. Ajouter la colonne de Biais (des 1)
    colonne_un = np.ones((m, 1))
    X_b = np.hstack((colonne_un, X_poly))
    
    # 3. Calculer les poids en utilisant l'Équation Normale : W = (X^T * X)^-1 * X^T * Y
    # np.linalg.inv calcule l'inverse d'une matrice
    X_transpose = X_b.T
    
    # Mathématiques matricielles étape par étape :
    etape1 = X_transpose @ X_b              # (X^T * X)
    etape2 = np.linalg.inv(etape1)          # (X^T * X)^-1
    etape3 = etape2 @ X_transpose           # (X^T * X)^-1 * X^T
    W = etape3 @ y                          # ((X^T * X)^-1 * X^T) * Y
    
    return W

# --- Tester le Code ---
# X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
# y = np.array([1, 4, 9, 16, 25]).reshape(-1, 1) # Non linéaire : y = x^2
# W = regression_polynomiale_equation_normale(X, y, degre=2)
# print("Poids (Biais, W1, W2) : \n", W)
```

# Chapitre : La Régression Logistique

## 1. Introduction et Problématique
La régression logistique est un algorithme fondamental d'apprentissage supervisé utilisé pour la **classification binaire**. Contrairement à la régression classique qui prédit une valeur continue, nous cherchons ici à prédire une catégorie.

Prenons l'exemple de la classification d'emails (Spam ou Non-Spam). Dans ce type de *dataset*, la variable cible $y$ ne peut prendre que deux valeurs discrètes :
* $y = 0$ : Non-Spam (Classe négative)
* $y = 1$ : Spam (Classe positive)

### Pourquoi ne pas utiliser la Régression Linéaire ?
Il serait tentant d'utiliser une fonction linéaire $f(X) = X\Theta$ et d'établir une règle de décision simple :
* Si $f(X) \ge 0.5 \implies y = 1$
* Si $f(X) < 0.5 \implies y = 0$

Graphiquement, cela équivaudrait à dire qu'il existe une valeur $x = a$ telle que toute valeur à droite est un spam, et toute valeur à gauche n'en est pas un. 

**Le problème fondamental :** La fonction linéaire n'est pas bornée. Elle peut facilement prédire des valeurs négatives ($f(X) = -2.3$) ou supérieures à $1$ ($f(X) = 4.5$). Dans un contexte de classification où l'on cherche à exprimer une *probabilité* d'appartenance à une classe, ces valeurs n'ont aucun sens mathématique. De plus, la régression linéaire est extrêmement sensible aux valeurs aberrantes (outliers), ce qui déplacerait faussement la frontière de décision.

---

## 2. La Fonction Sigmoïde (Fonction Logistique)
Pour résoudre ce problème de bornes, nous devons transformer la sortie de notre équation linéaire pour qu'elle soit toujours comprise entre $0$ et $1$. Nous utilisons pour cela la **fonction sigmoïde** (ou fonction logistique) :

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

En posant $Z = X\Theta$ (notre combinaison linéaire), notre nouveau modèle devient :
$$h_\Theta(X) = \sigma(X\Theta)$$

Cette fonction nous donne directement la **probabilité** que l'observation appartienne à la classe 1 : $P(y=1 | X; \Theta)$.

**Comportement aux limites :**

| Entrée ($Z$) | Sortie ($\sigma(Z)$) | Interprétation |
| :--- | :--- | :--- |
| $Z \to +\infty$ | $\sigma(Z) \to 1$ | Certitude absolue d'être dans la **Classe 1** |
| $Z \to -\infty$ | $\sigma(Z) \to 0$ | Certitude absolue d'être dans la **Classe 0** |
| $Z = 0$ | $\sigma(Z) = 0.5$ | **Incertitude absolue** (Frontière exacte) |

---

## 3. Frontières de Décision (Decision Boundaries)
La frontière de décision est l'endroit où le modèle bascule d'une classe à l'autre. 

Si l'on fixe le seuil de classification à $0.5$ :
* Prédiction $y = 1$ si $\sigma(X\Theta) \ge 0.5$
* Prédiction $y = 0$ si $\sigma(X\Theta) < 0.5$

Sachant que $\sigma(Z) \ge 0.5$ est mathématiquement équivalent à $Z \ge 0$, la frontière de décision est définie par l'équation géométrique :
$$X\Theta = 0$$

C'est cette équation qui sépare spatialement les données de la classe 0 de celles de la classe 1.

---

## 4. La Fonction de Coût (Cost Function)

### L'échec du MSE (Mean Squared Error)
Pour la régression linéaire, la fonction de coût classique est l'erreur quadratique moyenne :
$$J(\Theta) = \frac{1}{2m} \sum_{i=1}^{m} (X\Theta - Y)^2$$
Cette fonction est **convexe** (en forme de bol), ce qui garantit qu'un algorithme de Descente de Gradient trouvera toujours le minimum global.

Cependant, si nous insérons notre modèle logistique $\sigma(X\Theta)$ dans cette équation quadratique, la non-linéarité de la fonction exponentielle rendra la fonction de coût **non-convexe**. Elle sera remplie de minimums locaux. La descente de gradient risque fortement de se bloquer au premier minimum rencontré, sans jamais trouver la solution optimale.

### La nouvelle fonction : L'Entropie Croisée (Log-Loss)
Pour obtenir une fonction strictement convexe pour la régression logistique, nous utilisons les logarithmes pour pénaliser lourdement les mauvaises prédictions.

Le coût d'une seule observation est défini ainsi :
* **Si $y = 1$ :** $Coût = -\log(\sigma(X\Theta))$
    *(Si la prédiction est $0$, le coût tend vers l'infini. Si elle est $1$, le coût est $0$.)*
* **Si $y = 0$ :** $Coût = -\log(1 - \sigma(X\Theta))$

Grâce à une astuce mathématique, nous pouvons combiner ces deux conditions en une seule équation élégante pour l'ensemble du dataset ($m$ observations) :

$$J(\Theta) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y_i \log(\sigma(X_i\Theta)) + (1 - y_i) \log(1 - \sigma(X_i\Theta)) \right]$$

---

## 5. Théorie Probabiliste : Maximum de Vraisemblance (Likelihood)
Pourquoi cette fonction de coût a-t-elle cette forme exacte ? Elle découle directement de la théorie des probabilités.

La probabilité d'une observation, sachant qu'elle ne peut avoir que deux états ($0$ ou $1$), suit une **Loi de Bernoulli** :
$$P(y | x) = \sigma(X\Theta)^y \times (1 - \sigma(X\Theta))^{(1-y)}$$
*(Si $y=1$, le second terme s'annule. Si $y=0$, le premier terme s'annule).*

**La Vraisemblance (Likelihood) $L$ :**
En supposant que nos données d'entraînement sont indépendantes, la probabilité d'observer l'ensemble de notre dataset est le produit des probabilités individuelles :
$$L(\Theta) = \prod_{i=1}^{m} P(y_i | x_i) = \prod_{i=1}^{m} \sigma(X_i\Theta)^{y_i} \times (1 - \sigma(X_i\Theta))^{(1-y_i)}$$

**La Log-Vraisemblance (Log-Likelihood) :**
Maximiser un produit de probabilités est complexe et sujet aux erreurs d'arrondi numérique. On utilise donc la propriété des logarithmes $\log(a \times b) = \log(a) + \log(b)$ pour transformer ce produit en somme :
$$\log(L(\Theta)) = \sum_{i=1}^{m} \left[ y_i \log(\sigma_i) + (1 - y_i)\log(1 - \sigma_i) \right]$$

**Conclusion :** Maximiser la Log-Vraisemblance (trouver les paramètres $\Theta$ qui rendent nos données les plus probables) revient exactement à minimiser notre fonction de coût $J(\Theta)$ !

---

## 6. Optimisation : La Descente de Gradient
Pour trouver les paramètres optimaux, nous devons calculer la dérivée partielle de notre fonction de coût $J(\Theta)$ par rapport à chaque paramètre $\theta_j$. 

Après dérivation (où l'on utilise la propriété de la dérivée de la sigmoïde : $\sigma'(z) = \sigma(z)(1-\sigma(z))$), on obtient un résultat remarquablement similaire à celui de la régression linéaire :

$$\frac{\partial}{\partial \Theta} J(\Theta) = \frac{1}{m} \sum_{i=1}^{m} (\sigma(X_i\Theta) - y_i) X_i$$

Cette formulation vectorielle est particulièrement puissante car elle se traduit par une simple multiplication matricielle au niveau de l'implémentation algorithmique :
$$\nabla J(\Theta) = \frac{1}{m} X^T (\sigma(X\Theta) - Y)$$

**L'algorithme de mise à jour (Update Rule) :**
À chaque itération, on met à jour les poids en soustrayant le gradient multiplié par le taux d'apprentissage (learning rate) $\alpha$ :

$$\Theta := \Theta - \alpha \left[ \frac{1}{m} \sum_{i=1}^{m} (\sigma(X_i\Theta) - y_i) X_i \right]$$

## 7. La Régularisation (Prévenir le Surapprentissage / Overfitting)

Lorsqu'un modèle possède trop de paramètres ou s'entraîne trop longtemps, il risque d'apprendre par cœur les données d'entraînement, y compris le bruit. C'est ce qu'on appelle le **surapprentissage** (overfitting). Le modèle perd alors sa capacité à généraliser sur de nouvelles données.

Pour contrer cela, on utilise la **régularisation**. L'idée est d'ajouter un terme de pénalité à notre fonction de coût pour forcer les paramètres $\theta$ (les poids) à rester petits.

La forme générale d'une fonction de coût régularisée s'écrit ainsi :

$$J(\theta) = J_{original}(\theta) + \lambda R(\theta)$$

* **$J_{original}(\theta)$** : La fonction de coût standard (par exemple, le MSE pour la régression linéaire ou la Log-Loss pour la régression logistique).
* **$R(\theta)$** : Le terme de régularisation (la pénalité).
* **$\lambda$ (Lambda)** : L'hyperparamètre de régularisation. Il contrôle le compromis entre bien ajuster les données d'entraînement (faible $\lambda$) et garder les poids petits (fort $\lambda$). *Note : On ne régularise généralement pas le biais $\theta_0$.*

*(Note conceptuelle : Les formules ci-dessous utilisent l'erreur quadratique moyenne $\sum(y_i - \hat{y}_i)^2$ propre à la régression linéaire pour illustrer $J_{original}$, mais ces mêmes pénalités s'appliquent exactement de la même manière à la fonction Log-Loss de la régression logistique vue précédemment).*

### La Régularisation Ridge (Norme L2)

C'est la forme la plus courante. Elle ajoute une pénalité égale au carré de la magnitude des coefficients.

$$J(\theta) = \sum_{i=1}^{m} (y_i - \hat{y}_i)^2 + \lambda \sum_{j=1}^{n} \theta_j^2$$

**Effet :** La pénalité au carré $\theta_j^2$ force les paramètres à devenir très petits, proches de zéro, mais jamais exactement zéro. Cela permet de réduire l'impact des variables les moins importantes sans les éliminer complètement, ce qui rend le modèle plus stable.

### La Régularisation Elastic Net (Combinaison L1 et L2)

Il existe une autre forme de régularisation appelée **Lasso (Norme L1)** qui utilise la valeur absolue des poids $\sum |\theta_j|$. L'avantage du Lasso est qu'il agit comme un sélecteur de variables : il force les poids des variables inutiles à devenir *exactement* zéro.

L'**Elastic Net** est une méthode hybride qui combine la puissance de Ridge et de Lasso dans la même équation, en leur attribuant à chacun un poids spécifique ($\lambda_1$ et $\lambda_2$) :

$$J(\theta) = \sum_{i=1}^{m} (y_i - \hat{y}_i)^2 + \lambda_1 \sum_{j=1}^{n} | \theta_j | + \lambda_2 \sum_{j=1}^{n} \theta_j^2$$

**Effet :** Cette méthode est particulièrement utile lorsque vous avez de nombreuses caractéristiques (features) corrélées entre elles. Le terme L1 ($\lambda_1$) va sélectionner un sous-ensemble de variables pertinentes (en mettant les autres à zéro), tandis que le terme L2 ($\lambda_2$) va maintenir une certaine stabilité et regrouper les variables corrélées pour éviter que le modèle n'en choisisse une au hasard.

# Chapitre : Apprentissage Supervisé - Des Moindres Distances aux Marges Maximales

## 1. L'Algorithme des K-Plus Proches Voisins (KNN)

Le KNN est un algorithme d'apprentissage supervisé non paramétrique et "paresseux" (lazy learning). Il est dit non paramétrique car il ne fait aucune hypothèse sous-jacente sur la distribution des données, et "paresseux" car il n'y a pas de phase d'apprentissage explicite ; le modèle mémorise simplement l'ensemble des données d'entraînement.

### 1.1. KNN pour la Classification

L'objectif est d'assigner une classe à une nouvelle observation en fonction des classes de ses voisins les plus proches dans l'espace des caractéristiques (feature space).

**Algorithme :**

1. Définir un hyperparamètre $K$ (le nombre de voisins) et choisir une métrique de distance.
2. Pour un point de test $x_{test}$, calculer la distance par rapport à tous les points d'entraînement $x_i$.
3. Identifier l'ensemble $\mathcal{N}$ des $K$ points d'entraînement ayant les distances les plus faibles par rapport à $x_{test}$.
4. Règle de décision : Assigner à $x_{test}$ la classe majoritaire au sein de $\mathcal{N}$. En cas d'égalité, des heuristiques de pondération par l'inverse de la distance peuvent être appliquées.

### 1.2. Métriques de Distance

Le choix de la distance définit la topologie de l'espace. Soient deux vecteurs $p$ et $q$ dans un espace à $n$ dimensions.

* **Distance de Minkowski :** C'est la généralisation des distances métriques classiques, paramétrée par $p$.
    $$d(p, q) = \left( \sum_{i=1}^{n} |p_i - q_i|^p \right)^{\frac{1}{p}}$$
* **Distance de Manhattan (Norme $L_1$) :** Cas particulier de Minkowski avec $p=1$. Adaptée aux données de grande dimension ou lorsque les caractéristiques sont indépendantes.
    $$d(p, q) = \sum_{i=1}^{n} |p_i - q_i|$$
* **Distance Euclidienne (Norme $L_2$) :** Cas particulier avec $p=2$. C'est la distance géométrique standard.
    $$d(p, q) = \sqrt{\sum_{i=1}^{n} (p_i - q_i)^2}$$
* **Distance de Chebyshev (Norme $L_\infty$) :** La limite de Minkowski quand $p \to \infty$. Elle correspond à la différence maximale sur une seule dimension.
    $$d(p, q) = \max_{i} |p_i - q_i|$$

### 1.3. L'Impact de l'Hyperparamètre K : Compromis Biais-Variance

Le paramètre $K$ contrôle la complexité du modèle :

* **$K$ très petit (ex. $K=1$) :** Le modèle a un **faible biais mais une forte variance**. La frontière de décision est extrêmement fragmentée, modélisant le bruit des données d'entraînement (surapprentissage ou *overfitting*).
* **$K$ très grand :** Le modèle a un **fort biais mais une faible variance**. La frontière de décision est lissée. Un $K$ égal à la taille du jeu de données assignerait simplement la classe majoritaire globale à chaque point (sous-apprentissage ou *underfitting*).

### 1.4. Validation Croisée (Cross-Validation)

La sélection rigoureuse de $K$ s'effectue par validation croisée à $k$ plis (K-Fold Cross-Validation) :

1. Partitionner le jeu d'entraînement en $V$ sous-ensembles (plis) disjoints de taille égale.
2. Pour chaque valeur candidate de $K$, répéter $V$ fois l'opération suivante : entraîner le modèle sur $V-1$ plis et évaluer sa performance (ex. exactitude, score F1) sur le pli restant.
3. Calculer la performance moyenne sur les $V$ itérations. La valeur de $K$ retenue est celle qui maximise cette moyenne.

### 1.5. KNN pour la Régression

Dans un contexte de régression (prédiction d'une valeur continue), la règle de vote majoritaire est remplacée par l'espérance locale. La valeur prédite $\hat{y}$ pour un point de test est la moyenne des valeurs cibles $y_i$ de ses $K$ plus proches voisins :

$$\hat{y} = \frac{1}{K} \sum_{i=1}^{K} y_i$$

*(Note : Une variante pondérée utilise $\hat{y} = \frac{\sum w_i y_i}{\sum w_i}$ où le poids $w_i = \frac{1}{d(x, x_i)}$, donnant plus d'importance aux voisins les plus proches).*

### 1.6. Évaluation Algorithmique

* **Avantages :** Transparence conceptuelle, aucune phase d'optimisation coûteuse à l'entraînement, capacité à générer des frontières de décision hautement non-linéaires.
* **Inconvénients :** Complexité temporelle d'inférence en $\mathcal{O}(nd)$ (où $n$ est le nombre d'échantillons et $d$ la dimension), bien que des structures d'arbres (KD-Tree, Ball-Tree) puissent réduire cela. Sensibilité extrême aux variables non pertinentes.
* **Le Fléau de la Dimension (Curse of Dimensionality) :** À mesure que le nombre de dimensions $d$ augmente, le volume de l'espace croît exponentiellement. Par conséquent, la distance entre les points devient homogène, rendant le concept de "plus proche voisin" insignifiant.

---

## 2. Les Machines à Vecteurs de Support (SVM)

Contrairement au KNN qui effectue des inférences locales, les SVM visent à trouver une structure séparatrice globale. L'objectif fondamental d'un SVM est de trouver un hyperplan qui sépare les classes avec la marge géométrique maximale, offrant ainsi la meilleure garantie de généralisation selon la théorie d'apprentissage statistique de Vapnik-Chervonenkis.

### 2.1. Formulation Mathématique : Marge Dure (Hard Margin)

Considérons un ensemble de données linéairement séparable $(x_1, y_1), ..., (x_N, y_N)$ où $x_i \in \mathbb{R}^d$ et les étiquettes de classe $y_i \in \{-1, 1\}$.

L'équation d'un hyperplan séparateur est donnée par :
$$w \cdot x + b = 0$$
Où $w$ est le vecteur normal à l'hyperplan (déterminant l'orientation) et $b$ est le biais (déterminant la translation par rapport à l'origine).

Nous imposons que les points soient correctement classés avec une "marge de sécurité", ce qui se traduit par les contraintes :
$$w \cdot x_i + b \geq 1 \quad \text{si } y_i = 1$$
$$w \cdot x_i + b \leq -1 \quad \text{si } y_i = -1$$
Ce qui peut être combiné de manière élégante :
$$y_i (w \cdot x_i + b) \geq 1 \quad \forall i$$

Les points situés exactement sur les plans $w \cdot x + b = 1$ et $w \cdot x + b = -1$ sont appelés **vecteurs de support**. La distance géométrique entre ces deux plans (la marge) est $\frac{2}{||w||}$.
Maximiser la marge $\frac{2}{||w||}$ équivaut à minimiser $\frac{1}{2} ||w||^2$.

**Problème d'optimisation primal :**

$$\min_{w, b} \frac{1}{2} ||w||^2$$

Sous contrainte : $$y_i (w \cdot x_i + b) \geq 1 \quad \forall i \in \{1, ..., N\}$$

### 2.2. Marge Souple (Soft Margin) et Paramètre C

Dans la réalité, les données sont rarement parfaitement séparables linéairement à cause du bruit ou des valeurs aberrantes (outliers). L'introduction de variables de relâchement (slack variables) $\xi_i \geq 0$ permet de violer certaines contraintes moyennant une pénalité.

La contrainte devient : $y_i (w \cdot x_i + b) \geq 1 - \xi_i$.

Le nouveau problème d'optimisation devient :

$$\min_{w, b, \xi} \left( \frac{1}{2} ||w||^2 + C \sum_{i=1}^{N} \xi_i \right)$$

L'hyperparamètre de régularisation $C$ contrôle le compromis :

* **$C$ élevé :** Pénalité forte pour les erreurs. L'algorithme préfère une marge plus étroite pour classer parfaitement le jeu d'entraînement (risque de surapprentissage).
* **$C$ faible :** Pénalité faible. L'algorithme tolère des erreurs sur les données d'entraînement pour maximiser la marge globale (meilleure généralisation, mais risque de sous-apprentissage).

### 2.3. Forme Duale et Multiplicateurs de Lagrange

Le problème d'optimisation sous contraintes est généralement résolu en passant par le Lagrangien, ce qui nous amène à la formulation duale. On associe un multiplicateur de Lagrange $\alpha_i \geq 0$ à chaque contrainte.

Le problème dual consiste à maximiser :

$$\max_{\alpha} \left( \sum_{i=1}^{N} \alpha_i - \frac{1}{2} \sum_{i=1}^{N} \sum_{j=1}^{N} \alpha_i \alpha_j y_i y_j (x_i \cdot x_j) \right)$$

Sous contraintes :

$$\sum_{i=1}^{N} \alpha_i y_i = 0 \quad \text{et} \quad 0 \leq \alpha_i \leq C \quad \forall i$$

**Insight théorique crucial :** La solution du vecteur normal $w$ est une combinaison linéaire des seuls vecteurs de support (les données pour lesquelles $\alpha_i > 0$). Le modèle ignore totalement les autres points d'entraînement. De plus, on remarque que l'espace des caractéristiques n'intervient que sous la forme d'un produit scalaire $(x_i \cdot x_j)$.

### 2.4. L'Astuce du Noyau (The Kernel Trick) et Projection Dimensionnelle

Si les données ne sont pas linéairement séparables, l'idée est de les projeter dans un espace de caractéristiques de plus grande dimension (parfois infinie) à l'aide d'une fonction $\phi(x)$, où elles pourraient devenir séparables par un hyperplan.

Le calcul explicite des coordonnées dans ce nouvel espace, $\phi(x_i) \cdot \phi(x_j)$, serait informatiquement prohibitif. L'astuce du noyau repose sur le fait qu'il existe une fonction $K$ (le noyau) qui permet de calculer directement ce produit scalaire dans l'espace d'origine, sans jamais instancier l'espace de grande dimension :
$$K(x_i, x_j) = \phi(x_i) \cdot \phi(x_j)$$

*(C'est ce que tu avais noté par "destoration dimonsionnel", qui fait référence au plongeon ou à la projection de l'espace non-linéaire vers un espace linéaire de plus haute dimension).*

#### Les Noyaux Fondamentaux (L'Arsenal des Kernels) :

1. **Noyau Linéaire :**
    $$K(x_i, x_j) = x_i \cdot x_j$$
    (Utilisé pour les textes ou données en très haute dimension).
2. **Noyau Polynomial :**
    $$K(x_i, x_j) = (\gamma x_i \cdot x_j + r)^d$$
    Où $d$ est le degré du polynôme.
3. **Noyau RBF (Fonction à Base Radiale / Gaussien) :**
    $$K(x_i, x_j) = \exp(-\gamma ||x_i - x_j||^2)$$
    Projette les données dans un espace de dimension infinie. Le paramètre $\gamma$ (gamma) définit la portée d'influence d'un seul point d'entraînement. Un petit gamma signifie une grande variance (influence étendue), tandis qu'un grand gamma crée des îlots d'influence locaux très serrés autour des vecteurs de support.
4. **Noyau Sigmoïde :**
    $$K(x_i, x_j) = \tanh(\gamma x_i \cdot x_j + r)$$
    (Souvent utilisé comme proxy pour les réseaux de neurones, imitant une fonction d'activation).

## 3. Théorie Fondamentale des Arbres de Décision (Decision Trees)

Les arbres de décision sont une classe d'algorithmes d'apprentissage supervisé non paramétriques. "Non paramétrique" signifie que l'algorithme ne fait pas d'hypothèses fortes sur la distribution sous-jacente des données ni sur la forme de la relation (contrairement à la régression linéaire qui suppose une relation linéaire).

### 3.1 Architecture et Terminologie Détaillée
Un arbre de décision modélise une séquence de règles sous la forme d'un graphe acyclique dirigé (DAG) en forme d'arbre :
-   **Nœud racine (Root node)** : Le nœud au sommet de l'arbre. Il représente l'ensemble complet du jeu de données (échantillon d'apprentissage). Il subit la toute première division basée sur la caractéristique la plus discriminante.
-   **Nœuds internes (Internal ou Decision nodes)** : Représentent un test booléen ou une condition sur une caractéristique spécifique (ex: "Le salaire est-il supérieur à 50 000 € ?").
-   **Branches (Branches/Edges)** : Représentent le résultat du test d'un nœud. Chaque nœud interne a au moins deux branches pointant vers des nœuds enfants.
-   **Feuilles (Leaf nodes ou Terminal nodes)** : Les nœuds qui n'ont pas d'enfants. Ils représentent la décision finale du modèle. Dans un arbre de classification, c'est une étiquette de classe (basée sur le vote majoritaire des échantillons atteignant cette feuille). Dans un arbre de régression, c'est une valeur continue (généralement la moyenne des cibles des échantillons de la feuille).

### 3.2 Principe Mathématique du Partitionnement
L'entraînement d'un arbre de décision est équivalent à diviser l'espace des caractéristiques $N$-dimensionnel en hyper-rectangles mutuellement exclusifs.
Mathématiquement, l'arbre cherche à trouver des sous-régions $R_1, R_2, ..., R_J$ qui minimisent l'erreur de prédiction globale. La prédiction dans chaque région $R_j$ est une constante $c_j$.
Le problème global de trouver la partition optimale est NP-complet. Par conséquent, les algorithmes de construction d'arbres utilisent une approche heuristique **gloutonne descendante** (top-down greedy approach). À chaque étape, l'algorithme cherche la meilleure séparation *locale* sans regarder en avant pour voir si cette séparation conduira à un arbre global optimal.

### 3.3 Avantages et Inconvénients Critiques
**Avantages :**
1.  **Interprétabilité et Transparence (Boîte Blanche)** : Un arbre peut être lu de haut en bas comme un ensemble de règles "Si-Alors". C'est crucial pour des domaines comme la médecine ou la finance où la justification d'une décision est requise.
2.  **Prétraitement minimal** : Les arbres de décision ne nécessitent ni normalisation (MinMax) ni standardisation (Z-score) des caractéristiques, car la division dépend uniquement de l'ordre des valeurs (les coupures sont basées sur le tri des attributs), et non de la distance spatiale entre les points.
3.  **Gestion de la non-linéarité** : Ils capturent facilement des relations complexes et non linéaires entre les caractéristiques et la cible.

**Inconvénients :**
1.  **Instabilité (Forte Variance)** : Une modification infime des données d'entraînement peut conduire à la sélection d'une caractéristique racine différente, ce qui modifie l'intégralité de la structure de l'arbre subséquent.
2.  **Tendance naturelle au Surapprentissage (Overfitting)** : Sans contraintes (élagage ou hyperparamètres), un arbre de décision se développera jusqu'à ce que chaque feuille contienne exactement un point de données, mémorisant parfaitement le bruit de l'ensemble d'entraînement mais échouant lamentablement sur de nouvelles données.
3.  **Limites sur les données déséquilibrées** : Si une classe domine largement, l'arbre aura tendance à se focaliser sur cette classe. Un re-balancement des poids des classes est souvent nécessaire au préalable.

---

## 4. Algorithmes Détaillés et Mathématiques de Construction

Le cœur de la construction d'un arbre est la fonction utilisée pour évaluer la qualité d'une séparation (split).

### 4.1 L'algorithme ID3 (Iterative Dichotomiser 3)
Créé par Ross Quinlan, ID3 est le précurseur. Il ne fonctionne historiquement qu'avec des variables **catégorielles**. L'objectif d'ID3 est de créer les nœuds les plus "purs" possibles, guidés par le concept mathématique d'**Entropie**.

#### 4.1.1 Entropie de Shannon (Shannon Entropy)
En théorie de l'information, l'entropie mesure le niveau de "surprise", d'incertitude ou d'impureté d'une variable aléatoire.
Pour un jeu de données $S$ avec une variable cible discrète possédant $C$ classes possibles, l'entropie est :

$$ H(S) = - \sum_{i=1}^{C} p_i \log_2(p_i) $$

**Explications mathématiques :**
-   $p_i = \frac{|S_i|}{|S|}$ est la proportion d'éléments appartenant à la classe $i$ dans l'ensemble $S$.
-   **Pourquoi un logarithme ?** L'information d'un événement est inversement proportionnelle à sa probabilité. L'information contenue dans un événement de probabilité $p$ est $I(p) = \log(1/p) = -\log(p)$. L'entropie est l'espérance mathématique de cette information.
-   **Borne inférieure** : Si un sous-ensemble est pur (100% classe A, 0% classe B), $p_A = 1$ et $p_B = 0$. Alors $H(S) = - (1 \cdot \log_2(1) + 0 \cdot \log_2(0)) = 0$ bits. L'incertitude est nulle. (Note : Par convention, $0 \log_2(0) = 0$ via la limite).
-   **Borne supérieure** : Pour une classification binaire, l'entropie est maximale lorsque le désordre est total, soit $p_A = 0.5$ et $p_B = 0.5$. $H(S) = - (0.5 \log_2(0.5) + 0.5 \log_2(0.5)) = 1$ bit.

#### 4.1.2 Gain d'Information (Information Gain)
Pour décider quelle caractéristique $A$ utiliser pour diviser le nœud actuel $S$, on mesure la réduction de l'entropie que cette division engendrerait. C'est le Gain d'Information :

$$ IG(S, A) = \text{Entropie Initiale} - \text{Entropie Moyenne des Enfants} $$
$$ IG(S, A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v) $$

-   $\frac{|S_v|}{|S|}$ est le coefficient de pondération. Si une division crée un enfant pur mais minuscule et un autre enfant impur énorme, le gain d'information global tiendra compte de la taille des enfants pour ne pas surestimer la qualité de la séparation.
-   L'algorithme calcule $IG(S, A)$ pour **tous** les attributs disponibles et choisit l'attribut $A^*$ tel que $A^* = \text{argmax}_{A} IG(S, A)$.

### 4.2 L'algorithme C4.5 : Surmonter les Limites d'ID3
L'algorithme C4.5 améliore ID3 sur trois points critiques : le biais des attributs multiples, les valeurs continues, et les valeurs manquantes.

#### 4.2.1 Correction du Biais : Le Ratio de Gain (Gain Ratio)
**Problème fondamental d'ID3 :** Le Gain d'Information favorise naturellement les caractéristiques qui ont un grand nombre de valeurs distinctes. Prenons une base de données patient avec un attribut "Numéro de Sécurité Sociale" (SSN). Cet attribut a une valeur unique par patient. Si l'arbre utilise SSN pour diviser, chaque nœud enfant aura exactement un patient. L'entropie de chaque enfant sera $0$, et le Gain d'Information sera maximisé. Pourtant, un tel arbre ne sert à rien pour prédire l'état de santé de nouveaux patients.

**La solution C4.5 :** Normaliser le gain en fonction de la dispersion intrinsèque de l'attribut, appelée "Information de séparation" (Intrinsic Information).

$$ SplitInfo(S, A) = - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} \log_2 \left( \frac{|S_v|}{|S|} \right) $$

Cette métrique évalue l'entropie de la caractéristique elle-même (indépendamment de la variable cible). Si un attribut génère de très nombreuses petites branches, son $SplitInfo$ sera énorme.
Le Ratio de Gain pénalise ainsi les attributs trop granulaires :

$$ GainRatio(S, A) = \frac{IG(S, A)}{SplitInfo(S, A)} $$

#### 4.2.2 Gestion des Attributs Continus
Comment C4.5 gère-t-il une variable comme "Salaire" ?
1.  Il ordonne toutes les valeurs uniques du salaire par ordre croissant : $\{v_1, v_2, ..., v_n\}$.
2.  Il génère des seuils de division (points médians) : $s_k = \frac{v_k + v_{k+1}}{2}$ pour $k = 1$ à $n-1$.
3.  Pour chaque seuil $s_k$, il transforme virtuellement la variable en variable binaire booléenne ("Salaire $\le s_k$" et "Salaire $> s_k$").
4.  Il calcule le Ratio de Gain pour chacun de ces $(n-1)$ points de coupure.
5.  Il retient le seuil continu offrant le Ratio de Gain maximal comme le représentant de cet attribut.

#### 4.2.3 Gestion des Valeurs Manquantes
Si une valeur manque pour un attribut $A$ sur une donnée $x_i$, C4.5 n'écarte pas $x_i$. Lors du calcul du gain, il pondère les fréquences. Lors de la division réelle, $x_i$ est fragmenté temporellement et distribué "fractionnellement" dans toutes les branches enfants de $A$, proportionnellement au nombre de données valides de chaque branche. Les prédictions finales pour cet élément seront probabilistes.

### 4.3 L'algorithme CART (Classification and Regression Trees)
Développé par Breiman et al. en 1984, CART est l'algorithme standard utilisé dans la bibliothèque Scikit-Learn de Python. Il se distingue par deux aspects fondamentaux :
1.  **Arbres strictement binaires** : Chaque nœud, quelle que soit la caractéristique, est toujours divisé en exactement deux enfants (Oui/Non).
2.  **Support natif de la régression et de la classification**.

#### 4.3.1 Pour la Classification : L'Impureté de Gini (Gini Impurity)
L'indice de Gini est une alternative à l'entropie. Il est calculatoirement plus efficace car il ne nécessite pas de calculer des logarithmes (une opération coûteuse pour le processeur).
Il mesure la probabilité de mal classer un échantillon tiré au hasard si on lui attribuait aléatoirement une classe selon la distribution de probabilité du nœud.

$$ Gini(S) = 1 - \sum_{i=1}^{C} (p_i)^2 $$

-   Un nœud parfaitement pur a un Gini de $0$ ($1 - 1^2 = 0$).
-   La valeur maximale (pour 2 classes équilibrées) est $1 - (0.5^2 + 0.5^2) = 1 - 0.5 = 0.5$.
L'algorithme CART cherche la séparation qui minimise l'impureté de Gini pondérée des deux nœuds enfants :
$$ Gini_{split} = \frac{|S_{gauche}|}{|S|} Gini(S_{gauche}) + \frac{|S_{droite}|}{|S|} Gini(S_{droite}) $$

*Note de performance : Gini et Entropie donnent généralement des résultats presque identiques quant à la structure finale de l'arbre, mais Gini s'exécute légèrement plus vite. L'Entropie a tendance à produire des arbres légèrement plus équilibrés.*

#### 4.3.2 Pour la Régression : MSE et MAE
Si le problème est la prédiction d'une valeur continue, on ne cherche plus l'homogénéité des classes, mais à minimiser la dispersion (la variance) des valeurs cibles $y_i$ au sein d'un nœud.
Le critère de base est la minimisation de l'Erreur Quadratique Moyenne (Mean Squared Error - MSE) ou de l'Erreur Absolue Moyenne (Mean Absolute Error - MAE).

La valeur prédite $\hat{y}$ pour un nœud donné $S$ est la valeur moyenne (pour MSE) ou médiane (pour MAE) des éléments qu'il contient :
$$ \hat{y}_S = \frac{1}{|S|} \sum_{i \in S} y_i $$

L'erreur du nœud est mesurée par la variance :
$$ Variance(S) = \frac{1}{|S|} \sum_{i \in S} (y_i - \hat{y}_S)^2 $$

CART cherche la séparation (caractéristique $j$ et seuil $s$) qui minimise la variance des nœuds enfants :
$$ Cost(j, s) = \frac{|S_{gauche}|}{|S|} Variance(S_{gauche}) + \frac{|S_{droite}|}{|S|} Variance(S_{droite}) $$

---

## 5. Hyperparamètres et Lutte contre le Surapprentissage (Regularization)

Un arbre de décision libre croîtra indéfiniment. Pour éviter le surapprentissage (overfitting), il faut contrôler l'algorithme grâce aux hyperparamètres.

1.  **`max_depth` (Profondeur maximale)** : Restreint la profondeur de l'arbre (le nombre de niveaux). Un arbre trop profond mémorise les données (variance élevée), un arbre trop peu profond ne capte pas les relations (biais élevé).
2.  **`min_samples_split` (Minimum d'échantillons pour diviser)** : Le nombre minimum d'observations requises dans un nœud interne avant d'autoriser l'algorithme à chercher une nouvelle division. Si défini à 10, un nœud avec 9 échantillons deviendra automatiquement une feuille.
3.  **`min_samples_leaf` (Minimum d'échantillons par feuille)** : Impose qu'une division est valide *uniquement si* les nœuds enfants générés ont chacun au moins ce nombre d'échantillons. Cela lisse le modèle et l'empêche de créer des règles spécifiques pour isoler 1 ou 2 "outliers" (valeurs aberrantes).
4.  **`max_features` (Caractéristiques maximales considérées)** : Au lieu d'évaluer toutes les caractéristiques à chaque nœud pour trouver la meilleure séparation, l'algorithme tire un sous-ensemble aléatoire de caractéristiques. (Hyperparamètre fondamental pour les Random Forests).
5.  **Élagage (Pruning)** : L'élagage *a posteriori* (Cost Complexity Pruning) consiste à faire croître l'arbre au maximum, puis à couper (remplacer par une feuille) les branches qui n'apportent qu'une amélioration marginale (inférieure à un paramètre de pénalité de complexité $\alpha$), mesurée sur un jeu de validation.

---

## 6. Exemple Pratique Détaillé : Résolution Mathématique ("Play Tennis")

Réalisons les calculs d'une itération de construction (Root node) pour le dataset Tennis.

**Données Globales $S$ :** $N = 14$ jours au total.
**Variable Cible $Y$ (JOUER) :** 9 jours "Oui" ($c_1$), 5 jours "Non" ($c_2$).

### Étape A : Entropie du système global
L'incertitude initiale :
$$ H(S) = - \left( \frac{9}{14} \log_2 \frac{9}{14} + \frac{5}{14} \log_2 \frac{5}{14} \right) \approx - (0.643 \times -0.637 + 0.357 \times -1.485) $$
$$ H(S) \approx 0.410 + 0.530 \approx \mathbf{0.940} \text{ bits} $$

### Étape B : Évaluation de la caractéristique "TEMPS" (Météo)
La caractéristique a 3 catégories : Ensoleillé, Couvert, Pluie.
Nous divisons $S$ en trois sous-ensembles $S_{Ensol}$, $S_{Couv}$, $S_{Pluie}$ et calculons l'entropie de chacun :

**1. Météo = Ensoleillé ($S_{Ensol}$)**
- Total = 5 jours. Cibles : 2 Oui, 3 Non.
- $$ H(S_{Ensol}) = - \left( \frac{2}{5} \log_2 \frac{2}{5} + \frac{3}{5} \log_2 \frac{3}{5} \right) \approx 0.971 $$

**2. Météo = Couvert ($S_{Couv}$)**
- Total = 4 jours. Cibles : 4 Oui, 0 Non.
- $$ H(S_{Couv}) = - \left( \frac{4}{4} \log_2 1 + \frac{0}{4} \log_2 0 \right) = \mathbf{0} $$
*(Ce sous-ensemble est pur. Si la météo est couverte, on joue à 100%. L'arbre ne divisera pas ce nœud davantage, c'est une feuille finale).*

**3. Météo = Pluie ($S_{Pluie}$)**
- Total = 5 jours. Cibles : 3 Oui, 2 Non.
- $$ H(S_{Pluie}) = - \left( \frac{3}{5} \log_2 \frac{3}{5} + \frac{2}{5} \log_2 \frac{2}{5} \right) \approx 0.971 $$

### Étape C : Calcul de l'Information Gain pour "TEMPS"
On calcule la somme pondérée des entropies des nœuds enfants :
$$ H_{TEMPS}(S) = \frac{|S_{Ensol}|}{|S|} H(S_{Ensol}) + \frac{|S_{Couv}|}{|S|} H(S_{Couv}) + \frac{|S_{Pluie}|}{|S|} H(S_{Pluie}) $$
$$ H_{TEMPS}(S) = \frac{5}{14}(0.971) + \frac{4}{14}(0) + \frac{5}{14}(0.971) \approx 0.347 + 0 + 0.347 \approx \mathbf{0.694} $$

La réduction d'incertitude finale (Gain d'information) est :
$$ IG(S, TEMPS) = H(S) - H_{TEMPS}(S) = 0.940 - 0.694 = \mathbf{0.246} $$

*L'algorithme répéterait ce processus exact pour les variables "TEMPERATURE", "HUMIDITE" et "VENT". La variable avec le IG maximum sera choisie pour devenir le nœud racine de l'arbre.*

---

## 7. Algorithme des Forêts Aléatoires (Random Forest)

Les Forêts Aléatoires (Random Forests) constituent un algorithme d'apprentissage supervisé extrêmement puissant et polyvalent, utilisable tant pour la classification que pour la régression. Bien qu'il s'agisse techniquement d'une méthode d'ensemble, son importance fondamentale justifie de l'étudier en détail.

### 7.1 Concept Fondamental
L'idée centrale de la forêt aléatoire est la "sagesse de la foule". L'algorithme crée une vaste "forêt" constituée de nombreux arbres de décision individuels. Chacun de ces arbres divise l'espace des caractéristiques en sous-espaces organisés hiérarchiquement (via des séparations récursives).
La prédiction finale de la forêt est obtenue en agrégeant les prédictions de tous ces arbres de base :
- **Classification** : Vote majoritaire (Hard Voting : la classe choisie par le plus grand nombre d'arbres).
- **Régression** : Moyenne arithmétique des prédictions de tous les arbres.

### 7.2 Fonctionnement et Mécanismes Clés
Le fonctionnement d'une Forêt Aléatoire repose sur deux mécanismes de randomisation critiques conçus pour s'assurer que les arbres sont **dé-corrélés** (statistiquement indépendants), ce qui maximise l'efficacité de la moyenne globale :

1.  **L'utilisation du Bagging (Bootstrap Aggregating)** : Chaque arbre de décision de la forêt est entraîné sur un *échantillon bootstrap* différent. Il s'agit d'un sous-échantillon généré par tirage aléatoire **avec remise** à partir du jeu de données original.
2.  **La Sélection Aléatoire des Caractéristiques (Random Subspace / Feature Bagging)** : C'est ce qui différencie la Forêt Aléatoire du simple Bagging d'arbres. Lors de la construction de chaque arbre, chaque fois qu'un nœud doit être divisé, l'algorithme n'évalue pas *toutes* les caractéristiques disponibles pour trouver la meilleure coupure. Au lieu de cela, il sélectionne aléatoirement un petit sous-ensemble de caractéristiques (généralement $m = \sqrt{p}$ variables en classification, où $p$ est le total) et cherche la meilleure division uniquement parmi celles-ci.

### 7.3 Avantages et Inconvénients

**Avantages :**
- **Excellente précision et robustesse** : La combinaison de multiples arbres dé-corrélés réduit drastiquement la variance et empêche le surapprentissage, même sur des données très bruitées.
- **Gestion des non-linéarités** : Capable de modéliser des interactions complexes sans aucune transformation préalable des données.
- **Feature Importance** : Fournit une mesure naturelle de l'importance de chaque variable (calculée en observant la diminution moyenne de l'impureté de Gini induite par chaque variable dans tous les arbres).
- **Validation interne (Out-Of-Bag Error)** : Les données non tirées lors du Bootstrap (environ 36.8%) peuvent être utilisées pour tester l'arbre immédiatement, fournissant une estimation gratuite de l'erreur de généralisation.

**Inconvénients :**
- **Perte d'interprétabilité (Boîte noire)** : Contrairement à un arbre de décision unique qu'on peut lire de haut en bas, la forêt est complexe et ses décisions internes ne peuvent plus être représentées sous la forme d'une simple règle logique compréhensible.
- **Complexité spatiale et temporelle** : Entraîner et stocker 500 ou 1000 arbres profonds consomme beaucoup de mémoire et de temps de calcul par rapport à un modèle simple, bien que l'algorithme soit hautement parallélisable.

---

## 8. Les Autres Méthodes d'Ensemble (Ensemble Methods)

Les méthodes d'ensemble visent à combiner les prédictions d'une "foule" de modèles pour obtenir une performance globale supérieure. Elles agissent sur le célèbre **Compromis Biais-Variance**.
- **Erreur totale** = $Biais^2 + Variance + Bruit Irréductible$.

### 8.1 Le Bagging Général (Bootstrap Aggregating)
Comme vu avec les Forêts Aléatoires, le Bagging est conçu pour **réduire la variance**.
- L'erreur OOB (Out-Of-Bag) est utilisée pour estimer la performance du modèle final en demandant à chaque modèle de base de prédire uniquement sur ses échantillons non vus, puis on agrège.
- L'agrégation se fait par moyenne (régression) ou par vote majoritaire (classification).

### 8.2 Boosting (Amplification Séquentielle)
Contrairement au Bagging (parallèle et focalisé sur la variance), le Boosting est séquentiel et focalisé sur la **réduction du biais**. L'idée est de combiner de très "mauvais" modèles (ex: un arbre de profondeur 1) pour former un expert, en apprenant itérativement des erreurs précédentes.

#### 8.2.1 AdaBoost (Adaptive Boosting)
Dans AdaBoost, l'algorithme maintient un système de **poids ($w_i$)** pour chaque observation.
1. Le modèle faible $H_1$ est entraîné. On identifie les échantillons mal classés.
2. Les poids $w$ des échantillons mal classés sont **augmentés**, tandis que ceux bien classés sont réduits.
3. Le modèle suivant $H_2$ est forcé de se concentrer lourdement sur ces exemples "difficiles".
4. L'algorithme assigne à chaque modèle un "poids d'influence" $\alpha_m$, inversement proportionnel à son taux d'erreur $\epsilon_m$ :
   $$ \alpha_m = \frac{1}{2} \ln \left( \frac{1 - \epsilon_m}{\epsilon_m} \right) $$

#### 8.2.2 Gradient Boosting Machines (GBM)
Au lieu d'ajuster les poids des échantillons, le Gradient Boosting effectue une optimisation numérique de descente de gradient dans l'espace des fonctions.
- Le nouveau modèle (le nouvel arbre) $h_m$ **n'est pas entraîné pour prédire la cible $y_i$, mais pour prédire le résidu $r_{im}$** (l'erreur du modèle précédent).
- Ces résidus sont le gradient négatif de la fonction de coût $L$ :
  $$ r_{im} = - \left[ \frac{\partial L(y_i, F(x_i))}{\partial F(x_i)} \right]_{F(x) = F_{m-1}(x)} $$

#### 8.2.3 XGBoost (Extreme Gradient Boosting)
C'est la version ultra-performante de GBM.
- **Approximation Mathématique Avancée** : Utilise une approximation de Taylor du second ordre (incluant la dérivée seconde / la Hessienne).
- **Régularisation native** : Inclut un terme explicite de régularisation mathématique $\Omega(f)$ qui pénalise la complexité de l'arbre.

### 8.3 Stacking (Stacked Generalization)
Le Stacking est une méthode d'assemblage hétérogène avancée qui utilise la puissance combinée d'algorithmes fondamentalement différents (ex: combiner un Arbre, une Régression Logistique, et un K-NN).
1.  **Niveau 0 (Base Level)** : Un groupe d'algorithmes diversifiés est entraîné via Validation Croisée K-Fold. Les prédictions "out-of-fold" sont rassemblées.
2.  **Niveau 1 (Meta-Level / Blender)** : Les prédictions des modèles du Niveau 0 deviennent les **nouvelles variables d'entrée (features)** pour un "méta-modèle" (ex: régression Ridge) qui apprend la meilleure façon de combiner ces prédictions.

### 8.4 Voting (Vote simple)
C'est l'étape de combinaison pure (sans apprentissage au Niveau 1).
-   **Hard Voting (Vote majoritaire strict)** : La prédiction de l'ensemble est le mode statistique (la classe la plus votée).
-   **Soft Voting (Vote pondéré par les probabilités)** : Les probabilités prédites par chaque modèle sont moyennées. La classe ayant l'espérance la plus forte l'emporte. Souvent supérieur au Hard Voting.
