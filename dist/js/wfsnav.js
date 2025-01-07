class WFSnav{constructor(t){this.config=t,this.numberOptions=["duration","marginNav","showDown","showUp","mobileFinish","mobileMarginNav"],this.dataAttrbox="data-nav",this.dataAttrlink="data-nav-link",this.options={conteiner:"#header",activeClass:"active",activeClassElement:"elements",elements:"> li > a",duration:1300,typePath:"#",navHeight:!0,marginNav:0,showDown:30,showUp:50,mobileFinish:992,mobileNavHeight:!1,mobileMarginNav:0,mobileCloseOpenEl:".close-momile-nav",mobileCloseCl:"open-mobile-menu"},"object"==typeof t&&(this.options={...this.options,...t}),this.init()}init(){this.#t()}#t(){this.flagValidation=!0,this.numberOptions.forEach((t=>{Number.isFinite(this.options[t])||Number.isNaN(this.options[t])||(alert(`WFSnav ${t} = ${this.options[t]} - should be a number`),this.flagValidation=!1)})),this.flagValidation&&(this.conteiner=document.querySelector(this.options.conteiner),this.conteiner&&(this.WFSnavBody=document.body,this.elements=this.conteiner.querySelectorAll(this.options.elements),this.navLinkLength=this.elements.length,this.navLinkCount=this.navLinkLength-1,this.navLinkLength>0?(console.log("!!! START - WFSnav !!!"),this.windowHeight=window.innerHeight,this.bodyHeight=this.WFSnavBody.offsetHeight,this.conteinerHight=this.conteiner.offsetHeight,this.closeOpenLink=this.WFSnavBody.querySelectorAll(this.options.mobileCloseOpenEl),this.activeFlag=!1,this.closeOpenLink.length>0&&this.#i(),this.#e(),this.#s(),this.allBox=[],Array.from(this.elements).forEach(((t,i)=>{this.allBox.push(this.WFSnavBody.querySelector(t.getAttribute("href")))})),this.#o(),this.#n(),this.#l()):console.log("!!! WFSnav : no items found !!!")))}#h(t){window.scrollTo({top:t,left:0,behavior:"smooth"})}#e(){this.windowWidth=window.innerWidth;let t=0,i=0;return this.windowWidth<this.options.mobileFinish?(this.mobile=!0,this.options.mobileNavHeight&&(t=this.conteinerHight),i=this.options.mobileMarginNav):(this.mobile=!1,this.options.navHeight&&(t=this.conteinerHight),i=this.options.marginNav),this.space=t+i,[{mobile:this.mobile},{windowWidth:this.windowWidth}]}#a(){null!=typeof this.avtiveElement&&null!=this.avtiveElement?this.avtiveElement.classList.contains(this.options.activeClass)||(this.elements.forEach((t=>{t.classList.remove(this.options.activeClass)})),this.avtiveElement.classList.add(this.options.activeClass),this.activeFlag=!0):this.activeFlag&&this.#r()}#r(){this.elements.forEach((t=>{t.classList.remove(this.options.activeClass)})),this.activeFlag=!1}#l=()=>{this.positionTop=window.scrollY,this.scrollFlag=this.positionTop>=this.lastScrollTop,this.lastScrollTop=this.positionTop,this.visibleFirst=!1,this.notViseble=!0,this.allBox.forEach(((t,i)=>{this.goToBoxPosition=t.getBoundingClientRect().y+window.scrollY-this.space,this.windowHeight=window.innerHeight,this.bodyHeight=this.WFSnavBody.offsetHeight,this.scrollFlag?this.goToBoxPosition-this.space-t.getBoundingClientRect().height/(100/this.options.showDown)<=this.positionTop&&this.positionTop+this.windowHeight>this.goToBoxPosition&&(this.avtiveElement=document.querySelector(`[${this.dataAttrlink}="${t.getAttribute(this.dataAttrbox)}"]`),this.avtiveElementCount=i):this.visibleFirst||(this.goToBoxPosition<=this.positionTop&&this.goToBoxPosition+this.space+t.getBoundingClientRect().height/(100/this.options.showUp)>=this.positionTop||this.positionTop<=this.goToBoxPosition&&this.positionTop+this.windowHeight>this.goToBoxPosition)&&(this.avtiveElement=document.querySelector(`[${this.dataAttrlink}="${t.getAttribute(this.dataAttrbox)}"]`),this.avtiveElementCount=i,this.visibleFirst=!0),0==this.avtiveElementCount&&this.allBox[0].getBoundingClientRect().y>=this.windowHeight-this.space-this.allBox[0].getBoundingClientRect().height/(100/this.options.showDown)&&(this.avtiveElement=null),this.avtiveElementCount==this.navLinkCount&&this.allBox[this.navLinkCount].getBoundingClientRect().y+this.allBox[this.navLinkCount].getBoundingClientRect().height<0&&(this.avtiveElement=null),this.#a()}))};onScroll(){return[{navElements:this.elements},{navLinkLength:this.navLinkLength},{avtiveElement:this.avtiveElement},{avtiveElementCount:this.avtiveElementCount},{sections:this.allBox}]}#o(){window.addEventListener("scroll",this.#l)}#c=()=>{const t=this;let i;i&&clearTimeout(i),i=setTimeout((function(){t.windowHeight=window.innerHeight,t.bodyHeight=t.WFSnavBody.clientHeight,t.#e()}),500)};#n(){window.addEventListener("resize",this.#c)}#v(t){this.attrElement=t.getAttribute("href"),this.fPrefix=this.attrElement.substring(0,this.options.typePath.length),this.elId=this.attrElement.slice(this.options.typePath.length)}#d(t){this.#v(t),this.fPrefix===this.options.typePath&&(this.goToBox=document.getElementById(this.elId),this.#h(this.goToBox.getBoundingClientRect().y+window.scrollY-this.space))}#m(t,i){i.preventDefault(),this.#d(t),this.closeMobileNav()}#s(){this.listenersElement=new Map,Array.from(this.elements).forEach(((t,i)=>{this.#v(t),document.getElementById(this.elId).setAttribute(this.dataAttrbox,this.elId),t.setAttribute(this.dataAttrlink,this.elId);const e=i=>this.#m(t,i);this.listenersElement.set(t,e),t.addEventListener("click",e)}))}closeMobileNav(){this.WFSnavBody.classList.remove(this.options.mobileCloseCl)}openMobileNav(){this.WFSnavBody.classList.add(this.options.mobileCloseCl)}#g(t){t.preventDefault(),this.WFSnavBody.classList.contains(this.options.mobileCloseCl)?this.closeMobileNav():this.openMobileNav()}#i(){this.listeners=new Map,Array.from(this.closeOpenLink).forEach(((t,i)=>{const e=t=>this.#g(t);this.listeners.set(t,e),t.addEventListener("click",e)}))}#p(){this.closeMobileNav(),Array.from(this.closeOpenLink).forEach(((t,i)=>{const e=this.listeners.get(t);e&&(t.removeEventListener("click",e),this.listeners.delete(t))}))}#u(){Array.from(this.elements).forEach(((t,i)=>{const e=this.listenersElement.get(t);e&&(t.removeEventListener("click",e),this.listenersElement.delete(t)),t.removeAttribute(this.dataAttrlink)}))}#w(){Array.from(this.allBox).forEach((t=>{t.removeAttribute(this.dataAttrbox)}))}destroy(){this.elements&&(this.#u(),this.#r(),this.#w(),window.removeEventListener("resize",this.#c),window.removeEventListener("scroll",this.#l),this.closeOpenLink.length&&this.#p())}}
//# sourceMappingURL=../maps/WFSnav.js.map
