chrome.tabs.query({ currentWindow: true }, function(tabs) {
  var tabLinksList = document.getElementById('tabLinks');
  var copyButton = document.getElementById('copyButton');

  var filteredTabs = tabs.filter(function(tab) {
    return tab.url.toLowerCase().indexOf('azure') === -1;
  });

  filteredTabs.forEach(function(tab) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.textContent = tab.title;
    a.href = tab.url;
    a.target = '_blank';
    li.appendChild(a);
    tabLinksList.appendChild(li);
  });

  copyButton.addEventListener('click', function() {
    var linkText = filteredTabs.map(function(tab) {
      return tab.title + ': ' + tab.url;
    }).join('\n');

    var tempInput = document.createElement('textarea');
    tempInput.value = linkText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    copyButton.textContent = 'Copied!';
    setTimeout(function() {
      copyButton.textContent = 'Copy All Links to Clipboard';
    }, 2000);
  });
});
