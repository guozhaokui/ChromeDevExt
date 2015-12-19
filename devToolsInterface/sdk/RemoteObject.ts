
module WebInspector{
    
    export class RemoteObject{
        
    }
    
    export class LocalJSONObject extends RemoteObject{
        _value:any;
        constructor(value){
            super();
            this._value=value;
        }
    }
    
}