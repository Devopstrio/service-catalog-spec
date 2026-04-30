import sys
import argparse
from core.catalog.engine import ServiceCatalogEngine, SpecValidationEngine, DependencyMappingEngine

def run_catalog_simulation():
    # 1. Initialize Engines
    catalog = ServiceCatalogEngine()
    validator = SpecValidationEngine()
    mapper = DependencyMappingEngine()
    
    print("--- Service Catalog Specification Simulation ---")
    
    # 2. Register Services
    s1_id = catalog.define_service(
        name="payment-gateway",
        version="1.2.0",
        owner="team-fintech",
        metadata={"dependencies": ["auth-service", "ledger-db"]}
    )
    
    s2_id = catalog.define_service(
        name="auth-service",
        version="0.9.0",
        owner="team-iam",
        metadata={"dependencies": ["user-db"]}
    )
    
    print(f"Registered {len(catalog.list_services())} services in the registry.")
    
    # 3. Validate Spec
    bad_spec = {"name": "orphaned-service", "version": "1.0", "owner": "rogue-dev"}
    v_result = validator.validate_spec(bad_spec)
    print(f"\n[VALIDATE] Orphaned Service Result: {'PASS' if v_result['valid'] else 'FAIL'}")
    if v_result['errors']:
        print(f"Errors: {v_result['errors']}")
        
    # 4. Analyze Dependencies
    graph = mapper.get_dependency_graph(catalog.list_services())
    print(f"\n[GRAPH] Service Dependencies mapped: {len(graph['links'])} edges detected.")
    for link in graph['links']:
        print(f"-> {link['source']} depends on {link['target']}")

if __name__ == "__main__":
    run_catalog_simulation()
