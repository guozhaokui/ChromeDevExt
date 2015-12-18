
declare module WebInspector{
	interface TabbedPane extends VBox{
		/*
			鼠标在当前tab上downl了。
			这个会调用到 selectTab
		*/
		_tabMouseDown(event:MouseEvent);
		
		selectTab(id:string ,userGesture:boolean):boolean;
	}
}