# BrandPulse AI Documentation

Welcome to the documentation for **BrandPulse AI**, an end-to-end brand sentiment analysis and aspect-based monitoring platform.

## Architecture Overview

```
BrandPulse AI
├── Frontend: React + Vite + Modern Dashboard UI
├── Backend: Node.js + Express + Prisma ORM
├── ML Service: FastAPI + PyTorch / Scikit-learn (ML, CNN, BiLSTM)
├── Database: PostgreSQL (Relational + JSONB for aspect data)
└── Deployment: Docker & Docker Compose
```

## System Components

1. **Frontend (`/frontend`)**:
   - Modern React single-page application.
   - Real-time sentiment breakdown, aspect extraction visualizations, and brand analytics.

2. **Backend API (`/backend`)**:
   - Express REST API.
   - Prisma ORM managing brand catalogs and sentiment event logging.
   - Bridges user requests with ML inference pipelines.

3. **Machine Learning Service (`/ml-service`)**:
   - High-throughput FastAPI inference server.
   - Aspect-Based Sentiment Analysis (ABSA).
   - Training scripts for Classical ML (TF-IDF + Classifiers), TextCNN, and BiLSTM architectures.
