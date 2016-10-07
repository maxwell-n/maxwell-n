/// <reference path="../JavaScript/utils.ts" />
var Basic = (function () {
    function Basic() {
        var spanish = fileUtil.load("Basic1.json");
        this.enumerateItems(spanish);
    }
    Basic.prototype.enumerateItems = function (obj) {
        for (prop in obj) {
            var text = "";
            if (typeof obj[prop] != "function" && typeof obj[prop] != "object") {
                text = prop + ": " + obj[prop];
                document.writeln("<div>" + text + "</div>");
            }
            else if (typeof obj[prop] === "object") {
                this.enumerateItems(obj[prop]);
            }
        }
    };
    return Basic;
})();
//# sourceMappingURL=Basic.js.map