from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import parsers.pdf as pdf_parser
import parsers.hh as hh_parser

from models.recs import get_recommended_courses
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_response(title, description, keywords=None):
    df = get_recommended_courses(title, description)
    return df.to_dict(orient='records')


@app.post('/upload_file')
async def upload_file(request: Request):
    form = await request.form()
    file = form['file']
    try:
        text = pdf_parser.parse_pdf(file)
        return get_response('', text)
    except Exception as e:
        return {"error": str(e)}


@app.post("/process_data")
async def process_data(request: Request):
    json = await request.json()
    text = json.get('text')

    if text and hh_parser.is_hh_link(text):
        title, description, keywords = hh_parser.parse_hh_vacancy(text)
        return get_response(title, description, keywords)

    return {"text": text}

