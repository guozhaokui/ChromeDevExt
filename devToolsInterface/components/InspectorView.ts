///<reference path="../devTools.ts" />

module WebInspector{
    export class InspectorView extends VBox{
        _currentPanel:Panel;
        _drawerSplitView:any;
        _drawer:Drawer;
        
        constructor(){
            super();
            this._drawer = new WebInspector.Drawer(this._drawerSplitView);
        }
        
        currentPanel(){
            return this._currentPanel;
        }        
        
        /**
         * @param {string} id
         * @param {boolean=} immediate
         */
        showViewInDrawer(id:string, immediate?:boolean):void{
            this._drawer.showView(id, immediate);
        }        
    }
}