function loadJSX(fname, complete) {
  $.get(chrome.extension.fileURL(fname), {}, function(data) {
    console.log(data);
  }, 'text');
}
