
module WebInspector{
	/*
		path:
			main
		file:main.js
	*/
	interface Main{
		showConsole();
		
		/*
			onWindowLoad之后调用
		*/
		_loaded();
		
		/*
			创建所有的uI。
		*/
		_createAppUI();
	}
	
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
	
	class Object implements EventTarget{
        addEventListener(eventType:string, listener:(e:Event)=>void, thisObject:Object){
        }		
		removeEventListener(eventType:string, listener:(e:Event)=>void, thisObject:any):void{}
		removeAllListeners(){}
		hasEventListeners(eventType:string){}
		dispatchEventToListeners(eventType:string, eventData:any):boolean{
            return false;
        }
	}
	
	//////////////////////////////////////////////////////////////////////
	/*
		view的基类
		目录：
		front-end/ui 
	*/	
	interface Constraints{
		
	}
	
	class View extends Object{
		constructor (isWebComponent:boolean){
            super();
        }
		element:HTMLElement;
		/* 
			如果是 isWebComponent ，这个是element的子。否则那他们是一个对象。
		*/
		contentElement:HTMLElement;	
		
		_isWebComponent:boolean;
		_shadowRoot:any;
		_visible:boolean;
		_isRoot:boolean;
		_isShowing:boolean;
		_children:Array<View>;
		_hideOnDetach:boolean;
		_cssFiles:Array<any>;
		_notificationDepth:number;
		//如果没有设置的话，就没有，使用element
		_defaultFocusedElement:HTMLElement;
		
		defaultFocusedElement():HTMLElement{return null;}
		setDefaultFocusedElement(e:HTMLElement):void{}
		
		calculateConstraints():Constraints{return null;}

	}
	
	class  VBox extends View{
		constructor (isWebComponent:boolean){
            super(isWebComponent);
            this.element.classList.add('vbox');
        }	
		calculateConstraints():Constraints{
            return null;
        }
	}
	
	interface HBox extends View{
		new (isWebComponent:boolean):VBox;	//element.classList.add('hbox')
		calculateConstraints():Constraints;
	}
	
	//////////////////////////////////////////////////////////////////////
	//path:
	//file: Panel.js
	class Panel extends VBox{
        constructor(name:string){
            super(false);
        }
		wasShown():boolean{
            return false;
        }
	}
	
	interface PanelFactory{
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
	
	//////////////////////////////////////////////////////////////////////	
	//file:consolePanel.js
	/*
		ConsolePanel对应的是Console面板。
	*/
	interface ConsolePanel_Instance {
		/*
			返回一个view.第一次的时候会创建一个。
		*/
		_view():ConsoleView;
		
		defaultFocusedElement():HTMLElement;
		
		wasShown():boolean;
		
		willHide();
	}
	
	interface ConsolePanel_static extends Panel{
		new():ConsolePanel_Instance;
		show():void;	//WebInspector.inspectorView.setCurrentPanel(WebInspector.ConsolePanel._instance());
	}
	
	var ConsolePanel:ConsolePanel_static;
	
// 	interface ConsolePanel extends Panel{
// 		new():ConsolePanel;
// 		
// 		/*
// 			返回一个view.第一次的时候会创建一个。
// 		*/
// 		_view():ConsoleView;
// 		
// 		defaultFocusedElement():HTMLElement;
// 		
// 		wasShown():boolean;
// 		
// 		willHide();
// 		
// 	}
// 
// 	module ConsolePanel{
// 		/*
// 			下面的是ConsolePanel中的静态的类。
// 			由于interface不能 static xx=interface{},
// 			只好用这种方法定义了。
// 		*/
// 		interface WrapperView extends VBox{
// 			wasShown():boolean;
// 		}
// 		var WrapperView:{
// 			new ():WrapperView;
// 		}
// 	}
	
	interface ConsoleView{
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