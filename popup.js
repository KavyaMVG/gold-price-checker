console.log(chrome)
document.getElementById("checkPrice").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(chrome)
  chrome.runtime.sendMessage({ type: "fetch-steps" }, (response) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runStepsOnPage,
      args: [response.steps]
    });
  });
});

function runStepsOnPage(steps) {
  steps.forEach(step => {
    if (step.action === "click") {
      const el = document.querySelector(step.selector);
      if (el) el.click();
    } else if (step.action === "getText") {
      const el = document.querySelector(step.selector);
      if (el) {
        console.log(`Extracted Price: ${el.textContent}`);
        alert(`22K Gold Price: ${el.textContent}`);
      }
    }
  });
}
