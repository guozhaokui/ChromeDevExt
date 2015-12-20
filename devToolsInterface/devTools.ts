
module WebInspector{
	/*
		目录：
			front-end/common
		file:
			Object.js
	*/
	interface Event{
		
	}
	
	interface EventTarget{
		/**
		* @param {string} eventType
		* @param {function(!WebInspector.Event)} listener
		* @param {!Object=} thisObject
		*/
		addEventListener(eventType:string, listener:(e:Event)=>void, thisObject:Object):void;
	
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
	
	export class Object implements EventTarget{
        addEventListener(eventType:string, listener:(e:Event)=>void, thisObject:Object){
        }		
		removeEventListener(eventType:string, listener:(e:Event)=>void, thisObject:any):void{}
		removeAllListeners(){}
		hasEventListeners(eventType:string){}
        
		dispatchEventToListeners(eventType:string, eventData?:any):boolean{
            return false;
        }
	}
	
	//////////////////////////////////////////////////////////////////////
	//path:
	//file: Panel.js
	export class Panel extends VBox{
        constructor(name:string){
            super(false);
        }
		wasShown():boolean{
            return false;
        }
	}
	
	export interface PanelFactory{
		createPanel():Panel;
	}	
	
		
	//////////////////////////////////////////////////////////////////////
	/*
		path:
			components
		file: inspectorView.js
	*/
	interface InspectorView extends VBox{
		//当前
		_currentPanel:Panel;
		
		_drawerSplitView:SplitView;
		_drawer:Drawer;
		
		/*
			像菜单的那个界面，几大部分：Elements,console,Network...
		*/
		_tabbedPane:TabbedPane;
		
		/*
			转到选中的tab上。
		*/
		_tabSelected();
		
		showPanel(panelName:string):Promise<Panel>;
		
		/*
		*/
		setCurrentPanel(panel:Panel):Panel;
	}
	
	//////////////////////////////////////////////////////////////////////
	//file:splitView.js
	interface SplitView extends View{
		new (isVertical:boolean, 
			secondIsSidebar:any, 
			settingName:string, 
			defaultSidebarWidth:number, 
			defaultSidebarHeight:number, 
			constraintsInDip:boolean):SplitView;
	}	
		
	//////////////////////////////////////////////////////////////////////
	/*
		path:
			components
		file: Drawer.js
	*/
	interface Drawer extends VBox{
		new (splitView:any):Drawer;	
	}
	
	interface TabbedPane extends VBox{
		_tabs:any;
		_tabsById:Object;	//实际当map来用(string,TabbedPaneTab)
		/*
			鼠标在当前tab上downl了。
			这个会调用到 selectTab
		*/
		_tabMouseDown(event:MouseEvent);
		
		selectTab(id:string ,userGesture:boolean):boolean;
	}
	
	//////////////////////////////////////////////////////////////////////
	//file:TabbedPane.js
	interface TabbedPaneTab{
		new (tabbedPane:TabbedPane, 
			id:string, 
			title:string, 
			closeable:boolean, 
			view:View, 
			tooltip:string):TabbedPaneTab;
			
		_closeable:boolean;
		_tabbedPane:TabbedPane;
		_id:string;
		_title:string;
		_tooltip:string;
		_view:View;
		_shown:boolean;			
	}	
}

/*
	扩展DOM的接口。
	file: platform.js
*/

interface Document{
	/*
		创建一个对象，并且设置对象的 className
	*/
	createElementWithClass(elementName:string, className:string):HTMLElement;
}

declare var createElementWithClass:(elementName:string, className:string)=>HTMLElement;

interface HtmlElement{
    createChild(elementName:string, className:string):HtmlElement; 
     /**
     * @param {!DOMAgent.NodeId} nodeId
     * @param {string} selectors
     * @param {function(?DOMAgent.NodeId)=} callback
     */
    querySelector(nodeId, selectors:string, callback:any):void;
}

/*
HtmlElement.prototype.createChild=function(elementName, className):HtmlElement; {
        var element = this.ownerDocument.createElementWithClass(elementName, className);
        this.appendChild(element);
        return element;
    }    
*/

/*
	一些基础的全局函数。
	file:runtime.js
*/

declare function loadResourcePromise(url:string):Promise<string>;

/*
	格式化路径，去掉.,..等
*/
declare function normalizePath(path:string):string;

declare function loadScriptsPromise(scriptNames:string);//:Promise<undefined>;

class Runtime{
	_descriptor:ModuleDescriptor;
	static cachedResources:Object;        //用来缓存所有的文件资源的。避免每次都去重新下载。
    
    constructor(dscriptors:ModuleDescriptor,coreModuleName:Array<string>){
        
    }
	/*
		某个脚本加载完了，立刻执行他。
	*/
	scriptSourceLoaded(scriptNumber:number, scriptSource:string):void{
        
    }
	
	/*
		加载descriptors中指定的所有的脚本
	*/
	_loadScripts(){}
	
	/*
		实际执行的时候，是module来执行
	*/
	_loadStylesheets():Promise<void>{
        return null;
    }

	/*
		调用全局的 normalizePath
	*/
	_modularizeURL(resourceName:string){
        
    }
	/*
		加载type=autostart的module，这些module是核心模块
	*/
	_loadAutoStartModules(moduleNames:Array<string>):Promise<Array<any>>{
        return null;
    }		
    
    static 	startApplication:(appName:string)=>void;

}

interface ModuleDescriptor{
	name:string;
	extensions:Array<ExtensionDesciptor>;
	dependencies?:Array<string>;
	scripts:Array<string>;
}

interface ExtensionDesciptor{
	type:string;
	className?:string;
	contextType?:Array<string>;
}

interface Module{
	/*
		创建实例。
		会创建所有的extension，并且push到runtime对象中
	*/
	new(manager:Runtime, descriptor:ModuleDescriptor):Module;
	
	_manager:Runtime;
	_descriptor:ModuleDescriptor;
	_name:string;
	_instanceMap:Object;
	/*
		是否已经把module所需的所有的资源加载完毕
		包括脚本，style，html
	*/
	_loaded:boolean;	
	
	_loadStylesheets():Promise<void>;
	
	_loadScripts():Promise<void>;
	
	_modularizeURL(resourceName:string):string;
	
	/*
		创建一个指定class的对象。缓存到 _instanceMap 中。
	*/
	_instance(className:string):Object;
	
}

/*
	Module和 Extension的区别：
		Extension只能扩展module?
*/
interface Extension{
	_module:Module;
	_descriptor:ModuleDescriptor;
	_type:string;
	_hasTypeClass:boolean;
	_className:string;
}