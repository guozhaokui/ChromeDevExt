
module WebInspector{
    export class ConsoleModel extends SDKModel{
        //消息的缓存。
        _messages:Array<ConsoleMessage>=[];
        warnings:number=0;
        errors:number=0;
        _consoleAgent:any;
        _enablingConsole:boolean;
        
        constructor(target:Target){
            super(ConsoleModel, target);
            //this._consoleAgent = target.consoleAgent;
            /**
             * window.Agents.prototype["register" + domain + "Dispatcher"] = registerDispatcher;
             * 即 "register" + domain + "Dispatcher" 实际绑定到某一个具体对象的 registerDispatcher 函数上了。
             */
            target['registerConsoleDispatcher'](new ConsoleDispatcher(this));
            this._enableAgent();
        }

        //能接受的事件        
        static Events = {
            ConsoleCleared: "ConsoleCleared",
            MessageAdded: "MessageAdded",
            CommandEvaluated: "CommandEvaluated",
        }
        
        _enableAgent():void{
            
        }
        
        target():any{
            return null;
        }
        
        /**
         * 从ConsoleDispatcher 调过来的
         */
        addMessage(msg:ConsoleMessage):void{
            //if (WebInspector.NetworkManager.hasDevToolsRequestHeader(msg.request))
            //    return;

            msg.index = this._messages.length;
            this._messages.push(msg);
            //this._incrementErrorWarningCount(msg);

            this.dispatchEventToListeners(WebInspector.ConsoleModel.Events.MessageAdded, msg);            
        }
    }
    
    /**
     * 消息的格式
     */
    class ConsoleMessage{
        index:number;
        source      :string;
        level       :string; 
        messageText :string; 
        type        :string; 
        url         :string; 
        line        :number; 
        column      :number; 
        requestId;
        parameters:Array<RemoteObject>; 
        stackTrace; 
        timestamp   :number; 
        isOutdated  :boolean; 
        executionContextId;
        asyncStackTrace; 
        scriptId    :string;
        text:string;
        networkRequestId:number;
        length:number;
            
        constructor(target:Target, 
            source      :string, 
            level       :string, 
            messageText :string, 
            type        :string, 
            url         :string, 
            line        :number, 
            column      :number, 
            requestId, 
            parameters, 
            stackTrace, 
            timestamp   :number, 
            isOutdated  :boolean, 
            executionContextId, 
            asyncStackTrace, 
            scriptId    :string ){
        }
    }
    
    /**
     * 消息对应到这里的函数，console的三个相关函数。
     */
    //implements ConsoleAgent.Dispatcher
    class ConsoleDispatcher {
        _console:ConsoleModel;
        constructor(console:ConsoleModel){
            this._console=console;
        }
        
        messageAdded(payload:ConsoleMessage) {
            var consoleMessage = new ConsoleMessage(
                this._console.target(),
                payload.source,
                payload.level,
                payload.text,
                payload.type,
                payload.url,
                payload.line,
                payload.column,
                payload.networkRequestId,
                payload.parameters,
                payload.stackTrace,
                payload.timestamp * 1000, // Convert to ms.
                this._console._enablingConsole,
                payload.executionContextId,
                payload.asyncStackTrace,
                payload.scriptId);
            this._console.addMessage(consoleMessage);
        }
        
    }
}