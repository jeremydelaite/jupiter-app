# 🪐 Jupiter — Budget & Épargne

Application web de gestion de dépenses et d'épargne, simple et pratique au quotidien : suivre ses dépenses au fil de l'eau, voir combien il reste pour finir le mois, gérer ses charges, revenus, épargne et budgets par catégorie.

Interface « liquid glass » moderne, responsive mobile + ordinateur. Aucune dépendance à installer : tout tient dans un seul fichier `index.html`.

📖 **[Guide d'utilisation complet →](GUIDE.md)** — comment utiliser l'app au quotidien, écran par écran.

---

## ✨ Fonctionnalités

- **Tableau de bord** : solde réel disponible, restant prévu en fin de mois avec jours restants et budget par jour, répartition des dépenses en camembert, budgets par catégorie.
- **Suivi des dépenses** : ajout rapide, édition, regroupement par jour avec sous-totaux, filtre par catégorie.
- **Charges fixes** : montant prévu qui devient réel une fois la charge cochée comme payée.
- **Revenus** : prévu → reçu, avec report automatique du solde du mois précédent.
- **Épargne** : comptes / livrets à solde cumulé et total d'épargne.
  - **Objectifs** avec estimation du délai au rythme actuel, et **date cible optionnelle** (activable par compte) qui calcule le versement mensuel nécessaire et indique si le rythme est suffisant.
  - **Évolution de l'épargne** : graphe du solde total mois par mois (6 mois / 12 mois / tout), ligne d'objectif, versement moyen et évolution sur la période.
- **Crédits & remboursements** : suivi du restant dû par crédit ; chaque remboursement coché réduit automatiquement le montant restant.
- **Budgets** par catégorie, alignables en un clic sur le réel dépensé.
- **Catégories personnalisées** : création, modification et suppression (ou masquage si des dépenses y sont déjà rattachées), avec choix de couleur et d'icône.
- **Tendances** : vue d'évolution (dépenses / épargne / solde sur 3, 6 ou 12 mois) et tableau comparatif d'une année sur l'autre.
- **Base récurrente** : revenus / charges / épargne / budgets réutilisés chaque mois.
- **Navigation par mois**, données conservées d'un mois à l'autre.
- **Thèmes** : Jupiter (orange/beige), Violet Rose, Nuit (sombre) et Menthe, toujours en style liquid glass — choix dans « Mon compte → Apparence », conservé et synchronisé.
- **Application installable (PWA)** : ajout à l'écran d'accueil sur mobile, fonctionne hors-ligne, glisser vers le bas pour rafraîchir.
- **Comptes & sécurité** : création de compte, mot de passe, protection anti-robot (CAPTCHA) et suppression de compte confirmée par mot de passe.
- **Synchronisation multi-appareils** optionnelle (mobile ↔ PC) via un compte, avec garde anti-écrasement en cas de modification depuis un autre appareil.

---

## 🚀 Tutoriel : installer Jupiter chez soi

Trois niveaux, du plus simple au plus complet. Choisis selon ton besoin.

### Niveau 1 — Utiliser l'app en local (le plus simple)

1. Récupère le projet : bouton vert **Code → Download ZIP** sur la page GitHub, puis décompresse-le. (Ou clone-le : `git clone https://github.com/TON-PSEUDO/jupiter-app.git`.)
2. Ouvre le fichier **`index.html`** dans ton navigateur (double-clic).
3. C'est tout ! Tes données sont enregistrées **localement dans le navigateur**.

> Limite : les données restent sur cet appareil et ce navigateur. Pas de synchro entre téléphone et ordinateur (voir Niveau 3).

### Niveau 2 — Mettre l'app en ligne gratuitement

Utile pour l'ouvrir depuis ton téléphone et l'installer sur l'écran d'accueil.

**Option A — Netlify Drop (le plus rapide, sans compte technique)**
1. Va sur [app.netlify.com/drop](https://app.netlify.com/drop).
2. Glisse-dépose le dossier du projet.
3. Tu obtiens une adresse `https://ton-app.netlify.app` à ouvrir sur n'importe quel appareil.

**Option B — GitHub Pages (depuis ton dépôt)**
1. Pousse le projet sur GitHub (voir section « Versionner » plus bas).
2. Dans le dépôt : **Settings → Pages**.
3. « Build and deployment » → Source : **Deploy from a branch** → branche `main`, dossier `/root` → **Save**.
4. Après ~1 min, ton app est en ligne sur `https://TON-PSEUDO.github.io/jupiter-app/`.

> Astuce : une fois en ligne, sur mobile fais « Ajouter à l'écran d'accueil » pour l'utiliser comme une app.

### Niveau 3 — Synchroniser entre mobile et PC (comptes + cloud)

L'app peut créer des comptes et stocker les données dans le cloud avec **Supabase** (gratuit). Chacun retrouve ses données sur tous ses appareils.

**1. Créer le projet Supabase**
- Va sur [supabase.com](https://supabase.com) → connexion → **New project**. Attends que le projet démarre.

**2. Créer la table de données**
- Menu **SQL Editor → New query**, colle ceci puis **Run** :

```sql
create table if not exists public.jupiter_data (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb,
  updated_at timestamptz default now()
);
alter table public.jupiter_data enable row level security;
create policy "own data" on public.jupiter_data
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

La sécurité par ligne (RLS) garantit que chaque compte n'accède qu'à ses propres données.

**3. (Optionnel) Connexion instantanée**
- Menu **Authentication → Providers → Email** → désactive **Confirm email** pour ne pas avoir à valider par mail. Sinon, laisse activé et confirme via le lien reçu à l'inscription.

**4. Récupérer les clés**
- Menu **Project Settings → API** : copie **Project URL** et la clé **anon public**.

**5. Renseigner les clés dans l'app**
- Ouvre `index.html`, tout en haut du script, et remplace :

```js
const SUPABASE_URL = "VOTRE_URL_SUPABASE";   // ex: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = "VOTRE_CLE_ANON";  // clé "anon public"
```

**6. Héberger** (Niveau 2) pour ouvrir la même adresse sur mobile et PC.

Au chargement, l'app affiche alors **Connexion / Créer un compte**, charge tes données depuis le cloud et les synchronise automatiquement à chaque modification.

> La clé `anon` est publique par nature : elle est faite pour être dans le code côté navigateur, et l'accès aux données est verrouillé par la règle de sécurité (RLS) ci-dessus.

---

## 🗂️ Versionner le projet sur GitHub

```bash
cd chemin/vers/jupiter-app
git init
git add .
git commit -m "Initial commit — Jupiter budget app"
git remote add origin https://github.com/TON-PSEUDO/jupiter-app.git
git branch -M main
git push -u origin main
```

Astuce : en branchant Netlify ou Cloudflare Pages sur ce dépôt, l'app se redéploie automatiquement à chaque `git push`.

---

## 🎨 Personnalisation rapide

- **Catégories** : ajoute, modifie ou supprime tes catégories directement dans l'app (onglet **Budgets**), avec choix de couleur et d'icône. Les catégories par défaut se règlent dans le tableau `CATS` en haut du script. Les icônes proviennent de [Lucide](https://lucide.dev).
- **Icône / favicon** : remplace `jupiter-icon.png` par ton image (carrée). Les favicons peuvent être régénérés à partir de cette image.
- **Thèmes** : change l'apparence dans l'app (**Mon compte → Apparence** : Jupiter, Violet Rose, Nuit, Menthe). Pour créer un nouveau thème, ajoute un bloc `body[data-theme="..."]` dans le CSS (voir les thèmes existants) ; les couleurs de base sont les variables du bloc `:root`.

---

## ℹ️ Bon à savoir

- En mode local, les données vivent dans le navigateur (les vider efface les données). Pense à activer la synchro (Niveau 3) ou à faire des sauvegardes si besoin.
- Application 100 % statique : hébergeable partout, aucun serveur à maintenir (hors Supabase pour la synchro).

---

## 📄 Licence

Projet sous licence **MIT** — libre d'utilisation, de modification et de partage (voir le fichier `LICENSE`). © 2026 jeremydelaite.

---

*Ce guide sera mis à jour au fil des évolutions du projet.*
