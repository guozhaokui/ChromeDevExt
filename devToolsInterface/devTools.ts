
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

interface  HtmlElement{
    createChild(elementName:string, className:string):HtmlElement; 
     /**
     * @param {!DOMAgent.NodeId} nodeId
     * @param {string} selectors
     * @param {function(?DOMAgent.NodeId)=} callback
     */
    querySelector(nodeId, selectors:string, callback:any):void;
    
    appendChildren(var_args):void;
    
    disabled:boolean;
}

/*
HtmlElement.prototype.createChild=function(elementName, className):HtmlElement; {
        var element = this.ownerDocument.createElementWithClass(elementName, className);
        this.appendChild(element);
        return element;
    }    
*/


