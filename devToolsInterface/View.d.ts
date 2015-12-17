
/*
 	view的基类
	 目录：
	 front-end/ui 
*/

declare module WebInspector{
	
	interface Constraints{
		
	}
	
	interface View extends Object{
		new (isWebComponent:boolean):View;
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
		
		defaultFocusedElement():HTMLElement;
		setDefaultFocusedElement(e:HTMLElement):void;
		
		calculateConstraints():Constraints;

	}
	
	interface  VBox extends View{
		new (isWebComponent:boolean):VBox;	//element.classList.add('vbox')
		calculateConstraints():Constraints;
	}
	
	interface HBox extends View{
		new (isWebComponent:boolean):VBox;	//element.classList.add('hbox')
		calculateConstraints():Constraints;
	}
}

