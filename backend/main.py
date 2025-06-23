from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

# FastAPI Application
my_app = FastAPI()

# Allow the frontend to access to the API
my_app.add_middleware (
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Global variables for JSON data
CAM_DATA = []
DENM_DATA = []

@my_app.on_event("startup")
def load_data() :
    global CAM_DATA, DENM_DATA
    with open(Path("data/CAM.json"), "r", encoding="utf-8") as f :
        CAM_DATA = [json.loads(line) for line in f]

    with open(Path("data/DENM.json"), "r", encoding="utf-8") as f :
        DENM_DATA = [json.loads(line) for line in f]

#CAM messages
@my_app.get("/api/cam")
def get_cam() : 
    return CAM_DATA

#DENM messages
@my_app.get("/api/denm")
def get_denm() : 
    return DENM_DATA

#To test
@my_app.get("/api/cam/sample")
def get_sample_cam():
    return DENM_DATA[:7] 

# To avoid errors
@my_app.get("/favicon.ico")
def favicon():
    return {}
