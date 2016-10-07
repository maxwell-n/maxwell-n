var randomizeUtil = {
    randomNumber: function (seed) {
        return Math.floor(Math.random() * seed);
    }
};
var audioUtil = {
    getAudio: function (name, preload) {
        var aAudio = document.getElementById(name);
        if (aAudio === null) {
            aAudio = document.createElement("audio");
            aAudio.id = name;
            aAudio.hidden = true;
            aAudio.autoplay = false;
            if (preload === true)
                aAudio.preload = "auto";
            document.body.appendChild(aAudio);
        }
        return aAudio;
    },
    play: function (src, onEnded) {
        var aAudio = audioUtil.getAudio("aAudio");
        aAudio.src = src;
        if (typeof (onEnded) === "function") {
            function ended() {
                aAudio.removeEventListener("ended", ended);
                onEnded();
            }
            aAudio.addEventListener("ended", ended);
        }
        aAudio.play();
    },
    playCached: function (src, onEnded) {
        var name = fileUtil.getFileNameWithoutExtension(src);
        var aAudio = audioUtil.getAudio(name, true);
        aAudio.src = src;
        aAudio.preload = "auto";
        if (typeof (onEnded) === "function") {
            function ended() {
                aAudio.removeEventListener("ended", ended);
                onEnded();
            }
            aAudio.addEventListener("ended", ended);
        }
        aAudio.play();
    }
};
var fileUtil = {
    getFileExtension: function (filePath) {
        var parts = filePath.split('.');
        return parts[parts.length - 1];
    },
    getFileName: function (filePath) {
        var parts = filePath.split('/');
        return parts[parts.length - 1];
    },
    getFileNameWithoutExtension: function (filePath) {
        var fileName = fileUtil.getFileName(filePath);
        var parts = fileName.split('.');
        return parts[0];
    },
    getPath: function (filePath) {
        var parts = filePath.split('/');
        parts.pop();
        return parts.join('/');
    },
    jsLoader: function (jsFile) {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = jsFile;
        document.getElementsByTagName('head')[0].appendChild(newScript);
    },
    load: function (fileName) {
        var request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send();
        return JSON.parse(request.responseText);
    },
    loadAsync: function (fileName, readFile) {
        var request = new XMLHttpRequest();
        var jsonObject;
        request.open("GET", fileName, true);
        request.onreadystatechange = function () {
            if (typeof readFile === 'function') {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 304) {
                        jsonObject = JSON.parse(request.responseText);
                        readFile(jsonObject);
                    }
                }
            }
        };
        request.send();
    }
};
var urlUtil = {
    getURLParam: function (name) {
        //var url = window.location.toString();
        //var parameters:string = location.search.substr(window.location.toString().indexOf("?") + 1);
        var parameters = location.search.substr(location.search.indexOf("?") + 1);
        var sval = "";
        var temp;
        var params = parameters.split("&");
        for (var i = 0; i < params.length; i++) {
            temp = params[i].split("=");
            if (temp[0] === name) {
                sval = temp[1];
            }
        }
        return sval;
    }
};
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.js.map