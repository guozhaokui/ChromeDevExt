
//NI的后端，主要是接收ws消息，然后转换成事件分发给相应的模块

declare class InspectorBackendClass{
	
	//其实使用做map的
	_agentPrototypes:Object;
	
	//参数总是 ../protocol.json
	//就是注册每个协议对应的模块。
	loadFromJSONIfNeeded(jsonUrl:string);
	
    /**
     * @param {string} method
     * @param {!Array.<!Object>} signature
     * @param {!Array.<string>} replyArgs
     * @param {boolean} hasErrorData
     */
	registerCommand(method:string, signature:Array<Object>, replyArgs:Array<string>, hasErrorData:boolean):void;
	
	static Connection:class {
		_dispatchers：Object;	//其实是用作map，(string,Object)
		//如果有id的话...
		//如果没有id的话，找到message中的domain部分，然后从 _dispatchers 中找到对应的对象，调用那个对象的方法
		dispatch(message:string|Object):void;	
	}
	
	static DispatcherPrototype:class {
		//connection调过来的。
		//@param functionName 是从消息中取出的函数名
		//@param messageObject 是原始的消息。 
		dispatch(functionName:string, messageObject:string|Object):void;
	}
}