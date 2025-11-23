function applyTag4Favorites() {
    const links = Array.from(document.querySelectorAll('article[data-qa-id="aditem_container"] a'));
    links.forEach(_ => log(_.href))
    const propsContainer = document.querySelectorAll('[data-test-id="adcard-outlined"] [class^="adcard_"] .justify-between');
    const dateList = Array.from(propsContainer).map(_ => _.querySelector('p.text-caption.text-neutral:nth-child(5)'));

    for (i in propsContainer.length) {
        propsContainer[i].href = links[i].href
    }

    console.log(propsContainer)

    propsContainer.forEach(propContainer => {
        const date = propContainer.querySelector('p.text-caption.text-neutral:nth-child(5)');
        const dateClean = parseDate(date.innerHTML);
        date.remove();

        // TODO: fix date not comming from API
        // const dateTag = createDateTag("Déposée le ", dateClean, false);
        if (propContainer.firstChild?.firstChild.innerHTML !== "Livraison possible") {
            let tagListContainer, no_delivery;

            tagListContainer = document.createElement("div");
            tagListContainer.setAttribute("class", "gap-md flex flex-wrap items-center mb-md");

            no_delivery = createTag("Non livrable", "text-on-main", "bg-main");
            tagListContainer.appendChild(no_delivery)

            propContainer.insertBefore(tagListContainer, propContainer.firstChild)
        }
        if (!tagListContainer) {
            tagListContainer = propContainer.firstChild;
        }
        tagListContainer.appendChild(dateTag)
    })

    dateList.forEach(date => {
        date.remove();
    })
}