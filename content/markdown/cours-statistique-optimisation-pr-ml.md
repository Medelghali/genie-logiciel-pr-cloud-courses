{
    "type": "CourseIntro",
    "reference": "statistics-optimization-for-ml-intro"
}
---

# Statistiques et Optimisation pour Machine Learning

---

## Objectifs du module

- Comprendre les bases probabilistes du Machine Learning
- Maîtriser les modèles statistiques fondamentaux
- Comprendre l'optimisation des fonctions de coût

---

## Expérience aléatoire

### Définition

Une expérience aléatoire est une expérience dont :

- On connaît les résultats possibles
- On ne peut pas prévoir le résultat exact à l’avance

### Exemples :

- Lancer une pièce
- Lancer un dé
- Mesurer la température demain
- Prédire si un email est Spam

---

## Espace probabilisé

Un espace probabilisé est un triplet :

\[
(\Omega, \mathcal{F}, P)
\]

où :

- \(\Omega\) : ensemble des issues = L’univers des possibilités
- \(\mathcal{F}\) : ensemble des événements
- \(P\) : mesure de probabilité

---

## Propriétés de la probabilité

La probabilité est une fonction \(P : \mathcal{F} \to [0, 1]\) vérifiant :

1. \(P(A) \ge 0\)
2. \(P(\Omega) = 1\)
3. Si \(A \cap B = \emptyset\) alors \(P(A \cup B) = P(A) + P(B)\)

---

## Probabilité conditionnelle

### Définition

Si \(P(B) > 0\) :

\[
P(A|B) = \frac{P(A \cap B)}{P(B)}
\]

\(P(A|B)\) = probabilité de \(A\) sachant que \(B\) est (sera) réalisé. On restreint l’univers à \(B\).

Donc l’intersection s’exprime :

\[
P(A \cap B) = P(A|B)P(B)
\]

---

## Exemple d'indépendance

Deux lancers de pièce.

- \(A\) : premier lancer = Pile
- \(B\) : deuxième lancer = Pile

\[
P(A \cap B) = \frac{1}{4}
\]
\[
P(A)P(B) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}
\]

Donc indépendants.

---

## Probabilité composée

La probabilité composée exprime la probabilité de l’intersection de deux événements \(A\) et \(B\) :

\[
P(A \cap B) = P(A) \cdot P(B|A) = P(B) \cdot P(A|B)
\]

où \(P(B|A)\) est la probabilité conditionnelle de \(B\) sachant \(A\).

### Exemple

Un sac contient 3 boules rouges et 2 boules bleues. On tire deux boules successivement sans remise.

\[
P(\text{Rouge puis Bleue}) = P(R_1) \cdot P(B_2|R_1) = \frac{3}{5} \cdot \frac{2}{4} = \frac{3}{10}
\]

Plus généralement :

\[
P(A_1 \cap \cdots \cap A_n) = P(A_1) \prod_{i=2}^{n} P(A_i|A_1, \ldots, A_{i-1})
\]

---

## Théorème des probabilités totales

Soit \(\{C_1, C_2, \ldots, C_n\}\) une partition de l'univers \(\Omega\), c'est-à-dire :

\[
C_i \cap C_j = \emptyset \text{ pour } i \neq j \quad \text{et} \quad \bigcup_{i=1}^n C_i = \Omega
\]

Alors, pour tout événement \(A\) :

\[
P(A) = \sum_{i=1}^{n} P(A \cap C_i) = \sum_{i=1}^{n} P(A|C_i)P(C_i)
\]

### Exemple

Un produit peut provenir de 3 usines : \(C_1, C_2, C_3\), avec \(P(C_1) = 0.4\), \(P(C_2) = 0.35\), \(P(C_3) = 0.25\). Probabilité de défaut \(A\) : \(P(A|C_1) = 0.01\), \(P(A|C_2) = 0.02\), \(P(A|C_3) = 0.03\)

\[
P(A) = 0.4 \cdot 0.01 + 0.35 \cdot 0.02 + 0.25 \cdot 0.03 = 0.019
\]

---

## Théorème de Bayes

\[
P(A|B) = \frac{P(B|A)P(A)}{P(B)}
\]

Où :

- \(P(A)\) : probabilité a priori
- \(P(A|B)\) : probabilité a posteriori
- \(P(B)\) : constante de normalisation

---

## Exemple : Test de maladie

Une maladie touche 1% de la population :

\[
P(M) = 0.01
\]

Le test :

- Sensibilité : \(P(+ | M) = 0.9\)
- Faux positif : \(P(+ | \tilde{M}) = 0.05\)

Question :

\[
P(M | +) = ?
\]

### Étape 1 : Calcul de \(P(+)\)

\[
\begin{align*}
P(+) &= P(+ | M)P(M) + P(+ | \bar{M})P(\bar{M}) \\
&= 0.9 \times 0.01 + 0.05 \times 0.99 \\
&= 0.009 + 0.0495 = 0.0585
\end{align*}
\]

### Étape 2 : Application de Bayes

\[
P(M | +) = \frac{P(+ | M)P(M)}{P(+)} = \frac{0.9 \times 0.01}{0.0585} = \frac{0.009}{0.0585} \approx 0.154
\]

\[
P(M | +) \approx 15.4\%
\]

---

## Cas discret général

Pour une partition \((C_1, \ldots, C_k)\) :

\[
P(C_k|X) = \frac{P(X|C_k)P(C_k)}{\sum_{j=1}^k P(X|C_j)P(C_j)}
\]

Formule centrale du Machine Learning probabiliste.

---

## Formule de décision

\[
P(C_k|X) = \frac{P(X|C_k)P(C_k)}{P(X)}
\]

Comme \(P(X)\) est constant :

\[
\hat{y} = \arg \max_k P(X|C_k)P(C_k)
\]

---

## Hypothèse d'indépendance conditionnelle

Pour \(X = (X_1, \ldots, X_d)\)

Naive Bayes suppose :

\[
P(X|C_k) = \prod_{i=1}^{d} P(X_i|C_k)
\]

Hypothèse forte mais efficace en pratique.

---

## Exemple : Classification Spam

Classes :

\[
C_1 = \text{Spam}, \quad C_2 = \text{Non Spam}
\]

Caractéristiques :

\[
\begin{align*}
X_1 &= \text{"gratuit"} \\
X_2 &= \text{"promotion"}
\end{align*}
\]

Nous voulons répondre à la question : Ce message est-il un Spam ou non ?

### Calcul des probabilités

La base d'apprentissage (la base d'entraînement) : Dans une boîte : \(P(\text{Spam})=0.4\) et \(P(\text{NonSpam})=0.6\). On compte le nombre de répétitions des mots "gratuit" et "promotion" dans toute la boîte, si on trouve par ex :

\[
P(\text{gratuit}|\text{Spam}) = 0.8
\]
\[
P(\text{promotion}|\text{Spam}) = 0.7
\]

Alors :

\[
\text{Score}(\text{Spam}) = 0.4 \times 0.8 \times 0.7 = 0.224
\]

### Calcul pour la classe Non-Spam

\[
P(\text{gratuit}|\text{NonSpam}) = 0.1
\]
\[
P(\text{promotion}|\text{NonSpam}) = 0.2
\]

Alors :

\[
\text{Score}(\text{NonSpam}) = 0.6 \times 0.1 \times 0.2 = 0.012
\]

---

## Naive Bayes : Algorithme (cas discret)

**Phase d'apprentissage :**

- Estimer \(P(Y = y)\)
- Estimer \(P(X_j = x_j | Y = y)\)

**Phase de prédiction :**

- Calculer le score pour chaque classe
- Choisir la classe maximisant le score

---

## Variables aléatoires

### Définition

Idée intuitive : Une variable aléatoire transforme un résultat abstrait en nombre.

**Définition** : Une variable aléatoire \(X\) est une application :

\[
X : \Omega \to \mathbb{R}
\]

Elle associe à chaque issue \(\omega \in \Omega\) un nombre réel.

---

## Variable aléatoire discrète

\(X\) est discrète si elle prend un nombre fini ou dénombrable de valeurs qu'on note \(X(\Omega) = \{x_1, \ldots, x_i, \ldots\}\). On définit la loi de probabilité :

\[
P(X = x_i) \text{ est la probabilité que } X \text{ égale } x_i
\]
\[
\sum_i P(X = x_i) = 1
\]

Dans l’exemple précédent \(X(\Omega) = \{0,1\}\), et la loi de probabilité est \(P(X = 1)= p\) (probabilité de succès) et \(P(X = 0)= 1-p\).

---

## Variable aléatoire continue : Densité de probabilité

Une fonction \(f : \mathbb{R} \to \mathbb{R}\) est dite densité de probabilité si les conditions suivantes sont vérifiées :

\[
\begin{align*}
f(x) &\ge 0 \quad \forall x \in \mathbb{R} \\
\int_{-\infty}^{+\infty} f(x)\, dx &= 1
\end{align*}
\]

Pour tout intervalle \([a,b] \subset \mathbb{R}\),

\[
P(a \leq X \leq b) = \int_a^b f(x)\, dx
\]

La variable aléatoire \(X\) est dite continue si elle admet une densité \(f\) telle que pour tout intervalle \([a,b] \subset \mathbb{R}\) :

\[
P(a \leq X \leq b) = \int_a^b f(x) \, dx
\]

---

## Espérance

**Discret** :

\[
\mathbb{E}[X] = \sum_i x_i P(X = x_i)
\]

**Continu** :

\[
\mathbb{E}[X] = \int_{-\infty}^{+\infty} x f(x) \, dx
\]

Interprétation : moyenne théorique.

---

## Variance

La variance mesure la dispersion autour de la moyenne.

\[
\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2]
\]

Formule pratique :

\[
\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2
\]

Interprétation :

- Variance faible → données concentrées
- Variance grande → données dispersées

Fondamental pour comprendre le surapprentissage.

---

## Propriétés de la variance

Soit \(X\) une variable aléatoire et \(a, b \in \mathbb{R}\).

**Variance d'une transformation linéaire**

\[
\text{Var}(aX + b) = a^2 \text{Var}(X)
\]

**Variance d'une somme**

\[
\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)
\]

si \(X\) et \(Y\) sont indépendantes.

---

## Covariance

Pour deux variables \(X\) et \(Y\) :

\[
\text{Cov}(X, Y) = \mathbb{E}[(X - \mathbb{E}(X))(Y - \mathbb{E}(Y))]
\]

Mesure la variation conjointe entre \(X\) et \(Y\).

- \(\text{Cov}(X, Y) > 0\) : les variables évoluent dans le même sens
- \(\text{Cov}(X, Y) < 0\) : les variables évoluent en sens opposé
- \(\text{Cov}(X, Y) = 0\) : absence de relation linéaire

### Exemple : Prix d'une maison en fonction de sa surface

Données observées :

| \(X\) (surface en m²) | \(Y\) (prix) |
|------------------------|--------------|
| 50                     | 150          |
| 60                     | 180          |
| 80                     | 240          |
| 100                    | 300          |

Moyennes :

\[
\bar{X} = \frac{50 + 60 + 80 + 100}{4} = 72.5
\]
\[
\bar{Y} = \frac{150 + 180 + 240 + 300}{4} = 217.5
\]

Covariance :

\[
\text{Cov}(X, Y) = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{X})(y_i - \bar{Y})
\]

Détail du calcul :

\[
(50 - 72.5)(150 - 217.5) = (-22.5)(-67.5) = 1518.75
\]
\[
(60 - 72.5)(180 - 217.5) = (-12.5)(-37.5) = 468.75
\]
\[
(80 - 72.5)(240 - 217.5) = (7.5)(22.5) = 168.75
\]
\[
(100 - 72.5)(300 - 217.5) = (27.5)(82.5) = 2268.75
\]
\[
\text{Cov}(X, Y) = \frac{1518.75 + 468.75 + 168.75 + 2268.75}{4} = \frac{4425}{4} = 1106.25
\]

Covariance positive ⇒ relation croissante.

Écart-type de \(X\) :

\[
\sigma_X = \sqrt{\frac{1}{n} \sum (x_i - \bar{X})^2}
\]
\[
(50 - 72.5)^2 = 506.25,\quad (60 - 72.5)^2 = 156.25
\]
\[
(80 - 72.5)^2 = 56.25,\quad (100 - 72.5)^2 = 756.25
\]
\[
\sigma_X = \sqrt{\frac{1475}{4}} = \sqrt{368.75} \approx 19.20
\]

Écart-type de \(Y\) :

\[
\sigma_Y = \sqrt{\frac{13275}{4}} = \sqrt{3318.75} \approx 57.61
\]

Corrélation :

\[
\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y} = \frac{1106.25}{19.20 \times 57.61}
\]
\[
19.20 \times 57.61 \approx 1106.11
\]
\[
\rho(X, Y) \approx \frac{1106.25}{1106.11} \approx 1.0001
\]

Soit \(\rho(X, Y) \approx 1\) : les variables sont fortement corrélées.

Une forte corrélation signifie que la variable \(X\) est utile pour prédire \(Y\). Elle sera donc sélectionnée comme **feature importante** dans un modèle de régression.

---

## Lois classiques

### Loi de Bernoulli

Une variable aléatoire \(X\) suit une loi de Bernoulli de paramètre \(p\) si :

\[
X \in \{0, 1\}
\]

avec :

\[
P(X = 1) = p,\quad P(X = 0) = 1 - p
\]

On note :

\[
X \sim B(p)
\]

**Espérance et Variance**

\[
\begin{align*}
\mathbb{E}[X] &= p \\
\operatorname{Var}(X) &= p(1-p)
\end{align*}
\]

#### Interprétation en Machine Learning

Classification binaire :

\[
Y \in \{0, 1\}
\]

On modélise :

\[
Y \sim B(p(x))
\]

La régression logistique consiste à modéliser :

\[
p(x) = P(Y = 1 | X = x_i)
\]

---

### Loi binomiale

Soit \(X\) le nombre de succès dans une série d’expériences indépendantes de Bernoulli \(B(p)\). On a \(X(\Omega) = \{0,1,\ldots,n\}\). On dit que \(X\) suit la loi binomiale de paramètres \(n\) (nombre de répétitions ou d’essais) et \(p\) (probabilité de succès à chaque essai). On note

\[
X \sim B(n, p)
\]

Sa loi de probabilité est :

\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
\]

---

### Loi normale (Gaussienne)

Une variable aléatoire réelle \(X\) suit une loi normale (ou gaussienne) de paramètres \(\mu\) (espérance) et \(\sigma^2\) (variance) si sa densité de probabilité est donnée par :

\[
f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}, \quad x \in \mathbb{R}.
\]

On note \(X \sim \mathcal{N}(\mu, \sigma^2)\).

- \(\mu\) est un paramètre de position (centre de la courbe).
- \(\sigma\) est un paramètre d’échelle (dispersion).
- La courbe est symétrique par rapport à \(\mu\), en forme de cloche.

#### Loi normale centrée réduite

Si \(X \sim \mathcal{N}(\mu, \sigma^2)\), alors la variable transformée

\[
Z = \frac{X - \mu}{\sigma}
\]

suit une loi normale d'espérance 0 et de variance 1, appelée loi normale centrée réduite et notée \(\mathcal{N}(0,1)\).

Sa densité est :

\[
\varphi(z) = \frac{1}{\sqrt{2\pi}} e^{-\frac{z^2}{2}}, \quad z \in \mathbb{R}.
\]

Cette transformation est essentielle pour ramener tous les calculs de probabilités à une seule table.

---

## Échantillonnage

### Population vs Échantillon

**Population** : Ensemble complet des individus ou observations.

Exemple :

- Tous les emails existants.
- Tous les clients d'une banque.
- Tous les étudiants d'une université.

**Échantillon** : Sous-ensemble extrait de la population.

Pourquoi un échantillon ?

- Impossible d’observer toute la population.
- Trop coûteux.
- Données inaccessibles.

En Machine Learning : La base d’entraînement est un échantillon de la réalité.

### Paramètre vs Estimateur

**Paramètre** : Quantité inconnue de la population. Exemple : moyenne réelle \(m\).

**Estimateur** : Formule calculée à partir de l’échantillon. Exemple : moyenne empirique \(\bar{X}\).

---

### Estimateur de la moyenne

Soit un échantillon :
\(X_1, X_2, \ldots, X_n\) i.i.d. tels que :
\[
\mathbb{E}[X_i] = m,\quad \operatorname{Var}(X_i) = \sigma^2.
\]

La moyenne empirique est :
\[
\bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i
\]

Elle estime la moyenne réelle \(m\).
\[
\bar{X} \approx m
\]
quand \(n\) est grand.

Alors :
\[
\mathbb{E}[\bar{X}] = \frac{1}{n} \sum_{i=1}^{n} \mathbb{E}(X_i) = m
\]

L’estimateur est non biaisé.

---

### Estimateur de la variance

Variance réelle :
\[
\sigma^2 = \mathbb{E}[(X - m)^2]
\]
Inconnue en pratique.

Estimateur empirique :
\[
S^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2
\]

Pourquoi \(n-1\) ? Correction du biais.

Si on estime la variance avec \(\frac{1}{n}\) :
\[
S_n^2 = \frac{1}{n} \sum_{i=1}^{n} (X_i - \bar{X})^2
\]

On utilise l’identité :
\[
\sum_{i=1}^{n} (X_i - \bar{X})^2 = \sum_{i=1}^{n} (X_i - m)^2 - n(\bar{X} - m)^2.
\]

Donc :
\[
S_n^2 = \frac{1}{n} \left( \sum_{i=1}^{n} (X_i - m)^2 - n(\bar{X} - m)^2 \right).
\]

On sait que :
\[
\mathbb{E} \left[ \sum_{i=1}^{n} (X_i - m)^2 \right] = n\sigma^2,
\]
et
\[
\mathbb{E} \left[ (\bar{X} - m)^2 \right] = \operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}.
\]

Donc :
\[
\mathbb{E}[S_n^2] = \frac{1}{n} \left( n\sigma^2 - n \cdot \frac{\sigma^2}{n} \right) = \frac{1}{n} (n\sigma^2 - \sigma^2) = \frac{n-1}{n}\sigma^2.
\]

L’estimateur avec \(\frac{1}{n}\) est biaisé :
\[
\text{Biais}(S_n^2) = -\frac{\sigma^2}{n}.
\]

C’est pourquoi on utilise \(\frac{1}{n-1}\) pour obtenir un estimateur sans biais.

---

## Maximum de vraisemblance

### Fonction de vraisemblance

Supposons que \(X_1, \ldots, X_n\) sont i.i.d. avec densité \(f(x|\theta)\). La vraisemblance est :

\[
L(\theta) = \prod_{i=1}^{n} f(X_i|\theta)
\]

On considère les données fixes et \(\theta\) variable.

### Log-vraisemblance

On prend souvent le logarithme :
\[
\ell(\theta) = \log L(\theta) = \sum_{i=1}^{n} \log f(X_i|\theta)
\]

Pourquoi ?

- Plus simple à dériver.
- Transforme un produit en somme.

### Estimateur du maximum de vraisemblance

L’estimateur du maximum de vraisemblance est :

\[
\hat{\theta}_{MLE} = \arg \max_{\theta} L(\theta)
\]

ou équivalemment :

\[
\hat{\theta}_{MLE} = \arg \max_{\theta} \ell(\theta)
\]

---

### Exemple : Loi normale

Densité :
\[
f(x|m, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x - m)^2}{2\sigma^2}\right)
\]

La vraisemblance :
\[
L(m, \sigma^2) = \prod_{i=1}^n f(X_i|m, \sigma^2)
\]

**Log-vraisemblance (\(\sigma^2\) connue)** :
\[
\ell(m) = -\frac{n}{2} \log(2\pi\sigma^2) - \frac{1}{2\sigma^2} \sum_{i=1}^{n} (X_i - m)^2
\]

On dérive par rapport à \(m\) :
\[
\frac{d\ell}{dm} = \frac{1}{\sigma^2} \sum_{i=1}^{n} (X_i - m)
\]

Condition d'optimalité :
\[
\sum_{i=1}^{n} (X_i - m) = 0 \implies \sum X_i - n m = 0
\]

Donc :
\[
\hat{m}_{MLE} = \frac{1}{n} \sum_{i=1}^{n} X_i = \bar{X}
\]

**Estimateur de la variance** :
\[
\hat{\sigma}_{MLE}^2 = \frac{1}{n} \sum_{i=1}^n (X_i - \bar{X})^2
\]

Attention : ici on divise par \(n\). Ce n'est pas l'estimateur non biaisé.

**Remarque importante** : Le MLE peut être biaisé. Pour la variance :
- \(\frac{1}{n}\) (MLE)
- \(\frac{1}{n-1}\) (estimateur non biaisé)

---

## Intervalles de confiance

### Pourquoi un intervalle ?

On a estimé :
\[
\hat{m} = \bar{X}
\]

Mais :

- \(\bar{X}\) varie d’un échantillon à l’autre.
- Il existe une incertitude.

On veut encadrer la vraie valeur \(m\).

### Définition

Un intervalle de confiance (IC) pour un paramètre \(\theta\) est un intervalle aléatoire :

\[
IC = [L(X), U(X)]
\]

tel que :
\[
P(\theta \in IC) = 1 - \alpha
\]

où :

- \(1 - \alpha\) = niveau de confiance (95%, 99%, etc.)
- \(\alpha\) = risque d’erreur

### IC pour la moyenne (variance connue)

Soit \(X_1, \ldots, X_n\) i.i.d. avec :
\[
X_i \sim \mathcal{N}(m, \sigma^2)
\]

On sait que :
\[
\bar{X} \sim \mathcal{N}\left(m, \frac{\sigma^2}{n}\right)
\]

Alors :
\[
Z = \frac{\bar{X} - m}{\sigma / \sqrt{n}} \sim \mathcal{N}(0, 1)
\]

### Construction de l'intervalle de confiance

Donc pour \(z_{\alpha/2}\) tel que
\[
P(-z_{\alpha/2} \leq Z \leq z_{\alpha/2}) = 1 - \alpha, \quad Z \sim \mathcal{N}(0, 1),
\]

on a
\[
P\left(-z_{\alpha/2} \leq \frac{\bar{X} - m}{\sigma / \sqrt{n}} \leq z_{\alpha/2}\right) = 1 - \alpha.
\]

Alors :
\[
P\left(\bar{X} - z_{\alpha/2} \frac{\sigma}{\sqrt{n}} \leq m \leq \bar{X} + z_{\alpha/2} \frac{\sigma}{\sqrt{n}}\right) = 1 - \alpha.
\]

Donc l'intervalle de confiance est :
\[
IC_{1-\alpha} = \left[ \bar{X} - z_{\alpha/2} \frac{\sigma}{\sqrt{n}},\ \bar{X} + z_{\alpha/2} \frac{\sigma}{\sqrt{n}} \right].
\]

### Interprétation correcte

Un IC à 95% signifie : Si on répète l’expérience un grand nombre de fois, 95% des intervalles construits contiendront le vrai paramètre.

La marge d’erreur est :
\[
E = z_{\alpha/2} \frac{\sigma}{\sqrt{n}}
\]

Donc :
\[
IC = \bar{X} \pm E
\]

---

## Test d'hypothèse

### Règle de décision en fonction de \(\bar{X}\)

On teste :
\[
H_0 : m = m_0 \quad \text{contre} \quad H_1 : m \neq m_0
\]

Si \(\bar{X}\) appartient à
\[
\left[m_0 - z_{\alpha/2} \frac{\sigma}{\sqrt{n}},\ m_0 + z_{\alpha/2} \frac{\sigma}{\sqrt{n}}\right]
\]
on ne rejette pas \(H_0\).

- Sinon, on rejette \(H_0\).

---

## Étapes d'un test d'hypothèse

1. Formuler \(H_0\) et \(H_1\)
2. Choisir le niveau \(\alpha\)
3. Calculer la statistique de test
4. Déterminer la région critique
5. Prendre une décision

---

<embed src="/media/pdf/statistique-optimisation.pdf" type="application/pdf" width="100%" height="600px" />

