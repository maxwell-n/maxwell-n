let randomizeUtil = {
    randomNumber: function (seed) {
        return Math.floor(Math.random() * seed);
    }
};
let audioUtil = {
    getAudio: function (name, preload) {
        let aAudio = document.getElementById(name);
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
        let aAudio = audioUtil.getAudio("aAudio");
        aAudio.src = src;
        if (typeof (onEnded) === "function") {
            function ended() {
                aAudio.removeEventListener("ended", ended);
                onEnded();
            }
            aAudio.addEventListener("ended", ended, false);
        }
        aAudio.play();
    },
    playCached: function (src, onEnded) {
        let name = fileUtil.getFileNameWithoutExtension(src);
        let aAudio = audioUtil.getAudio(name, true);
        aAudio.src = src;
        aAudio.preload = "auto";
        if (typeof (onEnded) === "function")
            aAudio.onended = onEnded();
        aAudio.play();
    }
};
let fileUtil = {
    getFileExtension: function (filePath) {
        let parts = filePath.split('.');
        return parts[parts.length - 1];
    },
    getFileName: function (filePath) {
        let parts = filePath.split('/');
        return parts[parts.length - 1];
    },
    getFileNameWithoutExtension: function (filePath) {
        let fileName = fileUtil.getFileName(filePath);
        let parts = fileName.split('.');
        return parts[0];
    },
    getPath: function (filePath) {
        let parts = filePath.split('/');
        parts.pop();
        return parts.join('/');
    },
    jsLoader: function (jsFile) {
        let newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = jsFile;
        document.getElementsByTagName('head')[0].appendChild(newScript);
    },
    load: function (fileName) {
        let request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send();
        return JSON.parse(request.responseText);
    },
    loadAsync: function (fileName, readFile) {
        let request = new XMLHttpRequest();
        let jsonObject;
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
let urlUtil = {
    getURLParam: function (name) {
        //let url = window.location.toString();
        //let parameters:string = location.search.substr(window.location.toString().indexOf("?") + 1);
        let parameters = location.search.substr(location.search.indexOf("?") + 1);
        let sval = "";
        let temp;
        let params = parameters.split("&");
        for (let i = 0; i < params.length; i++) {
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