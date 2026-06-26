import os
import requests
import subprocess
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
COOLIFY_URL = os.getenv("COOLIFY_URL")
COOLIFY_TOKEN = os.getenv("COOLIFY_TOKEN")


def create_private_repo(repo_name, description=""):
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    data = {
        "name": repo_name,
        "description": description,
        "private": True,
        "auto_init": False
    }
    
    r = requests.post("https://api.github.com/user/repos", headers=headers, json=data)
    
    if r.status_code == 201:
        result = r.json()
        owner = result["owner"]["login"]
        repo_id = result["id"]
        print(f"Repo creado: {owner}/{repo_name} (ID: {repo_id})")
        return owner, repo_name, repo_id
    else:
        print(f"Error creando repo: {r.status_code} - {r.text}")
        return None


def grant_github_app_access(repo_id, installation_id):
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    data = {
        "repositories": ["*"]
    }
    
    url = f"https://api.github.com/user/installations/{installation_id}/repositories/{repo_id}"
    r = requests.put(url, headers=headers, json=data)
    
    if r.status_code in [200, 204]:
        print(f"Acceso concedido al repo {repo_id}")
        return True
    else:
        print(f"Error concediendo acceso: {r.status_code} - {r.text}")
        return False


def initialize_and_push(repo_name, owner, local_path="."):
    os.chdir(local_path)
    
    # Check if git repo already exists
    result = subprocess.run(["git", "status"], capture_output=True, text=True)
    if result.returncode != 0:
        subprocess.run(["git", "init"], check=True)
    
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Initial commit"], check=True)
    subprocess.run(["git", "branch", "-M", "main"], check=True)
    
    # Try to add remote, if it exists just push
    remote_result = subprocess.run(["git", "remote"], capture_output=True, text=True)
    if "origin" not in remote_result.stdout:
        subprocess.run(["git", "remote", "add", "origin", f"https://{GITHUB_TOKEN}@github.com/{owner}/{repo_name}.git"], check=True)
    
    subprocess.run(["git", "push", "-u", "origin", "main"], check=True)
    
    print(f" Código subido a github.com/{owner}/{repo_name}")
    return True
