
declare module WebInspector{
	/*
		ConsolePanel对应的是Console面板。
	*/
	interface ConsolePanel extends Panel{
		
		/*
			返回一个view.第一次的时候会创建一个。
		*/
		_view():ConsoleView;
		
		defaultFocusedElement():HTMLElement;
		
		wasShown():boolean;
		
		willHide();
		
	}

	module ConsolePanel{
		/*
			下面的是ConsolePanel中的静态的类。
			由于interface不能 static xx=interface{},
			只好用这种方法定义了。
		*/
		interface WrapperView extends VBox{
			wasShown():boolean;
		}
		declare WrapperView:{
			new ():WrapperView;
		}
	}
	
	var ConsolePanel:{
		new():ConsolePanel;
		//static 		
		show();	//WebInspector.inspectorView.setCurrentPanel(WebInspector.ConsolePanel._instance());
	}
	
	
	interface ConsoleView{
		
	}
	
}

