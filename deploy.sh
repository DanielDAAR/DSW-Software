#!/bin/bash
# D.Softworks — Deploy Script for Linux/Mac

echo "🚀 Deploying D.Softworks to Netlify..."

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
    echo "⚠️  Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "📦 Deploying to Netlify..."
netlify deploy --prod --dir=. --site=dsoftworks

echo "✅ Deploy complete!"
echo "🌐 Visit: https://danielsoftworks.netlify.app"
