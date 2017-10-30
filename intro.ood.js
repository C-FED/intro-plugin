/**
  * Author: Who am I ?
  * Theme: 网站引导插件
  * Time: 2017-10-20
  * Update: 2017-10-30
  * Depend: none
  * Version: v1.0.0 IE11+
  */
;(function (global,factory) {
    global.introJS=factory();
}(this,function () {
    // polyfill
    // Element.remove
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function () {
                    this.parentNode.removeChild(this);
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

    var Utils={
        style:{
            ".intro-container":'\
                position:relative !important;\
            ',
            ".intro-bg":'\
                position: absolute;\
                top: 0;\
                left: 0;\
                right: 0;\
                bottom: 0;\
                background-color: rgba(0,0,0,0.65);\
                z-index: 99;\
                transition:all ease-in-out 0.5s;\
            ',
            ".intro-highlight":'\
                position:relative !important;\
                z-index: 101 !important;\
            ',
            ".intro-helplayer":'\
                position:absolute;\
                top:0;\
                z-index:100;\
                border-radius:5px;\
                background-color:#fff;\
                color:#222;\
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);\
                transition:all ease-in-out 0.5s;\
            ',
            ".intro-reference":'\
                visibility:hidden;\
                z-index:101;\
            ',
            ".intro-reference *":'\
                visibility:visible;\
            ',
            ".intro-index":'\
                position: absolute;\
                top: -16px;\
                left: -16px;\
                padding: 2px;\
                width: 20px;\
                height: 20px;\
                line-height: 20px;\
                border: 3px solid #fff;\
                border-radius: 2px;\
                box-shadow: 0 2px 5px rgba(0,0,0,.4);\
                box-sizing: content-box;\
                z-index: 999!important;\
                font-size: 13px;\
                font-weight: bold;\
                color: #fff;\
                text-align: center;\
                text-shadow: 1px 1px 1px rgba(0,0,0,.3);\
                background-color: #2a8cd7;\
            ',
            ".intro-tip":'\
                position:absolute;\
                padding:10px 15px;\
                margin-left: 10px;\
                min-width:150px;\
                background-color: #fff;\
                border-radius: 3px;\
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);\
                transition:all ease-in-out 0.5s;\
            ',
            ".tip-tr":'\
                bottom:calc(100% + 10px);\
                right:0;\
            ',
            ".tip-rt":'\
                top:0;\
                left:100%;\
            ',
            ".tip-br":'\
                top:calc(100% + 10px);\
                right:0;\
            ',
            ".tip-lb":'\
                top:0;\
                right:calc(100% + 10px);\
            ',
            ".intro-tip-item":'\
                display:inline-block;\
                margin:10px 0 0 0;\
                cursor:pointer;\
            ',
            ".intro-tip-trangle":'\
                content: "";\
                position: absolute;\
                border:5px solid #fff;\
            ',
            ".tra-top":'\
                bottom: 100%;\
                left: 25%;\
                border-top-color: transparent;\
                border-right-color: transparent;\
                border-bottom-color: #fff;\
                border-left-color: transparent;\
            ',
            ".tra-right":'\
                top: 25%;\
                left: 100%;\
                border-top-color: transparent;\
                border-right-color: transparent;\
                border-bottom-color: transparent;\
                border-left-color: #fff;\
                ',
            ".tra-bottom":'\
                top: 100%;\
                left: 25%;\
                border-top-color: #fff;\
                border-right-color: transparent;\
                border-bottom-color: transparent;\
                border-left-color: transparent;\
            ',
            ".tra-left":'\
                top: 25%;\
                left: -10px;\
                border-top-color: transparent;\
                border-right-color: #fff;\
                border-bottom-color: transparent;\
                border-left-color: transparent;\
            ',
            ".intro_btn":'\
                display:inline-block;\
                border:1px solid #ccc;\
                color:#666;\
                padding:3px 5px;\
                border-radius:3px;\
            ',
            ".intro_btn:hover":'\
                border-color:#9c3;\
                color:#080;\
            ',
        },
        helpLayer:null,
        referenceLayer:null,
        dirData:{ // TODO
            tipBox:{
                "TR":"tip-tr",
                "RT":"tip-rt",
                "BR":"tip-br",
                "LB":"tip-lb"
            },
            tipTra:{
                "TR":"tra-bottom",
                "RT":"tra-left",
                "BR":"tra-top",
                "LB":"tra-right"
            }
        }
    };
    // private function
    // createCssStyleSheet
    function _createCSSStyle(selector, style) {
        // 判断支持 styleSheets
        if (!document.styleSheets) {
            return;
        }
        // 判断是否有head
        if (document.getElementsByTagName("head").length == 0) {
            return;
        }
        
        var stylesheet;
        var mediaType;
        // 判断dom中的样式表存在
        if (document.styleSheets.length > 0) {
            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    continue;
                }
    
                var media = document.styleSheets[i].media;
                mediaType = typeof media;
    
                if (mediaType == "string") {
                    if (media == "" || (media.indexOf("screen") != -1)) {
                        styleSheet = document.styleSheets[i];
                    }
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
            var styleSheetElement = document.createElement("style");
            styleSheetElement.type = "text/css";
    
            document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
    
            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    continue;
                }
                styleSheet = document.styleSheets[i];
            }
    
            var media = styleSheet.media;
            mediaType = typeof media;
        }
    
        if (mediaType == "string") {
            for (i = 0; i < styleSheet.rules.length; i++) {
                if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.rules[i].style.cssText = style;
                    return;
                }
            }
            // 插入style规则
            styleSheet.addRule(selector, style);
        } else if (mediaType == "object") {
            var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length: 0;
            for (i = 0; i < styleSheetLength; i++) {
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
    function _createCSS(styleObj) {
        for (var selector in styleObj) {
            _createCSSStyle(selector,styleObj[selector]);
        }
    }
    // getStyle
    function _getStyle(elem, prop) {
        var res;
        if (window.getComputedStyle) {
            res = window.getComputedStyle(elem, null)[prop];
        } else {
            res = elem.currentStyle[prop];
        }
        return res;
    }
    // setStyle
    function _setStyle(elem,setting) {
        for (var key in setting) {
            elem.style[key]=setting[key];
        }
    }
    // getDOM
    function _getDOM(selector) {
        var doms=document.querySelectorAll(selector);
        return doms.length==1?doms[0]:doms;
    }
    // non array forEach
    function _each(noArr,callback) {
        [].forEach.call(noArr,callback);
    }

    // class
    function Intro() {
    }
    // init
    Intro.prototype.init=function (el,config) {
        var that=this;
        var domSteps          = _getDOM("[data-step]");
            that.DOMCONTAINER = _getDOM(el);
            that.config       = config || {};
            that.QUEUEDOM     = [], // DOMS data-step dom
            that.ADDDOM       = {}, // Array all append dom
            that.EXDOM        = [], // Array except dom
            that.BACKSREEN    = null,  // DOM bg
            that.isEnd        = false,
            that.prevIndex    = -1,
            that.eq           = 0,
            that.bounds       = {}, // 盒子距离视窗的距离
            that.dir          = "RT"; // The direction of tipbox

        // 生成css
        _createCSS(Utils.style);
        // 配置
        if (Object.keys(that.config).length>0) {
            // 排除不参与的dom
            if (that.config.except && that.config.except.length>0) {
                (that.config.except).forEach(function (selector,index) {
                    var dom=_getDOM(selector);
                    dom.classList.add("intro-highlight");
                    that.EXDOM.push(dom);
                });
            }  
        }
                
        // 顺序加入队列
        _each(domSteps,function (dom,index) {
            that.QUEUEDOM[dom.dataset.step-1]=dom;
        });
        that.curDOM=that.QUEUEDOM[0];

        // 生成遮罩
        that.addBackScreen(that.DOMCONTAINER,that.config.isCanScroll || false);
        // 生成tips

        // 位置层
        Utils.helpLayer=document.createElement("div");
        Utils.helpLayer.id="b1";
        Utils.helpLayer.className="intro-helplayer";

        // 参考层
        Utils.referenceLayer=document.createElement("div");
        Utils.referenceLayer.className="intro-helplayer intro-reference";
        Utils.referenceLayer.innerHTML='\
            <div class="intro-tip tip-rt" id="intro_tipBox">\
                <p class="intro-tip-text" id="tipInfo">Hello,I\'m a tip</p>\
                <div class="intro-tip-item" id="tipBtnBox">\
                    <span id="intro_btn_next" class="intro_btn">next</span>\
                    <span id="intro_btn_skip" class="intro_btn">skip</span>\
                </div>\
                <div class="intro-tip-trangle tra-left" id="intro_tipTra"></div>\
            </div>\
            <div class="intro-index" id="tipIndex">1</div>\
        ';


        that.DOMCONTAINER.appendChild(Utils.helpLayer);
        that.DOMCONTAINER.appendChild(Utils.referenceLayer);

        that.tipIndex = _getDOM("#tipIndex");
        that.tipInfo  = _getDOM("#tipInfo");
        that.btnBox   = _getDOM("#tipBtnBox");
        that.tipBox   = _getDOM("#intro_tipBox");
        that.tipTra   = _getDOM("#intro_tipTra");
        that.btnNext  = _getDOM("#intro_btn_next"); // btn next
        that.btnSkip  = _getDOM("#intro_btn_skip"); // btn skip

        // next
        that.btnNext.addEventListener("click",function () {
            that.next();
        },false);
        // skip
        that.btnSkip.addEventListener("click",function () {
            that.destory();
        },false);


        _setStyle(Utils.helpLayer,{
            "opacity":"0"
        });
        // save dom
        that.ADDDOM["helplayer"]=Utils.helpLayer;
        that.ADDDOM["referenceLayer"]=Utils.referenceLayer;

        // 默认进入第一步
        that.next(0);
        // resize
        window.addEventListener("resize",function () {
            that.resize();
        },false);

        return this;
    };
    // next
    Intro.prototype.next=function (index) {
        var that=this;
        if (typeof index !="undefined") {
            if (that.prevIndex!=index) {
                that.eq=index;
                that.prevIndex=index;
            } else {
                return false;
            }
        }
        if (that.isEnd) {
            return false;
        }
        that.eq=that.eq>=that.QUEUEDOM.length?-1:that.eq;

        that.curDOM=that.QUEUEDOM[that.eq] || that.QUEUEDOM[0]; // eq 0  data-step 0
        var size=that.curDOM.getBoundingClientRect();
        var csize=that.DOMCONTAINER.getBoundingClientRect();

        if (that.eq==-1) {
            // destory
            that.destory();
            // scrollTo start step
            that.scrollTo(0);

            that.isEnd=true;
        } else {
            // reset info but curdom
            that.QUEUEDOM.forEach(function (dom,index) {
                if (index!=that.eq) {
                    dom.classList.remove("intro-highlight");
                }
            });

            // highlight current target
            setTimeout(function() {
                that.scrollTo(size.top,function () {
                    that.highlight();
                    that.eq++;
                });
            }, 0);
        }

        return this;
    };
    // destory
    Intro.prototype.destory=function () {
        var that=this;
        // remove all add dom
        for (var key in that.ADDDOM) {
            that.ADDDOM[key] && that.ADDDOM[key].remove();
        }
        // remove all class
        that.QUEUEDOM.forEach(function (dom,index) {
            dom.classList.remove("intro-highlight");
        });
        that.EXDOM.forEach(function (dom,index) {
            dom.classList.remove("intro-highlight");
        });
        that.DOMCONTAINER.classList.remove("intro-container");
    };
    // add bg of target
    Intro.prototype.addBackScreen=function (target,canScroll) {
        var that=this;
        var bg=document.createElement("div");
        bg.dataset.flag="bg";
        bg.className="intro-bg";
        bg.style.position=canScroll?"absoluted":"fixed";

        target.classList.add("intro-container");
        target.appendChild(bg);
        that.ADDDOM["bg"]=bg;
    };
    // move Utils.helpLayer and highlight target
    Intro.prototype.highlight=function () {
        var that=this;

        _setStyle(Utils.helpLayer,{
            "opacity":"1"
        });

        // change tip info
        that.tipInfo.innerText=that.curDOM.dataset.intro;
        that.tipIndex.innerText=that.curDOM.dataset.step;

        // isRequired
        if (that.curDOM.dataset.required) {
            _setStyle(that.btnBox,{
                "display":"none"
            });
        } else {
            _setStyle(that.btnBox,{
                "display":"block"
            });
        }

        //addclass intro-highlight
        !(that.curDOM.classList.contains("intro-highlight")) && that.curDOM.classList.add("intro-highlight");
        
        that.resize();
    };
    // resize box
    Intro.prototype.resize=function () {
        var that=this;
        var size=that.curDOM.getBoundingClientRect();
        var csize=that.DOMCONTAINER.getBoundingClientRect();
        
        _setStyle(Utils.helpLayer,{
            "top":size.top -csize.top+"px",
            "left":size.left- csize.left+"px",
            "width":size.width+"px",
            "height":size.height+"px"
        });
        _setStyle(Utils.referenceLayer,{
            "top":size.top -csize.top+"px",
            "left":size.left- csize.left+"px",
            "width":size.width+"px",
            "height":size.height+"px"
        });

        that.bounds={
            top:size.top,
            left:size.left,
            bottom:window.innerHeight-size.top-size.height,
            right:csize.width-size.right
        };

        // resize tipbox
        var tsize=that.tipBox.getBoundingClientRect();

        if (that.bounds.right>tsize.width) {
            that.dir="RT";
        } else if (that.bounds.bottom>tsize.height) {
            that.dir="BR";
        } else if (that.bounds.left>tsize.width) {
            that.dir="LB";
        } else if (that.bounds.top>tsize.height) {
            that.dir="TR";
        } else {
            // 外部没有空间了
            console.log("outter is not null!");
        }
        that.alignTipBox();
    };
    // realign tipbox
    Intro.prototype.alignTipBox=function () {
        var that=this;
        var data=Utils.dirData;
        // remove all tipBox class
        for (var key in data.tipBox) {
            that.tipBox.classList.remove(data.tipBox[key]);
        }
        // add
        that.tipBox.classList.add(data.tipBox[that.dir]);
        // remove all tipTra class
        for (var key in data.tipTra) {
            that.tipTra.classList.remove(data.tipTra[key]);
        }
        // add
        that.tipTra.classList.add(data.tipTra[that.dir]);
    };
    // scroll pos
    Intro.prototype.scrollTo=function (top,callback) {
        var that=this;

        top=top<0?that.curDOM.getBoundingClientRect().top:top;

        if (typeof that.curDOM.scrollIntoView==="function") {
            that.curDOM.scrollIntoView({
                "behavior":"smooth"
            });
        } else if (typeof window.scrollTo==="function") {
            window.scrollTo({
                "behavior":"smooth",
                "top":top
            });
        } else {
            if (that.DOMCONTAINER.tagName!=="BODY" && that.DOMCONTAINER.tagName!=="HTML") {
                that.DOMCONTAINER.scrollTop=top;
            } else {
                document.documentElement.scrollTop=top;
                document.body.scrollTop=top;
            }
        }
        callback && callback();
    };
    return new Intro();
}));