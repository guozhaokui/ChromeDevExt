
module WebInspector{
	/*
		view的基类
		目录：
		front-end/ui 
	*/	
	interface Constraints{
		
	}
	
	export class View extends Object{
		constructor (isWebComponent:boolean){
            super();
        }
		element:HTMLElement;
		/* 
			如果是 isWebComponent ，这个是element的子。否则那他们是一个对象。
		*/
		contentElement:HTMLElement;	
		
		_isWebComponent:boolean;
		_shadowRoot:any;
		_visible:boolean;
		_isRoot:boolean;
		_isShowing:boolean;
		_children:Array<View>;
		_hideOnDetach:boolean;
		_cssFiles:Array<any>;
		_notificationDepth:number;
		//如果没有设置的话，就没有，使用element
		_defaultFocusedElement:HTMLElement;
		
		defaultFocusedElement():HTMLElement{return null;}
		setDefaultFocusedElement(e:HTMLElement):void{}
		
		calculateConstraints():Constraints{return null;}

        /**
         * 给当前element设置一个css
         */
        registerRequiredCSS(cssFile:string):void{
            (this._isWebComponent ? this._shadowRoot : this.element).appendChild(
                WebInspector.View.createStyleElement(cssFile));    
        }
        
        /**
         * 创建一个style标签，设置内容
         */
        static createStyleElement(cssFile:string):HTMLElement{
            var content = Runtime.cachedResources[cssFile] || "";
            if (!content)
                console.error(cssFile + " not preloaded. Check module.json");
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            styleElement.textContent = content;
            return styleElement;            
        }
        
        /**
         * 显示出这个view来。
         * 可以指定放到哪个element下面
         */
        show(parentElement:HTMLElement, insertBefore?:HTMLElement){
            if(this.element.parentElement!=parentElement){
                if(this.element.parentElement)
                    this.detach();
                var currentParent = parentElement;
                
//                 while (currentParent && !currentParent.__view)
//                     currentParent = currentParent.parentElementOrShadowHost();
// 
//                 if (currentParent) {
//                     this._parentView = currentParent.__view;
//                     this._parentView._children.push(this);
//                     this._isRoot = false;
//                 } else
//                     WebInspector.View.__assert(this._isRoot, "Attempt to attach view to orphan node");
                    
            }else if( this._visible)
                return;
            this._visible=true;
        }
        
        detach(overrideHideOnDetach?:boolean){
            var parentElement = this.element.parentElement;
            if(!parentElement)
                return;
        }
	}
	
	export class  VBox extends View{
		constructor (isWebComponent?:boolean){
            super(isWebComponent);
            this.element.classList.add('vbox');
        }	
		calculateConstraints():Constraints{
            return null;
        }
	}
	
	export class HBox extends View{
		constructor(isWebComponent:boolean){	//element.classList.add('hbox')
            super(isWebComponent);
        }
		calculateConstraints():Constraints{
            return null;
        }
	}
    
}