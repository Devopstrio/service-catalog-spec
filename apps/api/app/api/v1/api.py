from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, services, dependencies, metrics, documentation
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(dependencies.router, prefix="/dependencies", tags=["dependencies"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
api_router.include_router(documentation.router, prefix="/docs", tags=["documentation"])
