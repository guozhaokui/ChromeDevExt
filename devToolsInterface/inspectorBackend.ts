
//NI的后端，主要是接收ws消息，然后转换成事件分发给相应的模块

interface Window{
    //这个是用来给InspectorBackendClass设置 _agentsMap 的
    Agents:(Object)=>void;
}

class windowProtocol{
    _agentsMap:Object;  //(string,object)
    constructor(obj:Object){
        this._agentsMap=obj;
    }
}

class InspectorBackendClass{
	
	//其实使用做map的
	_agentPrototypes:Object;
    _initialized:boolean;
	
	constructor(){
    }
    
    _initProtocolAgentsConstructor(){
        window.Agents = (agentsMap:Object)=>{this._agentPrototypes=agentsMap;}
    }
    //参数总是 ../protocol.json
	//就是注册每个协议对应的模块。
	loadFromJSONIfNeeded(jsonUrl:string){
        
    }
	
    /**
     * @param {string} method 例如 Cosole.messageAdded,是domain.command的形式。
     * @param {!Array.<!Object>} signature
     * @param {!Array.<string>} replyArgs
     * @param {boolean} hasErrorData
     */
	registerCommand(method:string, 
            signature:Array<Object>, 
            replyArgs?:Array<string>, 
            hasErrorData?:boolean):void{
        var domainAndMethod = method.split(".");
        this._agentPrototype(domainAndMethod[0]).registerCommand(domainAndMethod[1], signature, replyArgs, hasErrorData);
        this._initialized = true;
    }
    
    /*
    * 根据协议来生成注册命令。
    * @param schema 是根据JSON协议来生成的Object.
    */
    _generateCommands(schema:Object):string{
        var jsTypes = { integer: "number", array: "object" };
        var rawTypes = {};
        //这个是转换结果，保存了所有的命令
        var result = [];

        interface domainobj{
            domain:string;
            types:any;
            commands?:Array<any>;
            events:Array<any>;
        }
        var domains:Array<domainobj> = schema["domains"] || [];
        for (var i = 0; i < domains.length; ++i) {
            var domain = domains[i];
            for (var j = 0; domain.types && j < domain.types.length; ++j) {
                var type = domain.types[j];
                rawTypes[domain.domain + "." + type.id] = jsTypes[type.type] || type.type;
            }
        }

        function toUpperCase(groupIndex, group0, group1)
        {
            return [group0, group1][groupIndex].toUpperCase();
        }
        function generateEnum(enumName, items)
        {
            var members = []
            for (var m = 0; m < items.length; ++m) {
                var value = items[m];
                var name = value.replace(/-(\w)/g, toUpperCase.bind(null, 1)).toTitleCase();
                name = name.replace(/HTML|XML|WML|API/ig, toUpperCase.bind(null, 0));
                members.push(name + ": \"" + value +"\"");
            }
            return "InspectorBackend.registerEnum(\"" + enumName + "\", {" + members.join(", ") + "});";
        }

        for (var i = 0; i < domains.length; ++i) {
            var domain = domains[i];

            var types = domain["types"] || [];
            for (var j = 0; j < types.length; ++j) {
                var type = types[j];
                if ((type["type"] === "string") && type["enum"])
                    result.push(generateEnum(domain.domain + "." + type.id, type["enum"]));
                else if (type["type"] === "object") {
                    var properties = type["properties"] || [];
                    for (var k = 0; k < properties.length; ++k) {
                        var property = properties[k];
                        if ((property["type"] === "string") && property["enum"])
                            result.push(generateEnum(domain.domain + "." + type.id + property["name"].toTitleCase(), property["enum"]));
                    }
                }
            }

            //所有的command
            var commands = domain.commands || [];
            for (var j = 0; j < commands.length; ++j) {
                var command = commands[j];
                var parameters = command["parameters"];
                var paramsText = [];
                for (var k = 0; parameters && k < parameters.length; ++k) {
                    var parameter = parameters[k];

                    var type;
                    if (parameter.type)
                        type = jsTypes[parameter.type] || parameter.type;
                    else {
                        var ref = parameter["$ref"];
                        if (ref.indexOf(".") !== -1)
                            type = rawTypes[ref];
                        else
                            type = rawTypes[domain.domain + "." + ref];
                    }

                    var text = "{\"name\": \"" + parameter.name + "\", \"type\": \"" + type + "\", \"optional\": " + (parameter.optional ? "true" : "false") + "}";
                    paramsText.push(text);
                }

                var returnsText = [];
                var returns = command["returns"] || [];
                for (var k = 0; k < returns.length; ++k) {
                    var parameter = returns[k];
                    returnsText.push("\"" + parameter.name + "\"");
                }
                var hasErrorData = String(Boolean(command.error));
                result.push("InspectorBackend.registerCommand(\"" + domain.domain + "." + command.name + "\", [" + paramsText.join(", ") + "], [" + returnsText.join(", ") + "], " + hasErrorData + ");");
            }

            //所有的event
            for (var j = 0; domain.events && j < domain.events.length; ++j) {
                var event = domain.events[j];
                var paramsText = [];
                for (var k = 0; event.parameters && k < event.parameters.length; ++k) {
                    var parameter = event.parameters[k];
                    paramsText.push("\"" + parameter.name + "\"");
                }
                result.push("InspectorBackend.registerEvent(\"" + domain.domain + "." + event.name + "\", [" + paramsText.join(", ") + "]);");
            }
        }
        return result.join("\n");
    }
	
    /**
     * @constructor
     * @param {string} domain
     */
    static AgentPrototype = class AgentPrototype{
        _domain:string;
        _replyArgs:Object={};
        _hasErrorData:Object={};
        _suppressErrorLogging:boolean;
        _promisified:boolean;
        constructor(domain:string){
            this._domain = domain;
            this._suppressErrorLogging = false;
            this._promisified = domain in InspectorBackendClass.AgentPrototype.PromisifiedDomains;
        }
        
        static PromisifiedDomains={
            "Profiler": true
        }
        
        /**
         * @param {string} methodName
         * @param {!Array.<!Object>} signature
         * @param {!Array.<string>} replyArgs
         * @param {boolean} hasErrorData
         */
        registerCommand(methodName:string, signature:Array<Object>, 
            replyArgs:Array<string>, hasErrorData:boolean) {
        }       
        
    }    
    /**
     * @param {string} domain
     * @return {!InspectorBackendClass.AgentPrototype}
     */
    _agentPrototype(domain:string):any{
        if (!this._agentPrototypes[domain]) {
            this._agentPrototypes[domain] = new InspectorBackendClass.AgentPrototype(domain);
            this._addAgentGetterMethodToProtocolAgentsPrototype(domain);
        }

        return this._agentPrototypes[domain];
    }
    
    _addAgentGetterMethodToProtocolAgentsPrototype(domain:string):void{
        var upperCaseLength = 0;
        while (upperCaseLength < domain.length && domain[upperCaseLength].toLowerCase() !== domain[upperCaseLength])
            ++upperCaseLength;

        var methodName = domain.substr(0, upperCaseLength).toLowerCase() + domain.slice(upperCaseLength) + "Agent";

        /**
         * @this {Protocol.Agents}
         */
        function agentGetter()
        {
            return this._agentsMap[domain];
        }

        window.Agents.prototype[methodName] = agentGetter;

        /**
         * @this {Protocol.Agents}
         * 注册
         */
        function registerDispatcher(dispatcher)
        {
            this.registerDispatcher(domain, dispatcher)
        }

        window.Agents.prototype["register" + domain + "Dispatcher"] = registerDispatcher;
    }
        
	static Connection:BackEnd_Connection;
	
	static DispatcherPrototype=class {
		//connection调过来的。
		//@param functionName 是从消息中取出的函数名
		//@param messageObject 是原始的消息。 
		dispatch(functionName:string, messageObject:string|Object):void{
            
        }
	}
    
}

/**
 *负责消息的派发。 
 */
class BackEnd_Connection{
        _lastMessageId:number=1;
        _agents:Object;
        _callbacks:Object;
		_dispatchers:Object;	//其实是用作map，(string,Object)
        
        /**
         * @param {!Object.<string, !InspectorBackendClass.AgentPrototype>} agentPrototypes
         * @param {!Object.<string, !InspectorBackendClass.DispatcherPrototype>} dispatcherPrototypes
         */
        _initialize(agentPrototypes:Object, dispatcherPrototypes:Object){
            for (var domain in agentPrototypes) {
                this._agents[domain] = Object.create(agentPrototypes[domain]);
                this._agents[domain].setConnection(this);
            }

            for (var domain in dispatcherPrototypes)
                this._dispatchers[domain] = Object.create(dispatcherPrototypes[domain])

        }      
        
		//如果有id的话...
		//如果没有id的话，找到message中的domain部分，然后从 _dispatchers 中找到对应的对象，调用那个对象的方法
		dispatch(message:string|Object):void{
            
        }
        
        /**
         * 注册对应某个domain的dispatcher
         */
        registerDispatcher(domain:string, dispatcher:Object):void{
            if (!this._dispatchers[domain])
                return;

            this._dispatchers[domain].setDomainDispatcher(dispatcher);
        }
        
        isClosed():boolean{
            return false;
        }	    
}