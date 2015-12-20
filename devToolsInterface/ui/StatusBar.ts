
///<reference path="../devTools.ts" />
/**
 * status相关的控件
 * 
 */

//
interface Element{
    createChild(elementName:string, className?:string):Element; 
}

module WebInspector{
    export class StatusBar{
        /**
         * @param parentElement 父对象
         */
        constructor(parentElement:HTMLElement){
            
        }
    }
    
    export class StatusBarItem extends WebInspector.Object{
        element:HTMLElement;
        _enabled:boolean;
        _visible:boolean;
        constructor(element:HTMLElement){
            super();
            this.element = element;
            this.element.classList.add("status-bar-item");
            this._enabled = true;
            this._visible = true;            
        }
    }
    
    interface StatusBarCounter__conters{
        element:Element;
        counter:string;
        value:number;
        title:string;
    }

    export class StatusBarCounter extends StatusBarItem{
        _counters:Array<StatusBarCounter__conters>;
        constructor(counters:Array<string>, className:string){
            super( createElementWithClass("div", "status-bar-counter hidden"));
            if (className)
                this.element.classList.add(className);
            this.element.addEventListener("click", this._clicked.bind(this), false);
            /** @type {!Array.<!{element: !Element, counter: string, value: number, title: string}>} */
            this._counters = [];
            for (var i = 0; i < counters.length; ++i) {
                var element = this.element.createChild("span", "status-bar-counter-item");
                element.createChild("div", counters[i]);
                element.createChild("span");
                this._counters.push({counter: counters[i], element: element, value: 0, title: ""});
            }
            this._update();
        }
        _clicked() {
            //this.dispatchEventToListeners("click");
        }      
          
        _update() {
            var total = 0;
            var title = "";
            for (var i = 0; i < this._counters.length; ++i) {
                var counter = this._counters[i];
                var value = counter.value;
                if (!counter.value) {
                    counter.element.classList.add("hidden");
                    continue;
                }
                counter.element.classList.remove("hidden");
                counter.element.classList.toggle("status-bar-counter-item-first", !total);
                //counter.element.querySelector("span").textContent = value;
                total += value;
                if (counter.title) {
                    if (title)
                        title += ", ";
                    title += counter.title;
                }
            }
            this.element.classList.toggle("hidden", !total);
            this.element.title = title;
        }
    }
    
    export class StatusBarButtonBase extends StatusBarItem{
        constructor(title:string, className:string, states?:number){
            super(createElementWithClass("button", className + " status-bar-item"));
            //omitted
        }
    }
    
    export class StatusBarButton extends StatusBarButtonBase{
        constructor(title:string, className:string, states?:number){
            super(title,className,states);
        }
    }
}