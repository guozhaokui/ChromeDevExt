
/*
	目录：
		front-end/common
*/

declare module WebInspector{
	
	interface Event{
		
	}
	
	interface EventTarget{
    /**
     * @param {string} eventType
     * @param {function(!WebInspector.Event)} listener
     * @param {!Object=} thisObject
     */
    addEventListener(eventType:string, listener:(e:Event)=>void, thisObject:any):void;

    /**
     * @param {string} eventType
     * @param {function(!WebInspector.Event)} listener
     * @param {!Object=} thisObject
     */
    removeEventListener(eventType:string, listener:(e:Event)=>void, thisObject:any):void;

    removeAllListeners();

    /**
     * @param {string} eventType
     * @return {boolean}
     */
    hasEventListeners(eventType:string);

    /**
     * @param {string} eventType
     * @param {*=} eventData
     * @return {boolean}
     */
    dispatchEventToListeners(eventType:string, eventData:any):boolean;
		
	}
	
	interface Object extends EventTarget{
		
	}
}