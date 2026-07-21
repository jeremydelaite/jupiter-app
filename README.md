# 🪐 Jupiter — Budget & Épargne

Application web de gestion de dépenses et d'épargne, pensée pour être simple et pratique au quotidien : suivre ses dépenses au fil de l'eau, voir combien il reste pour finir le mois, gérer ses charges, ses revenus, son épargne et ses budgets par catégorie.

## Fonctionnalités

- **Tableau de bord** : solde réel disponible, restant prévu en fin de mois, répartition des dépenses (donut), budgets par catégorie.
- **Suivi des dépenses** : ajout rapide, édition, regroupement par jour avec sous-totaux, filtre par catégorie.
- **Charges fixes** : montant prévu → réel une fois payé (case à cocher).
- **Revenus** : prévu → reçu, report automatique du solde du mois précédent.
- **Épargne** : comptes/livrets avec solde cumulé, objectifs et estimation du délai pour les atteindre.
- **Budgets** par catégorie, alignables sur le réel dépensé.
- **Base récurrente** : définir revenus / charges / épargne / budgets réutilisés chaque mois.
- **Navigation par mois**, données conservées d'un mois à l'autre.
- Interface « liquid glass » (verre dépoli), responsive mobile + desktop.

## Utilisation

Ouvrir `index.html` dans un navigateur. Les données sont enregistrées localement (dans le navigateur).

## Synchronisation multi-appareils (optionnelle)

L'app peut se synchroniser entre mobile et PC via [Supabase](https://supabase.com) (comptes + stockage cloud gratuit).
Renseigner `SUPABASE_URL` et `SUPABASE_ANON_KEY` en haut du script de `index.html`.
Tant que ces valeurs ne sont pas renseignées, l'app fonctionne en local uniquement.

## Technique

Application autonome : un seul fichier `index.html` (HTML/CSS/JS, sans dépendance à installer). Icônes Lucide intégrées.
