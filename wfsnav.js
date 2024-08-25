/**
 * --------------------------------------------------------------------------
 * WebFullSet WFSnav.js
 * NAV GO TO BOX SCROLL PLUGIN
 * Licensed under MIT ??????????????????????????????????
 * --------------------------------------------------------------------------
 * OUR CONTACTS
 * Skype or telegram: @hjvf_07
 * Mail: onlycssclub@gmail.com
 * --------------------------------------------------------------------------
 * Vercion: 1.0.0
 * Date:    30.10.2023
 * --------------------------------------------------------------------------
 */

class WFSnav {
    constructor(config){
        this.config = config;
        this.numberOptions = ['duration', 'marginNav', 'mobileFinish', 'mobileMarginNav'];
        this.dataAttrbox = `data-nav`;
        this.dataAttrlink = `data-nav-link`;
        this.options = {
            conteiner: '#header',
            activeClass: 'active',                  // activeClass        - A class that hangs on the active element
            activeClassElement: 'elements',         // activeClassElement - elements - link, parent, '.findelementclass'
            elements: '> li > a',                   // elements           - Menu links that correspond to blocks
            duration: 1300,                         // duration           - Animation time
            typePath: '#',                          // typePath           - Type of prefix to the ID block. Sometimes it is necessary to change the type of the link so that it does not intersect with other elements (for example, an empty href).
            navHeight: true,                        // navHeight          - "for desctop" Take into account navigation altitude in position calculations. For example, if the navigation is close to the top.
            marginNav: 0,                           // marginNav          - "for desctop" Add extra padding to the active block. If the block does not have paddings, so that the menu does not move closer.
            showDown: 30,                           // marginNav          - How long to switch the active element in percentage when scrolling down (height of the visible screen).
            showUp: 50,                             // showUp             - How long to switch the active element in percentage when scrolling up (height of the visible screen).
            mobileFinish: 992,                      // mobileFinish       - The maximum resolution up to which resolution the mobile version works.
            mobileNavHeight: false,                 // mobileNavHeight    - "for mobile" Take into account navigation altitude in position calculations. For example, if the navigation is close to the top.
            mobileMarginNav: 0,                     // mobileMarginNav    - "for mobile" Add extra padding to the active block. If the block does not have paddings, so that the menu does not move closer.
            mobileClose: true,                      // mobileClose        - If you have a mobile menu, it opens/closes. When you click on a menu item, the function will execute a trichar on the close button.
            mobileCloseEl: '.close-momile-nav'      // mobileCloseEl      - We will look for a button that closes the menu.
        }
        
        if(typeof config === 'object'){
            this.options = {...this.options, ...config}
        }

        this.init();
    }
    
    init(){
        this.#validateOption();
    }

    #validateOption(){
        this.flagValidation = true;

        this.numberOptions.forEach(numberOption => {
            if(!Number.isFinite(this.options[numberOption]) && !Number.isNaN(this.options[numberOption]) ) {
                alert(`WFSnav ${numberOption} = ${this.options[numberOption]} - should be a number`)
                this.flagValidation = false;
            }
        });

        if(this.flagValidation){
            this.conteiner = document.querySelector(this.options.conteiner);
            this.elements = document.querySelectorAll(this.options.elements);
            this.navLinkLength = this.elements.length;

            if(this.navLinkLength > 0){
                console.log(`!!! START - WFSnav !!!`);
                this.bodyEl = document.documentElement;
                this.windowHeight = window.innerHeight;
                this.bodyHeight = this.bodyEl.clientHeight;
                this.conteinerHight = this.conteiner.offsetHeight;

                this.checkMobile();
                this.#setupGoto();

                this.allBox = document.querySelectorAll(`[${this.dataAttrbox}]`);

                this.#scrollWindow();
                this.#resizeWindow();
                this.#actionOnScroll();
            }else {
                console.log(`!!! WFSnav : no items found !!!`);
            }
        }
    }

    scrollWindowTo(top){
        window.scrollTo({
            top: top,
            left: 0,
            behavior: "smooth"
        });
    }

    checkMobile(){
        this.windowWidth = window.innerWidth;
        let space1 = 0; 
        let space2 = 0;
        if(this.windowWidth < this.options.mobileFinish){
            this.mobile = true;
            if(this.options.mobileNavHeight){
                space1 = this.conteinerHight;
                space2 = this.options.mobileMarginNav;
            }
        }
        else {
            this.mobile = false;
            if(this.options.navHeight){
                space1 = this.conteinerHight;
                space2 = this.options.marginNav;
            }
        }

        this.space = space1 + space2;

        return [{mobile: this.mobile},{windowWidth: this.windowWidth}]
    }

    closeNavMobile(closeLink){
        if(this.mobile && this.options.mobileClose){
            if(typeof closeLink != 'undefined' && closeLink != ''){
                this.closeLink = closeLink;
            }
            this.closeLink = this.bodyEl.querySelector(this.options.mobileCloseEl);
            if(this.closeLink !== null){
                this.closeLink.click();
            }
        }
    }

    #controllClass(activeElement){
        if (typeof activeElement != undefined && activeElement != null) {
            if(!activeElement.classList.contains(this.options.activeClass)){
                this.elements.forEach(element => {
                    element.classList.remove(this.options.activeClass);
                });
                activeElement.classList.add(this.options.activeClass);
            }
        }
    }

    #actionOnScroll = () => {
        this.positionTop = window.scrollY;
        this.scrollFlag = (this.positionTop >= this.lastScrollTop) ? true : false;
        this.lastScrollTop = this.positionTop;
        this.visibleFirst = false;

        this.allBox.forEach((element, i) => {
            this.goToBoxPosition = element.getBoundingClientRect().y + window.scrollY - this.space;

            if(this.scrollFlag){
                if (this.goToBoxPosition - this.space - (element.getBoundingClientRect().height/ (100/this.options.showDown)) <= this.positionTop && this.positionTop + this.windowHeight > this.goToBoxPosition) {
                    this.avtiveElement = document.querySelector(`[${this.dataAttrlink}="${element.getAttribute(this.dataAttrbox)}"]`);
                }
            }else {
                if(!this.visibleFirst){
                    if (this.goToBoxPosition  <= this.positionTop && this.goToBoxPosition + this.space + (element.getBoundingClientRect().height / (100/this.options.showUp)) >= this.positionTop) {
                        this.avtiveElement = document.querySelector(`[${this.dataAttrlink}="${element.getAttribute(this.dataAttrbox)}"]`);
                        this.visibleFirst = true;
                    }else {
                        if(this.positionTop <= this.goToBoxPosition && this.positionTop + this.windowHeight > this.goToBoxPosition){
                            this.avtiveElement = document.querySelector(`[${this.dataAttrlink}="${element.getAttribute(this.dataAttrbox)}"]`);
                            this.visibleFirst = true;
                        }
                    }
                }
            }

            this.#controllClass(this.avtiveElement);
        });
    }

    #scrollWindow(){
        window.addEventListener('scroll', this.#actionOnScroll)
    }

    #resizeWindowFunction = () => {
        const _this = this;
        let _time;
        if(_time) clearTimeout(_time);
        _time = setTimeout(function(){
            _this.windowHeight = window.innerHeight;
            _this.bodyHeight = _this.bodyEl.clientHeight;

            _this.checkMobile();
        }, 500);
    }

    #resizeWindow(){
        window.addEventListener('resize', this.#resizeWindowFunction);
    }

    #fingIdElement(trigger){
        this.attrElement = trigger.getAttribute('href');
        this.fPrefix = this.attrElement.substring(0, this.options.typePath.length);
        this.elId = this.attrElement.slice(this.options.typePath.length);
    }

    scrollToBox(trigger){
        this.#fingIdElement(trigger);
        
        if(this.fPrefix === this.options.typePath){
            this.goToBox = document.getElementById(this.elId);
            this.scrollWindowTo(this.goToBox.getBoundingClientRect().y + window.scrollY - this.space);
        }
    }

    #setupGoto(){
        this.elements.forEach((trigger, i) => {
            this.#fingIdElement(trigger);
            document.getElementById(this.elId).setAttribute(this.dataAttrbox, this.elId);
            trigger.setAttribute(this.dataAttrlink, this.elId);

            trigger.addEventListener('click', (eventGoto) => {
                eventGoto.preventDefault();
                this.scrollToBox(trigger);
                this.closeNavMobile();
            });
        });
    }

    destroy(){
        if(this.triggers.length > 0){
            this.triggers.forEach(trigger => {
                trigger.removeEventListener('click', (eventGoto) => {});
                trigger.removeAttribute(this.dataAttrlink);
            });

            this.allBox.forEach(element => {
                element.removeAttribute(this.dataAttrbox);
            });

            window.removeEventListener('resize', this.#resizeWindowFunction);
            window.removeEventListener('scroll', this.#actionOnScroll);
        }
    }
}
//# sourceMappingURL=../maps/WFSnav.js.map
