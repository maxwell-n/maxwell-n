/// <reference path="../JavaScript/utils.ts" />
class Basic {
    constructor() {
        var spanish = fileUtil.load("Basic1.json");
        this.enumerateItems(spanish);
    }

    private enumerateItems(obj) {
        for (prop in obj) {
            var text = "";
            if (typeof obj[prop] != "function" && typeof obj[prop] != "object") {
                text = prop + ": " + obj[prop];
                document.writeln("<div>" + text + "</div>");
            }
            else if (typeof obj[prop] === "object") {
                this.enumerateItems(obj[prop])
            }
        }
    }
}