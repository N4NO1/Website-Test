async function includeHTML() {
    var elementArray, i, file, currentElement

    elementArray = document.getElementsByTagName("*");

    for (i = 0; i < elementArray.length; i++) {
        currentElement = elementArray[i];

        file = currentElement.getAttribute("include-html");
        if (file) {
            const dataHtml = await fetch(file, { method: "GET" })

            if (dataHtml.status == 200) { currentElement.innerHTML = await dataHtml.text() }
            else if (dataHtml.status == 404) { currentElement.innerHTML = "NOT FOUND" }
            currentElement.removeAttribute("include-html")
        }
    }
}