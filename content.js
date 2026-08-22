// content.js - Script untuk membaca konten halaman
console.log("AI Assistant: Content script aktif.");

// Fungsi untuk mengambil teks dari elemen tertentu
function getPageContent() {
  // Kamu bisa menyesuaikan selector ini dengan kelas atau ID 
  // elemen pesan di WhatsApp Web atau situs lainnya
  const messageElements = document.querySelectorAll('div[data-testid="msg-container"]');
  let messages = "";
  
  messageElements.forEach(el => {
    messages += el.innerText + "\n";
  });
  
  return messages;
}

// Mengirim data ke popup atau background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMessages") {
    sendResponse({ data: getPageContent() });
  }
});
