function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    v = v.replace(/\bwar (with|on) (T|t)error(ists|ism)?\b/g, "war $1 The Nation of Eastasia");
    v = v.replace(/\bterrorist attacks?\b/g, "attacks by Eastasia");
    v = v.replace(/\b(T|t)errorists\b/g, "$1he citizens of Eastasia");
    v = v.replace(/\b(T|t)errorist's\b/g, "crimethinker's");

    v = v.replace(/\bradicalization\b/g, "watching Oceania drop Victory Bombs");

    v = v.replace(/\ban act of war\b/g, "double-plus-ungood crimethink");
    v = v.replace(/\bwag(e|ing) a? war against .+\b/ig, "always at war with us, Oceania");

    v = v.replace(/\b(anti|counter)-terrorist(s)?\b/g, "status quo");

    v = v.replace(/\b(T|t)he (P|p)entagon\b/g, "Ingsoc");
    v = v.replace(/\b(T|t)he (P|p)entagon\b/g, "Ingsoc");

    v = v.replace(/\bsurveilance\b/g, "The Ministry of Truth");
    v = v.replace(/\bNSA\b/g, "The Ministry of Truth");
    v = v.replace(/\bCIA\b/g, "The Ministry of Love");

    v = v.replace(/\bterror\b/g, "crimethink");
    v = v.replace(/\bTerror\b/g, "Crimethink");

    v = v.replace(/\bterrorism\b/g, "crimethink");
    v = v.replace(/\bTerrorism\b/g, "Crimethink");


    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
