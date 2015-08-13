
(function() {

    // CSS (banner background color, text color)
    // defined in parent settings
    // @TODO ^

    chrome.storage.sync.get({
        urls: [],
        warningText: "You're on a production site",
        backgroundColor: '#FFBABA',
        textColor: '#D8000C',
        opacity:.95,
        blinky: false
    }, function(settings) {
        var body = document.body;
        var bannerWrapper = document.createElement('div');
        var banner = document.createElement('div');
        var bannerText = document.createElement('p');
        var closeButton = document.createElement('a');
        bannerWrapper.id = 'productionWarningBanner-wrapper';
        banner.id = 'productionWarningBanner';
        banner.style.backgroundColor = settings.backgroundColor;
        banner.style.opacity = settings.opacity;
        bannerText.id = 'productionWarningBanner-text';
        bannerText.style.color = settings.textColor;
        if (settings.blinky) {
            bannerText.classList.add('productionWarningBanner-blinky');
        }
        bannerText.appendChild(document.createTextNode(settings.warningText));
        closeButton.id = "productionWarningBanner-close";
        closeButton.setAttribute("aria-label", "Close");
        closeButton.onclick = function() {
            body.removeChild(bannerWrapper);
        };
        banner.appendChild(bannerText);
        banner.appendChild(closeButton);
        bannerWrapper.appendChild(banner);
        body.insertBefore(bannerWrapper, body.childNodes[0]);
    });

})();