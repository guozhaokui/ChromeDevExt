///<reference path="../inspectorBackend.ts" />
///<reference path="../devTools.ts" />

module WebInspector{
    export class Target{
        _connection:BackEnd_Connection;
        consoleModel:ConsoleModel;
        /**
         * @param connection InspectorBackendClass.Connection 类型
         */
        constructor(name:string, connection:any, callback?:Target){
        }
        
        _initializeCapability(name:string, callback, error, result:boolean):void{
            
        }
        
        _loadedWithCapabilities(callback):void{
            if(this._connection.isClosed()){
                callback(null);
                return ;
            }
            
            this.consoleModel = new WebInspector.ConsoleModel(this);
            
        }    
    }
    
    export class SDKObject extends WebInspector.Object{
        _target:Target;
        constructor(target:Target){
            super();
            this._target=target;
        }
    }
    export class SDKModel extends SDKObject{
        //modelClass 是一个类
        constructor(modelClass:any, target:Target){
            super(target);
            //target._modelByConstructor.set(modelClass, this);
        }
        
    }
}