## 手機古銅金文字

手機 Hero 及頂部導覽採深古銅金，標題稍微縮小並上移，輕微亮色字邊陰影；未加影片遮罩。prefers-contrast:more 加深字色。390×844 視覺檢查、320×667 無橫向 overflow；1440×900 標題仍為原深綠 rgb(40,59,50)。影片動態背景對比會隨鏡頭變化，未宣稱逐格符合 WCAG 對比標準。

## 手機全屏背景更新

手機改用 v3 乾淨產品影片衍生的 full-mobile.mp4/webm（正常順向循環，約半秒頭尾交疊），保留完整場景作 cover 背景，沒有原先人工加入的上下留白。無遮罩、羽化、透明邊緣或調暗 filter。暖色場景，深綠襯線標題在上、簡介在下，CTA 使用頂部產品導覽。手機是產品近鏡構圖，cover 會裁去部分左右畫面。桌面與直向平板素材不變。

已視覺檢查 390×844，320×667 無橫向 overflow；1440×900 確認仍使用 scroll-desktop.mp4 且初始暫停，console 無錯誤。動畫模擬回歸通過。部署需包含新增 full-mobile 三個素材。

## 手機首頁按鈕修正

700px 以下隱藏 Hero 的 Meet the collection 大按鈕，保留頂部 The collection 導覽。已於 390×844 確認大按鈕不可見、頂部入口可見，並視覺確認影片不再被按鈕遮擋；1440×900 電腦版按鈕仍可見。CSS 快取版本更新為 v10。

## 第二節固定展示修訂
產品改為固定尺寸及位置，取消 scroll scale / rotate / translate；桌面以 Grid 對齊產品、文字及 CTA，保留文字淡入淡出，捲動區縮至 230svh。手機與矮螢幕採正常內容流，依次顯示全部介紹。
已實測 1440×900、390×844 排版，產品 transform=none，無橫向 overflow；手機三段介紹均無 aria-hidden，console 無錯誤。動畫及開頁位置回歸測試通過。第一屏影片未修改。

## 開頁位置修正

新增 entry.js，在 HTML 解析前取消入口 hash 並停用瀏覽器捲動位置恢復。重新開頁／刷新及快取返回都從頂部開始；頁內導覽維持正常，載入中已開始的使用者操作不會被 pageshow 重設。

已實測桌面 1440×900：#details 頁內導覽正常，刷新後 hash 清空、scrollY=0、影片 time=0 且暫停。手機 390×844 帶 #details 開頁亦為 scrollY=0，使用原手機影片。Console 無 error/warning。入口回歸與動畫回歸測試通過。

部署必須包含新 entry.js 及更新 index.html。網站尚未自動發布。

# 捲動影片最新驗證

- 電腦 1440×900：首次 currentTime=0、paused=true。向下捲動中段 currentTime=6.060752，Hero top=0；停止捲動後時間不變。越過播放區後 currentTime=9.958333，下一節進入畫面。
- 桌面無橫向 overflow、觀察到 CLS=0、console error/warning 為空。
- 手機 390×844：normal-mobile.webm、loop=true，scroll-film=false，無橫向 overflow。
- JavaScript 語法及模擬測試通過：初始停格、中段／尾格 seek、reduced-motion、暫停恢復、素材切換及故事字幕。
- 靜態網站無需 build。保留原有款式選擇、圖片 dialog、FAQ、複製功能程式。
- 實體裝置／Safari seek 效能未實測。尚未部署 GitHub。

以下為歷史記錄，桌面正常循環已由捲動播放取代。

# 最新播放修訂驗證（2026-09-23）

- 使用原片正常 1× 順向播放，頭尾約半秒交疊；沒有放慢、倒播或 scroll seeking。
- 四個新影片為 228 frames / 24fps / 9.5 秒，完整解碼，沒有黑格。
- 瀏覽器桌面及 390×844 手機確認使用 normal-desktop / normal-mobile WebM，playbackRate=1、paused=false、loop 多次增加。
- 兩尺寸檢查無橫向 overflow，觀察到 CLS=0；console error / warning 為空。
- JavaScript 語法通過。模擬回歸：reduced-motion、Pause/Resume、WebM→MP4、錯誤 poster、手機選片、story captions 不疊字全部通過。
- 保留 CSS 排版與原有產品功能。既有功能驗證記錄見下方歷史記錄。
- 原片內嵌字幕仍可見，是已知素材限制；無字完整背景需求尚需無字幕版本原片。
- 此次未量測真機掉幀、Safari 或慢網絡。瀏覽器測試工具未提供可讀取的 getVideoPlaybackQuality 方法，不能聲稱掉幀為零。
- 本機及 ZIP 已更新，未發布 GitHub。

---

以下為前版歷史驗證，當中的 4.5 秒／正反影片數據已由上述 9.5 秒正常播放版本取代。

# 驗證記錄 — 2026-09-23

## 專案狀態

已讀取及核對原有 HTML / CSS / JavaScript、sections、圖片、影片、導覽、字體、互動。保留原生靜態技術棧。修改檔案為 index.html、style.css、app.js、README.md；新增 hero 的 WebM／MP4／poster 及此記錄。原影片及產品圖片保留。

中斷後重新核對檔案；JavaScript 沒有語法錯誤，所有引用素材及頁內錨點均存在。純靜態網站不需要 build。HTTP 本機預覽回應 200。

## 真實瀏覽器檢查

在 Codex 內置瀏覽器的本機預覽中驗證：

| 尺寸 | 結果 |
| --- | --- |
| 1440×900 | 桌面 Hero／sticky；無水平 overflow |
| 1024×768 | 平板橫向；無水平 overflow |
| 768×1024 | 平板直向獨立構圖；無水平 overflow |
| 390×844 | 手機 Hero／sticky／產品資料／FAQ；無水平 overflow |
| 320×667 | 窄手機無水平 overflow；Hero 為保留可用空間採 740px 最小高度 |

- 已修正 sticky 產品碰到標題、手機換行後文字黏連、平板直向過度裁切。
- 已修正 story captions crossfade 疊字：舊文字淡出後新文字再淡入。
- 圓形款式選擇、產品名稱與圖片更新、圖片 dialog、Escape 關閉、複製成功訊息、FAQ 展開正常。
- Pause motion 後三段產品說明全部顯示，影片暫停；Resume motion 可恢復。
- 影片 WebM readyState=4，loop 已觀察多次，原生 controls=false；離開 Hero 時影片暫停。
- 觀察期間 CLS=0，long-task counter=0。此為本機單次測試數據，非完整 Lighthouse／真機效能報告。
- 最後 console error／warning 列表為空，沒有已載入但失敗的圖片。

## 程式及素材測試

- `node --check app.js` 通過。
- 模擬 DOM／media API 的回歸測試：reduced-motion 啟動與動態切換、完整內容可讀、Pause／Resume、WebM→MP4 備援、載入失敗 poster、手機素材選擇、各 scroll progress 不疊字均通過。
- 四個衍生影片各解碼為 108 格／24fps，約 4.5 秒。
- 全片未檢出黑格（最低全格平均亮度約 144/255）。
- 首尾平均像素差：WebM 約 0.62/255、MP4 約 2.04/255；正反接合保持首尾相近，差異來自編碼。

## 實測邊界

未在實體 iPhone／iPad、Safari、低效能手機、慢網絡及 OS 真實 reduced-motion 設定下逐一實測。系統設定分支已用模擬測試，停止動態後的實際排版已用網站 Pause motion 驗證。瀏覽器政策可能阻止 autoplay，網站保留 poster 及 footer 恢復動態入口。

## 部署

本交付已更新本機檔案及 ZIP，未自動發布至 GitHub。上傳時必須包含新增的 hero assets，不能只上傳三個程式檔。

## 全景背景修訂追加驗證
已實際查看 1440×900、390×844、768×1024 首頁，調整手機文字位置與平板素材選擇；移除全部 Hero 羽化與遮罩。console error / warning 為空。JavaScript 語法與動畫／reduced-motion／格式備援模擬測試再次通過。此版尚未推送至 GitHub。
