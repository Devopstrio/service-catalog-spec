module "catalog_db" {
  source = "./modules/database"

  db_name = "service_catalog_metadata"
}

module "catalog_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "catalog_monitoring" {
  source = "./modules/monitoring"

  retention_days = 90
}

resource "kubernetes_namespace" "catalog_system" {
  metadata {
    name = "platform-catalog"
    labels = {
      "platform.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "catalog_configs" {
  metadata {
    name      = "catalog-engine-configs"
    namespace = kubernetes_namespace.catalog_system.metadata[0].name
  }

  data = {
    "validation-mode" = "STRICT"
    "schema-version"  = "v1.2"
    "cache-ttl"       = "3600"
  }
}
