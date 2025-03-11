#!/bin/bash

# Create build directory
echo "Creating build directory..."
mkdir -p dist/public/assets

# Copy static files
echo "Copying static files..."
cp index.html 404.html dist/public/
cp test.html dist/public/ 2>/dev/null || echo "No test.html found"

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d dist/public

echo "Deployment complete! Your site should be available at https://rsplitstone.github.io/rep1/" 