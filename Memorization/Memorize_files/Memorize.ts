/// <reference path="../../JavaScript/utils.ts" />

class memorize {
    private _json:JSON;

    constructor() {
        var param:string = urlUtil.getURLParam('Memorize');
        this._json = fileUtil.load(param + '.json');
        document.title = this._json['memorization']['title'] + ' - nmmaxwell';

        var dItems:HTMLDivElement = <HTMLDivElement>document.getElementById('dItems');
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

            var pQuote:HTMLElement = document.createElement('p');
            pQuote.innerHTML = this.addSpaces(i);
            pQuote.id = 'p' + i;
            pQuote.className = 'pQuote';
            sectionQuote.appendChild(pQuote);

            var divButtons:HTMLElement = document.createElement('div');
            sectionQuote.appendChild(divButtons);

            var onclick:(ev:MouseEvent) => any = function () {
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

    private createButton(htmlElement:HTMLElement, text:string, value:string, onclick:(ev:MouseEvent) => any) {
        var button:HTMLButtonElement = document.createElement('button');
        button.innerText = text;
        button.value = value;
        button.onclick = onclick;
        htmlElement.appendChild(button);
    }

    public addSpaces(index):string {
        var text = this._json['memorization']['items'][index].text;
        var textOut = '';
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i])) {
                textOut += text[i];
            } else {
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

    public allText(index) {
        var divQuote = document.getElementById('p' + index);
        divQuote.innerHTML = this.addSpaces(index);
    }

    public ignoreElement() {
        var ignore:boolean = false;
        return function (char:string) {
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

    public firstText(index):void {
        var text:string = this._json['memorization']['items'][index].text;
        var textOut:string = '';
        var first:boolean = true;
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i])) {
                textOut += text[i];
                first = true;
            } else {
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

    public lastText(index):void {
        var text = this._json['memorization']['items'][index].text;
        var textOut = '';
        var last = false;
        var ignore = this.ignoreElement();
        for (var i = 0; i < text.length; i++) {
            if (ignore(text[i])) {
                textOut += text[i];
                last = false;
            } else {
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

    public noneText(index):void {
        var text:string = this._json['memorization']['items'][index].text;
        var textOut:string = '';
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
