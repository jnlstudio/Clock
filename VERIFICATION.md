## 2026-10-04 — Completed design information

Replaced the eight unconfirmed specification placeholders with six visually supported design attributes: silhouettes, wood-tone frame appearance, floral face, palette, gold-tone hands and four hour accents. Renamed the eyebrow to DESIGN AT A GLANCE and removed the unfinished-status introduction. No estimated dimensions, weight, movement, power or mounting claims were published. Desktop and mobile browser layout inspected; mobile has no horizontal overflow. Opening, closing, CSS and JavaScript unchanged in this update. Not deployed.

## Comparison interaction refinement

The product image viewer now offers a direct Choose action for the currently displayed design. Selection synchronizes with the choice section, closes the dialog, returns keyboard focus to the selected shape and scrolls to its details. Existing reduced-motion behavior is respected.

Browser checks at 390×844 and 1440×900 passed: next/previous and arrow-key comparison, selection synchronization, dialog dismissal, focus return and no horizontal overflow. No console errors observed. JavaScript syntax and mocked motion/entry regression checks passed. Opening and closing visuals remain unchanged. No awards certification or claim of universal device testing; no publication performed.

## Final visual and interaction polish — 2026-10-03

Balanced editorial heading wrapping; narrow-phone shape choices become two full-width text controls so arrows do not wrap alone. Desktop image labels appear on hover or keyboard focus; touch devices retain the visible cue. Middle controls have consistent visible keyboard focus, and reduced-motion disables the new label transitions. Added actual image dimensions and corrected responsive source width descriptors. No new library or changes to opening/closing content.

Browser recheck at 320×740 and 1440×900: no horizontal overflow, images sized correctly, Round selection updates, no observed console errors/warnings. Previous tablet/mobile checks remain applicable; no actual iPad/iPhone Safari hardware certification. JavaScript syntax plus mocked entry/motion regressions pass. Awards are an art-direction reference, not a claimed award or certification. No publication performed.

# Product story update — 2026-10-03

The existing opening animation, closing visual and app.js are unchanged (byte/section comparison against the pre-edit backup). Only the middle content and scoped middle.css were rebuilt.

Sequence: introduction; large Square/Round comparison; three photographic detail stories; two existing lifestyle photographs; specifications; product choice. Existing FAQ, selection, copy-details and gallery functions remain.

All eight unverified specification fields say “To be confirmed”. Material descriptions refer only to wood-tone/gold-tone appearance. Lifestyle photographs show each design separately; no invented combined photograph or product measurement is used.

Below-fold photography uses local WebP derivatives, responsive sources where appropriate, lazy loading and CSS aspect ratios. No dependencies were added.

Validation: JavaScript syntax check passed. Existing mocked motion and entry-navigation regression checks passed. Browser inspection at 1440×900, 834×1112, 390×844 and 375×812 found no horizontal overflow; tested Square/Round selection, Explore navigation, gallery opening and Escape dismissal. No console warnings/errors were observed. Original opening/closing source preservation verified; this is not an actual-device Safari certification or a measured Lighthouse/CLS score.

This is a static site with no React/TypeScript compilation or npm build step. Relative asset references and duplicate IDs checked. Ready for the existing GitHub Pages file deployment; not uploaded or published by this update.

## 頁尾兩側色帶修正
footer 外邊距改為同寬內留白，暖米色背景覆蓋全闊。桌面1440px及手機390px實測：左界0、右界等於viewport，手機無橫向溢出；內容留白仍為原86.4px／24px。

## 2026-09-25 中段精簡
新增 middle.css，只作用 collection、內嵌選款及 FAQ。兩款產品並排；移除獨立選款大圖，保留選款、放大與複製。收緊留白、統一古銅襯線字型。首尾 HTML、scene.css 和影片捲動時間線保持不變，已逐段比較確認。桌面1440×900與手機390×844預覽、款式切換、圖片視窗、複製和FAQ通過；無橫向溢出及console錯誤。動畫與入口回歸測試通過，靜態網站毋須編譯。上傳時包含新增 middle.css。

## 收尾文字構圖修訂
Good times. 置頂，Beautiful little things. 移至左下；原文不變。加深古銅色與細微奶油亮邊，闊螢幕保留至少 0.625 × 寬度的構圖高度，避免鐘框與標題重疊。手機使用獨立字級及下方入口。桌面及手機預覽通過，手機無橫向溢出，console 無 error/warning。

## 收尾畫面檢查
1440×900、390×844、820×1180 瀏覽器尺寸檢查；背景載入正常，手機和平板無橫向溢出，產品入口維持 #collection。只修改 index.html、scene.css 並新增背景資產，app.js 未改動。

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
