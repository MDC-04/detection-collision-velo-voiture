import json
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
INPUT_PATH = os.path.join(BASE_DIR, "data", "CAM_Alert.json")
OUTPUT_PATH = os.path.join(BASE_DIR, "data", "cam_cleaned.csv")

def extract_cam_data(input_path, output_path) :
    records = []

    with open(input_path, "r") as f :
        for line in f :
            try :
                cam = json.loads(line)
                msg = cam["message"]
                pos = msg["basic_container"]["reference_position"]
                dyn = msg["high_frequency_container"]
                extra = cam.get("extra", [{}])[0]

                record = {
                    "timestamp": cam["timestamp"],
                    "station_id": msg["station_id"],
                    "latitude": pos["latitude"] / 1e7,
                    "longitude": pos["longitude"] / 1e7,
                    "speed": dyn["speed"] / 10,
                    "heading": dyn["heading"] / 10,
                    "eyenet_alert": extra.get("eyenet_alert", None)
                }

                records.append(record)

            except Exception as e :
                print("Erreur sur une ligne:", e)
    df = pd.DataFrame(records)
    df.to_csv(output_path, index=False)
    print(f"{len(df)} lignes extraites et enregistrées dans {output_path}")

if __name__ == "__main__" :
    extract_cam_data(INPUT_PATH, OUTPUT_PATH)
