// Saves options to chrome.storage
function saveOptions(e) {
    e.preventDefault();

    var urls = document.getElementById('value-urls').value;
    var warningText = document.getElementById('value-warning-text').value;
    var backgroundColor = document.getElementById('value-background-color').value;
    var textColor = document.getElementById('value-text-color').value;
    var opacity = document.getElementById('value-opacity').value;
    var blinky = document.getElementById('value-blinky').checked;

    urls = urls.split("\n").filter(function(item) {
        return item.length > 0;
    }).map(function(url) {
        url = url.trim();
        if (url.indexOf('regex:') === 0 && url.length > 6) {
            return {
                url: url.substr(6),
                regex: true
            };
        } else {
            return {
                url: url,
                regex: false
            };
        }
    });
    console.log(urls);

    chrome.storage.sync.set({
        urls: urls,
        warningText: warningText,
        backgroundColor: backgroundColor,
        textColor: textColor,
        opacity: opacity,
        blinky: blinky
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function loadOptions() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        urls: [],
        warningText: "You're on a production site",
        backgroundColor: '#FFBABA',
        textColor: '#D8000C',
        opacity:.95,
        blinky: false
    }, function(items) {
        var urlText = '';
        for(var i=0; i < items.urls.length; i++) {
            if (items.urls[i].regex) {
                urlText += 'regex:';
            }
            urlText += items.urls[i].url;
            if (i !== items.urls.length) {
                urlText += "\n";
            }
        }

        document.getElementById('value-urls').value = urlText;
        document.getElementById('value-warning-text').value = items.warningText;
        document.getElementById('value-background-color').value = items.backgroundColor;
        document.getElementById('value-text-color').value = items.textColor;
        document.getElementById('value-opacity').value = items.opacity;
        document.getElementById('value-blinky').checked = items.blinky;
    });
}
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);