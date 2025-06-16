# PaisaStripes Web Beta Deployment Script
Write-Host "PaisaStripes Web Beta Deployment Script" -ForegroundColor Green
Write-Host "This script will help you deploy the web version to GitHub Pages." -ForegroundColor Yellow

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "Git is installed." -ForegroundColor Green
}
catch {
    Write-Host "Git is not installed. Please install Git from https://git-scm.com/downloads" -ForegroundColor Red
    exit 1
}

# Initialize git repository if it doesn't exist
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Create .gitignore file
$gitignoreContent = @"
# Dependencies
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
"@

Set-Content -Path .gitignore -Value $gitignoreContent
Write-Host "Created .gitignore file." -ForegroundColor Green

# Create .nojekyll file for GitHub Pages
"" | Out-File -FilePath .nojekyll -Encoding ASCII
Write-Host "Created .nojekyll file for GitHub Pages." -ForegroundColor Green

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit"

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub named 'paisastripes-beta'" -ForegroundColor White
Write-Host "   - Make sure to make it public" -ForegroundColor White
Write-Host "   - Do NOT initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host "`n2. Run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/paisastripes-beta.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host "`n3. Go to repository settings on GitHub:" -ForegroundColor White
Write-Host "   - Click on 'Settings'" -ForegroundColor White
Write-Host "   - Scroll down to 'GitHub Pages' section" -ForegroundColor White
Write-Host "   - Under 'Source', select 'Deploy from a branch'" -ForegroundColor White
Write-Host "   - Under 'Branch', select 'main' and '/ (root)'" -ForegroundColor White
Write-Host "   - Click 'Save'" -ForegroundColor White
Write-Host "`n4. Wait a few minutes for GitHub Pages to deploy your site" -ForegroundColor White
Write-Host "5. Your site will be available at https://YOUR_USERNAME.github.io/paisastripes-beta" -ForegroundColor White 