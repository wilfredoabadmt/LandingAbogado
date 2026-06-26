import sys
import os
import time

sys.path.insert(0, 'execution')

from github_manager import create_private_repo, grant_github_app_access, initialize_and_push
from coolify_manager import CoolifyManager
from dotenv import load_dotenv
import requests

load_dotenv()

REPO_NAME = "vladimir-mejia-website"
DESCRIPTION = "Sitio web futurista - Vladimir Mejía Abogado Derecho & Justicia"

print("=" * 60)
print("DEPLOY: Vladimir Mejía Abogado Website")
print("=" * 60)

# Paso 1: Crear repo en GitHub
print("\n[1/4] Creando repo privado en GitHub...")
result = create_private_repo(REPO_NAME, DESCRIPTION)
if not result:
    print("ERROR: No se pudo crear el repo")
    sys.exit(1)

owner, repo_name, repo_id = result

# Paso 2: Vincular GitHub App de Coolify
print("\n[2/4] Vinculando GitHub App de Coolify...")
COOLIFY_URL = os.getenv("COOLIFY_URL")
COOLIFY_TOKEN = os.getenv("COOLIFY_TOKEN")
coolify_h = {"Authorization": f"Bearer {COOLIFY_TOKEN}", "Accept": "application/json"}

github_apps = requests.get(f"{COOLIFY_URL}/api/v1/github-apps", headers=coolify_h).json()
private_apps = [a for a in github_apps if not a.get("is_public")]

if private_apps:
    installation_id = private_apps[0]["installation_id"]
    grant_github_app_access(repo_id, installation_id)
else:
    print("ADVERTENCIA: No se encontraron GitHub Apps privadas")
    print("Continuando sin vinculación automática...")

# Paso 3: Subir código
print("\n[3/4] Subiendo código a GitHub...")
initialize_and_push(repo_name, owner)

# Paso 4: Crear app en Coolify
print("\n[4/4] Creando aplicación en Coolify...")
manager = CoolifyManager()
ALIAS = REPO_NAME

app = manager.create_application(REPO_NAME, f"{owner}/{repo_name}")
if not app:
    print("ERROR: No se pudo crear la app en Coolify")
    sys.exit(1)

APP_UUID = app["uuid"]
print(f"App UUID: {APP_UUID}")

# Configurar aplicación
manager.configure_application(APP_UUID, ALIAS)

# Deploy
print("\nIniciando deploy...")
result = manager.deploy_application(APP_UUID)
if result:
    deployment_uuid = result["deployments"][0]["deployment_uuid"]
    print(f"Deploy UUID: {deployment_uuid}")
    
    print("\n" + "=" * 60)
    print("DEPLOY INICIADO EXITOSAMENTE")
    print("=" * 60)
    print(f"\nRepo: https://github.com/{owner}/{repo_name}")
    print(f"App UUID: {APP_UUID}")
    print(f"Deploy UUID: {deployment_uuid}")
    print(f"\nEl deploy tomará ~2-3 minutos en completarse.")
    print("Puedes verificar el estado en Coolify.")
else:
    print("ERROR: No se pudo iniciar el deploy")
    sys.exit(1)
