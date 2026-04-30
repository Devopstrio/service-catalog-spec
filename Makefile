.PHONY: help build up down test lint migrate validate-spec generate-docs

help:
	@echo "Service Catalog Spec - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "validate-spec      : Run spec validation engine"
	@echo "generate-docs      : Auto-generate service documentation"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

validate-spec:
	docker-compose exec api python scripts/validate/run.py

generate-docs:
	docker-compose exec api python scripts/generate/docs.py
