
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

		//static 		
		show();	//WebInspector.inspectorView.setCurrentPanel(WebInspector.ConsolePanel._instance());
	}

	
	
	interface ConsoleView{
		
	}
	
}

