requirejs.config({
  baseUrl: chrome.extension.getURL("js")
});

requirejs(["main"]);
