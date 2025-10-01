import pandas as pd
import os
from math import radians, cos, sin, sqrt, atan2

TIME_WINDOW_MS = 1000  # Tolérance temporelle (±1s)
DISTANCE_THRESHOLD_METERS = 15  # Seuil de proximité spatiale

def haversine(lat1, lon1, lat2, lon2):
    R = 6371000  
    phi1, phi2 = radians(lat1), radians(lat2)
    d_phi = radians(lat2 - lat1)
    d_lambda = radians(lon2 - lon1)

    a = sin(d_phi / 2)**2 + cos(phi1) * cos(phi2) * sin(d_lambda / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c  

def find_proximity_pairs(input_path, output_path):
    df = pd.read_csv(input_path)

    df = df.sort_values(by="timestamp")

    pairs = []

    for i, row in df.iterrows():
        t1 = row["timestamp"]
        sid1 = row["station_id"]
        lat1, lon1 = row["latitude"], row["longitude"]

        mask = (df["timestamp"] >= t1 - TIME_WINDOW_MS) & (df["timestamp"] <= t1 + TIME_WINDOW_MS)
        nearby = df[mask]

        for _, other in nearby.iterrows():
            sid2 = other["station_id"]
            if sid1 >= sid2:
                continue  # ignore soi-même et doublons inversés

            lat2, lon2 = other["latitude"], other["longitude"]
            distance = haversine(lat1, lon1, lat2, lon2)

            if distance <= DISTANCE_THRESHOLD_METERS:
                pairs.append({
                    "timestamp": t1,
                    "station_id_1": sid1,
                    "station_id_2": sid2,
                    "distance_m": round(distance, 2),
                    "speed_1": row["speed"],
                    "speed_2": other["speed"],
                    "heading_1": row["heading"],
                    "heading_2": other["heading"],
                    "lat_1": lat1,
                    "lon_1": lon1,
                    "lat_2": lat2,
                    "lon_2": lon2
                })

    result_df = pd.DataFrame(pairs)
    result_df.to_csv(output_path, index=False)
    print(f"{len(result_df)} paires proches détectées. Résultat : {output_path}")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    INPUT_PATH = os.path.join(BASE_DIR, "data", "trajectories.csv")
    OUTPUT_PATH = os.path.join(BASE_DIR, "data", "proximity_pairs.csv")
    find_proximity_pairs(INPUT_PATH, OUTPUT_PATH)
