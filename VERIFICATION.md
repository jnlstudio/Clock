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
