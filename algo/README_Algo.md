# Partie Algorithme de Détection de Collisions (C-ITS)

Cette partie du projet implémente un pipeline complet de traitement de données CAM, détection de paires proches, labellisation automatique, et entraînement d’un modèle de Machine Learning pour prédire les collisions entre véhicules et cyclistes.

---

## Objectif

- Détecter automatiquement les situations de collision probables.
- S’appuyer sur un modèle ML supervisé (Random Forest).
- Basé uniquement sur les données extraites de messages CAM.

---

## Structure du dossier `algo/`

```
algo/
├── data/               # Données CSV (entrée et sorties)
│   ├── trajectories.csv
│   ├── proximity_pairs.csv
│   ├── proximity_pairs_labeled.csv
│
├── models/             # Modèles entraînés (collision_model.pkl)
│
└── scripts/            # Scripts de traitement
    ├── find_proximity_pairs.py
    ├── generate_labels.py
    ├── train_model.py
    └── predict_collision.py
```

---

## Installation

### Prérequis
- Python 3.10+
- pip

### Installation des dépendances

```bash
cd algo/
pip install -r requirements.txt
```

---

## Étapes du pipeline

### 1. Génération des paires proches (`find_proximity_pairs.py`)

Ce script :
- Lit le fichier `trajectories.csv`
- Détecte toutes les paires de véhicules proches (spatialement et temporellement)
- Sauvegarde dans `proximity_pairs.csv`

```bash
python3 scripts/find_proximity_pairs.py
```

---

### 2. Labellisation automatique (`generate_labels.py`)

Ce script :
- Applique des règles géométriques (vitesse, direction, distance latérale/longitudinale)
- Attribue un label `collision=1` ou `0`
- Sauvegarde dans `proximity_pairs_labeled.csv`

```bash
python3 scripts/generate_labels.py
```

---

### 3. Entraînement du modèle ML (`train_model.py`)

Ce script :
- Lit le fichier labellisé
- Entraîne un `RandomForestClassifier`
- Sauvegarde le modèle dans `models/collision_model.pkl`

```bash
python3 scripts/train_model.py
```

À la fin, un rapport de classification et une matrice de confusion sont affichés.

---

### 4. Prédictions (`predict_collision.py`)

Ce script :
- Charge un fichier CSV de nouvelles situations
- Applique le modèle pour prédire `predicted_collision`
- Sauvegarde un nouveau CSV avec les prédictions

```bash
python3 scripts/predict_collision.py
```

---

## Format attendu pour les prédictions

Fichier CSV d’entrée pour `predict_collision.py` :

```csv
distance_m,speed_1,speed_2,heading_1,heading_2,lat_1,lon_1,lat_2,lon_2
1.0,8.0,9.0,90,91,45.75,4.85,45.7505,4.8501
...
```

---

## Modèle

- Algo : `RandomForestClassifier`
- Données : distance entre véhicules, vitesses, directions, positions GPS
- Résultat : `1` si collision probable, `0` sinon
- Évaluation : Precision > 0.94 selon le dataset

---

## À faire ensuite

- Évaluer sur nouveaux cas réels
- Équilibrer le dataset (positifs/négatifs)
- Tester d'autres modèles : SVM, XGBoost, etc.

---

## Réalisé par

**Mohamed Dyae Chellaf** – Stage été 2025 (ENSEIRB-MATMECA)