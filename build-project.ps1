npm run build
Copy-Item manifest.json dist\manifest.json -Force
New-Item -ItemType Directory -Force -Path dist\src 
Copy-Item src\content.js dist\src\content.js -Force
copy-item src\background.js dist\background.js -Force