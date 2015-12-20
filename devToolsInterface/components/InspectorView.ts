///<reference path="../devTools.ts" />

module WebInspector{
    export class InspectorView extends VBox{
        _currentPanel:Panel;
        
        constructor(){
            super();
        }
        
        currentPanel(){
            return this._currentPanel;
        }        
    }
}