
///<reference path="./Runtime.ts" />
module WebInspector{
	export class Panel extends WebInspector.VBox{
        _panelName:string;
        /**
         * Object.<number, function(Event=):boolean>
         */
        _shortcuts:Object; 
        /**
         * 创建一个panel，添加两个style
         */
        constructor(name:string){
            super(false);
            this.element.classList.add('panel');
            this.element.classList.add(name );
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
        _extension:Runtime_Extension;// Runtime.Extension;
        constructor(extension:Runtime_Extension){
            
        }
    }    
}