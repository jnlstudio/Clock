# 第二幕驗證 — 2026-09-24

- JavaScript 語法檢查通過，靜態網站可由本機 HTTP 啟動；不適用 TypeScript/npm build。
- 瀏覽器實測：1440×900 桌面、390×844 手機、820×1180 平板直向、1180×820 平板橫向。
- 修正手機首幕窄欄斷行、第二幕產品裁切、DISCOVER 繼承實心按鈕、桌面標題與產品間距。
- 平板與手機橫向 overflow 為 false；測試期間 CLS=0；瀏覽器無 error/warning。
- 方/圓選款、圓款圖片視窗開關、複製圓款資料、FAQ 展開實測通過。
- 暫停動態效果後三段介紹皆可見；prefers-reduced-motion 啟動/切換、首格/中段/尾格 mapping、媒體失敗 poster、開頁回頂及頁內 hash 導航通過模擬環境回歸測試。
- 首幕→第二幕只使用一個 video，沒有重複產品或 Canvas。前後捲動 seek 原片，這版不是自動循環播放。
- 跨裝置為瀏覽器尺寸模擬，未宣稱實體 iPad/iPhone Safari 已實測。影片解碼速度仍視裝置及網路而定。
- 不存在 Git 工作樹，修改前備份位於工作目錄 work/before-editorial-scene。
