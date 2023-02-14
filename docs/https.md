# How to setup HTTPS using Caddy


*by Scott Hanson @ScottHansonDE*

[Caddy](https://caddyserver.com/) is a very easy way to implement HTTPS for node apps. It is a web server that can do 
[automatic HTTPS](https://caddyserver.com/docs/automatic-https), automatically provisioning TLS certificates 
(from [Let's Encrypt](https://letsencrypt.org/)) for a domain and keeping them renewed. 

## Assumptions 

- FeedLand is running on an Ubuntu server with DNS is set up for `feedland.example.com`
- `"port": 1452` and `"websocketPort": 1462` in config.json
- `"urlWebsocketServerForClient": "wss://feedland.example.com/"` in config.json
- Ports 80 and 443 are open to the internet
- There is no TLS certificate for `feedland.example.com`

## How to

1. Install the official Caddy package for Ubuntu [per their instructions](https://caddyserver.com/docs/install#debian-ubuntu-raspbian). This automatically starts and runs Caddy as a systemd service.
 
1. Open the Caddy configuration file in the nano editor with `sudo nano /etc/caddy/Caddyfile`

1. Replace the entire contents with: 

   ```
   https://feedland.example.com/ {
        @websockets {
                header Connection *Upgrade*
                header Upgrade    websocket
        }
        reverse_proxy @websockets localhost:1462
        reverse_proxy localhost:1452
   }
   ```

1. Restart the Caddy service with `sudo systemctl reload caddy`

1. Open `https://feedland.example.com/` in your browser. This first request will take a few seconds for Caddy to request and obtain a certificate from Let's Encrypt. 

## What this does

- `http://feedland.example.com/` will redirect to `https://feedland.example.com/`
- The browser will send websocket requests to `wss://feedland.example.com/`, Port 443 by default, which are decrypted and redirected to the app at`localhost:1462`
- `https://feedland.example.com/` is decrypted and redirected to the app at`localhost:1452`
