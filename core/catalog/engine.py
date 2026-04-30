import uuid
import json
from typing import List, Dict, Any, Optional
from datetime import datetime

class ServiceCatalogEngine:
    """Manages the lifecycle and metadata of platform services."""
    
    def __init__(self):
        self.services = {}

    def define_service(self, name: str, version: str, owner: str, metadata: Dict[str, Any]) -> str:
        service_id = str(uuid.uuid4())
        self.services[service_id] = {
            "id": service_id,
            "name": name,
            "version": version,
            "owner": owner,
            "metadata": metadata,
            "lifecycle": "DRAFT",
            "created_at": datetime.utcnow().isoformat(),
            "dependencies": metadata.get("dependencies", [])
        }
        return service_id

    def list_services(self) -> List[Dict]:
        return list(self.services.values())

class SpecValidationEngine:
    """Validates service specifications against schemas and policies."""
    
    def validate_spec(self, spec: Dict[str, Any]) -> Dict[str, Any]:
        required_fields = ["name", "version", "owner"]
        errors = []
        
        for field in required_fields:
            if field not in spec:
                errors.append(f"Missing required field: {field}")
        
        # Policy: Owners must be valid team aliases (simulated)
        if "owner" in spec and not spec["owner"].startswith("team-"):
            errors.append("Invalid owner: must be a 'team-' alias.")
            
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "timestamp": datetime.utcnow().isoformat()
        }

class DependencyMappingEngine:
    """Maps and analyzes service dependencies."""
    
    def get_dependency_graph(self, services: List[Dict]) -> Dict:
        nodes = []
        edges = []
        
        for s in services:
            nodes.append({"id": s["name"], "type": "service"})
            for dep in s.get("dependencies", []):
                edges.append({"source": s["name"], "target": dep})
                
        return {"nodes": nodes, "links": edges}

class DocumentationEngine:
    """Auto-generates technical documentation from service specs."""
    
    def generate_readme(self, service_spec: Dict) -> str:
        return f"""
# Service: {service_spec['name']} (v{service_spec['version']})
**Owner:** {service_spec['owner']}
**Lifecycle:** {service_spec['lifecycle']}

## Metadata
{json.dumps(service_spec.get('metadata', {}), indent=2)}

## Dependencies
{', '.join(service_spec.get('dependencies', [])) or 'None'}
"""

if __name__ == "__main__":
    catalog = ServiceCatalogEngine()
    validator = SpecValidationEngine()
    mapper = DependencyMappingEngine()
    
    # 1. Define Service
    s_id = catalog.define_service(
        name="payment-gateway",
        version="1.2.0",
        owner="team-fintech",
        metadata={"dependencies": ["auth-service", "ledger-db"]}
    )
    
    print(f"--- Service Catalog Intelligence ---")
    print(f"Defined service: payment-gateway (ID: {s_id})")
    
    # 2. Validate
    result = validator.validate_spec(catalog.services[s_id])
    print(f"Validation Result: {'PASS' if result['valid'] else 'FAIL'}")
    
    # 3. Map Dependencies
    graph = mapper.get_dependency_graph(catalog.list_services())
    print(f"Dependency Links: {len(graph['links'])}")
