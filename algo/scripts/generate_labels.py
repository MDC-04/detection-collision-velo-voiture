import pandas as pd
import os
import numpy as np

# Seuils
DISTANCE_THRESHOLD = 5      
SPEED_THRESHOLD = 2         
ANGLE_DIFF_MAX = 45         
LATERAL_THRESHOLD = 1.5      
LONGITUDINAL_RANGE = (-5, 5) 

# Distance entre 2 coordonnées GPS (en mètres)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1, phi2 = np.radians(lat1), np.radians(lat2)
    d_phi = np.radians(lat2 - lat1)
    d_lambda = np.radians(lon2 - lon1)
    a = np.sin(d_phi / 2)**2 + np.cos(phi1) * np.cos(phi2) * np.sin(d_lambda / 2)**2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    return R * c

# Décomposition 2D de la distance en latéral / longitudinal (par rapport à heading_1)
def compute_relative_distances(lat1, lon1, heading1, lat2, lon2):
    theta = np.radians(heading1)
    dir_vector = np.array([np.cos(theta), np.sin(theta)])

    dx = haversine(lat1, lon1, lat1, lon2) * np.sign(lon2 - lon1)
    dy = haversine(lat1, lon1, lat2, lon1) * np.sign(lat2 - lat1)
    diff_vector = np.array([dx, dy])

    dist_long = np.dot(diff_vector, dir_vector)
    dist_lat = np.linalg.norm(diff_vector - dist_long * dir_vector)

    return dist_lat, dist_long

# Différence minimale entre deux angles (en degrés)
def compute_angle_difference(h1, h2):
    diff = abs(h1 - h2) % 360
    return min(diff, 360 - diff)



def label_collisions(input_path, output_path):
    df = pd.read_csv(input_path)

    labels = []
    for _, row in df.iterrows():
        dist = row["distance_m"]
        s1, s2 = row["speed_1"], row["speed_2"]
        h1, h2 = row["heading_1"], row["heading_2"]
        lat1, lon1 = row["lat_1"], row["lon_1"]
        lat2, lon2 = row["lat_2"], row["lon_2"]

        angle_diff = compute_angle_difference(h1, h2)
        dist_lat, dist_long = compute_relative_distances(lat1, lon1, h1, lat2, lon2)

        if (
            dist < DISTANCE_THRESHOLD and
            s1 > SPEED_THRESHOLD and
            s2 > SPEED_THRESHOLD and
            angle_diff < ANGLE_DIFF_MAX and
            abs(dist_lat) < LATERAL_THRESHOLD and
            LONGITUDINAL_RANGE[0] < dist_long < LONGITUDINAL_RANGE[1]
        ):
            labels.append(1)
        else:
            labels.append(0)

    df["collision"] = labels
    df.to_csv(output_path, index=False)
    print(f"{df['collision'].sum()} collisions détectées sur {len(df)} lignes.")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    INPUT_PATH = os.path.join(BASE_DIR, "data", "proximity_pairs.csv")
    OUTPUT_PATH = os.path.join(BASE_DIR, "data", "proximity_pairs_labeled.csv")
    label_collisions(INPUT_PATH, OUTPUT_PATH)
