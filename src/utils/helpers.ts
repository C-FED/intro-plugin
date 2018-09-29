// createCssStyleSheet
export function _createCSSStyle(selector: string, style: object) {
    // 判断支持 styleSheets
    if (!document.styleSheets) {
        return;
    }
    // 判断是否有head
    if (document.getElementsByTagName("head").length == 0) {
        return;
    }

    let styleSheet: any;
    let mediaType: any;
    // 判断dom中的样式表存在
    if (document.styleSheets.length > 0) {
        for (let i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].disabled) {
                continue;
            }

            let media = document.styleSheets[i].media;
            mediaType = typeof media;

            if (mediaType == "string") { // TODO
                // if (media == "" || (media.indexOf("screen") != -1)) {
                //     styleSheet = document.styleSheets[i];
                // }
            } else if (mediaType == "object") {
                if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
                    styleSheet = document.styleSheets[i];
                }
            }

            if (typeof styleSheet != "undefined") {
                break;
            }
        }
    }
    // 创建新的style
    if (typeof styleSheet == "undefined") {
        let styleSheetElement = document.createElement("style");
        styleSheetElement.type = "text/css";

        document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

        for (let i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].disabled) {
                continue;
            }
            styleSheet = document.styleSheets[i];
        }

        let media = styleSheet.media;
        mediaType = typeof media;
    }

    if (mediaType == "string") {
        for (let i = 0; i < styleSheet.rules.length; i++) {
            if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
            }
        }
        // 插入style规则
        styleSheet.addRule(selector, style);
    } else if (mediaType == "object") {
        let styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
        for (let i = 0; i < styleSheetLength; i++) {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }
        // 插入style规则
        styleSheet.insertRule(selector + "{" + style + "}", styleSheetLength);
    }
}
// createCssStyle
export function _createCSS(styleObj: object) {
    for (let selector in styleObj) {
        _createCSSStyle(selector, (styleObj as any)[selector]);
    }
}
// getStyle
export function _getStyle(elem: HTMLElement, prop: string) {
    let res;
    if (window.getComputedStyle) {
        res = (window.getComputedStyle(elem, null) as any)[prop];
    } else {
        res = (elem as any).currentStyle[prop];
    }
    return res;
}
// setStyle
export function _setStyle(elem: HTMLElement, setting: object) {
    for (let key in setting) {
        (elem.style as any)[key] = (setting as any)[key];
    }
}
// getDOM
export function _getDOM(selector:string):any[]|any {
    let doms = document.querySelectorAll(selector);
    return doms.length == 1 ? doms[0] : doms;
}
// non array forEach
export function _each(noArr:any, callback:any) {
    [].forEach.call(noArr, callback);
}