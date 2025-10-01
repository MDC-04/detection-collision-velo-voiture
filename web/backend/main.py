from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from fastapi import HTTPException
import os

# FastAPI Application
myapp = FastAPI()

# Allow the frontend to access to the API
myapp.add_middleware (
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Global variables for JSON data
CAM_DATA = []
DENM_DATA = []

@myapp.on_event("startup")
def load_data() :
    global CAM_DATA, DENM_DATA
    with open(Path("data/CAM.json"), "r", encoding="utf-8") as f :
        CAM_DATA = [json.loads(line) for line in f]

    with open(Path("data/DENM.json"), "r", encoding="utf-8") as f :
        DENM_DATA = [json.loads(line) for line in f]

#CAM messages
@myapp.get("/api/cam")
def get_cam() : 
    return CAM_DATA

#DENM messages
@myapp.get("/api/denm")
def get_denm() : 
    return DENM_DATA

#To test
@myapp.get("/api/cam/sample")
def get_sample_cam():
    return DENM_DATA[:7] 

# To avoid errors
@myapp.get("/favicon.ico")
def favicon():
    return {}

@myapp.get("/api/cam/alerts")
def get_alerts():
    with open("./data/CAM_Alert.json", "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f]


@myapp.get("/api/cam/alert/{alert_type}")
def get_alert_by_type(alert_type: str):
    filename = f"./data/CAM_{alert_type}.json"
    if not os.path.exists(filename):
        raise HTTPException(status_code=404, detail="Fichier non trouvé")
    
    with open(filename, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f]


@myapp.get("/api/denm/alert/{alert_type}")
def get_denm_alert_by_type(alert_type: str):
    filename = f"./data/DENM_{alert_type}.json"
    if not os.path.exists(filename):
        raise HTTPException(status_code=404, detail="Fichier non trouvé")
    
    with open(filename, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f]
