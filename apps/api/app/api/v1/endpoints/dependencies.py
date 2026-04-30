from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_dependencies():
    return {'status': 'ok', 'component': 'dependencies'}
