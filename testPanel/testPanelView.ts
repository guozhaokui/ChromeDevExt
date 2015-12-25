
module WebInspector{
    "use strict"
    export class testPanelView extends VBox implements Searchable{
        _searchableView:SearchableView;
        _contentsElement:HTMLElement;
        _visibleViewMessages:Array<any>;
        _urlToMessageCount:any;
        _hiddenByFilterCount:number;
        _clearConsoleButton:StatusBarButton;
        
        constructor(){
            super(false);
            
            this.registerRequiredCSS("ui/filter.css");
            this.registerRequiredCSS("console/consoleView.css");
            
            this._searchableView = new WebInspector.SearchableView(this);
            this._searchableView.setMinimalSearchQuerySize(0);
            this._searchableView.show(this.element);           
            
            this._contentsElement = this._searchableView.element;
            this._contentsElement.classList.add("console-view");
            this._visibleViewMessages = [];
            this._urlToMessageCount = {};
            this._hiddenByFilterCount = 0;

            this._clearConsoleButton = new WebInspector.StatusBarButton(WebInspector.UIString("Clear console log."), "clear-status-bar-item");
            //this._clearConsoleButton.addEventListener("click", this._requestClearMessages, this);
            
             var statusBar = new WebInspector.StatusBar(this._contentsElement);
             statusBar.appendStatusBarItem(this._clearConsoleButton);
            
        }
        
        searchCanceled():void{
            
        }
        performSearch(searchConfig, shouldJump:boolean, jumpBackwards:boolean):void{
            
        }        
    }
    
}