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

## 影片來源與限制

原始 `clock-desktop.mp4`、`clock-mobile.mp4` 完整保留，未覆寫。原片有燒入文字、圖形且首尾不連續，故不再直接作背景輪播。

`hero-desktop.*` 及 `hero-mobile.*` 是從直版原片約 2.35–2.72 秒的乾淨產品畫面裁切、放慢，再正反接合而成的約 4.5 秒網站循環。兩組使用同一乾淨來源，CSS 分別處理桌面及手機構圖。沒有新增影片文字、Logo 或圖形，也沒有重新生成產品。

WebM VP9 優先，MP4 H.264 備援；每個 WebM 約 344 KB、MP4 約 721 KB。原始影片裁切後約 720×780，因此大螢幕無法增加原素材沒有的細節。若日後有高解像無字版，可替換同名素材。

## 驗證

詳見 `VERIFICATION.md`。已實際瀏覽器檢查多種 viewport 及主要功能；reduced-motion 與影片格式失敗備援另以模擬測試檢查，並非真機 Safari／iOS 的全面相容認證。

## 最新修訂：全景動畫背景
首頁改用 scene-desktop / scene-mobile 素材，整個 hero 由不透明影片鋪滿，不再使用 CSS mask、羽化、透出或漸層遮罩。文字與導覽按場景留白排版，襯線標題及按鈕配合暖色影片。桌面由橫版原片裁去上方字幕；手機由直版產品鏡頭加入暖色上下留白，保留独立 HTML 文字空間。直向平板使用直向場景。原始影片內既有細節未重新生成。
仍保留正反接合短循環、WebM 優先及 MP4 備援。原有 hero-* 素材留作前版備份，新版使用 scene-*。部署必須上傳新 scene assets 及三個程式檔。
