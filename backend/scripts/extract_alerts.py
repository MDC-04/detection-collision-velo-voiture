import json

input_file = "../data/CAM.json"
output_file = "../data/CAM_Alert.json"

with open(input_file, "r", encoding="utf-8") as infile, open(output_file, "w", encoding="utf-8") as outfile :
    for line in infile :
        try :
            obj = json.loads(line)
            extra = obj.get("extra", [])
            if any("eyenet_alert" in e for e in extra) :
                outfile.write(json.dumps(obj) + "\n")
        except json.JSONDecodeError :
            continue