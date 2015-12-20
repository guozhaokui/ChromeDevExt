///<reference path="../inspectorBackend.ts" />
///<reference path="../devTools.ts" />

module WebInspector{
    interface Target__capabilities{
        cap:string;
        can:boolean;
    }
    export class Target{
        _name:string;
        _connection:BackEnd_Connection;
        consoleModel:ConsoleModel;
        _id:number;
        _capabilities:Object;//Target__capabilities
        static _nextId:number;
        /**
         * @param connection InspectorBackendClass.Connection 类型
         */
        constructor(name:string, connection:any, callback?:Target){
            this._name=name;
            this._connection= connection;
            //connection.addEventListener(InspectorBackendClass.Connection.Events.Disconnected, this._onDisconnect, this);
            this._id = WebInspector.Target._nextId++;
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
    
    export class TargetManager extends WebInspector.Object{
        _targets:Array<Target>;
        _observers:Array<any>;
        _modelListeners:any;
        _allTargetsSuspended:boolean;
        constructor(){
            super();
            this._allTargetsSuspended=false;
        }    
        
        /**
         * 返回的是复制的。
         */
        targets():Array<Target>{
            return this._targets.slice();
        }        
    }
    
    //全局的TargetManager
    export var targetManager = new TargetManager();
}

