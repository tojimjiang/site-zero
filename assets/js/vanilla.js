function apply(tab) {

    var box = document.createElement("div");
    box.setAttribute("id", "candela_box_orange");
    box.setAttribute("style", 
    "pointer-events: all; opacity: 0.5; background-color: #FFC58F; z-index: 1000000; position: fixed; width: 99999px; height: 99999px; margin-top: -99999px"); 
    document.body.appendChild(box);
    console.log("appended");
}

window.onload = function() {
    console.log("calling");
    apply();
}
//browser.browserAction.onClicked.addListener(listener)
