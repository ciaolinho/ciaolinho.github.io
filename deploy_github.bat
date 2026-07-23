@echo off
chcp 65001 >nul
echo ========================================================
echo   🚀 GitHub Pages 一鍵網頁發佈工具
echo ========================================================
echo.
echo 本工具將協助您將目前的教學儀表板與所有工具發佈到 GitHub Pages。
echo 發佈後的網址將是：https://ciaolinho.github.io/
echo.
echo ========================================================
echo.

echo [1/2] 正在準備提交最新檔案...
git add .
git commit -m "更新教學儀表板: %date% %time%" >nul 2>&1

echo.
echo --------------------------------------------------------
echo 提示：即將開始上傳至 GitHub。
echo 如果這是您第一次推送到此儲存庫：
echo 系統會跳出 Windows 瀏覽器視窗，請點擊【Sign in with your browser】授權即可。
echo --------------------------------------------------------
echo.

echo [2/2] 正在推送到 GitHub...
git push -u origin main --force

echo.
echo --------------------------------------------------------
echo 🎉 上傳成功！請稍候 1~2 分鐘讓 GitHub 處理部署，
echo 即可在瀏覽器開啟您的網站：https://ciaolinho.github.io/

echo --------------------------------------------------------
pause
