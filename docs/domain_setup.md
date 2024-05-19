# Setup Domain

```bash
sudo apt update
sudo apt install nginx
```

```bash
sudo vim /etc/nginx/sites-available/sub.domain.com
```

```bash
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/sub.domain.com /etc/nginx/sites-enabled/
```

```bash
sudo nginx -t
```

```bash
sudo systemctl restart nginx
```

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

```bash
sudo certbot --nginx -d yourdomain.com
```

```bash
sudo nginx -t
```

```bash
sudo systemctl restart nginx
```
