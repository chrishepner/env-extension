var getUrls = function(callback) {
    chrome.storage.sync.get(
        {
            urls: []
        },
        callback
    );
};


var isMatch = function(url, domainEntry) {
    if (domainEntry.regex) {
        var regex = new RegExp(domainEntry.url);
        console.log(regex, url, url.match(regex));
        return url.match(regex);
    } else {
        return (url.indexOf(domainEntry.url) !== -1);
    }
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        getUrls(function(settings) {
            chrome.tabs.get(tabId, function(tab) {
                var domainMatches = false;
                settings.urls.forEach(function(domainEntry) {
                    if (isMatch(tab.url, domainEntry)) {
                        domainMatches = true;
                    }
                });
                if (!domainMatches) {
                    return;
                }
                chrome.tabs.insertCSS(tabId, {
                    file: 'inject.css'
                });
                chrome.tabs.executeScript(tabId, {
                    file: 'inject.js'
                });
            });
        });
    }
});