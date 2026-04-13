from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
import joblib
import numpy as np
import pandas as pd
import os

# Khoi tao app FastAPI
app = FastAPI(title="tamlysinhvien API", version="1.0")

# Setup CORS cho phep Frontend (neu mo tu domain khac) truy cap API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Host thu muc frontend
app.mount("/static", StaticFiles(directory="static"), name="static")

# ---------------------------------------------------------
# Load Model & Scaler
# ---------------------------------------------------------
try:
    best_model = joblib.load('model.joblib')
    scaler = joblib.load('scaler.joblib')
    # List features theo dung thu tu huan luyen tren Notebook
    feature_names = [
        'PHQ9', 'GAD7', 'SleepHours', 'ExerciseFreq', 'SocialActivity', 'OnlineStress',
        'GPA', 'FamilySupport', 'ScreenTime', 'AcademicStress', 'DietQuality',
        'SelfEfficacy', 'PeerRelationship', 'FinancialStress', 'SleepQuality'
    ]
    print("Model va Scaler da duoc load thanh cong!")
except Exception as e:
    print(f"Loi load model: {e}")

# ---------------------------------------------------------
# Input Schema tu Frontend (React/Vue/Vanilla JS) len
# ---------------------------------------------------------
class SurveyData(BaseModel):
    # Lifestyle & Stress (Phase 1)
    SleepHours: float = Field(..., description="So gio ngu moi hinh")
    ExerciseFreq: float = Field(..., description="So ngay tap the duc moi tuan")
    SocialActivity: float = Field(..., description="Hoat dong xa hoi (0-10)")
    OnlineStress: float = Field(..., description="Ap luc mang xa hoi (0-10)")
    GPA: float = Field(..., description="Diem trung binh (vi du 3.0)")
    FamilySupport: float = Field(..., description="Su ho tro tu gia dinh (0-10)")
    ScreenTime: float = Field(..., description="Thoi gian dung may tinh/dien thoai")
    AcademicStress: float = Field(..., description="Ap luc hoc tap (0-10)")
    DietQuality: float = Field(..., description="Chat luong bieu an (0-10)")
    SelfEfficacy: float = Field(..., description="Niem tin vao ban than (0-10)")
    PeerRelationship: float = Field(..., description="Moi quan he ban be (0-10)")
    FinancialStress: float = Field(..., description="Ap luc tai chinh (0-10)")
    SleepQuality: float = Field(..., description="Chat luong giac ngu (0-10)")

    # PHQ-9 (Phase 2): 9 cau hoi, diem tu 0 den 3
    # 0 = Khong bao gio, 1 = Vai ngay, 2 = Hon nua so ngay, 3 = Gan nhu moi ngay
    phq1: int = Field(0, ge=0, le=3)
    phq2: int = Field(0, ge=0, le=3)
    phq3: int = Field(0, ge=0, le=3)
    phq4: int = Field(0, ge=0, le=3)
    phq5: int = Field(0, ge=0, le=3)
    phq6: int = Field(0, ge=0, le=3)
    phq7: int = Field(0, ge=0, le=3)
    phq8: int = Field(0, ge=0, le=3)
    phq9: int = Field(0, ge=0, le=3)

    # GAD-7 (Phase 3): 7 cau hoi, diem tu 0 den 3
    gad1: int = Field(0, ge=0, le=3)
    gad2: int = Field(0, ge=0, le=3)
    gad3: int = Field(0, ge=0, le=3)
    gad4: int = Field(0, ge=0, le=3)
    gad5: int = Field(0, ge=0, le=3)
    gad6: int = Field(0, ge=0, le=3)
    gad7: int = Field(0, ge=0, le=3)


# ---------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------
@app.get("/")
def read_root():
    return FileResponse("static/index.html")

@app.post("/predict")
def predict_mental_health(data: SurveyData):
    try:
        # 1. Tinh tong diem PHQ-9 va GAD-7
        phq9_total = sum([data.phq1, data.phq2, data.phq3, data.phq4, data.phq5, 
                          data.phq6, data.phq7, data.phq8, data.phq9])
        
        gad7_total = sum([data.gad1, data.gad2, data.gad3, data.gad4, 
                          data.gad5, data.gad6, data.gad7])

        # 2. Tao dictionary trung khop voi cac features luc Huan luyen
        input_dict = {
            'PHQ9': phq9_total,
            'GAD7': gad7_total,
            'SleepHours': data.SleepHours,
            'ExerciseFreq': data.ExerciseFreq,
            'SocialActivity': data.SocialActivity,
            'OnlineStress': data.OnlineStress,
            'GPA': data.GPA,
            'FamilySupport': data.FamilySupport,
            'ScreenTime': data.ScreenTime,
            'AcademicStress': data.AcademicStress,
            'DietQuality': data.DietQuality,
            'SelfEfficacy': data.SelfEfficacy,
            'PeerRelationship': data.PeerRelationship,
            'FinancialStress': data.FinancialStress,
            'SleepQuality': data.SleepQuality
        }

        # Chuyen thanh DataFrame (de Scaler khong bi loi ten cot neu can)
        input_df = pd.DataFrame([input_dict])

        # 3. Chuan hoa du lieu (Scale)
        input_scaled = scaler.transform(input_df)

        # 4. Du doan
        prediction = best_model.predict(input_scaled)     # => [0] hoac [1]
        
        # Tinh toan xac suat rui ro (neu model ho tro predict_proba)
        # Dung try/except vi co mo hinh nhu SVC khong luon bat probability=True
        confidence = 0.0
        try:
            probabilities = best_model.predict_proba(input_scaled)
            confidence = float(probabilities[0][prediction[0]]) * 100
        except:
            confidence = 100.0 # Default neu khong the lay xac suat

        status = int(prediction[0])
        
        # 5. Dua ra loi khuyen tuy chinh
        advice = "Sức khỏe tâm lý của bạn hiện tại khá ổn định. Hãy tiếp tục duy trì lối sống lành mạnh nhé!"
        if status == 1:
            advice = "Dựa trên bài test, bạn đang có một số dấu hiệu cảnh báo về sức khoẻ tâm lý. Lời khuyên là hãy tìm kiếm sự tư vấn từ chuyên gia tâm lý sớm nhất có thể."
        
        return JSONResponse(content={
            "status": "success",
            "prediction": status,
            "prediction_text": "CÓ VẤN ĐỀ" if status == 1 else "BÌNH THƯỜNG",
            "confidence": f"{confidence:.1f}%",
            "phq9_score": phq9_total,
            "gad7_score": gad7_total,
            "advice": advice
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Chay server local tren cong 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
