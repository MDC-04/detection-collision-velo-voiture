import pandas as pd
import os

DISTANCE_THRESHOLD = 5  
SPEED_THRESHOLD = 5    
ANGLE_DIFF_MAX = 45     

#Retourne l'écart angulaire minimal entre deux headings (0 à 180)
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

        angle_diff = compute_angle_difference(h1, h2)

        if (
            dist < DISTANCE_THRESHOLD and
            s1 > SPEED_THRESHOLD and
            s2 > SPEED_THRESHOLD and
            angle_diff < ANGLE_DIFF_MAX
        ):
            labels.append(1)
        else:
            labels.append(0)

    df["collision"] = labels
    df.to_csv(output_path, index=False)
    print(f"{df['collision'].sum()} collisions détectées sur {len(df)} lignes.")
    #print(f"Fichier enregistré : {output_path}")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    INPUT_PATH = os.path.join(BASE_DIR, "data", "proximity_pairs.csv")
    OUTPUT_PATH = os.path.join(BASE_DIR, "data", "proximity_pairs_labeled.csv")
    label_collisions(INPUT_PATH, OUTPUT_PATH)
