# 旅遊意見調查網站

這是一個可部署到 Netlify 的單頁靜態網站，包含：
- 姓名
- 聯絡電話
- 信箱
- 日期
- 地點
- 方式
- 性別
- 參加人數
- 備註
- 回覆按鈕

## 部署到 Netlify
1. 將這個資料夾上傳到 Netlify，或連接 GitHub 後部署。
2. 確認網站已部署成功。
3. 進入 Netlify Dashboard → Site → Forms。
4. 開啟 Notifications，新增 Email Notification，收件人填入 w638897a@gmail.com。
5. 重新提交一次表單即可收到通知。

## 本機預覽
在專案資料夾執行：
```bash
python -m http.server 8000
```
然後開啟：http://127.0.0.1:8000/
