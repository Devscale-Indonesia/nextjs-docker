# CI/CD Pipeline Setup

```yml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Install sshpass
        run: sudo apt-get install -y sshpass

      - name: Deploy to server
        env:
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
          SERVER_PASSWORD: ${{ secrets.SERVER_PASSWORD }}
        run: |
          sshpass -p "${SERVER_PASSWORD}" ssh -o StrictHostKeyChecking=no -T ${SERVER_USER}@${SERVER_HOST} << 'EOF'
            docker pull ${{ secrets.DOCKER_USERNAME }}/nextjsdocker:latest
            cd nextjsdocker
            git pull origin main
            docker-compose down
            docker-compose -f docker-compose.prod.yml up --build -d
          EOF
```
