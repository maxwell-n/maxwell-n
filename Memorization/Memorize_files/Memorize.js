/// <reference path="../../JavaScript/utils.ts" />
class memorize {
    constructor() {
        var param = urlUtil.getURLParam('Memorize');
        this._json = fileUtil.load(param + '.json');
        document.title = this._json['memorization']['title'] + ' - nmmaxwell';
        var dItems = document.getElementById('dItems');
        var h1Title = document.getElementById("h1Title");
        h1Title.innerHTML = this._json['memorization']['title'];
        var h2SubTitle = document.getElementById("h2SubTitle");
        h2SubTitle.innerHTML = this._json['memorization']['subTitle'] === undefined ? '' : this._json['memorization']['subTitle'];
        var h3SubSubTitle = document.getElementById("h3SubSubTitle");
        h3SubSubTitle.innerHTML = this._json['memorization']['subSubTitle'] === undefined ? '' : this._json['memorization']['subSubTitle'];
        for (var i = 0; i < this._json['memorization']['items'].length; i++) {
            var jsonItem = this._json['memorization']['items'][i];
            var sectionQuote = document.createElement('section');
            dItems.appendChild(sectionQuote);
            if (jsonItem.name !== undefined) {
                var pTitle = document.createElement('p');
                pTitle.innerHTML = '<b>' + jsonItem.name + '</b>';
                sectionQuote.appendChild(pTitle);
            }
            var pQuote = document.createElement('p');
            pQuote.innerHTML = this.addSpaces(i);
            pQuote.id = 'p' + i;
            pQuote.className = 'pQuote';
            sectionQuote.appendChild(pQuote);
            var divButtons = document.createElement('div');
            sectionQuote.appendChild(divButtons);
            var onclick = function () {
                memorization.allText(this.value);
            };
            this.createButton(divButtons, 'All', i.toString(), onclick);
            onclick = function () {
                memorization.firstText(this.value);
            };
            this.createButton(divButtons, 'First', i.toString(), onclick);
            onclick = function () {
                memorization.lastText(this.value);
            };
            this.createButton(divButtons, 'Last', i.toString(), onclick);
            onclick = function () {
                memorization.noneText(this.value);
            };
            this.createButton(divButtons, 'None', i.toString(), onclick);
        }
    }
    createButton(htmlElement, text, value, onclick) {
        var button = document.createElement('button');
        button.innerText = text;
        button.value = value;
        button.onclick = onclick;
        htmlElement.appendChild(button);
    }
    addSpaces(index) {
        var text = this._json['memorization']['items'][index].text;
        var textOut = '';
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i])) {
                textOut += text[i];
            }
            else {
                switch (text[i]) {
                    case ' ':
                        textOut += '&nbsp; ';
                        break;
                    default:
                        textOut += text[i];
                        break;
                }
            }
        }
        return textOut;
    }
    allText(index) {
        var divQuote = document.getElementById('p' + index);
        divQuote.innerHTML = this.addSpaces(index);
    }
    ignoreElement() {
        var ignore = false;
        return function (char) {
            switch (char) {
                case "<":
                    ignore = true;
                    return true;
                case ">":
                    ignore = false;
                    return true;
                case '—':
                    return true;
                default:
                    return ignore;
            }
        };
    }
    firstText(index) {
        var text = this._json['memorization']['items'][index].text;
        var textOut = '';
        var first = true;
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i])) {
                textOut += text[i];
                first = true;
            }
            else {
                switch (text[i]) {
                    case ' ':
                        textOut += '&nbsp; ';
                        first = true;
                        break;
                    case '.':
                    case ',':
                    case ':':
                    case ';':
                    case '“':
                    case '”':
                    case '"':
                    case "'":
                    case '’':
                        textOut += text[i];
                        break;
                    default:
                        textOut += first ? text[i] : '_';
                        first = false;
                        break;
                }
            }
        }
        var divQuote = document.getElementById('p' + index);
        divQuote.innerHTML = textOut;
    }
    lastText(index) {
        var text = this._json['memorization']['items'][index].text;
        var textOut = '';
        var last = false;
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i])) {
                textOut += text[i];
                last = false;
            }
            else {
                switch (text[i]) {
                    case ' ':
                        textOut += '&nbsp; ';
                        last = false;
                        break;
                    case '.':
                    case ',':
                    case ':':
                    case ';':
                    case '“':
                    case '”':
                    case '"':
                    case "'":
                    case '’':
                        textOut += text[i];
                        break;
                    default:
                        textOut += last ? text[i] : '_';
                        last = true;
                        break;
                }
            }
        }
        var divQuote = document.getElementById('p' + index);
        divQuote.innerHTML = textOut;
    }
    noneText(index) {
        var text = this._json['memorization']['items'][index].text;
        var textOut = '';
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i]))
                textOut += text[i];
            else {
                switch (text[i]) {
                    case ' ':
                        textOut += '&nbsp; ';
                        break;
                    case '—':
                    case '.':
                    case ',':
                    case ':':
                    case ';':
                    case '“':
                    case '”':
                    case '"':
                    case "'":
                    case '’':
                        textOut += text[i];
                        break;
                    default:
                        textOut += '_';
                        break;
                }
            }
        }
        var divQuote = document.getElementById('p' + index);
        divQuote.innerHTML = textOut;
    }
}
var memorization = new memorize();
//# sourceMappingURL=Memorize.js.map
//# sourceMappingURL=Memorize.js.map