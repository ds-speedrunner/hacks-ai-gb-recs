from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import parsers.pdf as pdf_parser
import parsers.hh as hh_parser
import parsers.keywords as skils_parser

from models.recs import get_recommended_courses, get_recommended_courses_pdf

from fastapi.staticfiles import StaticFiles
import uuid
import pandas as pd

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

results: dict = {}


def to_response(df: pd.DataFrame) -> dict:
    return {
        'courses': df.to_dict(orient='records')
    }


def store_response(df: pd.DataFrame) -> uuid.UUID:
    results_id = uuid.uuid4()
    results[results_id] = to_response(df)
    return results_id


@app.get('/results/{result_id}')
async def get_results(result_id: uuid.UUID):
    response = results.get(result_id, 'No such id')
    return response


@app.post('/upload_file')
async def upload_file(request: Request):
    form = await request.form()
    file = form['file']
    try:
        text = pdf_parser.parse_pdf(file)
        skills = skils_parser.json_parse_skills()
        df = get_recommended_courses_pdf(text, skills)
        return store_response(df)
    except Exception as e:
        return {"error": str(e)}


@app.post("/process_data")
async def process_data(request: Request):
    json = await request.json()
    text = json.get('text')

    if text and hh_parser.is_hh_link(text):
        title, description, keywords = hh_parser.parse_hh_vacancy(text)
        df = get_recommended_courses(title, description, keywords)
        return store_response(df)

    skills = skils_parser.json_parse_skills()
    df = get_recommended_courses_pdf(text, skills)
    return store_response(df)
