const getTextBtn = document.getElementById('getTextBtn');
const askAI = document.getElementById('askAI');
const textContent = document.getElementById('textContent');
const responseDiv = document.getElementById('response');

let pageText = '';

getTextBtn.addEventListener('click', async () => {
  // Ambil tab aktif
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Jalankan script di halaman aktif untuk mengambil teks body
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => document.body.innerText
  }, (results) => {
    if (results && results[0]) {
      pageText = results[0].result;
      textContent.textContent = pageText.slice(0, 500) + (pageText.length > 500 ? '...' : '');
      askAI.disabled = false;
      responseDiv.textContent = '';
    }
  });
});

askAI.addEventListener('click', async () => {
  responseDiv.textContent = 'Loading AI response...';

  // Simulasi request ke AI (ganti dengan API nyata nanti)
  const aiResponse = await fakeAIRequest(pageText);

  responseDiv.textContent = aiResponse;
});

// Fungsi dummy simulasi request ke AI
async function fakeAIRequest(text) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`AI suggests reply based on:\n"${text.slice(0, 100)}..."`);
    }, 1500);
  });
}
