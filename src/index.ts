import "./polyfill/element-remove";
import Utils from "./config/css";
import {
    _setStyle,
    _getDOM,
    _each
} from "./utils/helpers";

interface iIntroConfig {
    except: string[],
    isCanScroll: boolean,
    refreshToTop: boolean
}

interface iBoxBounds {
    top: number,
    left: number,
    bottom: number,
    right: number
}

const enum DirStr {
    RT = "RT",
    BR = "BR",
    LB = "LB",
    TR = "TR"
}

// class
export class Intro {
    config: iIntroConfig;
    container: any;

    queues: HTMLElement[]; // DOMS data-step dom
    excepts: HTMLElement[]; // Array except dom
    addDomData: any;  // Array all append dom
    currentDom: HTMLElement; // current dom of highlight 

    isEnd: boolean; // introduce is over
    prevIndex: number; // prev index
    eq: number;

    bounds: iBoxBounds; // The distance info from the box to window 盒子距离视窗的距离
    dir: string; // The direction of tipbox
    tipIndex: HTMLElement;
    tipInfo: HTMLElement;
    tipBox: HTMLElement;
    tipTra: HTMLElement;
    btnBox: HTMLElement;
    btnNext: HTMLElement;
    btnSkip: HTMLElement;
    // init
    constructor(el: string, config: iIntroConfig = {
        except: [],
        isCanScroll: false,
        refreshToTop: false
    }) {
        let domSteps = _getDOM("[data-step]");
        // init 
        this.container = document.querySelector(el);
        this.config = config;
        this.queues = [];
        this.addDomData = {};
        this.excepts = [];
        this.isEnd = false;
        this.prevIndex = -1;
        this.eq = 0;
        this.dir = DirStr.RT;
        this.bounds = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        // if config 'refreshToTop' is true,then scroll to top after refresh
        if (this.config.refreshToTop) {
            window.addEventListener("beforeunload", () => {
                window.scrollTo(0, 0);
            });
        }
        // except doms
        if (this.config.except && this.config.except.length > 0) {
            (this.config.except).forEach((selector) => {
                let dom = _getDOM(selector);
                dom.classList.add("intro-highlight");
                this.excepts.push(dom);
            });
        }
        // add queue
        _each(domSteps, (dom: any) => {
            this.queues[dom.dataset.step - 1] = dom;
        });
        this.currentDom = this.queues[0];

        // make mask
        this.addBackScreen(this.container, this.config.isCanScroll);

        // ========= make tips ==========
        // position layer
        Utils.helpLayer = document.createElement("div");
        (Utils.helpLayer as any).id = "b1";
        (Utils.helpLayer as any).className = "intro-helplayer";

        // reference layer
        Utils.referenceLayer = document.createElement("div");
        (Utils.helpLayer as any).className = "intro-helplayer intro-reference";
        (Utils.helpLayer as any).innerHTML = `
            <div class="intro-tip tip-rt" id="intro_tipBox">
                <p class="intro-tip-text" id="tipInfo">Hello,I'm a tip</p>
                <div class="intro-tip-item" id="tipBtnBox">
                    <span id="intro_btn_next" class="intro_btn">next</span>
                    <span id="intro_btn_skip" class="intro_btn">skip</span>
                </div>
                <div class="intro-tip-trangle tra-left" id="intro_tipTra"></div>
            </div>
            <div class="intro-index" id="tipIndex">1</div>
        `;

        this.container.appendChild(Utils.helpLayer);
        this.container.appendChild(Utils.referenceLayer);

        this.tipIndex = _getDOM("#tipIndex");
        this.tipInfo = _getDOM("#tipInfo");
        this.btnBox = _getDOM("#tipBtnBox");
        this.tipBox = _getDOM("#intro_tipBox");
        this.tipTra = _getDOM("#intro_tipTra");
        this.btnNext = _getDOM("#intro_btn_next"); // btn next
        this.btnSkip = _getDOM("#intro_btn_skip"); // btn skip

        // next
        this.btnNext.addEventListener("click", () => {
            this.next();
        }, false);
        // skip
        this.btnSkip.addEventListener("click", () => {
            this.destory();
        }, false);

        _setStyle(Utils.helpLayer, {
            "opacity": "0"
        });
        // save dom
        this.addDomData["helplayer"] = Utils.helpLayer;
        this.addDomData["referenceLayer"] = Utils.referenceLayer;

        // default to step 1
        this.next(0);
        // resize
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    // next
    next(): Intro
    next(index: number): Intro
    next(index?: number): Intro {
        if (typeof index != "undefined") {
            if (this.prevIndex != index) {
                this.eq = index;
                this.prevIndex = index;
            } else {
                return this;
            }
        }
        if (this.isEnd) {
            return this;
        }
        this.eq = this.eq >= this.queues.length ? -1 : this.eq;

        this.currentDom = this.queues[this.eq] || this.queues[0]; // eq 0  data-step 0
        let size = this.currentDom.getBoundingClientRect();
        let csize = this.container.getBoundingClientRect();

        if (this.eq == -1) {
            // destory
            this.destory();
            // scrollTo start step
            this.scrollTo(0);

            this.isEnd = true;
        } else {
            // reset info but curdom
            this.queues.forEach((dom, index) => {
                if (index != this.eq) {
                    dom.classList.remove("intro-highlight");
                }
            });

            // highlight currentDom target
            setTimeout(() => {
                this.scrollTo(size.top, () => {
                    this.highlight();
                    this.eq++;
                });
            }, 0);
        }

        return this;
    }
    // destory
    destory() {
        // remove all add dom
        for (let key in this.addDomData) {
            this.addDomData[key] && this.addDomData[key].remove();
        }
        // remove all class
        this.queues.forEach((dom) => {
            dom.classList.remove("intro-highlight");
        });
        this.excepts.forEach((dom) => {
            dom.classList.remove("intro-highlight");
        });
        this.container.classList.remove("intro-container");
    }
    // add bg of target
    addBackScreen(target: HTMLElement, isCanScroll: boolean) {
        let bg = document.createElement("div");

        bg.dataset.flag = "bg";
        bg.className = "intro-bg";
        bg.style.position = isCanScroll ? "absoluted" : "fixed";

        target.classList.add("intro-container");
        target.appendChild(bg);
        this.addDomData["bg"] = bg;
    }
    // move Utils.helpLayer and highlight target
    highlight() {
        _setStyle(Utils.helpLayer, {
            "opacity": "1"
        });

        // change tip info
        this.tipInfo.innerText = this.currentDom.dataset.intro || '';
        this.tipIndex.innerText = this.currentDom.dataset.step || '';

        // isRequired
        if (this.currentDom.dataset.required) {
            _setStyle(this.btnBox, {
                "display": "none"
            });
        } else {
            _setStyle(this.btnBox, {
                "display": "block"
            });
        }

        //addclass intro-highlight
        !(this.currentDom.classList.contains("intro-highlight")) && this.currentDom.classList.add("intro-highlight");

        this.resize();
    }
    // resize box
    resize() {
        let size = this.currentDom.getBoundingClientRect();
        let csize = this.container.getBoundingClientRect();

        _setStyle(Utils.helpLayer, {
            "top": size.top - csize.top + "px",
            "left": size.left - csize.left + "px",
            "width": size.width + "px",
            "height": size.height + "px"
        });
        _setStyle(Utils.referenceLayer, {
            "top": size.top - csize.top + "px",
            "left": size.left - csize.left + "px",
            "width": size.width + "px",
            "height": size.height + "px"
        });

        this.bounds = {
            top: size.top,
            left: size.left,
            bottom: window.innerHeight - size.top - size.height,
            right: csize.width - size.right
        };

        // resize tipbox
        let tsize = this.tipBox.getBoundingClientRect();

        if (this.bounds.right > tsize.width) {
            this.dir = DirStr.RT;
        } else if (this.bounds.bottom > tsize.height) {
            this.dir = DirStr.BR;
        } else if (this.bounds.left > tsize.width) {
            this.dir = DirStr.LB;
        } else if (this.bounds.top > tsize.height) {
            this.dir = DirStr.TR;
        } else {
            // 外部没有空间了
            console.log("outter is not null!");
        }
        this.alignTipBox();
    }
    // realign tipbox
    alignTipBox() {
        let data: any = Utils.dirData;
        // remove all tipBox class
        for (let key in data.tipBox) {
            this.tipBox.classList.remove(data.tipBox[key]);
        }
        // add
        this.tipBox.classList.add(data.tipBox[this.dir]);
        // remove all tipTra class
        for (let key in data.tipTra) {
            this.tipTra.classList.remove(data.tipTra[key]);
        }
        // add
        this.tipTra.classList.add(data.tipTra[this.dir]);
    }
    // scroll pos
    scrollTo(dis: number, callback?: Function) {
        let top = dis < 0 ? this.currentDom.getBoundingClientRect().top : dis;

        if (typeof this.currentDom.scrollIntoView === "function") {
            this.currentDom.scrollIntoView({
                "behavior": "smooth"
            });
        } else if (typeof window.scrollTo === "function") {
            window.scrollTo({
                "behavior": "smooth",
                "top": top
            });
        } else {
            if (this.container.tagName !== "BODY" && this.container.tagName !== "HTML") {
                this.container.scrollTop = top;
            } else {
                document.documentElement && (document.documentElement.scrollTop = top);
                document.body.scrollTop = top;
            }
        }
        callback && callback();
    }
}