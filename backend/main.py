
from io import BytesIO
import sqlite3

from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from predict import predict_image
from pathlib import Path

app = FastAPI(
    title="Crop Disease Prediction API",
    version="1.0.0",
)
DB_PATH = Path.cwd()/ "crop_disease.db"

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=415,
            detail="Please upload an image file.",
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(status_code=400, detail="Empty file.")

    try:
        image = Image.open(BytesIO(contents))
        image.load()
    except (UnidentifiedImageError, OSError):
        raise HTTPException(
            status_code=400,
            detail="Invalid or corrupted image.",
        )

    predictions = predict_image(image)

    return {
        "filename": file.filename,
        "predictions": predictions,
        "top_prediction": predictions[0],
    }


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


@app.get("/diseases/{class_name}")
def get_disease_info(class_name: str):
    conn = get_db_connection()

    try:
        # Find disease and its crop
        disease = conn.execute("""
            SELECT
                d.id,
                d.name,
                d.name_mr,
                d.description,
                d.description_mr,
                d.is_healthy,
                c.name AS crop_name,
                c.name_mr AS crop_name_mr
            FROM diseases d
            JOIN crops c ON c.id = d.crop_id
            WHERE d.name = ?
        """, (class_name,)).fetchone()

        if disease is None:
            raise HTTPException(
                status_code=404,
                detail="Disease information not found"
            )

        # Fetch remedies and their supporting sources
        remedies = conn.execute("""
            SELECT
                r.id,
                r.type,
                r.description,
                r.description_mr,
                r.precautions,
                r.precautions_mr,
                s.id AS source_id,
                s.title AS source_title,
                s.url AS source_url,
                s.publisher AS source_publisher
            FROM remediations r
            LEFT JOIN remediation_sources rs
                ON rs.remediation_id = r.id
            LEFT JOIN sources s
                ON s.id = rs.source_id
            WHERE r.disease_id = ?
            ORDER BY r.type, r.id
        """, (disease["id"],)).fetchall()

        # Group source rows under each remedy
        remedies_by_id = {}

        for row in remedies:
            remedy_id = row["id"]

            if remedy_id not in remedies_by_id:
                remedies_by_id[remedy_id] = {
                    "id": remedy_id,
                    "type": row["type"],
                    "description": row["description"],
                    "description_mr": row["description_mr"],
                    "precautions": row["precautions"],
                    "precautions_mr": row["precautions_mr"],
                    "sources": []
                }

            if row["source_id"] is not None:
                remedies_by_id[remedy_id]["sources"].append({
                    "id": row["source_id"],
                    "title": row["source_title"],
                    "url": row["source_url"],
                    "publisher": row["source_publisher"]
                })

        return {
            "disease": dict(disease),
            "remediations": list(remedies_by_id.values())
        }

    finally:
        conn.close()



{
  "count": 2,
  "diseases": [
    {
      "id": 1,
      "name": "Rice_Blast",
      "name_mr": "भातावरील करपा",
      "description": "Disease description...",
      "description_mr": "रोगाचे वर्णन...",
      "is_healthy": False,
      "crop_name": "Rice",
      "crop_name_mr": "तांदूळ"
    }
  ]
}