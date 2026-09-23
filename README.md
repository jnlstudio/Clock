# Tile Time — Cinematic Product Experience

JNL Studio 現有產品網站的視覺與動畫升級。保留英文品牌內容、方形／圓形產品介紹、款式切換、圖片放大、複製資料及 FAQ。未加入未確認的價格、物料規格或交易功能。

## 開啟及部署

純 HTML / CSS / JavaScript，沒有 React、Next.js、套件安裝或編譯步驟。

在此資料夾執行 `python3 -m http.server 8000`，開啟 http://localhost:8000。

部署至現有 GitHub `Clock` repository：將此資料夾內的 `index.html`、`style.css`、`app.js` 及完整 `assets/` 放到 repository 根目錄，覆蓋同名檔案。不要將外層 tile-time 資料夾或 ZIP 本身當成首頁上傳。

線上網址：https://jnlstudio.github.io/Clock/ （C 大寫）。本交付未代為推送或更改線上網站。

## 已完成

- 暖米色完整動畫背景、深綠 HTML 文字及 CTA、接近滿屏 Hero、無播放器工具列。
- Hero 影片與 poster 疊在同一固定尺寸容器，播放只淡入影片，不改版面。
- 約 270svh 的桌面 sticky 產品故事：輕微放大／移位／旋轉，結尾回復完整形態。
- 手機縮短為 190svh，減少位移及放大；平板直向另設構圖。
- 動畫使用 transform / opacity、requestAnimationFrame、IntersectionObserver；不引入動畫庫、不攔截原生捲動。
- Footer 的 Pause motion 可停用影片及捲動動畫；系統 reduced-motion 優先，完整顯示所有產品說明。
- 影片離開視野、分頁隱藏或開啟圖片 dialog 時暫停；回到畫面恢復。

## 電腦版捲動影片（最新）

電腦版已換成使用者提供的 v3clockvideo.mp4，輸出 scroll-desktop.mp4（10 秒、1280×720、24fps、每 6 格關鍵格，移除音訊）。首次停留第一格，原生捲動進度控制影片時間；300svh 容器內固定一屏，推進至最後一格後自然離開。向上捲動可回看，沒有 wheel 攔截或強迫跳頁。為跨瀏覽器 seek 相容性，此影片使用 H.264 MP4。

手機及直向平板仍用原有正常循環影片。Reduced motion／Pause motion 會取消長捲動區及影片推進，保留完整內容。

部署請包含新的 scroll-desktop.mp4、scroll-desktop-poster.jpg 及三個程式檔。

## 手機影片來源與限制

原始 `clock-desktop.mp4`、`clock-mobile.mp4` 完整保留，未覆寫。

手機目前使用 `normal-mobile.*`：24fps、1×正常順向播放，取消短片段放慢及正反循環。原片頭尾約半秒交疊，輸出每輪 9.5 秒；以原生 loop 播放，沒有 JavaScript 逐格 seek。WebM VP9 優先、MP4 H.264 備援，提供 JPG poster。

保留現有桌面裁切及手機留白構圖。完整原片本來有燒入英文文字／圖形，部分鏡頭仍可見，可能與 HTML 文字重疊。要同時保留完整鏡頭、正常速度及完全無字背景，需要供應無字幕原片；本次未聲稱移除原片字幕。

舊 `hero-*` / `scene-*` 僅留作備份，頁面已不引用。部署須包含新增的 `normal-*` 素材、index.html、app.js。

## 驗證

詳見 `VERIFICATION.md`。已實際瀏覽器檢查多種 viewport 及主要功能；reduced-motion 與影片格式失敗備援另以模擬測試檢查，並非真機 Safari／iOS 的全面相容認證。

