if (chrome) {
    browser = chrome;
}

var currentPostId = "";

if (typeof browser !== "undefined") {
    browser.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message === 'lbc_old_price') {
                start();
            }
        }
    );
}

(function () {
    'use strict';
    start();
})();

let hasTerminated = false

function start() {
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            setTimeout(() => {
                log("Running with readystate");
                main();
            }, 100);
        }
    };

    // Fallback when onreadystatechange doesn't trigger
    setTimeout(() => {
        if (!hasTerminated) {
            log("Running with fallback");
            main();
            clearTimeout();
        }
    }, 2500)
}

function main() {
    var article = document.querySelector("article#grid");

    if (article) {
        applyOldPrice4Article(article);
    }

    var allAdItems = document.querySelectorAll('[data-qa-id="aditem_container"]');

    if (document.URL.endsWith("/favorites")) {
        applyTag4Favorites();
    }

    if (allAdItems) {
        applyOldPrice4ListAds(allAdItems);
    }

    hasTerminated = true;
}