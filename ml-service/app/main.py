from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import (
    SentimentRequest,
    SentimentResponse,
    BatchSentimentRequest,
    BatchSentimentResponse,
)
from app.predict import predict_sentiment

app = FastAPI(
    title="BrandPulse AI - ML Sentiment Service",
    description="High-performance sentiment analysis & aspect extraction microservice",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "service": "ml-service"}

@app.post("/predict", response_model=SentimentResponse, tags=["Inference"])
async def predict_single(payload: SentimentRequest):
    try:
        result = predict_sentiment(payload.text, model_type=payload.model_type or "bilstm")
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference error: {str(e)}"
        )

@app.post("/predict/batch", response_model=BatchSentimentResponse, tags=["Inference"])
async def predict_batch(payload: BatchSentimentRequest):
    results = []
    for item in payload.items:
        res = predict_sentiment(item.text, model_type=item.model_type or "bilstm")
        results.append(res)
    return {
        "results": results,
        "total_processed": len(results)
    }
