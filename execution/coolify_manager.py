import os
import requests
import time
from dotenv import load_dotenv

load_dotenv()

COOLIFY_URL = os.getenv("COOLIFY_URL")
COOLIFY_TOKEN = os.getenv("COOLIFY_TOKEN")


class CoolifyManager:
    def __init__(self):
        self.base_url = COOLIFY_URL.rstrip("/")
        self.headers = {
            "Authorization": f"Bearer {COOLIFY_TOKEN}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    
    def create_application(self, name, git_repository, project_uuid=None):
        if not project_uuid:
            project_uuid = os.getenv("COOLIFY_PROJECT_UUID")
        
        data = {
            "name": name,
            "git_repository": git_repository,
            "git_branch": "main",
            "project_uuid": project_uuid,
            "fqdn": "",
            "source": {
                "type": "github_app"
            }
        }
        
        r = requests.post(
            f"{self.base_url}/api/v1/applications",
            headers=self.headers,
            json=data
        )
        
        if r.status_code in [200, 201]:
            result = r.json()
            print(f"App creada: {result.get('uuid')}")
            return result
        else:
            print(f"Error creando app: {r.status_code} - {r.text}")
            return None
    
    def configure_application(self, app_uuid, alias):
        # Configurar alias de red
        requests.patch(
            f"{self.base_url}/api/v1/applications/{app_uuid}",
            headers=self.headers,
            json={"custom_network_aliases": alias}
        )
        
        # Eliminar FQDN público
        requests.patch(
            f"{self.base_url}/api/v1/applications/{app_uuid}",
            headers=self.headers,
            json={"domains": ""}
        )
        
        # Configurar Dockerfile
        requests.patch(
            f"{self.base_url}/api/v1/applications/{app_uuid}",
            headers=self.headers,
            json={"dockerfile_location": "/Dockerfile"}
        )
        
        print(f"App configurada: alias={alias}, FQDN eliminado")
        return True
    
    def deploy_application(self, app_uuid):
        r = requests.get(
            f"{self.base_url}/api/v1/applications/{app_uuid}/deploy",
            headers=self.headers
        )
        
        if r.status_code in [200, 201]:
            result = r.json()
            print(f"Deploy iniciado: {result.get('deployments', [{}])[0].get('deployment_uuid')}")
            return result
        else:
            print(f"Error en deploy: {r.status_code} - {r.text}")
            return None
    
    def get_application(self, app_uuid):
        r = requests.get(
            f"{self.base_url}/api/v1/applications/{app_uuid}",
            headers=self.headers
        )
        
        if r.status_code == 200:
            return r.json()
        else:
            print(f"Error obteniendo app: {r.status_code} - {r.text}")
            return None
    
    def set_env_var(self, app_uuid, key, value):
        data = {
            "key": key,
            "value": value,
            "is_preview": False
        }
        
        r = requests.post(
            f"{self.base_url}/api/v1/applications/{app_uuid}/envs",
            headers=self.headers,
            json=data
        )
        
        if r.status_code in [200, 201]:
            print(f"Variable {key} configurada")
            return True
        else:
            print(f"Error configurando {key}: {r.status_code} - {r.text}")
            return False
