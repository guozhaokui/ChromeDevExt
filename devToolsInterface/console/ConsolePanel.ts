///<reference path="../devTools.ts" />
module WebInspector{
    
    /**
     * ConsolePanel对应的是Console面板。
     */
    export class ConsolePanel extends WebInspector.Panel{
        //对应的view
        _view:ConsoleView;
        static _consoleView:ConsoleView;
        
        constructor(){
            super("console");
            this._view = ConsolePanel._view();
        }
        
		/*
			返回一个view.第一次的时候会创建一个。
		*/
		static _view():ConsoleView{
            if( !ConsolePanel._consoleView )
                ConsolePanel._consoleView = new ConsoleView();
            return ConsolePanel._consoleView;
        }
        
        defaultFocusedElement():HTMLElement{
            return null;
        }
        
        wasShown():boolean{
            return false;
        }
        
        willHide(){}
        
        static show():void{}	//WebInspector.inspectorView.setCurrentPanel(WebInspector.ConsolePanel._instance());
    }
    
    class ConsolePanel_WrapperView extends WebInspector.VBox{
        static _instance:ConsolePanel_WrapperView;
        _view:ConsoleView;
        constructor(){
            super(false);
             this.element.classList.add("console-view-wrapper");
            ConsolePanel_WrapperView._instance = this;

            this._view = WebInspector.ConsolePanel._view();
            // FIXME: this won't be needed once drawer becomes a view.
            this.wasShown();             
        }
        
        wasShown(){
            if (!WebInspector.inspectorView.currentPanel() || WebInspector.inspectorView.currentPanel().name !== "console")
                this._showViewInWrapper();
        }
        
        //把consoleView显示出来
        _showViewInWrapper(){
            this._view.show(this.element);
        }        
                
    }
}