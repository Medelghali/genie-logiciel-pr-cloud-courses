{
    "type": "TPStatement",
    "reference": "tp1-stats-statement"
}
---

# Correction des exercices 1 à 5

## Exercice 1

**Énoncé** : Un appareil fonctionne à l'instant 0.  
À chaque instant \(t_n\) :
- s'il fonctionne, il fonctionne à \(t_{n+1}\) avec probabilité \(a\)
- s'il est en panne, il est en panne à \(t_{n+1}\) avec probabilité \(b\).

On note \(p_n\) la probabilité qu'il fonctionne à \(t_n\). Déterminer \(p_n\).

### Correction

Soit \(p_n = P(\text{en marche à } t_n)\).  
On a \(p_0 = 1\).

À l'instant \(t_{n+1}\), l'appareil fonctionne si :
- il fonctionnait à \(t_n\) et y reste : proba \(p_n \times a\)
- ou il était en panne à \(t_n\) et se répare : proba \((1-p_n) \times (1-b)\) (car s'il est en panne, la probabilité de ne pas être en panne à l'instant suivant est \(1-b\)).

Donc :
\[
p_{n+1} = a\,p_n + (1-b)(1-p_n) = a p_n + (1-b) - (1-b)p_n = (a - 1 + b)p_n + (1-b)
\]
Soit :
\[
p_{n+1} = (a + b - 1)\,p_n + (1-b)
\]

C'est une suite arithmético-géométrique.  
Posons \(r = a + b - 1\). Résolvons l'équation de point fixe : \(p = r p + (1-b) \Rightarrow p(1-r) = 1-b \Rightarrow p = \frac{1-b}{1-r}\).

Comme \(1-r = 1 - (a+b-1) = 2 - a - b\), on a :
\[
p = \frac{1-b}{2-a-b}
\]

Si \(r \neq 1\) (c'est-à-dire \(a+b \neq 2\), toujours vrai car \(a,b<1\)), la solution générale est :
\[
p_n = p + (p_0 - p) r^n
\]
Avec \(p_0 = 1\) :
\[
p_n = \frac{1-b}{2-a-b} + \left(1 - \frac{1-b}{2-a-b}\right) (a+b-1)^n
\]

On peut simplifier :
\[
1 - \frac{1-b}{2-a-b} = \frac{2-a-b - (1-b)}{2-a-b} = \frac{1-a}{2-a-b}
\]
D'où :
\[
\boxed{p_n = \frac{1-b}{2-a-b} + \frac{1-a}{2-a-b}\,(a+b-1)^n}
\]

Vérification : si \(n=0\), \(p_0 = \frac{1-b+1-a}{2-a-b}=1\) OK.

---

## Exercice 2

**Énoncé** : Particule sur \([0,N]\) avec probabilité \(p\) de saut à droite, \(q=1-p\) à gauche. Arrêt en 0 ou N. \(q_n\) = probabilité d'arrêt en 0 en partant de \(n\).

1. a) \(q_0=1\) (déjà à 0), \(q_N=0\) (arrêt en N, pas en 0).  
   b) Montrer \(q_n = p q_{n+1} + q q_{n-1}\) pour \(1\le n\le N-1\).  
   c) Résoudre.

### Correction

**1.a)** Évident.

**1.b)** En partant de \(n\) (\(1\le n\le N-1\)), on fait un premier saut :
- à droite avec proba \(p\), on arrive en \(n+1\), puis proba d'arrêt en 0 = \(q_{n+1}\)
- à gauche avec proba \(q\), on arrive en \(n-1\), puis proba = \(q_{n-1}\)

D'où \(q_n = p\,q_{n+1} + q\,q_{n-1}\).

**1.c)** Équation récurrente linéaire d'ordre 2 : \(q_n = p q_{n+1} + q q_{n-1}\).  
On réécrit : \(p q_{n+1} - q_n + q q_{n-1} = 0\).  
On cherche des solutions de la forme \(q_n = r^n\). En substituant :
\[
p r^{n+1} - r^n + q r^{n-1} = 0 \Rightarrow r^{n-1}(p r^2 - r + q)=0
\]
Donc \(p r^2 - r + q = 0\).  
Discriminant : \(\Delta = 1 - 4pq = 1 - 4p(1-p) = (2p-1)^2\).  
Racines : \(r = \frac{1 \pm |2p-1|}{2p}\).

- **Cas \(p \neq \frac{1}{2}\)** : deux racines distinctes : \(r_1 = 1\) et \(r_2 = \frac{q}{p}\).  
  Solution générale : \(q_n = A + B\left(\frac{q}{p}\right)^n\).  
  Conditions : \(q_0=1 \Rightarrow A+B=1\) ; \(q_N=0 \Rightarrow A + B\left(\frac{q}{p}\right)^N = 0\).  
  On soustrait : \(B\left(1 - \left(\frac{q}{p}\right)^N\right) = 1 \Rightarrow B = \frac{1}{1-(q/p)^N}\).  
  Alors \(A = 1 - B = \frac{-(q/p)^N}{1-(q/p)^N}\).  
  Donc \(q_n = \frac{1}{1-(q/p)^N} \left(1 - \left(\frac{q}{p}\right)^N\right) + \frac{1}{1-(q/p)^N}\left(\frac{q}{p}\right)^n\) ?  
  Calculons plus proprement :
  \[
  q_n = \frac{1}{1-(q/p)^N} \left[ \left(\frac{q}{p}\right)^n - \left(\frac{q}{p}\right)^N \right]
  \]
  Vérifions : \(q_0 = \frac{1 - (q/p)^N}{1-(q/p)^N}=1\) ; \(q_N = \frac{(q/p)^N - (q/p)^N}{...}=0\).  
  Donc :
  \[
  \boxed{q_n = \frac{(q/p)^n - (q/p)^N}{1 - (q/p)^N}}
  \]

- **Cas \(p = \frac{1}{2}\)** : racine double \(r=1\). Solution générale : \(q_n = A + B n\).  
  Conditions : \(q_0=1 \Rightarrow A=1\) ; \(q_N=0 \Rightarrow 1 + B N = 0 \Rightarrow B = -1/N\).  
  Donc :
  \[
  \boxed{q_n = 1 - \frac{n}{N}}
  \]

**2)** Probabilité \(p_n\) d'arrêt en N. Par symétrie (échanger \(p\) et \(q\), et \(n\) avec \(N-n\)), on a :
- Si \(p \neq q\) : \(p_n = \frac{(p/q)^{N-n} - (p/q)^N}{1 - (p/q)^N}\) (ou plus simplement en utilisant \(p_n = 1 - q_n\) ? Non, car arrêt en N ou en 0 complémentaire ? Attention : la particule s'arrête toujours en 0 ou en N, donc \(p_n + q_n = 1\) car arrêt certain. Vérifions question 3.)

En effet, la particule finit par s'arrêter avec probabilité 1 (marche aléatoire finie). Donc \(p_n + q_n = 1\).  
Ainsi \(p_n = 1 - q_n\).

**3)** \(p_n + q_n = 1\) (car absorption certaine). Donc probabilité de ne jamais s'arrêter = 0.

---

## Exercice 3

**Énoncé** : Maladie : 1 personne sur 10000. Test : positif chez 99% des malades, faux positif chez 0,1% des non-malades. Un individu est testé positif. Quelle est sa probabilité d'être malade ?

### Correction

Notons \(M\) = "être malade", \(T^+\) = "test positif".  
Données : \(P(M) = 10^{-4}\), \(P(T^+|M)=0,99\), \(P(T^+|\bar{M})=0,001\).

On cherche \(P(M|T^+)\). Formule de Bayes :
\[
P(M|T^+) = \frac{P(T^+|M)P(M)}{P(T^+)} = \frac{0,99 \times 10^{-4}}{P(T^+)}
\]
Calcul de \(P(T^+)\) par probabilités totales :
\[
P(T^+) = P(T^+|M)P(M) + P(T^+|\bar{M})P(\bar{M}) = 0,99 \times 10^{-4} + 0,001 \times (1-10^{-4})
\]
\[
= 0,000099 + 0,001 \times 0,9999 = 0,000099 + 0,0009999 = 0,0010989
\]
Donc :
\[
P(M|T^+) = \frac{0,000099}{0,0010989} \approx 0,0901
\]
Soit environ **9,01 %**.

**Conclusion** : Même avec un test positif, la probabilité d'être malade est faible (9%) car la maladie est rare et les faux positifs nombreux.

---

## Exercice 4

**1)** Formule de Bayes :  
Soit \(\{C_i\}\) une partition de l'univers, alors
\[
P(C_k|A) = \frac{P(A|C_k)P(C_k)}{\sum_i P(A|C_i)P(C_i)}.
\]
Démonstration : \(P(C_k|A) = \frac{P(A \cap C_k)}{P(A)} = \frac{P(A|C_k)P(C_k)}{P(A)}\) et \(P(A) = \sum_i P(A|C_i)P(C_i)\).

**2)** 100 dés dont 25 pipés. Dés pipés : probabilité de 6 = 1/2. Dés normaux : probabilité de 6 = 1/6.

a) On tire un dé au hasard, on lance et on obtient 6. Probabilité que le dé soit pipé.

Soit \(P\) = "dé pipé", \(N\) = "dé normal". \(P(P)=0,25\), \(P(N)=0,75\).  
\(P(6|P)=1/2\), \(P(6|N)=1/6\).  
Par Bayes :
\[
P(P|6) = \frac{(1/2)\times 0,25}{(1/2)\times 0,25 + (1/6)\times 0,75} = \frac{0,125}{0,125 + 0,125} = \frac{0,125}{0,25} = 0,5
\]
Donc probabilité = \(1/2\).

b) On lance \(n\) fois le même dé, on obtient \(n\) fois 6.  
\(P(6^n|P) = (1/2)^n\), \(P(6^n|N) = (1/6)^n\).  
A priori : \(P(P)=0,25\), \(P(N)=0,75\).  
\[
p_n = P(P|6^n) = \frac{(1/2)^n \times 0,25}{(1/2)^n \times 0,25 + (1/6)^n \times 0,75}
\]
Multiplions numérateur et dénominateur par \(2^n\) :
\[
p_n = \frac{0,25}{0,25 + 0,75 \times (1/3)^n} = \frac{1}{1 + 3 \times (1/3)^n} = \frac{1}{1 + 3^{1-n}}
\]
car \(0,75/0,25 = 3\) et \((1/6)^n / (1/2)^n = (1/3)^n\).  
Donc :
\[
\boxed{p_n = \frac{1}{1 + 3^{1-n}}}
\]

c) \(\lim_{n\to\infty} p_n = \frac{1}{1+0} = 1\).  
Interprétation : si on obtient une longue séquence de 6, il devient presque certain que le dé est pipé.

---

## Exercice 5

**Énoncé** : Mouche sur triangle ABC. À chaque instant, si elle est sur un sommet, elle y reste avec proba 2/3, ou va sur chacun des deux autres avec proba 1/3 chacune. Initialement en A. \(a_n = P(A_n)\), \(b_n = P(B_n)\), \(c_n = P(C_n)\).

### Correction

**1)** \(a_n + b_n + c_n = 1\) (certain d'être sur un sommet).

Relations de récurrence :
- \(a_{n+1} = \frac{2}{3}a_n + \frac{1}{3}b_n + \frac{1}{3}c_n\) (reste sur A si déjà en A avec proba 2/3, ou vient de B ou C avec proba 1/3 chacune).
- \(b_{n+1} = \frac{1}{3}a_n + \frac{2}{3}b_n + \frac{1}{3}c_n\)
- \(c_{n+1} = \frac{1}{3}a_n + \frac{1}{3}b_n + \frac{2}{3}c_n\)

**2)** Posons \(X_n = \begin{pmatrix} a_n \\ b_n \\ c_n \end{pmatrix}\).  
On a \(X_{n+1} = A X_n\) avec
\[
A = \begin{pmatrix}
\frac{2}{3} & \frac{1}{3} & \frac{1}{3} \\
\frac{1}{3} & \frac{2}{3} & \frac{1}{3} \\
\frac{1}{3} & \frac{1}{3} & \frac{2}{3}
\end{pmatrix}
\]
Initialement \(X_0 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}\).

**3)** On cherche une expression de \(a_n, b_n, c_n\).

Observons que la matrice \(A\) est symétrique, de la forme \(\frac{1}{3}(2I + J)\) où \(J\) est la matrice de tous les 1. En effet : \(A = \frac{1}{3}\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix} = \frac{1}{3}(I + (I+J))\) ? Mieux : \(A = \frac{1}{3}(I + (I+J))\) non.  
On peut diagonaliser. Valeurs propres :  
- Vecteur propre \((1,1,1)\) : \(A(1,1,1)^T = (\frac{2+1+1}{3}, ...) = (\frac{4}{3}, \frac{4}{3}, \frac{4}{3}) = \frac{4}{3}(1,1,1)\). Donc \(\lambda_1 = 4/3\).  
- Vecteurs propres orthogonaux à \((1,1,1)\) : par exemple \((1,-1,0)\) et \((1,0,-1)\).  
  Pour \((1,-1,0)\) : \(A(1,-1,0)^T = (\frac{2}{3} - \frac{1}{3}, \frac{1}{3} - \frac{2}{3}, \frac{1}{3} - \frac{1}{3}) = (\frac{1}{3}, -\frac{1}{3}, 0) = \frac{1}{3}(1,-1,0)\). Donc \(\lambda_2 = 1/3\).  
  Même pour l'autre, \(\lambda_3 = 1/3\).

Donc \(A = PDP^{-1}\) avec \(D = \text{diag}(4/3, 1/3, 1/3)\).  
Alors \(A^n = P D^n P^{-1}\).  
On calcule \(X_n = A^n X_0\). Une méthode plus simple :  
Comme \(a_n+b_n+c_n=1\), on peut chercher \(a_n - b_n\) etc.

Notons que par symétrie, \(b_n = c_n\) pour tout \(n\) car l'état initial est symétrique entre B et C. Vérifions : \(b_0=c_0=0\), et la récurrence conserve l'égalité. Donc \(b_n = c_n\). Alors \(a_n + 2b_n = 1\).

Récurrence pour \(a_n\) :
\[
a_{n+1} = \frac{2}{3}a_n + \frac{1}{3}b_n + \frac{1}{3}c_n = \frac{2}{3}a_n + \frac{2}{3}b_n = \frac{2}{3}a_n + \frac{2}{3}\left(\frac{1-a_n}{2}\right) = \frac{2}{3}a_n + \frac{1}{3}(1-a_n)
\]
\[
a_{n+1} = \frac{2}{3}a_n + \frac{1}{3} - \frac{1}{3}a_n = \frac{1}{3}a_n + \frac{1}{3}
\]
Soit \(a_{n+1} = \frac{1}{3}a_n + \frac{1}{3}\).  
Résolution : point fixe \(a = \frac{1}{3}a + \frac{1}{3} \Rightarrow a = 1/2\).  
\(a_n - \frac{1}{2} = \frac{1}{3}(a_{n-1} - \frac{1}{2}) = \left(\frac{1}{3}\right)^n (a_0 - \frac{1}{2})\).  
Avec \(a_0 = 1\) : \(a_n - \frac{1}{2} = \left(\frac{1}{3}\right)^n \times \frac{1}{2}\).  
Donc :
\[
a_n = \frac{1}{2} + \frac{1}{2}\left(\frac{1}{3}\right)^n
\]
Puis \(b_n = c_n = \frac{1-a_n}{2} = \frac{1 - \frac{1}{2} - \frac{1}{2}(1/3)^n}{2} = \frac{1/2 - (1/2)(1/3)^n}{2} = \frac{1}{4} - \frac{1}{4}(1/3)^n\).

Vérification : \(b_n = \frac{1}{4}(1 - (1/3)^n)\).

Quand \(n\to\infty\), \(a_n \to 1/2\), \(b_n, c_n \to 1/4\). Donc à long terme, la mouche a le plus de chance d'être en A (probabilité 1/2) plutôt qu'en B ou C (1/4 chacun).
# Correction des exercices 6 à 10

## Exercice 6

**1.** \(X \sim \mathcal{N}(0,1)\).  
On utilise la table de la loi normale centrée réduite (page 3).

- \(P(X \leq 1,13)\) : lecture directe : \(P(Z < 1,13) = 0,8708\) (ligne 1,1 et colonne 0,03).  
  Donc \(\boxed{P(X \leq 1,13) = 0,8708}\).

- \(P(X \geq 2,45) = 1 - P(X < 2,45)\).  
  \(P(Z < 2,45) = 0,9929\) (ligne 2,4 et colonne 0,05).  
  Donc \(P(X \geq 2,45) = 1 - 0,9929 = 0,0071\).  
  \(\boxed{P(X \geq 2,45) = 0,0071}\).

**2.** \(X \sim \mathcal{N}(7, 4^2)\). On centre et réduit : \(Z = \frac{X-7}{4}\).

(i) \(P(X \leq 8) = P\left(Z \leq \frac{8-7}{4}\right) = P(Z \leq 0,25) = 0,5987\) (table : 0,25 → 0,5987).  
   \(\boxed{P(X \leq 8) = 0,5987}\).

   \(P(5 \leq X \leq 9) = P\left(\frac{5-7}{4} \leq Z \leq \frac{9-7}{4}\right) = P(-0,5 \leq Z \leq 0,5)\).  
   \(P(Z \leq 0,5) = 0,6915\), \(P(Z \leq -0,5) = 1 - 0,6915 = 0,3085\).  
   Donc \(P = 0,6915 - 0,3085 = 0,3830\).  
   \(\boxed{P(5 \leq X \leq 9) = 0,3830}\).

(ii) Chercher \(a\) tel que \(P(X \geq a) = 0,9\).  
   \(P(X \geq a) = 1 - P(X \leq a) = 0,9 \Rightarrow P(X \leq a) = 0,1\).  
   Soit \(P\left(Z \leq \frac{a-7}{4}\right) = 0,1\).  
   Par symétrie, \(P(Z \leq -z_{0,1}) = 0,1\) avec \(z_{0,1}\) tel que \(P(Z \geq z_{0,1}) = 0,1\).  
   Or \(P(Z \geq 1,28) \approx 0,1003\) (table : 1,28 donne 0,8997 pour \(P(Z<1,28)\), donc \(P(Z>1,28)=0,1003\)).  
   On prend \(z_{0,1} \approx 1,28\). Donc \(\frac{a-7}{4} = -1,28 \Rightarrow a = 7 - 4\times1,28 = 7 - 5,12 = 1,88\).  
   \(\boxed{a \approx 1,88}\).

**3.** Soit \(T\) la taille des collégiens, \(T \sim \mathcal{N}(m, \sigma^2)\).  
On sait : \(P(T < 1,50) = 0,2\) (un cinquième), \(P(T > 1,80) = 0,1\).

- \(P(T < 1,50) = 0,2 \Rightarrow P\left(Z < \frac{1,50 - m}{\sigma}\right) = 0,2\).  
  Le quantile d'ordre 0,2 est \(z_{0,2} \approx -0,8416\) (car \(P(Z < -0,84) \approx 0,2005\) ; on prend -0,84).  
  Donc \(\frac{1,50 - m}{\sigma} = -0,84\)  (1)

- \(P(T > 1,80) = 0,1 \Rightarrow P\left(Z > \frac{1,80 - m}{\sigma}\right) = 0,1 \Rightarrow P\left(Z < \frac{1,80 - m}{\sigma}\right) = 0,9\).  
  Le quantile d'ordre 0,9 est \(z_{0,9} \approx 1,28\).  
  Donc \(\frac{1,80 - m}{\sigma} = 1,28\)  (2)

On résout :  
(2) - (1) : \(\frac{1,80 - m}{\sigma} - \frac{1,50 - m}{\sigma} = 1,28 - (-0,84) \Rightarrow \frac{0,30}{\sigma} = 2,12 \Rightarrow \sigma = \frac{0,30}{2,12} \approx 0,1415\).  
Puis de (2) : \(1,80 - m = 1,28 \times 0,1415 \approx 0,1811 \Rightarrow m = 1,80 - 0,1811 = 1,6189\).  
Donc \(\boxed{m \approx 1,62\ \text{m},\ \sigma \approx 0,141\ \text{m}}\).

---

## Exercice 7

Le fabricant affirme qu'au plus 10 % des pièces sont défectueuses. On suppose que le taux de défectueux est exactement 10 % (pire des cas).  
Ainsi, la probabilité qu'une pièce soit bonne est \(p = 0,9\).  
L'acheteur commande 150 pièces. Soit \(X\) le nombre de bonnes pièces.  
\(X \sim B(n=150, p=0,9)\).

On veut \(P(X \geq 120)\). Approximation par la loi normale :  
\(\mu = np = 150 \times 0,9 = 135\), \(\sigma = \sqrt{np(1-p)} = \sqrt{150 \times 0,9 \times 0,1} = \sqrt{13,5} \approx 3,674\).  
Avec correction de continuité :  
\(P(X \geq 120) \approx P\left(Z \geq \frac{119,5 - 135}{3,674}\right) = P(Z \geq -4,22)\).  
\(P(Z \geq -4,22) = 1 - P(Z < -4,22) \approx 1 - 0,00001 \approx 0,99999\).  
Donc \(\boxed{P(X \geq 120) \approx 1}\). L'acheteur a quasiment la certitude de recevoir au moins 120 bonnes pièces.

---

## Exercice 8

**Données manquantes** : L'énoncé ne fournit pas les valeurs de l'échantillon (nombre de camions en panne chaque jour). Nous donnons donc la méthode générale.

1. **Moyenne et écart-type empiriques** :  
   \(\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i\),  
   \(s = \sqrt{\frac{1}{n-1}\sum_{i=1}^n (x_i - \bar{x})^2}\).

2. **Estimation ponctuelle** :  
   La moyenne \(m\) de la population est estimée par \(\bar{x}\), et l'écart-type \(\sigma\) par \(s\).

3. **Intervalle de confiance à 95 % pour \(m\)** (grand échantillon) :  
   \(IC_{95\%} = \left[ \bar{x} - z_{0,025}\frac{s}{\sqrt{n}},\ \bar{x} + z_{0,025}\frac{s}{\sqrt{n}} \right]\) avec \(z_{0,025}=1,96\).

4. **Marge d'erreur** : \(E = 1,96 \times \frac{s}{\sqrt{n}}\).

---

## Exercice 9

**1.** \(n=50\), \(\bar{x}=36\), \(s=12\). Intervalle de confiance à 95 % pour l'âge moyen \(m\).  
   \(z_{0,025}=1,96\). Marge d'erreur : \(E = 1,96 \times \frac{12}{\sqrt{50}} = 1,96 \times \frac{12}{7,071} \approx 1,96 \times 1,697 = 3,326\).  
   \(IC = [36 - 3,326;\ 36 + 3,326] \approx [32,67;\ 39,33]\).  
   \(\boxed{IC_{95\%} = [32,67\ \text{ans};\ 39,33\ \text{ans}]}\).

**2.** On veut \(E = 2\) avec le même niveau de confiance (95 %).  
   \(E = z_{0,025} \frac{s}{\sqrt{n}} \Rightarrow 2 = 1,96 \times \frac{12}{\sqrt{n}} \Rightarrow \sqrt{n} = 1,96 \times \frac{12}{2} = 1,96 \times 6 = 11,76\)  
   \(\Rightarrow n = (11,76)^2 \approx 138,3\). On prend \(n = 139\).  
   \(\boxed{n \approx 139}\).

**3.** Pour \(E = 1\) : \(\sqrt{n} = 1,96 \times 12 = 23,52 \Rightarrow n = 553,2 \approx 554\).  
   \(\boxed{n \approx 554}\).

---

## Exercice 10

### Première partie (livraison reçue)

On teste si le poids moyen est conforme à \(10\ \text{kg}\).  
\(H_0 : \mu = 10\) contre \(H_1 : \mu \neq 10\).  
\(\alpha = 0,05\), \(n=100\), \(\bar{x}=9,95\), \(s=0,5\).  
Statistique de test : \(z = \frac{\bar{x} - 10}{s/\sqrt{n}} = \frac{9,95 - 10}{0,5/10} = \frac{-0,05}{0,05} = -1\).  
Valeur critique : \(z_{0,025}=1,96\). On rejette \(H_0\) si \(|z| > 1,96\). Ici \(|z|=1 < 1,96\), donc on **ne rejette pas** \(H_0\).  
Conclusion : la livraison est conforme (pas de différence significative).

**Degré de signification (p-value)** : \(p = 2 \times P(Z < -1) = 2 \times 0,1587 = 0,3174\).  
\(\boxed{p\text{-value} = 0,3174}\).

### Deuxième partie (livraison envoyée)

On teste si le poids ne dépasse pas \(10\ \text{kg}\) (unilatéral).  
\(H_0 : \mu \leq 10\) contre \(H_1 : \mu > 10\).  
\(\alpha = 0,02\), \(n=100\), \(\bar{x}=10,1\), \(s=0,5\).  
\(z = \frac{10,1 - 10}{0,5/10} = \frac{0,1}{0,05} = 2\).  
Valeur critique unilatérale : \(z_{0,02} = 2,054\) (car \(P(Z > 2,054) = 0,02\)).  
On rejette \(H_0\) si \(z > 2,054\). Ici \(2 < 2,054\), donc on **ne rejette pas** \(H_0\).  
Conclusion : on ne peut pas affirmer que les sacs dépassent \(10\ \text{kg}\) au seuil de 2%.

**Degré de signification** : \(p = P(Z > 2) = 1 - 0,9772 = 0,0228\).  
\(\boxed{p\text{-value} = 0,0228}\).




