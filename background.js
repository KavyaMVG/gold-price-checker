chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received in background:", message);
  });
  