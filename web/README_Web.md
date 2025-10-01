# Interface Web – Détection de Collisions Véhicule / Cycliste

## Objectif

Cette interface permet de **visualiser dynamiquement des alertes de collision potentielles** émises par des véhicules, bus ou cyclistes à partir de messages **CAM** et **DENM**, sur une carte interactive Leaflet.

---

## Technologies utilisées

### Frontend (`frontend/`)
- Next.js 15+
- React Leaflet
- CSS Modules

### Backend (`backend/`)
- FastAPI
- Uvicorn
- JSON stocké localement dans `backend/data/` vu son volume

---

## Structure du projet

```
web/
├── backend/
│   ├── main.py
│   └── data/
│       ├── CAM_<alert>.json
│       └── DENM_<alert>.json
└── frontend/
    ├── src/
    │   ├── components/
    │   └── styles/
    └── package.json
```

---

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd web/
```

### 2. Installation du Backend (FastAPI)

```bash
cd backend/
python -m venv venv
source venv/bin/activate  # Windows : venv\Scripts\activate

pip install fastapi uvicorn
```

### 3. Installation du Frontend (Next.js)

```bash
cd ../frontend/
npm install
```

---

## Lancer l'application

### Backend

```bash
cd backend/
uvicorn main:myapp --reload
```

Accessible sur : `http://localhost:8000`

### Frontend

```bash
cd frontend/
npm run dev
```

Accessible sur : `http://localhost:3000`

---

## Filtres disponibles

- Par type d’alerte (CAM ou DENM)
- Par station_id
- Multi-critères
- Légende dynamique des couleurs

---

## Format attendu

Chaque ligne du fichier JSON est un message d'alerte au format :

```json
{
  "type": "cam",
  "timestamp": 1746622380334,
  "message": {
    "station_id": 1010,
    "basic_container": {
      "reference_position": {
        "latitude": 448374316,
        "longitude": -5900033
      }
    },
    "high_frequency_container": {
      "speed": 358,
      "heading": 3154
    }
  },
  "extra": [
    {
      "eyenet_alert": "CAR_BEHIND"
    }
  ]
}
```

---

## FAQ

- **Carte lente ?** → Divisez les fichiers CAM/DENM par alerte comme fait ici.
- **Ajout d'une alerte ?** → Ajouter fichier `CAM_X.json` ou `DENM_X.json`, lister dans `FilterSidebar.tsx` et styliser dans `AlertMarkers.tsx`.

---

## Réalisé par

**Mohamed Dyae Chellaf** – Stage été 2025 (ENSEIRB-MATMECA)