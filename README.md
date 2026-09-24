## 收尾文字構圖修訂
Good times. 置頂，Beautiful little things. 移至左下；原文不變。加深古銅色與細微奶油亮邊，闊螢幕保留至少 0.625 × 寬度的構圖高度，避免鐘框與標題重疊。手機使用獨立字級及下方入口。桌面及手機預覽通過，手機無橫向溢出，console 無 error/warning。

## 暖光收尾畫面更新
保留底部 Good times. / Beautiful little things.、標語、產品入口及頁尾功能。新增使用者提供的 closing-scene.png，以古銅襯線文字、細圈箭頭及手機／平板獨立裁圖呈現；首頁與第二幕未改動。

# Tile Time — Editorial 第二幕（2026-09-24）

本次沿用現有 HTML/CSS/JavaScript 與同一條產品影片，保留第一幕內容，將產品介紹融合成連續第二幕。沒有 React、TypeScript、Canvas 或 160 張 image sequence；沒有 npm build 步驟。

## 本次檔案
- index.html：同一 sticky Hero 內的第二幕 HTML，保留產品、選款、圖片放大、複製及 FAQ。
- scene.css：第二幕古銅金襯線標題、中央產品、底部簡介及 outline DISCOVER；桌面、手機、平板構圖。
- app.js：單一 rAF scroll timeline，影片與獨立 HTML 文字同步；降低動態效果及暫停時顯示完整靜態內容。
- entry.js / style.css / 產品 assets 保留；poster 統一為影片首格。

## 時間線
0–18% 第一幕；18–38% 過渡；38% 標題完整；36–46% 簡介出現；43–51% DISCOVER 出現；51–58% 第二幕全顯示。其後保留木框及指針介紹，最後進入產品 collection。
單一 scroll-desktop.mp4：10 秒、24fps、240 格，scroll 0–1 映射 0–9.958 秒。第二幕 38–58% 約 3.78–5.78 秒，零起算格索引約 90–138。並非 160 張圖片序列。
手機採相同影片與時間線以保持產品連續，捲動區為 310svh；其他尺寸 400svh。手機標題兩行，產品縮小保留完整鐘框，簡介在下方。既有導航保留實際產品入口，沒有新增不存在的 Services/Contact 頁面。

## 執行與交付
純靜態網站，於本資料夾執行 python3 -m http.server 8000 後開啟 http://localhost:8000。
上傳本資料夾完整內容至 Clock repository 根目錄，必須包含新增 scene.css，以及 index.html、app.js、style.css、entry.js、完整 assets/。
本次未發布線上網站。驗證結果見 VERIFICATION.md。

---
以下為舊版修改紀錄；目前行為以上述說明為準。

## 第二節固定展示修訂
產品改為固定尺寸及位置，取消 scroll scale / rotate / translate；桌面以 Grid 對齊產品、文字及 CTA，保留文字淡入淡出，捲動區縮至 230svh。手機與矮螢幕採正常內容流，依次顯示全部介紹。
已實測 1440×900、390×844 排版，產品 transform=none，無橫向 overflow；手機三段介紹均無 aria-hidden，console 無錯誤。動畫及開頁位置回歸測試通過。第一屏影片未修改。

## 開頁位置修正

新增 entry.js，在 HTML 解析前取消入口 hash 並停用瀏覽器捲動位置恢復。重新開頁／刷新及快取返回都從頂部開始；頁內導覽維持正常，載入中已開始的使用者操作不會被 pageshow 重設。

已實測桌面 1440×900：#details 頁內導覽正常，刷新後 hash 清空、scrollY=0、影片 time=0 且暫停。手機 390×844 帶 #details 開頁亦為 scrollY=0，使用原手機影片。Console 無 error/warning。入口回歸與動畫回歸測試通過。

部署必須包含新 entry.js 及更新 index.html。網站尚未自動發布。

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

