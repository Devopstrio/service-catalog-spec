from typing import List, Dict
from datetime import datetime

class LifecycleManager:
    """Tracks and enforces service lifecycle transitions."""
    
    VALID_TRANSITIONS = {
        "DRAFT": ["PROPOSED", "DEPRECATED"],
        "PROPOSED": ["ACTIVE", "REJECTED"],
        "ACTIVE": ["DEPRECATED"],
        "DEPRECATED": ["RETIRED"],
        "RETIRED": []
    }

    def transition(self, current_status: str, next_status: str) -> bool:
        return next_status in self.VALID_TRANSITIONS.get(current_status, [])

class GovernanceOrchestrator:
    """Handles approval workflows and ownership enforcement."""
    
    def request_approval(self, service_name: str, requested_by: str):
        return {
            "request_id": f"REQ-{datetime.now().strftime('%Y%m%d%H%M')}",
            "status": "PENDING_APPROVAL",
            "approvers": ["platform-leads", "security-arch"]
        }

class HealthStatusEngine:
    """Reports simulated health status for registered services."""
    
    def get_status(self, service_name: str) -> Dict:
        import random
        statuses = ["HEALTHY", "DEGRADED", "CRITICAL"]
        return {
            "service": service_name,
            "status": random.choice(statuses),
            "last_check": datetime.utcnow().isoformat()
        }
