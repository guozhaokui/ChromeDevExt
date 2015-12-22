
///<reference path="./Runtime.ts" />
module WebInspector{
	export class Panel extends VBox{
        _panelName:string;
        constructor(name:string){
            super(false);
            this._panelName=name;
        }
		wasShown():boolean{
            return false;
        }
        
        get name():string{
            return this._panelName;
        }
	}
	
	export class PanelFactory{
        constructor(){
            
        }
		createPanel():Panel{
            return null;
        }
	}	    
    export class RuntimeExtensionPanelDescriptor{
        _name:string;
        _title:string;
        _extension:Runtime.Extension;
        constructor(extension:Runtime.Extension){
            
        }
    }    
}