# D.Softworks — Deploy Script
# Ejecutar: ./deploy.ps1 (PowerShell) o bash deploy.sh (Linux/Mac)

Write-Host "🚀 Deploying D.Softworks to Netlify..." -ForegroundColor Cyan

# Check if netlify-cli is installed
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "⚠️  Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

# Deploy to Netlify
Write-Host "📦 Deploying to Netlify..." -ForegroundColor Green
netlify deploy --prod --dir=. --site=dsoftworks

Write-Host "✅ Deploy complete!" -ForegroundColor Green
Write-Host "🌐 Visit: https://dsoftworks.netlify.app" -ForegroundColor Cyan
