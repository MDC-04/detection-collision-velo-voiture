import warnings
warnings.filterwarnings("ignore")

import pandas as pd
import os
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "collision_model.pkl")
INPUT_PATH = os.path.join(BASE_DIR, "pairs", "pairs_mdc_2.csv")
OUTPUT_PATH = os.path.join(BASE_DIR, "predictions", "collisions_mdc_2.csv")

model = joblib.load(MODEL_PATH)

df = pd.read_csv(INPUT_PATH)

expected_cols = [
    "distance_m", "speed_1", "speed_2", "heading_1", "heading_2",
    "lat_1", "lon_1", "lat_2", "lon_2"
]

if not all(col in df.columns for col in expected_cols):
    raise ValueError(f"Le fichier d'entrée doit contenir les colonnes suivantes :\n{expected_cols}")

X = df[expected_cols]
df["predicted_collision"] = model.predict(X)

df.to_csv(OUTPUT_PATH, index=False)
print(f"{df['predicted_collision'].sum()} collisions détectées sur {len(df)} situations analysées.")
print(f"Résultat enregistré dans : {OUTPUT_PATH}")
