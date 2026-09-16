# Deploy Manual a Netlify

## Opción 1: Drag & Drop (Más rápido)

1. Ve a https://app.netlify.com
2. Selecciona o crea tu sitio
3. Ve a "Deploys"
4. Arrastra la carpeta `DSW-Software` completa al área de deploy
5. Espera a que termine

## Opción 2: Desde GitHub (Automático)

1. Ve a https://app.netlify.com
2. Haz clic en "Add new site" → "Import an existing project"
3. Selecciona "GitHub"
4. Busca "DSW-Software"
5. Configura:
   - Branch: main
   - Build command: (dejar vacío)
   - Publish directory: .
6. Haz clic en "Deploy site"

## Opción 3: Usando el token

```powershell
# Configurar token
$env:NETLIFY_AUTH_TOKEN = "nfp_9SNmTSmTdc8wLRoiUbYqLuYKY8qyMnB552ea"

# Deploy
netlify deploy --prod --dir=. --site=dsoftworks
```

## URL del sitio
https://dsoftworks.netlify.app
