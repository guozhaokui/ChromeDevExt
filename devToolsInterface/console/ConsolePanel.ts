///<reference path="../devTools.ts" />
module WebInspector {
    
    /**
     * ConsolePanel对应的是Console面板。
     */
    export class ConsolePanel extends WebInspector.Panel {
        //对应的view
        _view: ConsoleView;
        static _consoleView: ConsoleView;
        static _instanceObject:ConsolePanel;
        constructor() {
            super("console");
            this._view = ConsolePanel._view();
        }
        
		/*
			返回一个view.第一次的时候会创建一个。
		*/
        static _view(): ConsoleView {
            if (!ConsolePanel._consoleView)
                ConsolePanel._consoleView = new ConsoleView();
            return ConsolePanel._consoleView;
        }

        defaultFocusedElement(): HTMLElement {
            return null;
        }

        /**
         * 要显示出来。 **
         */
        wasShown(): void {
            super.wasShown();
            this._view.show(this.element);
        }

        willHide() { }

        static show(): void { }	//WebInspector.inspectorView.setCurrentPanel(WebInspector.ConsolePanel._instance());
        
        static _instance(){
            if( !ConsolePanel._instanceObject) ConsolePanel._instanceObject = new ConsolePanel;
            return ConsolePanel._instanceObject;
        }
    }

    class ConsolePanel_WrapperView extends WebInspector.VBox {
        static _instance: ConsolePanel_WrapperView;
        _view: ConsoleView;
        constructor() {
            super(false);
            this.element.classList.add("console-view-wrapper");
            ConsolePanel_WrapperView._instance = this;

            this._view = WebInspector.ConsolePanel._view();
            // FIXME: this won't be needed once drawer becomes a view.
            this.wasShown();
        }

        wasShown() {
            if (!WebInspector.inspectorView.currentPanel() || WebInspector.inspectorView.currentPanel().name !== "console")
                this._showViewInWrapper();
        }
        
        //把consoleView显示出来
        _showViewInWrapper() {
            this._view.show(this.element);
        }

    }
    
    class ConsolePanel_ConsoleRevealer {
        reveal(object:Object) {
            var consoleView = WebInspector.ConsolePanel._view();
            if (consoleView.isShowing()) {
                consoleView.focus();
                return Promise.resolve();
            }
            WebInspector.inspectorView.showViewInDrawer("console");
            return Promise.resolve();
        }        
    }
}