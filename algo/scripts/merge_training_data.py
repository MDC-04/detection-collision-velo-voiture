import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Chemins vers les fichiers
main_path = os.path.join(BASE_DIR, "data", "proximity_pairs_labeled.csv")
piste_path = os.path.join(BASE_DIR, "data", "piste_cyclable_exemples.csv")
collision_path = os.path.join(BASE_DIR, "data", "collisions_evidentes.csv")

# Charger les datasets
df_main = pd.read_csv(main_path)
df_piste = pd.read_csv(piste_path)
df_collision = pd.read_csv(collision_path)

# Vérifier colonnes en commun
common_cols = list(set(df_main.columns) & set(df_piste.columns) & set(df_collision.columns))

# Filtrer les colonnes communes pour éviter les erreurs
df_piste = df_piste[common_cols]
df_collision = df_collision[common_cols]

# Fusionner
df_merged = pd.concat([df_main, df_piste, df_collision], ignore_index=True)

# Sauvegarder
df_merged.to_csv(main_path, index=False)
print(f"Fusion réussie : {len(df_merged)} lignes totales dans {main_path}")
print(f"Dont {df_merged['collision'].sum()} collisions détectées.")
