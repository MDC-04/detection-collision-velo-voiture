import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
INPUT_CSV = os.path.join(BASE_DIR, "data", "cam_cleaned.csv")
OUTPUT_CSV = os.path.join(BASE_DIR, "data", "trajectories.csv")

def reconstruct_trajectories(input_path, output_path) :
    df = pd.read_csv(input_path)

    expected_cols = {"station_id", "timestamp", "latitude", "longitude", "speed", "heading"}
    if not expected_cols.issubset(set(df.columns)):
        raise ValueError(f"Colonnes manquantes dans le fichier : {expected_cols - set(df.columns)}")

    df_sorted = df.sort_values(by=["station_id", "timestamp"])

    df_sorted.to_csv(output_path, index=False)
    # print(f"Trajectoires reconstituées et enregistrées dans : {output_path}")
    print(f"Nombre de stations uniques : {df_sorted['station_id'].nunique()}")

if __name__ == "__main__":
    reconstruct_trajectories(INPUT_CSV, OUTPUT_CSV)