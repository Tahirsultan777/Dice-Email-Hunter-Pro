# 📧 Dice Email Hunter Pro

**Dice Email Hunter Pro** is a lightweight Chrome Extension that extracts and displays all email addresses from the currently active webpage. It lets you copy emails individually or all at once — right from a clean popup interface.

---

## 🔧 Features

- 🔍 Extracts email addresses from the active tab  
- 📋 Copy individual emails or all at once  
- 🎨 Simple UI using `popup.html` and `style.css`  
- 🧩 No background or content script needed (uses `executeScript` from popup)

---

## 📂 File Structure

dice-email-hunter-pro/
├── manifest.json
├── popup.html
├── popup.js
├── style.css
└── icon.png


---

## 🛠 Installation (for Development)

1. Download or clone this repository.
2. Open Google Chrome and go to: `chrome://extensions/`
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.
5. Click the extension icon to launch the email extractor.

---

## ⚙️ How It Works

- When the popup opens, `popup.js` uses `chrome.tabs.executeScript` to access the full HTML of the active tab.
- A regular expression scans for email addresses.
- Emails are displayed in a list with **Copy** buttons.
- A toast notification shows when copying is successful.

---

## 🧠 Regex Used

```js
/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

---

🛡 Permissions Used

"permissions": ["activeTab", "scripting"]
These allow the extension to run code on the current tab through the popup.

---

📜 License

MIT License — free to use, modify, and distribute.
Let me know if you want me to include example screenshots or turn this into a downloadable file.
