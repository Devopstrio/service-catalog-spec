from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_documentation():
    return {'status': 'ok', 'component': 'documentation'}
