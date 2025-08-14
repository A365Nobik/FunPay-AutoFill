# 🚀 Сборка расширения FunPay Auto Fill
Write-Host "Начинаю сборку расширения..." -ForegroundColor Cyan

# Очистка предыдущей сборки
if (Test-Path "dist") {
    Write-Host "Очищаю папку dist..." -ForegroundColor Yellow
    Remove-Item "dist" -Recurse -Force
}

# Сборка проекта
Write-Host "Запускаю npm run build..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка сборки!" -ForegroundColor Red
    exit 1
}

# Копирование файлов
Write-Host "Копирую файлы..." -ForegroundColor Green

# Копируем manifest.json
Copy-Item "manifest.json" "dist\manifest.json" -Force
Write-Host "✅ manifest.json скопирован" -ForegroundColor Green

# Копируем background.js в корень dist
Copy-Item "src\background.js" "dist\background.js" -Force
Write-Host "✅ background.js скопирован" -ForegroundColor Green

# Создаем папку src в dist
New-Item -ItemType Directory -Force -Path "dist\src" | Out-Null

# Копируем content.js
Copy-Item "src\content.js" "dist\src\content.js" -Force
Write-Host "✅ content.js скопирован" -ForegroundColor Green

# Проверяем структуру
Write-Host "`n📁 Структура папки dist:" -ForegroundColor Cyan
Get-ChildItem "dist" -Recurse | ForEach-Object {
    $indent = "  " * ($_.FullName.Split('\').Count - $_.FullName.Split('\')[0].Split('\').Count)
    Write-Host "$indent📄 $($_.Name)" -ForegroundColor White
}

Write-Host "`n🎉 Сборка завершена успешно!" -ForegroundColor Green
Write-Host "📦 Расширение готово к загрузке из папки dist" -ForegroundColor Cyan
Write-Host "💡 Не забудьте перезагрузить расширение в браузере" -ForegroundColor Yellow
