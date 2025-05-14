function extractEmailsFromHTML(html) {
  const matches = html.matchAll(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  );
  return [...new Set(Array.from(matches, (m) => m[0]))];
}

function showToast(message = "Copied!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

function copyToClipboard(text, button = null) {
  navigator.clipboard.writeText(text).then(() => {
    if (button) {
      const original = button.textContent;
      button.textContent = "Copied!";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 1500);
    }
    showToast();
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  fetch(tabs[0].url)
    .then((res) => res.text())
    .then((html) => {
      const emails = extractEmailsFromHTML(html);
      const list = document.getElementById("emailList");
      const status = document.getElementById("status");

      if (emails.length === 0) {
        status.textContent = "No email addresses found.";
        return;
      }

      emails.forEach((email) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${email}</span>
          <button class="copy-btn">Copy</button>
        `;
        const btn = li.querySelector("button");
        btn.addEventListener("click", () => copyToClipboard(email, btn));
        list.appendChild(li);
      });

      document.getElementById("copyAllBtn").addEventListener("click", function () {
        copyToClipboard(emails.join("\n"), this);
      });
    })
    .catch((err) => {
      document.getElementById("status").textContent = "Error fetching content.";
    });
});
